"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { TerritoryId } from "@/lib/territory";
import { WorldState } from "@/lib/world";
import { EvolvingCompanion } from "@/components/EvolvingCompanion";
import { InteractiveAnimal } from "@/components/InteractiveAnimal";
import { PlayableCharacter, CharacterDirection } from "@/components/PlayableCharacter";
import { Report } from "@/types/prisme";

export type WorldDestination = "world" | "house" | TerritoryId;

type PointOfInterest={id:string;x:number;y:number;label:string;action:string};
type Passage={id:string;x:number;y:number;label:string;destination:WorldDestination;note:string};

const hotspots: Record<TerritoryId, PointOfInterest[]> = {
  jardin:[
    {id:"tree",x:28,y:48,label:"L’Arbre des intentions",action:"Planter une graine"},
    {id:"pond",x:68,y:62,label:"Le bassin",action:"Respirer avec l’eau"},
    {id:"flowers",x:46,y:78,label:"Les fleurs",action:"Nommer une gratitude"},
  ],
  foret:[
    {id:"cabin",x:74,y:43,label:"La cabane",action:"Prendre une pause"},
    {id:"stones",x:43,y:69,label:"Le sentier",action:"Choisir un petit pas"},
    {id:"clearing",x:20,y:58,label:"La clairière",action:"S’ancrer"},
  ],
  fleuve:[
    {id:"boat",x:64,y:58,label:"La barque",action:"Laisser partir"},
    {id:"stone",x:31,y:68,label:"La pierre claire",action:"Déposer un souvenir"},
    {id:"reeds",x:82,y:74,label:"Les roseaux",action:"Écouter le courant"},
  ],
  observatoire:[
    {id:"telescope",x:66,y:42,label:"Le télescope",action:"Prendre du recul"},
    {id:"dome",x:35,y:58,label:"La coupole",action:"Observer une pensée"},
    {id:"star",x:78,y:24,label:"La constellation",action:"Choisir une direction"},
  ],
  sommets:[
    {id:"summit",x:69,y:31,label:"Le sommet",action:"Nommer l’essentiel"},
    {id:"cairn",x:34,y:67,label:"Le cairn",action:"Déposer une charge"},
    {id:"ledge",x:79,y:72,label:"Le promontoire",action:"Faire silence"},
  ],
  temple:[
    {id:"altar",x:52,y:42,label:"L’autel",action:"Choisir une valeur"},
    {id:"pool",x:30,y:72,label:"Le bassin",action:"Regarder son reflet"},
    {id:"archive",x:77,y:62,label:"Les archives",action:"Ouvrir un souvenir"},
  ],
  volcan:[
    {id:"crater",x:56,y:32,label:"Le cratère",action:"Nommer l’énergie"},
    {id:"forge",x:27,y:68,label:"La forge",action:"Transformer une tension"},
    {id:"obsidian",x:78,y:71,label:"L’obsidienne",action:"Choisir une limite"},
  ],
  ciel:[
    {id:"island",x:50,y:56,label:"L’île des possibles",action:"Créer librement"},
    {id:"comet",x:78,y:24,label:"La comète",action:"Formuler un souhait"},
    {id:"constellation",x:24,y:34,label:"La constellation",action:"Relier des idées"},
  ],
};

