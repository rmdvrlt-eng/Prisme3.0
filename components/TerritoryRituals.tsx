"use client";

import { useMemo, useState } from "react";
import { TerritoryId } from "@/lib/territory";
import { completeRitual, discoverRitual, loadTerritoryInteractions, ritualDoneToday, TerritoryInteractionState, TerritoryRitual, territoryRituals } from "@/lib/rituals";
import { applyRitualToEcosystem } from "@/lib/ecosystem";

export function TerritoryRituals({ territory }: { territory: TerritoryId }) {
  const rituals = territoryRituals[territory];
  const [state, setState] = useState<TerritoryInteractionState>(() => loadTerritoryInteractions());
  const [selected, setSelected] = useState<TerritoryRitual | null>(null);
  const [pulse, setPulse] = useState<string | null>(null);
  const points = state.points[territory] ?? 0;
  const discovered = state.discovered[territory] ?? [];

  const visibleRituals = useMemo(() => rituals.map((ritual, index) => ({ ritual, revealed: discovered.includes(ritual.id) || index === 0 || points >= index * 18 })), [rituals, discovered, points]);

  function openRitual(ritual: TerritoryRitual) {
    setState((current) => discoverRitual(current, ritual));
    setSelected(ritual);
  }

  function complete() {
    if (!selected || ritualDoneToday(state, selected)) return;
    setState((current) => completeRitual(current, selected));
    applyRitualToEcosystem({ id: selected.id, title: selected.title, kind: selected.kind, territory: selected.territory });
    setPulse(selected.kind);
    window.setTimeout(() => setPulse(null), 1800);
    setSelected(null);
  }

  return <section className={`territory-rituals territory-rituals-${territory} ${pulse ? `ritual-pulse-${pulse}` : ""}`}>
    <div className="rituals-heading">
      <div><span className="kicker">Rituels du lieu</span><h2>Toucher le décor, agir dans le réel</h2></div>
      <div className="ritual-progress"><span>{points}/100</span><i><b style={{ width: `${points}%` }} /></i></div>
    </div>

    <div className="ritual-object-field" aria-label="Objets interactifs du territoire">
      {visibleRituals.map(({ ritual, revealed }, index) => <button
        key={ritual.id}
        className={`ritual-object ritual-object-${index + 1} ${revealed ? "revealed" : "sleeping"} ${ritualDoneToday(state, ritual) ? "done" : ""}`}
        onClick={() => revealed && openRitual(ritual)}
        disabled={!revealed}
        aria-label={revealed ? ritual.title : "Élément encore endormi"}
      >
        <span>{revealed ? ritual.icon : "·"}</span>
        <small>{revealed ? ritual.title : "En sommeil"}</small>
      </button>)}
      <div className="ritual-world-reaction" aria-hidden="true"><i/><i/><i/><i/><i/></div>
    </div>

    <div className="ritual-list">
      {visibleRituals.map(({ ritual, revealed }) => <article key={ritual.id} className={revealed ? "revealed" : "sleeping"}>
        <span>{revealed ? ritual.icon : "○"}</span><div><strong>{revealed ? ritual.title : "Un rituel attend"}</strong><small>{revealed ? ritual.subtitle : "Continue d'explorer ce lieu"}</small></div>
        {revealed && ritualDoneToday(state, ritual) && <b>✓ aujourd’hui</b>}
      </article>)}
    </div>

    {selected && <div className="ritual-sheet" role="dialog" aria-modal="true">
      <article>
        <button className="ritual-close" onClick={() => setSelected(null)}>×</button>
        <span className="ritual-sheet-icon">{selected.icon}</span>
        <span className="kicker">{selected.subtitle}</span>
        <h2>{selected.title}</h2>
        <p>{selected.prompt}</p>
        <div className={`ritual-breathing ritual-breathing-${selected.kind}`} aria-hidden="true"><i/><i/></div>
        <small>{selected.reward}</small>
        <button className="primary" disabled={ritualDoneToday(state, selected)} onClick={complete}>{ritualDoneToday(state, selected) ? "Déjà accompli aujourd’hui" : "J’ai accompli ce rituel"}</button>
      </article>
    </div>}
  </section>;
}
