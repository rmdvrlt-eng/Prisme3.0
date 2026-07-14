"use client";

import { useEffect, useState } from "react";
import { NarrativeEffect, Question } from "@/types/prisme";
import { effectForChoice, narrativeCopy } from "@/lib/narrative";

const effectText: Record<NarrativeEffect, string> = {
  growth: "Une nouvelle pousse apparaît dans le paysage.",
  light: "La lumière se déplace et ouvre un passage.",
  flow: "Le courant change doucement de direction.",
  stone: "Une pierre stable rejoint le chemin.",
  mist: "La brume accueille l’incertitude sans l’effacer.",
  stars: "Une étoile rejoint la constellation.",
  fire: "Une braise s’allume près du sentier.",
  bridge: "Un pont commence à relier les deux rives."
};

export function NarrativeScene({
  question,
  index,
  total,
  bookmarked,
  onBookmark,
  onAnswer,
  onSkip,
  onBack
}: {
  question: Question;
  index: number;
  total: number;
  bookmarked: boolean;
  onBookmark: () => void;
  onAnswer: (index: number) => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const [preview, setPreview] = useState<{ index: number; effect: NarrativeEffect } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const copy = narrativeCopy[question.moduleId] ?? narrativeCopy.personnalite;

  useEffect(() => {
    setPreview(null);
    setRevealed(false);
    const timer = window.setTimeout(() => setRevealed(true), 240);
    return () => window.clearTimeout(timer);
  }, [question.id]);

  function choose(optionIndex: number) {
    const effect = effectForChoice(question, optionIndex);
    setPreview({ index: optionIndex, effect });
    window.setTimeout(() => onAnswer(optionIndex), 650);
  }

  return (
    <section className={`narrative-scene territory-${question.moduleId} ${revealed ? "revealed" : ""}`}>
      <div className="narrative-world" aria-hidden="true">
        <div className="narrative-sky" />
        <div className="narrative-stars">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ ["--i" as string]: i }} />)}</div>
        <div className="narrative-mountain left" /><div className="narrative-mountain right" />
        <div className="narrative-path"><i /></div>
        <div className="narrative-presence" />
        <div className={`narrative-reaction ${preview ? `effect-${preview.effect}` : ""}`}>
          {preview && <><span>{preview.effect === "stars" ? "✦" : preview.effect === "growth" ? "❧" : preview.effect === "bridge" ? "⌒" : "◌"}</span><p>{effectText[preview.effect]}</p></>}
        </div>
      </div>

      <div className="narrative-overlay">
        <div className="narrative-topline">
          <div><span className="kicker">{copy.place}</span><p>{copy.invitation}</p></div>
          <button className="narrative-bookmark" onClick={onBookmark}>{bookmarked ? "★" : "☆"}</button>
        </div>

        <div className="narrative-question">
          <p>{question.scene}</p>
          <h2>{question.prompt}</h2>
          <div className="path-choices">
            {question.options.map((option, optionIndex) => {
              const effect = effectForChoice(question, optionIndex);
              return (
                <button key={option.text} className={preview?.index === optionIndex ? "selected" : ""} onClick={() => !preview && choose(optionIndex)}>
                  <span className={`choice-symbol effect-${effect}`}>{effect === "stars" ? "✦" : effect === "growth" ? "❧" : effect === "bridge" ? "⌒" : effect === "fire" ? "◆" : "○"}</span>
                  <strong>{option.text}</strong>
                  <small>{effectText[effect]}</small>
                </button>
              );
            })}
          </div>
          <div className="narrative-controls">
            <button className="none" disabled={!!preview} onClick={onSkip}>Aucune voie ne me correspond</button>
            {index > 0 && <button className="back" disabled={!!preview} onClick={onBack}>← Revenir sur mes pas</button>}
          </div>
        </div>
      </div>
      <div className="narrative-counter">{index + 1} / {total}</div>
    </section>
  );
}
