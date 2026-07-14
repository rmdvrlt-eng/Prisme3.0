"use client";

import { useMemo, useState } from "react";
import { JournalEntry, MemoryItem, Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";
import { balconySummary, HouseRoomId, HouseVisitState, loadHouseState, roomCount, rooms, visitRoom } from "@/lib/house";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function HouseEngine({
  memories,
  journal,
  reports,
  world,
  onCreate,
  onTogglePin,
  onDelete
}: {
  memories: MemoryItem[];
  journal: JournalEntry[];
  reports: Report[];
  world: WorldState;
  onCreate: (title: string, body: string, territory: MemoryItem["territory"]) => void;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<HouseRoomId>("salon");
  const [houseState, setHouseState] = useState<HouseVisitState>(() => loadHouseState());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [territory, setTerritory] = useState<MemoryItem["territory"]>("ciel");

  const selected = rooms.find((item) => item.id === room) ?? rooms[0];
  const oldMemories = useMemo(() => memories.filter((item) => Date.now() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24 * 30), [memories]);
  const difficultEntries = useMemo(() => journal.filter((entry) => entry.mood <= 2 || entry.socialLoad >= 5), [journal]);

  function enter(nextRoom: HouseRoomId) {
    setRoom(nextRoom);
    setHouseState((current) => visitRoom(current, nextRoom));
  }

  function create() {
    if (!title.trim() && !body.trim()) return;
    onCreate(title, body, territory);
    setTitle("");
    setBody("");
  }

  return (
    <section className="house-engine glass">
      <div className="house-intro">
        <div>
          <span className="kicker">Le cœur du monde</span>
          <h2>La Maison</h2>
          <p>Sept pièces donnent une forme habitable aux souvenirs, aux créations et aux traces du parcours.</p>
        </div>
        <button className="primary house-enter" onClick={() => setOpen(true)}>Entrer dans la Maison</button>
      </div>

      <div className="house-facade" aria-hidden="true">
        <div className="house-roof" />
        <div className="house-wall">
          <i className="window w1"/><i className="window w2"/><i className="door"/><i className="chimney"/>
          <span className="house-glow"/>
        </div>
        <div className="house-ground">{Array.from({ length: 17 }).map((_, index) => <i key={index}/>)}</div>
      </div>

      {open && (
        <div className="house-overlay" role="dialog" aria-modal="true" aria-label="Maison de Prisme">
          <section className="house-shell">
            <header className="house-header">
              <div><span className="kicker">Maison-mémoire</span><h2>{selected.title}</h2><p>{selected.description}</p></div>
              <button onClick={() => setOpen(false)} aria-label="Fermer">×</button>
            </header>

            <nav className="house-plan" aria-label="Pièces de la Maison">
              {rooms.map((item) => (
                <button key={item.id} className={room === item.id ? "active" : ""} onClick={() => enter(item.id)}>
                  <span>{item.symbol}</span><strong>{item.title.replace("La ", "").replace("Le ", "")}</strong>
                  <small>{roomCount(item.id, memories, journal, reports)}</small>
                </button>
              ))}
            </nav>

            <main className={`house-room room-${room}`}>
              <div className="room-atmosphere"><span className="room-symbol">{selected.symbol}</span><div className="room-light"/></div>

              {room === "bibliotheque" && <div className="room-content"><h3>Les volumes du parcours</h3>{reports.length ? reports.map((report) => <article className="house-item" key={report.createdAt}><span>▤</span><div><strong>{report.mode}</strong><small>{formatDate(report.createdAt)}</small><p>{report.summary}</p></div></article>) : <Empty text="La première stèle apparaîtra après une passation."/>}</div>}

              {room === "atelier" && <div className="room-content"><h3>Créer une nouvelle trace</h3><div className="atelier-form"><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Titre de la création"/><textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Une chanson, un rêve, une idée, un projet…"/><select value={territory} onChange={(event) => setTerritory(event.target.value as MemoryItem["territory"])}><option value="ciel">Ciel</option><option value="temple">Temple</option><option value="jardin">Jardin</option><option value="fleuve">Fleuve</option><option value="observatoire">Observatoire</option><option value="foret">Forêt</option><option value="volcan">Volcan</option><option value="sommets">Sommets</option></select><button className="primary" onClick={create}>Déposer dans l’Atelier</button></div><div className="room-list">{memories.filter((item) => item.kind === "creation").map((item) => <MemoryRow key={item.id} item={item} onTogglePin={onTogglePin} onDelete={onDelete}/>)}</div></div>}

              {room === "serre" && <div className="room-content"><h3>Les graines du journal</h3>{journal.length ? journal.map((entry) => <article className="house-item plant-item" key={entry.id}><span>❋</span><div><strong>{entry.note || "Une humeur déposée"}</strong><small>{formatDate(entry.createdAt)} · humeur {entry.mood}/5 · énergie {entry.energy}/5</small></div></article>) : <Empty text="Écris dans le journal pour faire apparaître les premières plantes."/>}</div>}

              {room === "grenier" && <div className="room-content"><h3>Les traces anciennes</h3>{oldMemories.length ? oldMemories.map((item) => <MemoryRow key={item.id} item={item} onTogglePin={onTogglePin} onDelete={onDelete}/>) : <Empty text="Le Grenier se remplira avec le temps, sans précipiter l’oubli."/>}</div>}

              {room === "salon" && <div className="room-content salon-content"><div className="fireplace"><i/><i/><i/></div><h3>Près du feu</h3>{memories.filter((item) => item.pinned).length ? memories.filter((item) => item.pinned).map((item) => <MemoryRow key={item.id} item={item} onTogglePin={onTogglePin} onDelete={onDelete}/>) : <Empty text="Épingle un souvenir pour le garder près du feu."/>}</div>}

              {room === "balcon" && <div className="room-content"><h3>Le monde vu depuis la Maison</h3><div className="balcony-grid">{balconySummary(world).map((item) => <article key={item.label}><div><strong>{item.label}</strong><span>{item.value}/100</span></div><div className="progress"><i style={{ width: `${item.value}%` }}/></div><small>{item.note}</small></article>)}</div><p className="room-note">Ces valeurs pilotent des métaphores visuelles. Elles ne décrivent pas une vérité psychologique.</p></div>}

              {room === "cave" && <div className="room-content cave-content"><h3>Ce qui a été déposé à distance</h3><p className="room-note">La Cave ne qualifie pas ces moments. Elle les sépare seulement du reste de la maison pour qu’ils n’occupent pas tout l’espace.</p>{difficultEntries.length ? difficultEntries.map((entry) => <article className="house-item" key={entry.id}><span>◒</span><div><strong>{entry.note || "Un moment plus lourd"}</strong><small>{formatDate(entry.createdAt)} · humeur {entry.mood}/5 · charge sociale {entry.socialLoad}/5</small></div></article>) : <Empty text="Rien n’a été déposé ici pour le moment."/>}</div>}
            </main>

            <footer className="house-footer"><span>{Object.keys(houseState.visited).length}/7 pièces visitées</span><small>La Maison garde seulement une mémoire locale de tes visites.</small></footer>
          </section>
        </div>
      )}
    </section>
  );
}

function Empty({ text }: { text: string }) { return <p className="house-empty">{text}</p>; }

function MemoryRow({ item, onTogglePin, onDelete }: { item: MemoryItem; onTogglePin: (id: string) => void; onDelete: (id: string) => void }) {
  return <article className="house-item"><span>{item.kind === "creation" ? "✦" : item.kind === "report" ? "▤" : "❋"}</span><div><strong>{item.title}</strong><small>{formatDate(item.createdAt)} · {item.territory}</small>{item.body && <p>{item.body}</p>}<div className="house-item-actions"><button onClick={() => onTogglePin(item.id)}>{item.pinned ? "Retirer du feu" : "Garder près du feu"}</button>{item.kind === "creation" && <button onClick={() => onDelete(item.id)}>Supprimer</button>}</div></div></article>;
}
