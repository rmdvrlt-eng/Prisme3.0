"use client";

import { EvolvingCompanion } from "@/components/EvolvingCompanion";
import { PsychologyReport } from "@/components/PsychologyReport";
import { TerritoryLandscape } from "@/components/TerritoryLandscape";
import { Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";

export function ImmersiveReport({report,world,onBack}:{report:Report;world:WorldState;onBack:()=>void}){
  const topMetrics=report.metrics.slice(0,6);
  return <main className="reflection-world">
    <div className="reflection-landscape" aria-hidden="true"><TerritoryLandscape id="observatoire" world={world}/></div>
    <div className="reflection-vignette" aria-hidden="true"/>
    <header className="reflection-topbar"><button onClick={onBack}>← Le Monde</button><strong>LE REFLET</strong><button onClick={()=>window.print()}>Imprimer</button></header>

    <section className="reflection-hero">
      <div><span>Ton paysage intérieur</span><h1>{report.season.symbol} {report.season.name}</h1><p>{report.summary}</p></div>
      <div className="reflection-companion"><EvolvingCompanion world={world} report={report}/></div>
    </section>

    <section className="reflection-grid">
      <article className="reflection-panel season-panel"><small>Saison actuelle</small><h2>{report.season.name}</h2><p>{report.season.description}</p></article>
      <article className="reflection-panel archetype-panel"><small>Présences dominantes</small><div>{report.archetypes.map((a,i)=><span key={a.name}><b>0{i+1}</b><strong>{a.name}</strong><em>{a.score}%</em></span>)}</div></article>
      <article className="reflection-panel metric-panel"><small>Constellations observées</small>{topMetrics.map(m=><div key={m.key}><span>{m.label}</span><i><b style={{width:`${m.value}%`}}/></i><em>{m.value}</em></div>)}</article>
      <article className="reflection-panel exercise-panel"><small>Gestes à cultiver</small>{report.exercises.map((e,i)=><div key={e.title}><b>{i+1}</b><span><strong>{e.title}</strong><p>{e.body}</p></span><em>{e.duration}</em></div>)}</article>
    </section>

    <section className="reflection-psychology"><PsychologyReport statements={report.psychology}/></section>
    <footer className="reflection-footer"><p>Les paysages sont des métaphores. Les observations ne sont ni des diagnostics ni des identités fixes.</p><button onClick={onBack}>Revenir dans mon monde</button></footer>
  </main>
}
