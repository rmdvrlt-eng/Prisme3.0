"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateLight } from "@/lib/light";
import { WorldState } from "@/lib/world";
import { MemoryItem } from "@/types/prisme";

const lands = [
  ["jardin", "Le Jardin", "✤"], ["observatoire", "L’Observatoire", "⌁"],
  ["foret", "La Forêt", "♧"], ["fleuve", "Le Fleuve", "≈"],
  ["volcan", "Le Volcan", "▲"], ["sommets", "Les Sommets", "△"],
  ["ciel", "Le Ciel", "✦"], ["temple", "Le Temple", "◇"]
] as const;

function seasonLabel(season: string) {
  return { printemps: "Printemps", été: "Été", automne: "Automne", hiver: "Hiver" }[season] ?? season;
}

export function WorldMemory({ world, memories }: { world: WorldState; memories: MemoryItem[] }) {
  const [now, setNow] = useState(() => new Date());
  const [focus, setFocus] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const light = useMemo(() => calculateLight(now, world.sky, world.mist), [now, world.sky, world.mist]);
  const treeCount = Math.max(12, Math.round(12 + world.garden / 4));
  const starCount = Math.max(8, Math.round(8 + world.sky / 3.2));
  const flowerCount = Math.max(5, Math.round(world.journalSeeds * 1.4 + world.garden / 8));
  const visibleMemories = memories.slice(0, 24);

  const style = {
    ["--garden" as string]: `${world.garden}%`,
    ["--river" as string]: `${world.river}%`,
    ["--sky" as string]: `${world.sky}%`,
    ["--mountain" as string]: `${world.mountain}%`,
    ["--mist" as string]: world.mist / 100,
    ["--wildness" as string]: world.wildness / 100,
    ["--memory-glow" as string]: world.memoryGlow / 100,
    ["--sun-x" as string]: `${light.sunX}%`,
    ["--sun-y" as string]: `${light.sunY}%`,
    ["--ambient" as string]: light.ambient,
    ["--warmth" as string]: light.warmth,
    ["--stars" as string]: light.starOpacity,
    ["--clouds" as string]: light.cloudOpacity,
    ["--sky-top" as string]: light.skyTop,
    ["--sky-bottom" as string]: light.skyBottom,
    ["--sun-color" as string]: light.sunColor
  } as React.CSSProperties;

  return (
    <section className="world-memory">
      <div className="world-heading">
        <div><span className="card-kicker">Monde-mémoire</span><h2>Ton monde se souvient</h2></div>
        <div className="world-time"><strong>{light.phase}</strong><span>{seasonLabel(light.season)} · {now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span></div>
      </div>

      <div className={`memory-landscape season-${light.season} phase-${light.phase}`} style={style} onPointerLeave={() => setFocus(null)}>
        <div className="memory-sky" />
        <div className="memory-stars">{Array.from({ length: starCount }).map((_, i) => <i key={i} style={{ left: `${4 + ((i * 37) % 92)}%`, top: `${5 + ((i * 53) % 55)}%`, width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`, animationDelay: `${-(i % 7) * .4}s` }} />)}</div>
        <div className="memory-sun" />
        <div className="memory-cloud c1" /><div className="memory-cloud c2" />
        <div className="memory-mist" />
        <button className="world-hotspot mountain-spot" onPointerEnter={() => setFocus("Montagnes : structure et mise en action")} aria-label="Montagnes" />
        <div className="memory-mountain a" /><div className="memory-mountain b" />
        <button className="world-hotspot river-spot" onPointerEnter={() => setFocus("Fleuve : mémoire, clarté et évolution")} aria-label="Fleuve" />
        <div className="memory-river"><i /><i /><i /></div>
        <div className="memory-garden">{Array.from({ length: treeCount }).map((_, i) => <i key={i} style={{ height: `${58 + ((i * 29) % 43)}%`, animationDelay: `${-(i % 6) * .35}s` }} />)}</div>
        <div className="memory-flowers">{Array.from({ length: flowerCount }).map((_, i) => <i key={i} style={{ left: `${3 + ((i * 41) % 94)}%`, bottom: `${(i * 23) % 46}%`, background: `hsl(${42 + ((i * 47) % 260)}, 75%, 72%)`, animationDelay: `${-(i % 5) * .4}s` }} />)}</div>
        <button className="world-hotspot garden-spot" onPointerEnter={() => setFocus("Jardin : réponses, créations et journal")} aria-label="Jardin" />
        <div className="memory-traces">{visibleMemories.map((memory, index) => <button key={memory.id} className={`trace trace-${memory.kind}`} style={{ left: `${8 + ((index * 29) % 84)}%`, bottom: `${8 + ((index * 17) % 54)}%`, opacity: .45 + memory.intensity / 190 }} onPointerEnter={() => setFocus(`${memory.title} · ${new Date(memory.createdAt).toLocaleDateString("fr-FR")}`)} aria-label={memory.title}>{memory.kind === "journal" ? "✤" : memory.kind === "report" ? "◇" : "✦"}</button>)}</div>
        <div className="memory-light-presence" />
        {focus && <div className="world-tooltip">{focus}</div>}
      </div>

      <p className="world-caption">Le cycle lumineux suit ton heure locale. Les transformations du paysage restent des métaphores artistiques reliées à tes données déclarées.</p>
      <div className="world-stats"><span>{world.visits} visites</span><span>{world.answered} réponses</span><span>{world.journalSeeds} graines-journal</span><span>{world.reports} explorations</span></div>
      <div className="unlock-grid">{lands.map(([id, title, icon]) => {
        const open = world.unlocked.includes(id);
        return <article className={open ? "unlocked" : "locked"} key={id}><b>{icon}</b><span>{title}</span><i>{open ? "Ouvert" : "En sommeil"}</i></article>;
      })}</div>
    </section>
  );
}
