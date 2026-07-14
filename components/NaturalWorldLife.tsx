"use client";

import { PointerEvent, useMemo, useState } from "react";

type Trail = { id: number; x: number; y: number };

function Deer() {
  return <span className="wildlife deer" aria-hidden="true">
    <i className="body"/><i className="neck"/><i className="head"/><i className="ear ear-a"/><i className="ear ear-b"/>
    <i className="leg leg-a"/><i className="leg leg-b"/><i className="leg leg-c"/><i className="leg leg-d"/>
    <i className="tail"/><i className="eye"/>
  </span>;
}

function Fox() {
  return <span className="wildlife fox" aria-hidden="true">
    <i className="body"/><i className="head"/><i className="ear ear-a"/><i className="ear ear-b"/>
    <i className="leg leg-a"/><i className="leg leg-b"/><i className="tail"/><i className="eye eye-a"/><i className="eye eye-b"/>
  </span>;
}

function Owl() {
  return <span className="wildlife owl" aria-hidden="true">
    <i className="body"/><i className="head"/><i className="wing wing-a"/><i className="wing wing-b"/>
    <i className="eye eye-a"/><i className="eye eye-b"/><i className="beak"/>
  </span>;
}

export function NaturalWorldLife() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const grasses = useMemo(() => Array.from({ length: 34 }), []);
  const blossoms = useMemo(() => Array.from({ length: 16 }), []);
  const butterflies = useMemo(() => Array.from({ length: 7 }), []);

  function touchGround(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    setTrails((current) => [...current.slice(-8), { id, x, y }]);
    window.setTimeout(() => setTrails((current) => current.filter((item) => item.id !== id)), 1800);
  }

  return <div className="natural-world-life" aria-hidden="true">
    <div className="foreground-ground" onPointerDown={touchGround}>
      <div className="grass-field">{grasses.map((_, index) => <i key={index} style={{ ["--grass" as string]: index }}/>)}</div>
      <div className="blossom-field">{blossoms.map((_, index) => <i key={index} style={{ ["--blossom" as string]: index }}/>)}</div>
      {trails.map((trail) => <i className="ground-touch" key={trail.id} style={{ left: `${trail.x}%`, top: `${trail.y}%` }}/>) }
    </div>

    <div className="butterfly-flock">{butterflies.map((_, index) => <i key={index} style={{ ["--butterfly" as string]: index }}/>)}</div>
    <div className="animal-zone animal-deer"><Deer/></div>
    <div className="animal-zone animal-fox"><Fox/></div>
    <div className="animal-zone animal-owl"><Owl/></div>
    <div className="ambient-fire" aria-hidden="true"><i className="log log-a"/><i className="log log-b"/><i className="flame flame-a"/><i className="flame flame-b"/><i className="flame flame-c"/><b className="spark s1"/><b className="spark s2"/><b className="spark s3"/><span className="fire-aura"/></div>
  </div>;
}
