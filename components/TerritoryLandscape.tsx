"use client";

import { TerritoryId } from "@/lib/territory";
import { WorldState } from "@/lib/world";

function GardenScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-garden" style={{["--growth" as string]:world.garden/100}}>
    <div className="territory-sky"/><div className="garden-sunbeam"/>
    <div className="garden-hill garden-hill-back"/><div className="garden-hill garden-hill-front"/>
    <div className="garden-stream"><i/><i/><i/></div>
    <div className="garden-meadow">{Array.from({length:28}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="garden-flowers">{Array.from({length:18}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="garden-tree"><i className="trunk"/><i className="branch b1"/><i className="branch b2"/><i className="crown c1"/><i className="crown c2"/><i className="crown c3"/></div>
    <div className="garden-butterflies">{Array.from({length:5}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
  </div>
}

function ForestScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-forest" style={{["--wild" as string]:world.wildness/100}}>
    <div className="forest-light"/><div className="forest-mist-layer"/>
    <div className="forest-depth forest-depth-back">{Array.from({length:14}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="forest-depth forest-depth-mid">{Array.from({length:11}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="forest-path-real"/>
    <div className="forest-ferns">{Array.from({length:20}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="forest-fireflies">{Array.from({length:24}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="forest-cabin"><i className="roof"/><i className="wall"/><i className="window"/><i className="door"/></div>
  </div>
}

function RiverScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-river" style={{["--flow" as string]:world.river/100}}>
    <div className="river-sky"/><div className="river-mountain rm1"/><div className="river-mountain rm2"/>
    <div className="river-water-real"><i/><i/><i/><i/><span className="river-reflection"/></div>
    <div className="river-bank bank-left"/><div className="river-bank bank-right"/>
    <div className="river-reeds">{Array.from({length:18}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="river-stones">{Array.from({length:7}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="river-boat"><i className="hull"/><i className="mast"/><i className="sail"/></div>
  </div>
}

function MountainsScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-mountains" style={{["--mount" as string]:world.mountain/100}}>
    <div className="mountain-sky"/><div className="mountain-sun"/>
    <div className="peak peak-back"/><div className="peak peak-mid"/><div className="peak peak-front"/>
    <div className="snowfield"/><div className="mountain-cloud mc1"/><div className="mountain-cloud mc2"/>
    <div className="summit-path"/><div className="summit-beacon"/>
  </div>
}

function ObservatoryScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-observatory" style={{["--clarity" as string]:(100-world.mist)/100}}>
    <div className="observatory-sky">{Array.from({length:42}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="observatory-dome"><i className="base"/><i className="dome"/><i className="slit"/></div>
    <div className="observatory-ridge"/><div className="constellation-lines"><i/><i/><i/><i/></div>
    <div className="telescope"><i className="tube"/><i className="tripod"/></div>
  </div>
}

function TempleScene(){
  return <div className="territory-visual territory-visual-temple">
    <div className="temple-sky"/><div className="temple-mist"/>
    <div className="temple-platform"/><div className="temple-building"><i className="steps"/><i className="columns"/><i className="roof"/><i className="door"/></div>
    <div className="temple-candles">{Array.from({length:12}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="temple-water"/>
  </div>
}

function VolcanoScene(){
  return <div className="territory-visual territory-visual-volcano">
    <div className="volcano-sky"/><div className="volcano-mass"><i className="crater"/><i className="lava l1"/><i className="lava l2"/></div>
    <div className="volcano-smoke">{Array.from({length:7}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="volcano-embers">{Array.from({length:22}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="volcano-ground"/>
  </div>
}

function SkyScene({world}:{world:WorldState}){
  return <div className="territory-visual territory-visual-sky" style={{["--stars" as string]:world.sky/100}}>
    <div className="creative-nebula n1"/><div className="creative-nebula n2"/>
    <div className="creative-stars">{Array.from({length:64}).map((_,i)=><i key={i} style={{["--i" as string]:i}}/>)}</div>
    <div className="creative-island"><i className="island"/><i className="tree"/><i className="studio"/></div>
    <div className="creative-comets"><i/><i/><i/></div>
  </div>
}

export function TerritoryLandscape({id,world}:{id:TerritoryId;world:WorldState}){
  if(id==="jardin")return <GardenScene world={world}/>;
  if(id==="fleuve")return <RiverScene world={world}/>;
  if(id==="foret")return <ForestScene world={world}/>;
  if(id==="observatoire")return <ObservatoryScene world={world}/>;
  if(id==="sommets")return <MountainsScene world={world}/>;
  if(id==="temple")return <TempleScene/>;
  if(id==="volcan")return <VolcanoScene/>;
  return <SkyScene world={world}/>;
}
