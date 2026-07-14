"use client";

import { useEffect, useMemo, useState } from "react";
import { CareAction, careActions, Intention, intentionStage, loadIntentions, saveIntentions, todayKey } from "@/lib/intentions";
import { defaultEcosystem, EcosystemState, loadEcosystem } from "@/lib/ecosystem";

type Props = {
  open: boolean;
  initialAction?: CareAction | null;
  onClose: () => void;
};

export function IntentionGarden({ open, initialAction, onClose }: Props) {
  const [items, setItems] = useState<Intention[]>([]);
  const [text, setText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const [activeAction, setActiveAction] = useState<CareAction | null>(null);
  const [message, setMessage] = useState("");
  const [lastCare, setLastCare] = useState<CareAction | null>(null);
  const [ecosystem, setEcosystem] = useState<EcosystemState>(defaultEcosystem());

  useEffect(() => {
    if (!open) return;
    const loaded = loadIntentions();
    setItems(loaded);
    setSelectedId((current) => current ?? loaded[0]?.id ?? null);
    setActiveAction(initialAction ?? null);
    setEcosystem(loadEcosystem());
  }, [open, initialAction]);

  useEffect(() => {
    function refresh(event: Event) {
      const custom = event as CustomEvent<{ ecosystem?: EcosystemState }>;
      setEcosystem(custom.detail?.ecosystem ?? loadEcosystem());
    }
    window.addEventListener("prisme:ecosystem-updated", refresh);
    return () => window.removeEventListener("prisme:ecosystem-updated", refresh);
  }, []);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? items[0] ?? null, [items, selectedId]);
  const stage = selected ? intentionStage(selected.carePoints) : null;

  function persist(next: Intention[]) {
    setItems(next);
    saveIntentions(next);
  }

  function plant() {
    const clean = text.trim();
    if (!clean) return;
    const intention: Intention = {
      id: crypto.randomUUID(),
      text: clean,
      plantedAt: new Date().toISOString(),
      carePoints: 0,
      careLog: {}
    };
    const next = [intention, ...items];
    persist(next);
    setSelectedId(intention.id);
    setText("");
    setMessage("La graine est plantée dans ton Jardin.");
  }

  function care(action: CareAction) {
    if (!selected) return;
    const day = todayKey();
    const today = selected.careLog[day] ?? [];
    if (today.includes(action)) {
      setMessage("Ce soin a déjà été offert aujourd’hui.");
      return;
    }
    if ((action === "gratitude" || action === "write") && !reflection.trim()) {
      setActiveAction(action);
      setMessage("Écris d’abord une phrase pour nourrir la graine.");
      return;
    }
    const next = items.map((item) => item.id === selected.id ? {
      ...item,
      carePoints: Math.min(10, item.carePoints + 1),
      lastCareAt: new Date().toISOString(),
      careLog: { ...item.careLog, [day]: [...today, action] }
    } : item);
    persist(next);
    setLastCare(action);
    window.setTimeout(() => setLastCare(null), 1400);
    setReflection("");
    setActiveAction(null);
    setMessage(`${careActions[action].label} a nourri ton intention.`);
  }

  function remove(id: string) {
    const next = items.filter((item) => item.id !== id);
    persist(next);
    setSelectedId(next[0]?.id ?? null);
  }

  if (!open) return null;

  return (
    <div className="intention-overlay" role="dialog" aria-modal="true" aria-label="Jardin des intentions">
      <section className="intention-garden" style={{ ["--ecosystem-vitality" as string]: ecosystem.gardenVitality / 100 }}>
        <header>
          <div><span className="kicker">Le Jardin intérieur</span><h2>Une intention devient une graine.</h2><small className="ecosystem-indicator">Vitalité du Jardin {ecosystem.gardenVitality}% · {ecosystem.ritualCount} rituels accomplis</small></div>
          <button onClick={onClose} aria-label="Fermer">×</button>
        </header>

        <div className="intention-layout">
          <aside className="intention-list">
            <button className="plant-new" onClick={() => setSelectedId(null)}>＋ Planter une intention</button>
            {items.map((item) => {
              const itemStage = intentionStage(item.carePoints);
              return <button key={item.id} className={selected?.id === item.id ? "active" : ""} onClick={() => setSelectedId(item.id)}>
                <i className={`seed-icon ${itemStage.key}`} />
                <span><strong>{item.text}</strong><small>{itemStage.label} · {item.carePoints}/10 soins</small></span>
              </button>;
            })}
          </aside>

          <main className="intention-main">
            {!selected ? (
              <div className="plant-form">
                <div className="plant-visual seed"><i/><i/><i/></div>
                <h3>Que souhaites-tu cultiver ?</h3>
                <p>Une qualité, une habitude, un projet ou une manière d’être.</p>
                <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Ex. Me parler avec davantage de douceur…" maxLength={180}/>
                <button className="primary" onClick={plant}>Planter cette graine</button>
              </div>
            ) : (
              <>
                <div className={`living-garden-scene stage-${stage?.key} care-${lastCare ?? "none"}`} aria-label={stage?.label}>
                  <div className="garden-sky" />
                  <div className="garden-sunbeam" />
                  <div className="garden-mist mist-one" />
                  <div className="garden-mist mist-two" />
                  <div className="garden-hills hill-back" />
                  <div className="garden-hills hill-front" />
                  <div className="garden-stream"><i/><i/><i/></div>
                  <div className="garden-ground" />
                  <div className="garden-grasses">
                    {Array.from({ length: 24 }).map((_, index) => <i key={index} style={{ ["--blade" as string]: index }} />)}
                  </div>
                  <div className="living-plant">
                    <span className="plant-stem" />
                    <span className="plant-leaf leaf-left" />
                    <span className="plant-leaf leaf-right" />
                    <span className="plant-bud" />
                    <span className="plant-flower">
                      {Array.from({ length: 8 }).map((_, index) => <i key={index} style={{ ["--petal" as string]: index }} />)}
                      <b />
                    </span>
                    <span className="plant-seed" />
                  </div>
                  <div className="care-ripples"><i/><i/><i/></div>
                  <div className="care-sparkles">{Array.from({ length: 15 }).map((_, index) => <i key={index} style={{ ["--spark" as string]: index }} />)}</div>
                  <div className="garden-butterfly butterfly-one" /><div className="garden-butterfly butterfly-two" />
                  <div className="ecosystem-blooms" aria-hidden="true">{Array.from({ length: Math.max(1, Math.round(ecosystem.gardenVitality / 14)) }).map((_, index) => <i key={index} style={{ ["--bloom" as string]: index }} />)}</div>
                </div>
                <span className="plant-stage">{stage?.label}</span>
                <h3>{selected.text}</h3>
                <div className="growth-track"><i style={{ width: `${stage?.progress ?? 0}%` }}/></div>
                <p>Chaque geste concret nourrit la graine. Un même soin compte une fois par jour.</p>

                <div className="care-grid">
                  {(Object.keys(careActions) as CareAction[]).map((action) => {
                    const done = (selected.careLog[todayKey()] ?? []).includes(action);
                    return <button key={action} className={done ? "done" : activeAction === action ? "active" : ""} onClick={() => setActiveAction(action)}>
                      <b>{done ? "✓" : careActions[action].icon}</b><span>{careActions[action].label}</span>
                    </button>;
                  })}
                </div>

                {activeAction && <div className="care-action-panel">
                  <p>{careActions[activeAction].prompt}</p>
                  {(activeAction === "gratitude" || activeAction === "write") && <textarea value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Écris ta phrase ici…"/>}
                  <button className="primary" onClick={() => care(activeAction)}>J’ai fait cette action</button>
                </div>}

                <button className="remove-intention" onClick={() => remove(selected.id)}>Retirer cette intention du Jardin</button>
              </>
            )}
          </main>
        </div>
        {message && <div className="garden-toast" onAnimationEnd={() => setMessage("")}>{message}</div>}
      </section>
    </div>
  );
}
