import { NarrativeEvent } from "@/types/prisme";

const symbols = { growth:"❧", light:"◉", flow:"≈", stone:"◆", mist:"◌", stars:"✦", fire:"◇", bridge:"⌒" } as const;

export function NarrativeArchive({ events }: { events: NarrativeEvent[] }) {
  const recent = events.slice(0, 12);
  return <section className="glass narrative-archive">
    <div className="memory-head"><div><span className="kicker">Chemins parcourus</span><h2>Les traces de tes réponses</h2><p>Chaque choix laisse une transformation symbolique, jamais un jugement.</p></div><strong>{events.length}</strong></div>
    {recent.length ? <div className="narrative-event-grid">{recent.map(event=><article key={event.id} className={`event-${event.effect}`}><span>{symbols[event.effect]}</span><div><strong>{event.choice}</strong><small>{new Date(event.createdAt).toLocaleDateString("fr-FR")}</small></div><i>{event.intensity}</i></article>)}</div>:<p>Aucun chemin n’a encore été parcouru.</p>}
  </section>;
}
