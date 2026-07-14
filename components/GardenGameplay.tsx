"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PrismeModule } from "@/types/prisme";
import { answerTreeRitual, discoverGardenObject, enterGarden, GardenState, loadGardenState, saveGardenState } from "@/lib/garden";

const hotspots = [
  { id: "tree", label: "L’Arbre ancien", x: 51, y: 30, symbol: "♧", text: "Ses branches gardent les questions qui demandent du temps." },
  { id: "pond", label: "Le bassin", x: 23, y: 56, symbol: "◌", text: "L’eau ne répond pas. Elle reflète seulement ce qui est déjà là." },
  { id: "flowers", label: "Les fleurs", x: 76, y: 61, symbol: "✤", text: "Certaines émotions ont besoin d’espace avant d’avoir un nom." },
  { id: "lantern", label: "La lanterne", x: 69, y: 36, symbol: "✦", text: "Une petite lumière suffit parfois à rendre le chemin visible." }
];

function distance(a:{x:number;y:number},b:{x:number;y:number}){
  return Math.hypot(a.x-b.x,a.y-b.y);
}

export function GardenGameplay({ module, onBegin, onClose }:{module:PrismeModule;onBegin:(module:PrismeModule)=>void;onClose:()=>void}){
  const [state,setState]=useState<GardenState>(()=>loadGardenState());
  const [active,setActive]=useState<(typeof hotspots)[number]|null>(null);
  const [ritualOpen,setRitualOpen]=useState(false);
  const keys=useRef(new Set<string>());
  const drag=useRef<{x:number;y:number}|null>(null);

  useEffect(()=>{ setState(current=>enterGarden(current)); },[]);

  useEffect(()=>{
    function down(event:KeyboardEvent){
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(event.key)){event.preventDefault();keys.current.add(event.key.toLowerCase())}
    }
    function up(event:KeyboardEvent){keys.current.delete(event.key.toLowerCase())}
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    let frame=0;
    const tick=()=>{
      setState(current=>{
        let dx=0,dy=0;
        if(keys.current.has("arrowleft")||keys.current.has("a"))dx-=.55;
        if(keys.current.has("arrowright")||keys.current.has("d"))dx+=.55;
        if(keys.current.has("arrowup")||keys.current.has("w"))dy-=.55;
        if(keys.current.has("arrowdown")||keys.current.has("s"))dy+=.55;
        if(!dx&&!dy)return current;
        const next={...current,x:Math.max(6,Math.min(94,current.x+dx)),y:Math.max(15,Math.min(89,current.y+dy)),updatedAt:new Date().toISOString()};
        saveGardenState(next);return next;
      });
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up)};
  },[]);

  const nearby=useMemo(()=>hotspots.find(item=>distance(state,item)<11)??null,[state.x,state.y]);
  const discovered=new Set(state.discoveries);

  function interact(item:(typeof hotspots)[number]){
    setState(current=>discoverGardenObject(current,item.id));
    setActive(item);
    if(item.id==="tree"&&!state.answeredTreeQuestion)setRitualOpen(true);
  }

  function move(dx:number,dy:number){
    setState(current=>{
      const next={...current,x:Math.max(6,Math.min(94,current.x+dx)),y:Math.max(15,Math.min(89,current.y+dy)),updatedAt:new Date().toISOString()};
      saveGardenState(next);return next;
    });
  }

  const flowerCount=Math.max(5,Math.round(state.growth/7));

  return <div className="garden-game-overlay" role="dialog" aria-modal="true">
    <section className="garden-game">
      <header className="garden-game-head"><div><span className="kicker">Garden Gameplay Engine 3.1</span><h1>Le Jardin</h1><p>Déplace-toi avec les flèches ou les commandes tactiles. Approche-toi d’un élément pour l’écouter.</p></div><button onClick={onClose}>×</button></header>
      <div className="garden-hud"><span>Croissance <b>{state.growth}%</b></span><span>Eau <b>{state.water}%</b></span><span>Lumière <b>{state.light}%</b></span><span>Découvertes <b>{state.discoveries.length}/4</b></span></div>
      <div className="garden-world" style={{["--garden-growth" as string]:state.growth/100,["--garden-water" as string]:state.water/100,["--garden-light" as string]:state.light/100}}
        onPointerDown={(event)=>{if((event.target as HTMLElement).closest("button"))return;drag.current={x:event.clientX,y:event.clientY};(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)}}
        onPointerMove={(event)=>{if(!drag.current)return;const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;if(Math.abs(dx)+Math.abs(dy)<7)return;move(dx*.055,dy*.055);drag.current={x:event.clientX,y:event.clientY}}}
        onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
        <div className="garden-sky"/><div className="garden-hills hill-a"/><div className="garden-hills hill-b"/><div className="garden-path-main"/><div className="garden-pond"/>
        <div className="garden-tree"><i/><i/><i/><b/></div>
        <div className="garden-flower-field">{Array.from({length:flowerCount}).map((_,i)=><i key={i} style={{left:`${61+(i*13)%29}%`,top:`${57+(i*17)%25}%`,animationDelay:`-${i*.32}s`}}/>)}</div>
        <div className="garden-lantern"><i/></div>
        {hotspots.map(item=><button key={item.id} className={`garden-hotspot ${discovered.has(item.id)?"discovered":""} ${nearby?.id===item.id?"near":""}`} style={{left:`${item.x}%`,top:`${item.y}%`}} onClick={()=>interact(item)} aria-label={item.label}><span>{item.symbol}</span></button>)}
        <div className="garden-player" style={{left:`${state.x}%`,top:`${state.y}%`}}><i/><b/></div>
        {nearby&&<button className="garden-interact" onClick={()=>interact(nearby)}>Observer · {nearby.label}</button>}
      </div>
      <div className="garden-controls"><button onPointerDown={()=>move(0,-4)}>↑</button><div><button onPointerDown={()=>move(-4,0)}>←</button><button onPointerDown={()=>move(0,4)}>↓</button><button onPointerDown={()=>move(4,0)}>→</button></div></div>
      {active&&<aside className="garden-whisper"><span>{active.symbol}</span><div><strong>{active.label}</strong><p>{active.text}</p></div><button onClick={()=>setActive(null)}>Fermer</button></aside>}
      {ritualOpen&&<div className="garden-ritual"><article><span className="kicker">Une question dans les branches</span><h2>Quand une émotion importante arrive, que fais-tu le plus naturellement ?</h2>{[
        "Je lui donne une forme : mots, musique ou image.",
        "Je la laisse circuler avant de chercher à la comprendre.",
        "Je cherche immédiatement ce qu’elle veut me montrer.",
        "Je prends de la distance pour ne pas être submergé."
      ].map((text,index)=><button key={text} onClick={()=>{setState(current=>answerTreeRitual(current,index));setRitualOpen(false);setActive(hotspots[0])}}>{text}</button>)}<button className="garden-ritual-skip" onClick={()=>setRitualOpen(false)}>Pas maintenant</button></article></div>}
      <footer className="garden-game-footer"><p>{state.answeredTreeQuestion?"L’arbre a changé. Le parcours complet peut maintenant continuer dans le Jardin.":"L’arbre ancien garde encore une question."}</p><button className="primary" onClick={()=>onBegin(module)}>Continuer l’exploration psychologique</button></footer>
    </section>
  </div>
}
