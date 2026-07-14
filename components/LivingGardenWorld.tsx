"use client";
import { useEffect, useMemo, useState } from "react";
import { careForPlant, GardenCareAction, gardenCare, harvestPlant, LivingGardenState, loadLivingGarden, PlantCategory, plantSeed, plantSpecies, plantStage, saveLivingGarden } from "@/lib/livingGarden";

export function LivingGardenWorld({onClose}:{onClose?:()=>void}){
  const [garden,setGarden]=useState<LivingGardenState|null>(null);
  const [selectedPlant,setSelectedPlant]=useState<string|null>(null);
  const [speciesId,setSpeciesId]=useState("rose");
  const [intention,setIntention]=useState("");
  const [planting,setPlanting]=useState(false);
  const [ritual,setRitual]=useState<GardenCareAction|null>(null);
  const [ritualRunning,setRitualRunning]=useState(false);
  const [seconds,setSeconds]=useState(60);
  const [message,setMessage]=useState("");
  const [category,setCategory]=useState<PlantCategory | "all">("all");

  useEffect(()=>{const loaded=loadLivingGarden();setGarden(loaded);setSelectedPlant(loaded.plants[0]?.id??null)},[]);
  useEffect(()=>{if(garden)saveLivingGarden(garden)},[garden]);
  useEffect(()=>{
    if(!ritualRunning)return;
    const timer=window.setInterval(()=>setSeconds(value=>value<=1?0:value-1),1000);
    return()=>window.clearInterval(timer);
  },[ritualRunning]);

  const selected=useMemo(()=>garden?.plants.find(item=>item.id===selectedPlant)??null,[garden,selectedPlant]);
  if(!garden)return null;
  const currentGarden = garden;

  function plant(){
    if(!intention.trim()){setMessage("Écris une intention avant de planter.");return}
    const next=plantSeed(currentGarden,speciesId,intention);setGarden(next);setSelectedPlant(next.plants.at(-1)?.id??null);setPlanting(false);setIntention("");setMessage("La terre a accueilli une nouvelle graine.");
  }
  function beginCare(action:GardenCareAction){setRitual(action);setSeconds(gardenCare[action].seconds);setRitualRunning(false)}
  function completeCare(){
    if(!selected||!ritual)return;
    const next=careForPlant(currentGarden,selected.id,ritual);setGarden(next);setRitual(null);setRitualRunning(false);setMessage(`${gardenCare[ritual].label} a transformé le Jardin.`);
    window.dispatchEvent(new CustomEvent("prisme:garden-updated",{detail:{garden:next,action:ritual}}));
  }
  function harvest(){if(!selected)return;const next=harvestPlant(currentGarden,selected.id);setGarden(next);setMessage("La récolte te rend aussi une graine à replanter.")}

  const width=Math.max(100,70+garden.plants.length*14);
  const visibleSpecies=category==="all"?plantSpecies:plantSpecies.filter(species=>species.category===category);
  return <section className="living-garden-world" style={{["--garden-width" as string]:`${width}vw`,["--garden-clarity" as string]:garden.clarity/100}}>
    <header className="living-garden-header"><div><span>Le Jardin vivant</span><h2>Chaque soin laisse une trace.</h2></div><div className="garden-stats"><i>Sol {Math.round(garden.soil)}%</i><i>Clarté {Math.round(garden.clarity)}%</i><i>Harmonie {Math.round(garden.harmony)}%</i><i>{garden.plants.length} plantes</i></div>{onClose&&<button onClick={onClose}>×</button>}</header>

    <div className="infinite-garden-scroll">
      <div className="infinite-garden-land" style={{width:`${width}vw`}}>
        <div className="garden-fog"/><div className="garden-waterline"/><div className="garden-soil-depth"/>
        {garden.plants.map((plant,index)=>{
          const species=plantSpecies.find(item=>item.id===plant.speciesId)!;const stage=plantStage(plant.growth);
          return <button key={plant.id} className={`garden-plant-node stage-${stage} ${selectedPlant===plant.id?"selected":""}`} style={{left:`${5+index*12}%`,bottom:`${12+plant.lane*9}%`,["--bloom" as string]:species.bloomColor,["--secondary" as string]:species.secondaryColor}} onClick={()=>setSelectedPlant(plant.id)}>
            <span className="garden-plant-shadow"/><span className="garden-plant-stem"/><span className="garden-plant-leaves"><i/><i/><i/></span><span className="garden-plant-bloom">{species.symbol}</span><small>{species.name}<b>{Math.round(plant.growth)}%</b></small>
          </button>;
        })}
        <button className="garden-new-plot" style={{left:`${7+garden.plants.length*12}%`}} onClick={()=>setPlanting(true)}>＋<span>Planter</span></button>
      </div>
    </div>

    <div className="garden-control-dock">
      {selected?<><div className="selected-plant-card"><span>{plantSpecies.find(item=>item.id===selected.speciesId)?.symbol}</span><div><strong>{selected.intention}</strong><small>{plantSpecies.find(item=>item.id===selected.speciesId)?.name} · vitalité {Math.round(selected.vitality)}% · eau {Math.round(selected.water)}%</small></div>{selected.growth>=100&&<button onClick={harvest}>Récolter</button>}</div>
      <div className="garden-care-actions">{(Object.keys(gardenCare) as GardenCareAction[]).map(action=><button key={action} onClick={()=>beginCare(action)}><b>{gardenCare[action].label}</b><small>{gardenCare[action].duration}</small></button>)}</div></>:<p>Plante une graine pour commencer à cultiver ton monde.</p>}
    </div>

    {planting&&<div className="garden-modal"><section><button className="garden-modal-close" onClick={()=>setPlanting(false)}>×</button><span>Choisir une graine</span><h3>Que souhaites-tu cultiver ?</h3><div className="seed-category-filter">{(["all","flower","vine","fruit","vegetable","herb","tree"] as const).map(item=><button key={item} className={category===item?"active":""} onClick={()=>setCategory(item)}>{item==="all"?"Toutes":item==="flower"?"Fleurs":item==="vine"?"Grimpantes":item==="fruit"?"Fruits":item==="vegetable"?"Potager":item==="herb"?"Aromatiques":"Arbres"}</button>)}</div><div className="seed-catalog">{visibleSpecies.map(species=><button key={species.id} disabled={(garden.seeds[species.id]??0)<=0} className={speciesId===species.id?"active":""} onClick={()=>setSpeciesId(species.id)}><i style={{background:species.bloomColor}}>{species.symbol}</i><strong>{species.name}</strong><small>{species.category} · {garden.seeds[species.id]??0} graines</small></button>)}</div><textarea value={intention} onChange={event=>setIntention(event.target.value)} placeholder="L’intention portée par cette plante…"/><button className="garden-confirm" onClick={plant}>Planter cette graine</button></section></div>}

    {ritual&&<div className="garden-modal ritual-modal"><section><button className="garden-modal-close" onClick={()=>{setRitual(null);setRitualRunning(false)}}>×</button><span>Soin conscient</span><h3>{gardenCare[ritual].label}</h3><p>{gardenCare[ritual].prompt}</p><div className={`ritual-orb ${ritualRunning?"running":""}`}><b>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,"0")}</b></div>{!ritualRunning?<button className="garden-confirm" onClick={()=>setRitualRunning(true)}>Commencer</button>:seconds>0?<button className="garden-confirm" onClick={completeCare}>J’ai terminé en conscience</button>:<button className="garden-confirm" onClick={completeCare}>Nourrir la plante</button>}</section></div>}
    {message&&<div className="garden-world-toast" onAnimationEnd={()=>setMessage("")}>{message}</div>}
  </section>
}
