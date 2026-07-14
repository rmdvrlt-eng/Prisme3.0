"use client";

import { useEffect, useState } from "react";
import { TerritoryId } from "@/lib/territory";

type AnimalKind = "fox" | "deer" | "owl" | "cat" | "hare" | "otter";

type AnimalState = {
  trust: number;
  fedOn?: string;
  brushedOn?: string;
  playedOn?: string;
};

const animalByTerritory: Record<TerritoryId, AnimalKind> = {
  jardin: "hare",
  foret: "fox",
  fleuve: "otter",
  observatoire: "owl",
  sommets: "deer",
  temple: "cat",
  volcan: "fox",
  ciel: "owl",
};

const labels: Record<AnimalKind, string> = {
  fox: "Renard",
  deer: "Faon",
  owl: "Hibou",
  cat: "Chat",
  hare: "Lièvre",
  otter: "Loutre",
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function InteractiveAnimal({
  territory,
  nearby,
  onAction,
}: {
  territory: TerritoryId;
  nearby: boolean;
  onAction: (action: "feed" | "brush" | "play") => void;
}) {
  const kind = animalByTerritory[territory];
  const [state, setState] = useState<AnimalState>({ trust: 22 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(`prisme.territory.animal.${territory}`);
    if (raw) {
      try {
        setState(JSON.parse(raw));
      } catch {}
    }
  }, [territory]);

  function act(action: "feed" | "brush" | "play") {
    const key = action === "feed" ? "fedOn" : action === "brush" ? "brushedOn" : "playedOn";
    if (state[key] === today()) return;
    const next: AnimalState = {
      ...state,
      [key]: today(),
      trust: Math.min(100, state.trust + (action === "play" ? 8 : 6)),
    };
    setState(next);
    localStorage.setItem(`prisme.territory.animal.${territory}`, JSON.stringify(next));
    onAction(action);
  }

  return (
    <div className={`interactive-animal animal-kind-${kind}${nearby ? " is-nearby" : ""}`} style={{ ["--trust" as string]: state.trust / 100 }}>
      <button className="animal-body-button" onClick={() => setOpen((value) => !value)} aria-label={`Interagir avec ${labels[kind]}`}>
        <span className="animal-shadow" />
        <span className="animal-tail" />
        <span className="animal-body" />
        <span className="animal-leg animal-leg-a" />
        <span className="animal-leg animal-leg-b" />
        <span className="animal-head">
          <i className="animal-ear ear-a" />
          <i className="animal-ear ear-b" />
          <i className="animal-eye eye-a" />
          <i className="animal-eye eye-b" />
          <i className="animal-muzzle" />
        </span>
      </button>
      <span className="animal-name">{labels[kind]}</span>
      {open && (
        <div className="animal-care-popover">
          <strong>{labels[kind]}</strong>
          <small>Lien {state.trust}%</small>
          <div>
            <button onClick={() => act("feed")} disabled={state.fedOn === today()}>Nourrir</button>
            <button onClick={() => act("brush")} disabled={state.brushedOn === today()}>Brosser</button>
            <button onClick={() => act("play")} disabled={state.playedOn === today()}>Jouer</button>
          </div>
        </div>
      )}
    </div>
  );
}
