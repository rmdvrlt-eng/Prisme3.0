"use client";

import { useEffect, useState } from "react";
import { PresenceEvent } from "@/lib/presence";

const triggerLabels: Record<PresenceEvent["trigger"], string> = {
  "profile-change": "Évolution observée",
  "journal-trend": "Rythme récent",
  "return": "Retour dans le monde",
  "territory": "Nouveau chemin",
  "milestone": "Trace du parcours"
};

export function CompanionPresence({ event, onDismiss }: { event: PresenceEvent | null; onDismiss: () => void }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!event) return;
    const timer = window.setTimeout(() => setVisible(true), 1400);
    return () => window.clearTimeout(timer);
  }, [event?.id]);

  if (!event) return null;

  return <aside className={`world-presence ${visible ? "visible" : ""}`} aria-live="polite">
    <button className="presence-being" onClick={() => setOpen(!open)} aria-label="Observer la présence">
      <span className="presence-aura" />
      <span className="presence-core" />
      <i /><i /><i />
    </button>

    <section className={`presence-whisper ${open ? "open" : ""}`}>
      <button className="presence-close" onClick={onDismiss} aria-label="Laisser partir la présence">×</button>
      <span className="kicker">{triggerLabels[event.trigger]}</span>
      <h3>{event.title}</h3>
      <p>{event.text}</p>
      <details>
        <summary>Pourquoi cette phrase apparaît-elle ?</summary>
        <strong>{event.sourceLabel}</strong>
        <p>{event.sourceDetail}</p>
        {event.statement && <p><b>Lecture liée :</b> {event.statement.title} · confiance {event.statement.confidence}%.</p>}
      </details>
      <button className="presence-leave" onClick={onDismiss}>Laisser cette observation reposer</button>
    </section>
  </aside>;
}
