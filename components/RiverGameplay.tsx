"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MemoryItem, PrismeModule } from "@/types/prisme";
import { answerStoneRitual, discoverReflection, enterRiver, loadRiverState, moveAlongRiver, RiverState } from "@/lib/river";

const landmarks = [
  { id: "stone", x: 24, symbol: "◇", title: "La pierre claire", text: "Elle ne retient pas le courant. Elle lui donne seulement un point de passage." },
  { id: "bridge", x: 47, symbol: "⌒", title: "Le pont bas", text: "Certains liens ne suppriment pas la distance ; ils permettent simplement de la traverser." },
  { id: "willow", x: 70, symbol: "♧", title: "Le saule", text: "Ses branches touchent l’eau sans essayer de l’immobiliser." },
  { id: "estuary", x: 88, symbol: "≈", title: "L’estuaire", text: "Ce qui s’élargit ne disparaît pas. Cela rejoint un espace plus vaste." }
];

export function RiverGameplay({ module, memories, onBegin, onClose }:{module:PrismeModule;memories:MemoryItem[];onBegin:(module:PrismeModule)=>void;onClose:()=>void}){
  const [state,setState]=useState<RiverState>(()=>loadRiverState());
  const [active,setActive]=useState<(typeof landmarks)[number]|null>(null);
  const [ritualOpen,setRitualOpen]=useState(false);
  const pressed=useRef(new Set<string>());
  const drag=useRef<number|null>(null);

  useEffect(()=>{setState(current=>enterRiver(current));},[]);
  useEffect(()=>{
    const down=(e:KeyboardEvent)=>{if(["ArrowLeft","ArrowRight","a","d"].includes(e.key)){e.preventDefault();pressed.current.add(e.key.toLowerCase())}};
    const up=(e:KeyboardEvent)=>pressed.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    let frame=0;
    const tick=()=>{setState(current=>{
      let delta=0;if(pressed.current.has("arrowleft")||pressed.current.has("a"))delta-=.42;if(pressed.current.has("arrowright")||pressed.current.has("d"))delta+=.42;
      return delta?moveAlongRiver(current,delta):current;
    });frame=requestAnimationFrame(tick)};
    frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up)};
  },[]);

  const nearby=useMemo(()=>landmarks.find(item=>Math.abs(item.x-state.x)<7)??null,[state.x]);
  const riverMemories=memories.filter(memory=>memory.territory==="fleuve").slice(0,6);
  function inspect(item:(typeof landmarks)[number]){setState(current=>discoverReflection(current,item.id));setActive(item);if(item.id==="stone"&&!state.answeredStoneQuestion)setRitualOpen(true)}

  return <div className="river-game-overlay" role="dialog" aria-modal="true">
    <section className="river-game">
      <header className="river-game-head"><div><span className="kicker">River Gameplay Engine 3.2</span><h1>Le Fleuve</h1><p>Fais glisser le monde ou utilise les commandes. Les souvenirs apparaissent comme des reflets, jamais comme des obstacles.</p></div><button onClick={onClose}>×</button></header>
      <div className="river-hud"><span>Parcours <b>{state.progress}%</b></span><span>Courant <b>{state.current}%</b></span><span>Clarté <b>{state.clarity}%</b></span><span>Reflets <b>{state.reflections.length}/4</b></span></div>
      <div className="river-world" style={{["--river-current" as string]:state.current/100,["--river-clarity" as string]:state.clarity/100}}
        onPointerDown={(event)=>{if((event.target as HTMLElement).closest("button"))return;drag.current=event.clientX;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)}}
        onPointerMove={(event)=>{if(drag.current===null)return;const dx=event.clientX-drag.current;if(Math.abs(dx)<8)return;setState(current=>moveAlongRiver(current,dx*.065));drag.current=event.clientX}}
        onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
        <div className="river-sky"/><div className="river-bank bank-back"/><div className="river-water"><i/><i/><i/></div><div className="river-bank bank-front"/><div className="river-reeds">{Array.from({length:18}).map((_,i)=><i key={i} style={{left:`${3+(i*17)%94}%`,height:`${28+(i%5)*9}px`}}/>)}</div>
        {riverMemories.map((memory,index)=><button className="river-memory" key={memory.id} style={{left:`${18+(index*13)%70}%`,top:`${40+(index%3)*12}%`}} title={memory.title}><span>{memory.kind==="journal"?"✤":memory.kind==="report"?"◇":"✦"}</span></button>)}
        {landmarks.map(item=><button key={item.id} className={`river-landmark ${state.reflections.includes(item.id)?"discovered":""} ${nearby?.id===item.id?"near":""}`} style={{left:`${item.x}%`}} onClick={()=>inspect(item)}><span>{item.symbol}</span></button>)}
        <div className="river-traveler" style={{left:`${state.x}%`}}><i/><b/></div>
        {nearby&&<button className="river-observe" onClick={()=>inspect(nearby)}>Observer · {nearby.title}</button>}
      </div>
      <div className="river-controls"><button onPointerDown={()=>setState(current=>moveAlongRiver(current,-6))}>← Remonter</button><button onPointerDown={()=>setState(current=>moveAlongRiver(current,6))}>Descendre →</button></div>
      {active&&<aside className="river-whisper"><span>{active.symbol}</span><div><strong>{active.title}</strong><p>{active.text}</p></div><button onClick={()=>setActive(null)}>Fermer</button></aside>}
      {ritualOpen&&<div className="river-ritual"><article><span className="kicker">Une question dans le courant</span><h2>Quand un souvenir relationnel revient, que fais-tu le plus naturellement ?</h2>{[
        "Je cherche ce qu’il peut encore m’apprendre.","Je le laisse passer sans essayer de le retenir.","Je ressens d’abord ce qu’il réveille en moi.","Je prends de la distance pour retrouver mon calme."
      ].map((text,index)=><button key={text} onClick={()=>{setState(current=>answerStoneRitual(current,index));setRitualOpen(false);setActive(landmarks[0])}}>{text}</button>)}<button className="river-ritual-skip" onClick={()=>setRitualOpen(false)}>Pas maintenant</button></article></div>}
      <footer className="river-game-footer"><p>{state.answeredStoneQuestion?"Le courant a changé légèrement. Le parcours relationnel peut continuer.":"La pierre claire garde encore une question."}</p><button className="primary" onClick={()=>onBegin(module)}>Continuer l’exploration relationnelle</button></footer>
    </section>
  </div>;
}
