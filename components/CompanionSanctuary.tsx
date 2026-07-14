"use client";

import { useEffect, useState } from "react";
import { EvolvingCompanion } from "@/components/EvolvingCompanion";
import { WorldState } from "@/lib/world";
import { Report } from "@/types/prisme";
import {
  companionInteractions,
  CompanionInteraction,
  CompanionLifeState,
  defaultCompanionLife,
  interactWithCompanion,
  loadCompanionLife,
  saveCompanionLife
} from "@/lib/companionLife";

type Props = { open: boolean; onClose: () => void; world: WorldState; report: Report | null };

export function CompanionSanctuary({ open, onClose, world, report }: Props) {
  const [state, setState] = useState<CompanionLifeState>(defaultCompanionLife());
  const [selected, setSelected] = useState<CompanionInteraction | null>(null);
  const [thought, setThought] = useState("");
  const [message, setMessage] = useState("La présence attend sans te presser.");
  const [pulse, setPulse] = useState<CompanionInteraction | null>(null);

  useEffect(() => { if (open) setState(loadCompanionLife()); }, [open]);

  function act(action: CompanionInteraction) {
    if (action === "share" && !thought.trim()) {
      setSelected(action);
      setMessage("Écris une phrase avant de la lui confier.");
      return;
    }
    const result = interactWithCompanion(state, action, thought);
    setState(result.state);
    saveCompanionLife(result.state);
    window.dispatchEvent(new CustomEvent("prisme:companion-updated", { detail: { companion: result.state } }));
    setPulse(action);
    window.setTimeout(() => setPulse(null), 1700);
    setThought("");
    setSelected(null);
    const replies: Record<CompanionInteraction, string> = {
      silence: "Sa lumière ralentit. Le silence devient partagé.",
      breathe: "Son souffle lumineux se cale doucement sur le tien.",
      share: "La phrase rejoint les petites lumières qu’il garde avec toi.",
      walk: "La présence se tourne vers le sentier. Quelque chose s’ouvre au loin.",
      light: "La lumière offerte reste autour de vous comme une chaleur discrète."
    };
    setMessage(result.repeated ? "Vous avez déjà vécu ce geste aujourd’hui, mais il reste accueilli." : replies[action]);
  }

  if (!open) return null;
  return (
    <div className="companion-sanctuary-overlay" role="dialog" aria-modal="true" aria-label="Interagir avec le compagnon">
      <section className={`companion-sanctuary pulse-${pulse ?? "none"}`}>
        <header>
          <div><span className="kicker">La Présence</span><h2>Un lien qui se construit par les gestes</h2><p>Elle ne te juge pas. Elle garde seulement la mémoire de ce que vous partagez.</p></div>
          <button onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <div className="companion-sanctuary-layout">
          <div className="companion-sanctuary-scene">
            <div className="companion-scene-sky"/><div className="companion-scene-water"/><div className="companion-scene-grass"/>
            <EvolvingCompanion world={world} report={report} />
            <div className="companion-response" aria-live="polite">{message}</div>
          </div>

          <aside className="companion-actions-panel">
            <div className="companion-stats">
              <article><span>Lien</span><strong>{state.bond}%</strong><i><b style={{ width: `${state.bond}%` }}/></i></article>
              <article><span>Calme</span><strong>{state.calm}%</strong><i><b style={{ width: `${state.calm}%` }}/></i></article>
              <article><span>Lumière</span><strong>{state.light}%</strong><i><b style={{ width: `${state.light}%` }}/></i></article>
            </div>
            <div className="companion-action-grid">
              {(Object.keys(companionInteractions) as CompanionInteraction[]).map(action => (
                <button key={action} className={selected === action ? "active" : ""} onClick={() => setSelected(action)}>
                  <b>{companionInteractions[action].symbol}</b><span><strong>{companionInteractions[action].label}</strong><small>{companionInteractions[action].description}</small></span>
                </button>
              ))}
            </div>
            {selected && <div className="companion-action-detail">
              {selected === "share" && <textarea value={thought} onChange={event => setThought(event.target.value)} maxLength={220} placeholder="Une pensée, une peur, une joie…"/>}
              <button className="primary" onClick={() => act(selected)}>Vivre ce moment</button>
            </div>}
            {state.memories.length > 0 && <div className="companion-memories"><h3>Les lumières confiées</h3>{state.memories.slice(0, 4).map(memory => <p key={memory.id}>“{memory.text}”</p>)}</div>}
          </aside>
        </div>
      </section>
    </div>
  );
}
