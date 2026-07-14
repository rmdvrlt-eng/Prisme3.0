"use client";

import { TerritoryLandscape } from "@/components/TerritoryLandscape";
import { TerritoryRituals } from "@/components/TerritoryRituals";
import { PlayableTerritoryWorld } from "@/components/PlayableTerritoryWorld";
import { LivingGardenWorld } from "@/components/LivingGardenWorld";
import { Report } from "@/types/prisme";
import { useState } from "react";
import { WorldState } from "@/lib/world";
import { TerritoryId } from "@/lib/territory";
import { WorldDestination } from "@/components/PlayableTerritoryWorld";
import { RealisticWorldCanvas } from "@/components/RealisticWorldCanvas";

const territoryContent: Record<TerritoryId, { title: string; subtitle: string; description: string; moduleLabel: string }> = {
  jardin: {
    title: "Le Jardin des intentions",
    subtitle: "Émotions · présence · croissance",
    description: "Tes intentions deviennent des graines. Tes gestes quotidiens leur donnent de l’eau, du temps et de la lumière.",
    moduleLabel: "Explorer mes émotions"
  },
  foret: {
    title: "La Forêt des rythmes",
    subtitle: "Habitudes · ancrage · repos",
    description: "Les sentiers deviennent plus nets lorsque tes gestes reviennent avec douceur et régularité.",
    moduleLabel: "Explorer mon quotidien"
  },
  fleuve: {
    title: "Le Fleuve des liens",
    subtitle: "Relations · mémoire · mouvement",
    description: "Le courant garde les reflets de ce que tu traverses, sans retenir ce qui doit continuer son chemin.",
    moduleLabel: "Explorer mes relations"
  },
  observatoire: {
    title: "L’Observatoire",
    subtitle: "Compréhension · recul · clarté",
    description: "Prendre de la hauteur pour distinguer ce qui est observé, ce qui est supposé et ce qui reste ouvert.",
    moduleLabel: "Explorer ma cognition"
  },
  sommets: {
    title: "Les Sommets",
    subtitle: "Attention · silence · direction",
    description: "L’altitude simplifie le paysage. Une seule direction peut alors devenir visible.",
    moduleLabel: "Explorer mon attention"
  },
  temple: {
    title: "Le Temple",
    subtitle: "Valeurs · identité · cohérence",
    description: "Un lieu pour regarder les valeurs qui orientent tes choix sans te réduire à une définition.",
    moduleLabel: "Explorer mon identité"
  },
  volcan: {
    title: "Le Volcan",
    subtitle: "Énergie · tension · transformation",
    description: "L’énergie n’est ni bonne ni mauvaise. Elle cherche une forme et une direction.",
    moduleLabel: "Explorer mon énergie"
  },
  ciel: {
    title: "Le Ciel",
    subtitle: "Créativité · imagination · possibles",
    description: "Chaque création laisse une étoile. Certaines restent discrètes, d’autres deviennent des constellations.",
    moduleLabel: "Explorer ma créativité"
  }
};

export function ImmersiveTerritoryPage({
  id,
  world,
  onBack,
  onStartExploration,
  onOpenIntentions,
  onOpenHouse,
  onTravel,
  report
}: {
  id: TerritoryId;
  world: WorldState;
  onBack: () => void;
  onStartExploration: () => void;
  onOpenIntentions: () => void;
  onOpenHouse: () => void;
  onTravel: (destination: WorldDestination) => void;
  report?: Report | null;
}) {
  const [activeObject,setActiveObject]=useState<string|null>(null);
  const content = territoryContent[id];

  return (
    <main className={`immersive-territory-page territory-page-${id}`}>
      <div className="territory-background" aria-hidden="true">
        <RealisticWorldCanvas territory={id} intensity={1.2} />
        <TerritoryLandscape id={id} world={world} />
      </div>
      <div className="territory-darkening" aria-hidden="true" />

      <header className="territory-topbar">
        <button className="territory-back" onClick={onBack}>← Le Monde</button>
        <strong>PRISME</strong>
        <button className="territory-house" onClick={onOpenHouse}>⌂ Maison</button>
      </header>

      <section className="territory-playable-layer">
        {id === "jardin" ? <>
          <LivingGardenWorld />
          <nav className="garden-continuous-passages" aria-label="Chemins depuis le Jardin">
            <button className="garden-path path-house" onClick={() => onTravel("house")}><i/><span><strong>La Maison</strong><small>Rentrer au refuge</small></span></button>
            <button className="garden-path path-forest" onClick={() => onTravel("foret")}><i/><span><strong>La Forêt</strong><small>Suivre le sentier</small></span></button>
            <button className="garden-path path-river" onClick={() => onTravel("fleuve")}><i/><span><strong>Le Ruisseau</strong><small>Descendre vers l’eau</small></span></button>
          </nav>
        </> : <PlayableTerritoryWorld id={id} world={world} report={report??null} onInteract={(objectId)=>setActiveObject(objectId)} onTravel={onTravel} />}
      </section>

      <section className="territory-hero-copy">
        <span>{content.subtitle}</span>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <div className="territory-primary-actions">
          {id === "jardin" && <button className="territory-gold-button" onClick={onOpenIntentions}>＋ Journal des intentions</button>}
          <button className="territory-ghost-button" onClick={onStartExploration}>{content.moduleLabel} →</button>
        </div>
      </section>

      {activeObject&&<section className="territory-interactions-panel object-open">
        <button className="object-close" onClick={()=>setActiveObject(null)}>×</button>
        <span className="object-kicker">Élément découvert</span>
        <h2>{activeObject.replace(/-/g," ")}</h2>
        <TerritoryRituals territory={id} />
      </section>}

      <footer className="territory-bottom-nav continuous-nav">
        <button onClick={onBack}>⌂ Vue du monde</button>
        {id !== "jardin" && <button onClick={onOpenIntentions}>✦ Intentions</button>}
        <button onClick={() => onTravel("house")}>▣ Rentrer</button>
        <button onClick={onStartExploration}>◎ Explorer ce lieu</button>
      </footer>
    </main>
  );
}
