"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateLight } from "@/lib/light";
import { WorldState } from "@/lib/world";

type Drop = { id: number; left: number; delay: number; duration: number };

export function DynamicAtmosphere({ world }: { world: WorldState }) {
  const [now, setNow] = useState(() => new Date());
  const light = useMemo(() => calculateLight(now, world.sky, world.mist), [now, world.sky, world.mist]);
  const rainStrength = Math.max(0, Math.min(1, (world.mist + world.wildness - 75) / 95));
  const windStrength = Math.max(.18, Math.min(1, .22 + world.wildness / 120));
  const waterEnergy = Math.max(.25, Math.min(1, world.river / 90));
  const drops = useMemo<Drop[]>(() => Array.from({ length: 54 }, (_, id) => ({
    id,
    left: (id * 37) % 100,
    delay: -((id * .17) % 3),
    duration: .68 + (id % 8) * .055
  })), []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const style = {
    ["--sky-top" as string]: light.skyTop,
    ["--sky-bottom" as string]: light.skyBottom,
    ["--sun-color" as string]: light.sunColor,
    ["--sun-x" as string]: `${light.sunX}%`,
    ["--sun-y" as string]: `${light.sunY}%`,
    ["--ambient" as string]: String(light.ambient),
    ["--warmth" as string]: String(light.warmth),
    ["--stars" as string]: String(light.starOpacity),
    ["--clouds" as string]: String(light.cloudOpacity),
    ["--rain" as string]: String(rainStrength),
    ["--wind" as string]: String(windStrength),
    ["--water-energy" as string]: String(waterEnergy)
  };

  return (
    <div className={`dynamic-atmosphere phase-${light.phase} season-${light.season}`} style={style} aria-hidden="true">
      <div className="atmosphere-sky" />
      <div className="atmosphere-stars">
        {Array.from({ length: 42 }).map((_, index) => <i key={index} style={{ ["--star" as string]: index }} />)}
      </div>
      <div className="atmosphere-sun" />
      <div className="atmosphere-cloud cloud-a" />
      <div className="atmosphere-cloud cloud-b" />
      <div className="atmosphere-cloud cloud-c" />
      <div className="atmosphere-rain">
        {drops.map(drop => <i key={drop.id} style={{ left: `${drop.left}%`, animationDelay: `${drop.delay}s`, animationDuration: `${drop.duration}s` }} />)}
      </div>
      <div className="atmosphere-water-depth">
        <i className="water-band band-a" /><i className="water-band band-b" /><i className="water-band band-c" />
        <div className="water-glints">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ ["--glint" as string]: index }} />)}</div>
      </div>
      <div className="weather-vignette" />
    </div>
  );
}
