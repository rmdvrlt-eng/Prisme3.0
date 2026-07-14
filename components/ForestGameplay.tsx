"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MemoryItem, PrismeModule } from "@/types/prisme";
import { answerPathRitual, discoverForestPlace, enterForest, ForestState, loadForestState, moveInForest } from "@/lib/forest";

const places = [
  { id: "clearing", x: 24, y: 42, symbol: "◌", title: "La clairière", text: "Un rythme n’est pas toujours une cadence. Parfois, c’est l’espace laissé entre deux gestes." },
  { id: "stones", x: 49, y: 31, symbol: "◇", title: "Les pierres du sentier", text: "Les habitudes deviennent visibles lorsqu’on regarde les pas qui se répètent." },
  { id: "grove", x: 76, y: 47, symbol: "♧", title: "Le bosquet", text: "Ce qui pousse lentement peut devenir plus solide que ce qui commence dans l’urgence." },
  { id: "cabin", x: 68, y: 72, symbol: "⌂", title: "La cabane", text: "Le repos n’interrompt pas le chemin. Il lui rend parfois sa direction." }
];

function distance(a:{x:number;y:number},b:{x:number;y:number}){return Math.hypot(a.x-b.x,a.y-b.y)}

export function ForestGameplay({module,memories,onBegin,onClose}:{module:PrismeModule;memories:MemoryItem[];onBegin:(module:PrismeModule)=>void;onClose:()=>void}){
  const [state,setState]=useState<ForestState>(()=>loadForestState());
  const [active,setActive]=useState<(typeof places)[number]|null>(null);
  const [ritualOpen,setRitualOpen]=useState(false);
  const keys=useRef(new Set<string>());
  const drag=useRef<{x:number;y:number}|null>(null);

  useEffect(()=>{setState(current=>enterForest(current));},[]);
  useEffect(()=>{
    const down=(event:KeyboardEvent)=>{if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(event.key)){event.preventDefault();keys.current.add(event.key.toLowerCase())}};
    const up=(event:KeyboardEvent)=>keys.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown",down);window.addEventListener("keyup",up);
    let frame=0;
    const tick=()=>{setState(current=>{let dx=0,dy=0;if(keys.current.has("arrowleft")||keys.current.has("a"))dx-=.48;if(keys.current.has("arrowright")||keys.current.has("d"))dx+=.48;if(keys.current.has("arrowup")||keys.current.has("w"))dy-=.48;if(keys.current.has("arrowdown")||keys.current.has("s"))dy+=.48;return dx||dy?moveInForest(current,dx,dy):current});frame=requestAnimationFrame(tick)};
    frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("keydown",down);window.removeEventListener("keyup",up)};
  },[]);

  const nearby=useMemo(()=>places.find(place=>distance(state,place)<10)??null,[state.x,state.y]);
  const forestMemories=memories.filter(memory=>memory.territory==="foret").slice(0,7);
  const discovered=new Set(state.discoveries);
  const treeCount=Math.max(18,Math.round(26+state.rhythm/3));

  function inspect(place:(typeof places)[number]){setState(current=>discoverForestPlace(current,place.id));setActive(place);if(place.id==="stones"&&!state.answeredPathQuestion)setRitualOpen(true)}
  function move(dx:number,dy:number){setState(current=>moveInForest(current,dx,dy))}

  return <div className="forest-game-overlay" role="dialog" aria-modal="true">
    <section className="forest-game">
      <header className="forest-game-head"><div><span className="kicker">Forest Gameplay Engine 3.3</span><h1>La Forêt</h1><p>Glisse le paysage pour avancer entre les sentiers. La Forêt observe les rythmes, jamais la performance.</p></div><button onClick={onClose}>×</button></header>
      <div className="forest-hud"><span>Rythme <b>{state.rhythm}%</b></span><span>Sentier <b>{state.pathClarity}%</b></span><span>Repos <b>{state.rest}%</b></span><span>Traces <b>{state.discoveries.length}/4</b></span></div>
      <div className="forest-world" style={{["--forest-rhythm" as string]:state.rhythm/100,["--forest-clarity" as string]:state.pathClarity/100,["--forest-rest" as string]:state.rest/100}}
        onPointerDown={(event)=>{if((event.target as HTMLElement).closest("button"))return;drag.current={x:event.clientX,y:event.clientY};(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)}}
        onPointerMove={(event)=>{if(!drag.current)return;const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;if(Math.abs(dx)+Math.abs(dy)<8)return;move(dx*.05,dy*.05);drag.current={x:event.clientX,y:event.clientY}}}
        onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}>
        <div className="forest-sky"/><div className="forest-mist"/><div className="forest-floor"/><div className="forest-path"/>
        <div className="forest-trees">{Array.from({length:treeCount}).map((_,i)=><i key={i} style={{left:`${2+(i*17)%96}%`,top:`${13+(i*29)%66}%`,height:`${88+(i%6)*18}px`,animationDelay:`-${i*.13}s`}}/>)}</div>
        <div className="forest-fireflies">{Array.from({length:10}).map((_,i)=><i key={i} style={{left:`${12+(i*19)%78}%`,top:`${18+(i*23)%60}%`,animationDelay:`-${i*.45}s`}}/>)}</div>
        {forestMemories.map((memory,index)=><button className="forest-memory" key={memory.id} style={{left:`${15+(index*13)%72}%`,top:`${24+(index%4)*14}%`}} title={memory.title}><span>{memory.kind==="journal"?"✤":memory.kind==="report"?"◇":"✦"}</span></button>)}
        {places.map(place=><button key={place.id} className={`forest-place ${discovered.has(place.id)?"discovered":""} ${nearby?.id===place.id?"near":""}`} style={{left:`${place.x}%`,top:`${place.y}%`}} onClick={()=>inspect(place)}><span>{place.symbol}</span></button>)}
        <div className="forest-traveler" style={{left:`${state.x}%`,top:`${state.y}%`}}><i/><b/></div>
        {nearby&&<button className="forest-observe" onClick={()=>inspect(nearby)}>Observer · {nearby.title}</button>}
      </div>
      <div className="forest-controls"><button onPointerDown={()=>move(0,-5)}>↑</button><div><button onPointerDown={()=>move(-5,0)}>←</button><button onPointerDown={()=>move(0,5)}>↓</button><button onPointerDown={()=>move(5,0)}>→</button></div></div>
      {active&&<aside className="forest-whisper"><span>{active.symbol}</span><div><strong>{active.title}</strong><p>{active.text}</p></div><button onClick={()=>setActive(null)}>Fermer</button></aside>}
      {ritualOpen&&<div className="forest-ritual"><article><span className="kicker">Une question sur le sentier</span><h2>Quand tu veux installer une nouvelle habitude, qu’est-ce qui t’aide le plus ?</h2>{[
        "Un rythme simple et régulier.","Une structure claire avec des étapes.","Commencer très doucement sans pression.","Relier l’habitude à quelque chose qui a du sens."
      ].map((text,index)=><button key={text} onClick={()=>{setState(current=>answerPathRitual(current,index));setRitualOpen(false);setActive(places[1])}}>{text}</button>)}<button className="forest-ritual-skip" onClick={()=>setRitualOpen(false)}>Pas maintenant</button></article></div>}
      <footer className="forest-game-footer"><p>{state.answeredPathQuestion?"Un sentier est devenu plus lisible. Le parcours du quotidien peut continuer.":"Les pierres du sentier gardent encore une question."}</p><button className="primary" onClick={()=>onBegin(module)}>Continuer l’exploration du quotidien</button></footer>
    </section>
  </div>;
}
