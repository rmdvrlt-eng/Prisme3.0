"use client";

import { useEffect, useMemo, useState } from "react";
import { modules } from "@/data/modules";
import { branches } from "@/data/branches";
import { buildReport, rawScores } from "@/lib/report";
import { clearSession, loadCompanionMessages, loadHistory, loadJournal, loadSession, saveJournal, saveReport, saveSession } from "@/lib/storage";
import { Answer, CompanionMessage, JournalEntry, MemoryItem, PrismeModule, Question, Report, Session } from "@/types/prisme";
import { WorldMemory } from "@/components/WorldMemory";
import { defaultWorld, evolveWorld, loadWorld, saveWorld, WorldState } from "@/lib/world";
import { createMemory, loadMemories, saveMemories, syncGeneratedMemories } from "@/lib/memory";
import { MemoryArchive } from "@/components/MemoryArchive";
import { ImmersiveJourney } from "@/components/ImmersiveJourney";
import { NarrativeArchive } from "@/components/NarrativeArchive";
import { createNarrativeEvent, loadNarrativeEvents, saveNarrativeEvents } from "@/lib/narrative";
import { NarrativeEvent } from "@/types/prisme";
import { PsychologyReport } from "@/components/PsychologyReport";
import { ImmersiveOnboarding } from "@/components/ImmersiveOnboarding";
import { ImmersiveReport } from "@/components/ImmersiveReport";
import { CompanionEngine } from "@/components/CompanionEngine";
import { MusicEngine } from "@/components/MusicEngine";
import { MusicTerritory } from "@/lib/music";
import { CompanionPresence } from "@/components/CompanionPresence";
import { ImmersiveHome } from "@/components/ImmersiveHome";
import { HouseEngine } from "@/components/HouseEngine";
import { TerritoryEngine } from "@/components/TerritoryEngine";
import { dismissPresence, loadPresenceState, markPresenceShown, PresenceEvent, PresenceState, savePresenceState, selectPresenceEvent } from "@/lib/presence";

type View = "home" | "quiz" | "report";
type Settings = { motion: boolean; sound: boolean; haptics: boolean; reducedGlow: boolean; theme: "dark" | "light" };

const moduleMeta: Record<string, { icon: string; title: string }> = {
  personnalite:{icon:"✦",title:"Atelier du Soi"},
  attention:{icon:"⌁",title:"Labyrinthe de l’Attention"},
  emotions:{icon:"◌",title:"Jardin des Émotions"},
  relations:{icon:"∞",title:"Galerie des Liens"},
  cognition:{icon:"◇",title:"Observatoire de l’Esprit"},
  neurodiversite:{icon:"◐",title:"Chambre des Sens"},
  quotidien:{icon:"▦",title:"Maison des Rythmes"},
  sens_identite:{icon:"✺",title:"Bibliothèque du Sens"}
};

function vibrate(pattern: number | number[], enabled: boolean) {
  if (enabled && typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern);
}

function Avatar({ report, compact=false }: { report: Report | null; compact?: boolean }) {
  const metric=(key:string)=>report?.metrics.find(m=>m.key===key)?.value??50;
  const style={
    ["--core" as string]: String(.85+metric("structure")/420),
    ["--halo" as string]: String(.75+metric("creativity")/260),
    ["--mist" as string]: String(Math.max(.08,metric("anxiety")/210))
  };
  return <div className={compact?"avatar compact":"avatar"} style={style}>
    <div className="orbit o1"/><div className="orbit o2"/><div className="aura"/>
    <div className="being"><i className="eye e1"/><i className="eye e2"/><i className="mouth"/></div>
    {Array.from({length:16}).map((_,i)=><span className="particle" key={i} style={{["--i" as string]:i}}/>)}
  </div>;
}

