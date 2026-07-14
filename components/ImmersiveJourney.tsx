"use client";

import { useEffect, useMemo, useState } from "react";
import { TerritoryLandscape } from "@/components/TerritoryLandscape";
import { EvolvingCompanion } from "@/components/EvolvingCompanion";
import { Question, Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";
import { TerritoryId } from "@/lib/territory";

const moduleTerritory: Record<string, TerritoryId> = {
  personnalite: "temple",
  attention: "sommets",
  emotions: "jardin",
  relations: "fleuve",
  cognition: "observatoire",
  neurodiversite: "foret",
  quotidien: "foret",
  sens_identite: "ciel",
};

const pathSymbols = ["✦", "◌", "◇", "⌁", "∞"];

export function ImmersiveJourney({
  question,
  index,
  total,
  world,
  report,
  bookmarked,
  onBookmark,
  onAnswer,
  onSkip,
  onBack,
  onExit,
}: {
  question: Question;
  index: number;
  total: number;
  world: WorldState;
  report: Report | null;
  bookmarked: boolean;
  onBookmark: () => void;
  onAnswer: (index: number) => void;
  onSkip: () => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const territory = moduleTerritory[question.moduleId] ?? "jardin";
  const [selected, setSelected] = useState<number | null>(null);
  const [avatar, setAvatar] = useState({ x: 50, y: 73 });
  const progress = Math.round(((index + 1) / total) * 100);

  useEffect(() => {
    setSelected(null);
    setAvatar({ x: 50, y: 73 });
  }, [question.id]);

  const pathPositions = useMemo(() => {
    const count = question.options.length;
    return question.options.map((_, optionIndex) => ({
      x: count <= 2 ? 35 + optionIndex * 30 : 18 + (optionIndex % 3) * 32,
      y: count <= 3 ? 78 : optionIndex < 3 ? 71 : 85,
    }));
  }, [question.options]);

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    setAvatar(pathPositions[optionIndex]);
    window.setTimeout(() => onAnswer(optionIndex), 820);
  }

  return (
    <main className={`journey-world journey-${territory}`}>
      <div className="journey-landscape" aria-hidden="true"><TerritoryLandscape id={territory} world={world}/></div>
      <div className="journey-vignette" aria-hidden="true" />
      <div className="journey-stars" aria-hidden="true">{Array.from({length:22}).map((_,i)=><i key={i} style={{["--j" as string]:i}}/>)}</div>

      <header className="journey-topbar">
        <button onClick={onExit}>← Le Monde</button>
        <div><strong>{question.scene}</strong><span>{index + 1} / {total}</span></div>
        <button className={bookmarked?"saved":""} onClick={onBookmark}>{bookmarked?"★":"☆"}</button>
      </header>
      <div className="journey-progress"><i style={{width:`${progress}%`}}/></div>

      <section className="journey-question">
        <span>Un passage s’ouvre</span>
        <h1>{question.prompt}</h1>
        <p>Choisis le chemin qui ressemble le plus à ton expérience actuelle.</p>
      </section>

      <div className="journey-companion"><EvolvingCompanion world={world} report={report}/></div>
      <div className="journey-avatar" style={{left:`${avatar.x}%`,top:`${avatar.y}%`}} aria-label="Ta présence dans le monde"><i/><b/></div>

      <section className="journey-paths" aria-label="Chemins de réponse">
        {question.options.map((option, optionIndex) => {
          const pos = pathPositions[optionIndex];
          return (
            <button
              key={`${question.id}-${optionIndex}`}
              className={selected===optionIndex?"chosen":selected!==null?"dimmed":""}
              style={{left:`${pos.x}%`,top:`${pos.y}%`}}
              onClick={() => choose(optionIndex)}
            >
              <i>{pathSymbols[optionIndex % pathSymbols.length]}</i>
              <span>{option.text}</span>
            </button>
          );
        })}
      </section>

      <footer className="journey-actions">
        <button disabled={index===0 || selected!==null} onClick={onBack}>← Revenir</button>
        <button disabled={selected!==null} onClick={onSkip}>Aucune voie ne me correspond</button>
      </footer>
      {selected!==null&&<div className="journey-choice-wave" aria-hidden="true"><i/><i/><i/></div>}
    </main>
  );
}