const passages:Record<TerritoryId,Passage[]>={
  jardin:[
    {id:"to-house",x:8,y:79,label:"Le chemin de la Maison",destination:"house",note:"Rentrer au refuge"},
    {id:"to-forest",x:93,y:54,label:"Le sentier sous les arbres",destination:"foret",note:"Continuer vers la Forêt"},
    {id:"to-river",x:72,y:89,label:"La rive basse",destination:"fleuve",note:"Descendre vers le ruisseau"},
  ],
  foret:[
    {id:"to-garden",x:7,y:76,label:"La clairière du Jardin",destination:"jardin",note:"Revenir vers les fleurs"},
    {id:"to-river",x:93,y:72,label:"Le sentier humide",destination:"fleuve",note:"Rejoindre le courant"},
    {id:"to-house",x:49,y:90,label:"Le chemin des lanternes",destination:"house",note:"Rentrer à la Maison"},
  ],
  fleuve:[
    {id:"to-garden",x:8,y:72,label:"Le petit pont",destination:"jardin",note:"Remonter vers le Jardin"},
    {id:"to-forest",x:93,y:66,label:"La rive boisée",destination:"foret",note:"Entrer dans la Forêt"},
    {id:"to-house",x:49,y:90,label:"Le chemin du refuge",destination:"house",note:"Rentrer à la Maison"},
  ],
  observatoire:[
    {id:"to-summits",x:90,y:76,label:"La crête",destination:"sommets",note:"Suivre la ligne des Sommets"},
    {id:"to-world",x:9,y:82,label:"Le sentier du Monde",destination:"world",note:"Redescendre vers la vallée"},
  ],
  sommets:[
    {id:"to-observatory",x:90,y:75,label:"La voie des étoiles",destination:"observatoire",note:"Rejoindre l’Observatoire"},
    {id:"to-world",x:8,y:84,label:"Le chemin de descente",destination:"world",note:"Revenir dans la vallée"},
  ],
  temple:[
    {id:"to-world",x:10,y:84,label:"Le parvis",destination:"world",note:"Retourner dans le Monde"},
    {id:"to-sky",x:90,y:72,label:"L’escalier de lumière",destination:"ciel",note:"Monter vers le Ciel"},
  ],
  volcan:[
    {id:"to-world",x:8,y:84,label:"Le sentier refroidi",destination:"world",note:"Quitter les terres de feu"},
    {id:"to-temple",x:92,y:75,label:"Le chemin d’obsidienne",destination:"temple",note:"Transformer l’énergie en sens"},
  ],
  ciel:[
    {id:"to-temple",x:8,y:78,label:"La passerelle des valeurs",destination:"temple",note:"Redescendre vers le Temple"},
    {id:"to-world",x:91,y:82,label:"La porte des nuages",destination:"world",note:"Revenir dans le Monde"},
  ],
};

const animalPositions: Record<TerritoryId, {x:number;y:number}> = {
  jardin:{x:83,y:76}, foret:{x:84,y:69}, fleuve:{x:81,y:68}, observatoire:{x:84,y:38},
  sommets:{x:84,y:72}, temple:{x:82,y:71}, volcan:{x:82,y:73}, ciel:{x:82,y:38},
};

function clamp(value:number,min:number,max:number){return Math.max(min,Math.min(max,value));}