function Radar({ report }: { report: Report }) {
  const items=report.metrics.slice(0,6); if(items.length<3)return null;
  const size=320,c=160,r=112;
  const pts=items.map((m,i)=>{const a=-Math.PI/2+i*Math.PI*2/items.length;return{x:c+Math.cos(a)*r*m.value/100,y:c+Math.sin(a)*r*m.value/100,lx:c+Math.cos(a)*(r+30),ly:c+Math.sin(a)*(r+30),label:m.label.split(" ").slice(0,2).join(" ")}});
  return <section className="glass"><span className="kicker">Carte intérieure</span><svg viewBox={`0 0 ${size} ${size}`} className="radar">
    {[.25,.5,.75,1].map(s=><circle key={s} cx={c} cy={c} r={r*s} fill="none" stroke="rgba(255,255,255,.12)"/>)}
    <polygon points={pts.map(p=>`${p.x},${p.y}`).join(" ")} fill="rgba(126,167,255,.25)" stroke="#8daaff" strokeWidth="3"/>
    {pts.map(p=><g key={p.label}><circle cx={p.x} cy={p.y} r="4" fill="#fff"/><text x={p.lx} y={p.ly} textAnchor="middle">{p.label}</text></g>)}
  </svg></section>;
}

export default function Page(){
  const [view,setView]=useState<View>("home");
  const [session,setSession]=useState<Session|null>(null);
  const [report,setReport]=useState<Report|null>(null);
  const [history,setHistory]=useState<Report[]>([]);
  const [journal,setJournal]=useState<JournalEntry[]>([]);
  const [onboarded,setOnboarded]=useState(false);
  const [onboardingStep,setOnboardingStep]=useState(0);
  const [consent,setConsent]=useState(false);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [bookmarks,setBookmarks]=useState<string[]>([]);
  const [settings,setSettings]=useState<Settings>({motion:true,sound:true,haptics:true,reducedGlow:false,theme:"dark"});
  const [journalOpen,setJournalOpen]=useState(false);
  const [mood,setMood]=useState(3),[energy,setEnergy]=useState(3),[clarity,setClarity]=useState(3),[socialLoad,setSocialLoad]=useState(3),[note,setNote]=useState("");
  const [world,setWorld]=useState<WorldState>(defaultWorld());
  const [memories,setMemories]=useState<MemoryItem[]>([]);
  const [narrativeEvents,setNarrativeEvents]=useState<NarrativeEvent[]>([]);
  const [companionMessages,setCompanionMessages]=useState<CompanionMessage[]>([]);
  const [presenceEvent,setPresenceEvent]=useState<PresenceEvent|null>(null);
  const [presenceState,setPresenceState]=useState<PresenceState>({seenSignatures:[],dismissedIds:[]});

  const allQuestions=useMemo(()=>modules.flatMap(m=>m.questions),[]);
  const bank=useMemo(()=>[...allQuestions,...Object.values(branches).flatMap(b=>b.questions)],[allQuestions]);
  const questions=useMemo(()=>session?session.questionIds.map(id=>bank.find(q=>q.id===id)).filter(Boolean) as Question[]:[],[session,bank]);

  useEffect(()=>{
    const h=loadHistory(), j=loadJournal(), loadedWorld=loadWorld(); setHistory(h);setJournal(j);setWorld(loadedWorld);saveWorld(loadedWorld);
    const syncedMemories=syncGeneratedMemories(loadMemories(),j,h);setMemories(syncedMemories);saveMemories(syncedMemories);
    setNarrativeEvents(loadNarrativeEvents());
    setCompanionMessages(loadCompanionMessages());
    const loadedPresence=loadPresenceState();setPresenceState(loadedPresence);
    const s=loadSession(); if(s)setSession(s);
    setOnboarded(localStorage.getItem("prisme.onboarded")==="1");
    setBookmarks(JSON.parse(localStorage.getItem("prisme.bookmarks")||"[]"));
    const stored=JSON.parse(localStorage.getItem("prisme.settings")||"null");
    if(stored)setSettings(stored);
    if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js").catch(()=>undefined);
  },[]);

  useEffect(()=>{
    document.documentElement.dataset.theme=settings.theme;
    document.documentElement.dataset.motion=settings.motion?"full":"reduced";
    document.documentElement.dataset.glow=settings.reducedGlow?"reduced":"full";
    localStorage.setItem("prisme.settings",JSON.stringify(settings));
  },[settings]);

  useEffect(()=>{
    function syncWorld(event: Event){
      const custom=event as CustomEvent<{world?:WorldState}>;
      if(custom.detail?.world)setWorld(custom.detail.world);
      else setWorld(loadWorld());
    }
    window.addEventListener("prisme:ecosystem-updated",syncWorld);
    return()=>window.removeEventListener("prisme:ecosystem-updated",syncWorld);
  },[]);

  useEffect(()=>{
    if(!onboarded||view!=="home"||presenceEvent)return;
    const timer=window.setTimeout(()=>{
      const event=selectPresenceEvent({history,journal,world,state:presenceState});
      if(!event)return;
      const next=markPresenceShown(presenceState,event);
      setPresenceState(next);savePresenceState(next);setPresenceEvent(event);
    },2200);
    return()=>window.clearTimeout(timer);
  },[onboarded,view,history,journal,world,presenceState,presenceEvent]);

  function closePresence(){
    if(!presenceEvent)return;
    const next=dismissPresence(presenceState,presenceEvent);
    setPresenceState(next);savePresenceState(next);setPresenceEvent(null);
  }

  function start(module?:PrismeModule){
    const qs=module?module.questions:allQuestions;
    const next:Session={id:crypto.randomUUID(),mode:module?.title??"Parcours complet",questionIds:qs.map(q=>q.id),index:0,answers:[],startedAt:new Date().toISOString()};
    setSession(next);saveSession(next);setView("quiz");vibrate(12,settings.haptics);
  }

  function maybeBranch(next:Session){
    const {raw}=rawScores(next.answers);
    const ids=new Set(next.questionIds),add:string[]=[];
    Object.values(branches).forEach(b=>{
      const score=50+(raw[b.axis]??0)*6;
      if(score>=b.threshold)b.questions.forEach(q=>{if(!ids.has(q.id))add.push(q.id)});
    });
    return add.length?{...next,questionIds:[...next.questionIds,...add]}:next;
  }

  function completeAnswer(answer:Answer){
    if(!session)return;
    let next=maybeBranch({...session,answers:[...session.answers.slice(0,session.index),answer],index:session.index+1});
    if(next.index>=next.questionIds.length){
      const r=buildReport(next.answers,next.mode);saveReport(r);clearSession();const newHistory=[r,...history].slice(0,20);setReport(r);setHistory(newHistory);const synced=syncGeneratedMemories(memories,journal,newHistory);setMemories(synced);saveMemories(synced);const evolved=evolveWorld(world,next.answers,journal,newHistory);setWorld(evolved);saveWorld(evolved);setView("report");setSession(null);vibrate([12,30,18],settings.haptics);return;
    }
    setSession(next);saveSession(next);vibrate(10,settings.haptics);
  }

  function answer(index:number){
    if(!session)return;const q=questions[session.index],o=q.options[index];
    const event=createNarrativeEvent(q,o.text,index);const nextEvents=[event,...narrativeEvents];setNarrativeEvents(nextEvents);saveNarrativeEvents(nextEvents);
    completeAnswer({questionId:q.id,moduleId:q.moduleId,optionIndex:index,optionText:o.text,scores:o.scores});
  }

  function skip(){
    if(!session)return;const q=questions[session.index];
    const event=createNarrativeEvent(q,"Aucune voie ne me correspond",-1);const nextEvents=[event,...narrativeEvents];setNarrativeEvents(nextEvents);saveNarrativeEvents(nextEvents);
    completeAnswer({questionId:q.id,moduleId:q.moduleId,optionIndex:-1,optionText:"Aucune réponse",scores:{},skipped:true});
  }

  function back(){if(!session||session.index===0)return;const next={...session,index:session.index-1,answers:session.answers.slice(0,session.index-1)};setSession(next);saveSession(next)}

  function toggleBookmark(id:string){const next=bookmarks.includes(id)?bookmarks.filter(x=>x!==id):[...bookmarks,id];setBookmarks(next);localStorage.setItem("prisme.bookmarks",JSON.stringify(next))}

  function saveMood(){
    const entry:JournalEntry={id:crypto.randomUUID(),createdAt:new Date().toISOString(),mood,energy,clarity,socialLoad,note:note.trim()};
    const next=[entry,...journal].slice(0,180);setJournal(next);saveJournal(next);const synced=syncGeneratedMemories(memories,next,history);setMemories(synced);saveMemories(synced);const evolved=evolveWorld(world,session?.answers??[],next,history);setWorld(evolved);saveWorld(evolved);setNote("");setJournalOpen(false);vibrate([10,20,10],settings.haptics)
  }


  function addCreationMemory(title:string, body:string, territory:MemoryItem["territory"]){
    const next=[createMemory("creation",title,body,territory),...memories];setMemories(next);saveMemories(next);vibrate([10,20,10],settings.haptics);
  }

  function toggleMemoryPin(id:string){const next=memories.map(item=>item.id===id?{...item,pinned:!item.pinned}:item);setMemories(next);saveMemories(next)}
  function deleteMemory(id:string){const next=memories.filter(item=>item.id!==id);setMemories(next);saveMemories(next)}



  const currentQuestion=session?questions[session.index]:null;
  const currentModule=currentQuestion?moduleMeta[currentQuestion.moduleId]:null;
  const currentTerritory=(currentQuestion?.moduleId??"monde") as MusicTerritory;

  if(!onboarded){
    return <ImmersiveOnboarding onComplete={()=>{localStorage.setItem("prisme.onboarded","1");setOnboarded(true)}}/>;
  }

  if(view==="quiz"&&session&&currentQuestion){
    return <>
      <ImmersiveJourney
        question={currentQuestion}
        index={session.index}
        total={questions.length}
        world={world}
        report={history[0]??null}
        bookmarked={bookmarks.includes(currentQuestion.id)}
        onBookmark={()=>toggleBookmark(currentQuestion.id)}
        onAnswer={answer}
        onSkip={skip}
        onBack={back}
        onExit={()=>setView("home")}
      />
      <MusicEngine territory={currentTerritory} world={world} enabled={settings.sound} compact />
      {settingsOpen&&<Settings settings={settings} setSettings={setSettings} close={()=>setSettingsOpen(false)}/>} 
    </>;
  }

  if(view==="report"&&report){
    return <>
      <ImmersiveReport report={report} world={world} onBack={()=>setView("home")}/>
      <MusicEngine territory="rapport" world={world} enabled={settings.sound}/>
    </>;
  }

  return <>
    <ImmersiveHome
      modules={modules}
      world={world}
      history={history}
      journal={journal}
      memories={memories}
      session={session}
      onStart={start}
      onResume={()=>setView("quiz")}
      onOpenSettings={()=>setSettingsOpen(true)}
      onOpenJournal={()=>setJournalOpen(true)}
      onOpenReport={(selected)=>{setReport(selected);setView("report")}}
    />
    <MusicEngine territory="monde" world={world} enabled={settings.sound} />
    <CompanionPresence event={presenceEvent} onDismiss={closePresence} />
    {journalOpen&&<div className="overlay"><section className="settings journal-modal"><header><div><span className="kicker">Journal vivant</span><h2>Comment te sens-tu aujourd’hui ?</h2></div><button onClick={()=>setJournalOpen(false)}>×</button></header><div className="journal-form">{[["Humeur",mood,setMood],["Énergie",energy,setEnergy],["Clarté",clarity,setClarity],["Charge sociale",socialLoad,setSocialLoad]].map(([label,val,setter]:any)=><label key={label}><span>{label}</span><div>{[1,2,3,4,5].map(n=><button className={val===n?"active":""} key={n} onClick={()=>setter(n)}>{n}</button>)}</div></label>)}<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Une phrase, une sensation, une image…"/><button className="primary" onClick={saveMood}>Enregistrer</button></div></section></div>}
    {settingsOpen&&<Settings settings={settings} setSettings={setSettings} close={()=>setSettingsOpen(false)}/>} 
  </>
}

function Settings({settings,setSettings,close}:{settings:Settings;setSettings:(s:Settings)=>void;close:()=>void}){
  const rows:[keyof Settings,string,string][]=[["motion","Animations","Transitions et particules"],["sound","Sons","Ambiances de chaque territoire"],["haptics","Retours tactiles","Vibrations discrètes sur mobile"],["reducedGlow","Lumière réduite","Diminue les halos et la profondeur"]];
  return <div className="overlay"><section className="settings"><header><div><span className="kicker">Préférences</span><h2>Ton expérience</h2></div><button onClick={close}>×</button></header>{rows.map(([key,title,desc])=><button className="setting-row" key={key} onClick={()=>setSettings({...settings,[key]:!settings[key]})}><span><strong>{title}</strong><small>{desc}</small></span><i className={settings[key]?"switch on":"switch"}/></button>)}<button className="setting-row" onClick={()=>setSettings({...settings,theme:settings.theme==="dark"?"light":"dark"})}><span><strong>Apparence</strong><small>{settings.theme==="dark"?"Mode sombre":"Mode clair"}</small></span><b>{settings.theme==="dark"?"☼":"☾"}</b></button></section></div>
}
