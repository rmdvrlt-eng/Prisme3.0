"use client";

import { PointerEvent, useMemo, useState } from "react";

type Ripple = { id: number; x: number; y: number };

export function EnvironmentalLife() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const leaves = useMemo(() => Array.from({ length: 18 }), []);
  const fireflies = useMemo(() => Array.from({ length: 16 }), []);
  const birds = useMemo(() => Array.from({ length: 5 }), []);

  function touchWater(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    setRipples((current) => [...current.slice(-5), { id, x, y }]);
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== id)), 2100);
  }

  return (
    <div className="environmental-life" aria-hidden="true">
      <div className="wind-canopy canopy-near" />
      <div className="wind-canopy canopy-far" />
      <div className="bird-flock">
        {birds.map((_, index) => <i key={index} style={{ ["--bird" as string]: index }} />)}
      </div>
      <div className="falling-leaves">
        {leaves.map((_, index) => <i key={index} style={{ ["--leaf" as string]: index }} />)}
      </div>
      <div className="firefly-field">
        {fireflies.map((_, index) => <i key={index} style={{ ["--fly" as string]: index }} />)}
      </div>
      <div className="interactive-water" onPointerDown={touchWater}>
        <div className="water-caustics" />
        {ripples.map((ripple) => (
          <i className="touch-ripple" key={ripple.id} style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }} />
        ))}
      </div>
      <div className="living-mist mist-one" />
      <div className="living-mist mist-two" />
    </div>
  );
}