export function PlayableTerritoryWorld({
  id,world,report,onInteract,onTravel
}:{
  id:TerritoryId;
  world:WorldState;
  report:Report|null;
  onInteract:(hotspotId:string)=>void;
  onTravel:(destination:WorldDestination)=>void;
}){
  const sceneRef=useRef<HTMLDivElement|null>(null);
  const restTimer=useRef<number|null>(null);
  const [position,setPosition]=useState({x:50,y:78});
  const [moving,setMoving]=useState(false);
  const [direction,setDirection]=useState<CharacterDirection>("front");
  const [resting,setResting]=useState(false);
  const [nearby,setNearby]=useState<string|null>(null);
  const [nearbyPassage,setNearbyPassage]=useState<string|null>(null);
  const [feedback,setFeedback]=useState<string|null>(null);
  const points=hotspots[id];
  const routes=passages[id];
  const animalPosition=animalPositions[id];

  useEffect(()=>{
    const raw=localStorage.getItem(`prisme.player.${id}`);
    if(raw){try{setPosition(JSON.parse(raw));}catch{}}
  },[id]);

  useEffect(()=>{
    localStorage.setItem(`prisme.player.${id}`,JSON.stringify(position));
    let closest:{id:string;distance:number}|null=null;
    for(const point of points){
      const distance=Math.hypot(point.x-position.x,point.y-position.y);
      if(!closest||distance<closest.distance)closest={id:point.id,distance};
    }
    setNearby(closest&&closest.distance<13?closest.id:null);
    let closestRoute:{id:string;distance:number}|null=null;
    for(const route of routes){
      const distance=Math.hypot(route.x-position.x,route.y-position.y);
      if(!closestRoute||distance<closestRoute.distance)closestRoute={id:route.id,distance};
    }
    setNearbyPassage(closestRoute&&closestRoute.distance<14?closestRoute.id:null);
    if(restTimer.current)window.clearTimeout(restTimer.current);
    restTimer.current=window.setTimeout(()=>setResting(true),4800);
    return()=>{if(restTimer.current)window.clearTimeout(restTimer.current)};
  },[position,points,routes,id]);

  const current=useMemo(()=>points.find(point=>point.id===nearby)??null,[nearby,points]);
  const currentPassage=useMemo(()=>routes.find(route=>route.id===nearbyPassage)??null,[nearbyPassage,routes]);
  const animalNearby=Math.hypot(animalPosition.x-position.x,animalPosition.y-position.y)<17;

  function move(event:PointerEvent<HTMLDivElement>){
    if((event.target as HTMLElement).closest("button"))return;
    const rect=sceneRef.current?.getBoundingClientRect();if(!rect)return;
    const x=clamp(((event.clientX-rect.left)/rect.width)*100,7,93);
    const y=clamp(((event.clientY-rect.top)/rect.height)*100,27,91);
    const dx=x-position.x,dy=y-position.y;
    if(Math.abs(dx)>Math.abs(dy))setDirection(dx<0?"left":"right");
    else setDirection(dy<0?"back":"front");
    setResting(false);setMoving(true);setPosition({x,y});
    window.setTimeout(()=>setMoving(false),650);
  }

  function approachPassage(route:Passage){
    setPosition({x:route.x,y:route.y});
    setMoving(true);
    setFeedback(route.note);
    window.setTimeout(()=>onTravel(route.destination),620);
  }

  function handleAnimalAction(action:"feed"|"brush"|"play"){
    const labels={feed:"Tu lui offres de quoi se nourrir.",brush:"Tu prends soin de son pelage.",play:"Vous partagez un moment de jeu."};
    setFeedback(labels[action]);
    window.setTimeout(()=>setFeedback(null),2600);
  }

  return <div ref={sceneRef} className={`playable-world playable-${id}`} onPointerDown={move}>
    <div className="playable-depth" aria-hidden="true"><i/><i/><i/></div>
    {points.map(point=><button key={point.id} className={`world-hotspot hotspot-${point.id}${nearby===point.id?" nearby":""}`} style={{left:`${point.x}%`,top:`${point.y}%`}} onClick={()=>onInteract(point.id)}><i/><span>{point.label}</span></button>)}
    {routes.map(route=><button key={route.id} className={`world-passage passage-${route.id}${nearbyPassage===route.id?" nearby":""}`} style={{left:`${route.x}%`,top:`${route.y}%`}} onClick={()=>approachPassage(route)} aria-label={route.note}><i/><span>{route.label}</span><small>{route.note}</small></button>)}

    <div className="playable-avatar" style={{left:`${position.x}%`,top:`${position.y}%`}}>
      <PlayableCharacter moving={moving} direction={direction} resting={resting}/>
    </div>
    <div className="playable-following-companion" style={{left:`calc(${position.x}% + ${direction==="left"?-42:42}px)`,top:`calc(${position.y}% - 70px)`}}><EvolvingCompanion world={world} report={report}/></div>
    <div className="territory-animal-wrap" style={{left:`${animalPosition.x}%`,top:`${animalPosition.y}%`}}>
      <InteractiveAnimal territory={id} nearby={animalNearby} onAction={handleAnimalAction}/>
    </div>

    {current&&<button className="nearby-action" onClick={()=>onInteract(current.id)}><small>{current.label}</small><strong>{current.action}</strong><span>Toucher pour interagir</span></button>}
    {!current&&currentPassage&&<button className="nearby-action passage-action" onClick={()=>approachPassage(currentPassage)}><small>{currentPassage.label}</small><strong>{currentPassage.note}</strong><span>Continuer le chemin</span></button>}
    {animalNearby&&!current&&!currentPassage&&<div className="animal-nearby-hint">Ton compagnon animal te remarque.</div>}
    {feedback&&<div className="world-feedback">{feedback}</div>}
    <div className="movement-hint">Touche le paysage pour marcher · approche un chemin pour changer de lieu</div>
  </div>;
}
