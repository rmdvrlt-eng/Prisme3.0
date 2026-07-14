"use client";

import { useMemo, useState } from "react";
import { MemoryItem, PrismeModule } from "@/types/prisme";
import { WorldState } from "@/lib/world";
import { loadTerritoryVisits, moduleForTerritory, TerritoryDefinition, TerritoryId, territoryDefinitions, TerritoryVisitState, visitTerritory } from "@/lib/territory";
import { GardenGameplay } from "@/components/GardenGameplay";
import { RiverGameplay } from "@/components/RiverGameplay";
import { ForestGameplay } from "@/components/ForestGameplay";
import { TerritoryLandscape } from "@/components/TerritoryLandscape";
import { TerritoryRituals } from "@/components/TerritoryRituals";

function formatDate(date:string){return new Date(date).toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"})}

export function TerritoryEngine({world,memories,modules,onBegin}:{world:WorldState;memories:MemoryItem[];modules:PrismeModule[];onBegin:(module:PrismeModule)=>void}){
  const [selected,setSelected]=useState<TerritoryDefinition|null>(null);
  const [visits,setVisits]=useState<TerritoryVisitState>(()=>loadTerritoryVisits());
  const [gardenOpen,setGardenOpen]=useState(false);
  const [riverOpen,setRiverOpen]=useState(false);
  const [forestOpen,setForestOpen]=useState(false);
  const territoryMemories=useMemo(()=>selected?memories.filter(memory=>memory.territory===selected.id).slice(0,12):[],[selected,memories]);

  function enter(definition:TerritoryDefinition){
    if(!world.unlocked.includes(definition.id))return;
    setVisits(current=>visitTerritory(current,definition.id));
    setSelected(definition);
  }

  return <section className="territory-engine glass">
    <div className="territory-heading"><div><span className="kicker">Territory Engine 3.5</span><h2>Les huit territoires</h2><p>Chaque lieu rassemble une atmosphère, des souvenirs et un parcours différent.</p></div><span>{world.unlocked.length}/8 ouverts</span></div>
    <div className="territory-map">{territoryDefinitions.map((definition,index)=>{
      const open=world.unlocked.includes(definition.id);
      const value=world[definition.worldAxis] as number;
      return <button key={definition.id} className={`territory-gate ${open?"open":"sleeping"}`} onClick={()=>enter(definition)} style={{["--t1" as string]:definition.palette[0],["--t2" as string]:definition.palette[1],["--t3" as string]:definition.palette[2]}}>
        <span className="gate-index">{String(index+1).padStart(2,"0")}</span><i>{definition.symbol}</i><strong>{definition.title}</strong><small>{definition.subtitle}</small><div className="territory-meter"><b style={{width:`${value}%`}}/></div><em>{open?`${visits.visits[definition.id]??0} visite${(visits.visits[definition.id]??0)>1?"s":""}`:"En sommeil"}</em>
      </button>
    })}</div>

    {selected&&<div className="territory-overlay" role="dialog" aria-modal="true"><article className={`territory-visit territory-${selected.id}`} style={{["--t1" as string]:selected.palette[0],["--t2" as string]:selected.palette[1],["--t3" as string]:selected.palette[2]}}>
      <button className="territory-close" onClick={()=>setSelected(null)}>×</button>
      <div className="territory-scene territory-scene-real"><TerritoryLandscape id={selected.id} world={world}/><div className="territory-presence"/><span className="territory-symbol">{selected.symbol}</span></div>
      <div className="territory-copy"><span className="kicker">{selected.subtitle}</span><h1>{selected.title}</h1><p>{selected.description}</p><blockquote>{selected.invitation}</blockquote>
        <div className="territory-actions">{selected.id==="jardin"?<button className="primary" onClick={()=>setGardenOpen(true)}>Entrer dans le Jardin</button>:selected.id==="fleuve"?<button className="primary" onClick={()=>setRiverOpen(true)}>Suivre le Fleuve</button>:selected.id==="foret"?<button className="primary" onClick={()=>setForestOpen(true)}>Entrer dans la Forêt</button>:<button className="primary" onClick={()=>{const module=moduleForTerritory(modules,selected);if(module){setSelected(null);onBegin(module)}}}>Commencer l’exploration</button>}<span>{world[selected.worldAxis] as number}/100 · état symbolique</span></div>
      </div>
      <TerritoryRituals territory={selected.id} />
      <section className="territory-memory-list"><div><span className="kicker">Traces du lieu</span><h2>{territoryMemories.length?`${territoryMemories.length} souvenirs visibles`:"Le lieu attend ses premières traces"}</h2></div>{territoryMemories.length?<div className="territory-memory-grid">{territoryMemories.map(memory=><article key={memory.id}><b>{memory.kind==="journal"?"✤":memory.kind==="report"?"◇":"✦"}</b><div><strong>{memory.title}</strong><small>{formatDate(memory.createdAt)}</small>{memory.body&&<p>{memory.body}</p>}</div></article>)}</div>:<p>Les entrées du journal, rapports et créations liés à ce territoire apparaîtront ici.</p>}</section>
    </article></div>}
    {gardenOpen&&selected?.id==="jardin"&&<GardenGameplay module={moduleForTerritory(modules,selected)!} onBegin={(module)=>{setGardenOpen(false);setSelected(null);onBegin(module)}} onClose={()=>setGardenOpen(false)}/>}
    {riverOpen&&selected?.id==="fleuve"&&<RiverGameplay module={moduleForTerritory(modules,selected)!} memories={memories} onBegin={(module)=>{setRiverOpen(false);setSelected(null);onBegin(module)}} onClose={()=>setRiverOpen(false)}/>}
    {forestOpen&&selected?.id==="foret"&&<ForestGameplay module={moduleForTerritory(modules,selected)!} memories={memories} onBegin={(module)=>{setForestOpen(false);setSelected(null);onBegin(module)}} onClose={()=>setForestOpen(false)}/>} 
  </section>
}
