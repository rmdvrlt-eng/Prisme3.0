"use client";

import { useEffect, useRef } from "react";
import { MusicTerritory } from "@/lib/music";

export type TransitionMood = "world" | "garden" | "forest" | "river" | "summits" | "temple" | "sky" | "house" | "journal" | "journey";

const labels: Record<TransitionMood, { title: string; subtitle: string; music: MusicTerritory }> = {
  world: { title: "Le Monde", subtitle: "Les chemins se rejoignent.", music: "monde" },
  garden: { title: "Le Jardin", subtitle: "La lumière traverse les feuilles.", music: "emotions" },
  forest: { title: "La Forêt", subtitle: "Le sentier se dessine sous tes pas.", music: "quotidien" },
  river: { title: "Le Fleuve", subtitle: "Le courant transforme le silence.", music: "relations" },
  summits: { title: "Les Sommets", subtitle: "L’air devient plus clair.", music: "attention" },
  temple: { title: "Le Temple", subtitle: "Ce qui compte prend forme.", music: "personnalite" },
  sky: { title: "Le Ciel", subtitle: "Les possibles deviennent constellations.", music: "sens_identite" },
  house: { title: "La Maison", subtitle: "La chaleur du refuge se rapproche.", music: "quotidien" },
  journal: { title: "Le Livre du Jour", subtitle: "Une trace rejoint le monde.", music: "rapport" },
  journey: { title: "L’Exploration", subtitle: "Un nouveau chemin s’ouvre.", music: "monde" }
};

export function PlaceTransition({
  from = "world",
  to,
  onSwitch,
  onComplete
}: {
  from?: TransitionMood;
  to: TransitionMood;
  onSwitch: () => void;
  onComplete: () => void;
}) {
  const switched = useRef(false);

  useEffect(() => {
    const musicTimer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("prisme:music-territory", { detail: { territory: labels[to].music } }));
    }, 180);
    const switchTimer = window.setTimeout(() => {
      if (!switched.current) {
        switched.current = true;
        onSwitch();
      }
    }, 760);
    const endTimer = window.setTimeout(onComplete, 1680);
    return () => {
      window.clearTimeout(musicTimer);
      window.clearTimeout(switchTimer);
      window.clearTimeout(endTimer);
    };
  }, [onComplete, onSwitch, to]);

  const copy = labels[to];
  return (
    <div className={`place-transition from-${from} to-${to}`} role="status" aria-live="polite">
      <div className={`transition-panorama panorama-out mood-${from}`} aria-hidden="true">
        <i className="transition-sky" />
        <i className="transition-mountain far" />
        <i className="transition-mountain near" />
        <i className="transition-water" />
        <i className="transition-foliage" />
      </div>
      <div className={`transition-panorama panorama-in mood-${to}`} aria-hidden="true">
        <i className="transition-sky" />
        <i className="transition-mountain far" />
        <i className="transition-mountain near" />
        <i className="transition-water" />
        <i className="transition-foliage" />
      </div>
      <div className="transition-camera-sweep" aria-hidden="true">
        <i className="transition-path" />
        <i className="transition-light" />
        <i className="transition-presence" />
        {Array.from({ length: 18 }).map((_, index) => <b key={index} style={{ ["--spark" as string]: index }} />)}
      </div>
      <div className="place-transition-copy">
        <span>Prisme</span>
        <strong>{copy.title}</strong>
        <p>{copy.subtitle}</p>
      </div>
    </div>
  );
}
