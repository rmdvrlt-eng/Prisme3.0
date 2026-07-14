"use client";

import { useMemo, useState } from "react";
import { MemoryItem } from "@/types/prisme";

const territoryNames: Record<MemoryItem["territory"], string> = {
  jardin: "Jardin", observatoire: "Observatoire", foret: "Forêt", fleuve: "Fleuve",
  volcan: "Volcan", sommets: "Sommets", ciel: "Ciel", temple: "Temple"
};

const kindNames: Record<MemoryItem["kind"], string> = {
  journal: "Graine", report: "Stèle", creation: "Constellation"
};

export function MemoryArchive({
  memories,
  onCreate,
  onTogglePin,
  onDelete
}: {
  memories: MemoryItem[];
  onCreate: (title: string, body: string, territory: MemoryItem["territory"]) => void;
  onTogglePin: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | MemoryItem["kind"]>("all");
  const [selected, setSelected] = useState<MemoryItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [territory, setTerritory] = useState<MemoryItem["territory"]>("ciel");

  const visible = useMemo(() => memories
    .filter((item) => filter === "all" || item.kind === filter)
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || +new Date(b.createdAt) - +new Date(a.createdAt)), [memories, filter]);

  function submit() {
    if (!title.trim() && !body.trim()) return;
    onCreate(title, body, territory);
    setTitle(""); setBody(""); setCreating(false);
  }

  return (
    <section className="memory-archive glass">
      <div className="memory-head">
        <div><span className="kicker">Memory Engine</span><h2>La galerie des traces</h2><p>Le journal devient graine, chaque rapport devient stèle, chaque création devient constellation.</p></div>
        <button className="primary memory-create" onClick={() => setCreating(!creating)}>{creating ? "Fermer" : "Ajouter une création"}</button>
      </div>

      {creating && <div className="memory-form">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Titre de la création" />
        <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Une chanson, un rêve, une idée, un souvenir…" />
        <select value={territory} onChange={(event) => setTerritory(event.target.value as MemoryItem["territory"])}>
          {Object.entries(territoryNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
        </select>
        <button className="primary" onClick={submit}>Transformer en constellation</button>
      </div>}

      <div className="memory-filters">
        {(["all", "journal", "report", "creation"] as const).map((value) => <button className={filter === value ? "active" : ""} key={value} onClick={() => setFilter(value)}>{value === "all" ? "Tout" : kindNames[value]}</button>)}
      </div>

      <div className="memory-grid">
        {visible.length === 0 ? <p>Aucune trace n’est encore apparue.</p> : visible.map((item) => <button className={`memory-card kind-${item.kind} ${item.pinned ? "pinned" : ""}`} key={item.id} onClick={() => setSelected(item)}>
          <span className="memory-symbol">{item.kind === "journal" ? "✤" : item.kind === "report" ? "◇" : "✦"}</span>
          <small>{kindNames[item.kind]} · {territoryNames[item.territory]}</small>
          <strong>{item.title}</strong>
          <p>{item.body}</p>
          <i style={{ opacity: .3 + item.intensity / 145 }} />
        </button>)}
      </div>

      {selected && <div className="memory-modal" onClick={() => setSelected(null)}>
        <article onClick={(event) => event.stopPropagation()}>
          <button className="memory-close" onClick={() => setSelected(null)}>×</button>
          <span className="memory-symbol large">{selected.kind === "journal" ? "✤" : selected.kind === "report" ? "◇" : "✦"}</span>
          <small>{kindNames[selected.kind]} · {territoryNames[selected.territory]} · {new Date(selected.createdAt).toLocaleDateString("fr-FR")}</small>
          <h2>{selected.title}</h2><p>{selected.body || "Cette trace est silencieuse."}</p>
          <div className="memory-actions"><button onClick={() => onTogglePin(selected.id)}>{selected.pinned ? "Retirer des favoris" : "Garder près du feu"}</button>{selected.kind === "creation" && <button className="danger" onClick={() => { onDelete(selected.id); setSelected(null); }}>Supprimer</button>}</div>
        </article>
      </div>}
    </section>
  );
}
