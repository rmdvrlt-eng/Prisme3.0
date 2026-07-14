"use client";

import { useEffect, useState } from "react";
import { Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";
import { defaultEcosystem, EcosystemState, loadEcosystem } from "@/lib/ecosystem";
import { CompanionLifeState, defaultCompanionLife, loadCompanionLife } from "@/lib/companionLife";

type Props = {
  world: WorldState;
  report: Report | null;
  compact?: boolean;
};

function metric(report: Report | null, key: string, fallback = 50) {
  return report?.metrics.find(item => item.key === key)?.value ?? fallback;
}

export function EvolvingCompanion({ world, report, compact = false }: Props) {
  const [ecosystem, setEcosystem] = useState<EcosystemState>(defaultEcosystem());
  const [life, setLife] = useState<CompanionLifeState>(defaultCompanionLife());

  useEffect(() => {
    setEcosystem(loadEcosystem());
    setLife(loadCompanionLife());
    function refresh(event: Event) {
      const custom = event as CustomEvent<{ ecosystem?: EcosystemState }>;
      setEcosystem(custom.detail?.ecosystem ?? loadEcosystem());
    }
    function refreshLife(event: Event) {
      const custom = event as CustomEvent<{ companion?: CompanionLifeState }>;
      setLife(custom.detail?.companion ?? loadCompanionLife());
    }
    window.addEventListener("prisme:ecosystem-updated", refresh);
    window.addEventListener("prisme:companion-updated", refreshLife);
    return () => { window.removeEventListener("prisme:ecosystem-updated", refresh); window.removeEventListener("prisme:companion-updated", refreshLife); };
  }, []);

  const creativity = metric(report, "creativity", world.sky);
  const structure = metric(report, "structure", world.mountain);
  const sensitivity = metric(report, "sensitivity", world.garden);
  const anxiety = metric(report, "anxiety", world.mist);
  const meaning = metric(report, "meaning", world.memoryGlow);
  const empathy = metric(report, "empathy", 50);
  const evolution = Math.max(8, Math.min(100, Math.round(10 + world.answered * .44 + world.memoryGlow * .2 + ecosystem.companionGrowth * .2 + life.bond * .22 + life.interactions * .12)));
  const stage = evolution < 28 ? 1 : evolution < 52 ? 2 : evolution < 76 ? 3 : 4;

  const hue = Math.round(38 + creativity * .24);
  const warmth = Math.round(55 + sensitivity * .34);
  const calm = Math.max(.45, Math.min(1.22, 1 - anxiety / 170 + ecosystem.companionCalm / 240 + life.calm / 420));
  const aura = .58 + meaning / 185 + ecosystem.companionGrowth / 360 + life.light / 420;
  const openness = Math.round(16 + empathy * .19);
  const robeWidth = Math.round(58 + structure * .22);

  const style = {
    ["--companion-growth" as string]: String(.78 + evolution / 250),
    ["--companion-calm" as string]: String(calm),
    ["--companion-hue" as string]: `${hue}`,
    ["--companion-warmth" as string]: `${warmth}%`,
    ["--companion-aura" as string]: String(aura),
    ["--companion-openness" as string]: `${openness}deg`,
    ["--companion-robe" as string]: `${robeWidth}px`,
  };

  return (
    <div className={`evolving-companion-v2 stage-${stage}${compact ? " compact" : ""}`} style={style} aria-label={`Compagnon, évolution ${evolution}%`}>
      <svg className="companion-svg" viewBox="0 0 240 360" role="img" aria-hidden="true">
        <defs>
          <radialGradient id="companionCore" cx="48%" cy="35%" r="62%">
            <stop offset="0%" stopColor="#fffef3" />
            <stop offset="22%" stopColor={`hsl(${hue} 100% 86%)`} />
            <stop offset="58%" stopColor={`hsl(${hue - 8} ${warmth}% 61%)`} stopOpacity=".9" />
            <stop offset="100%" stopColor="#6f3b12" stopOpacity=".08" />
          </radialGradient>
          <linearGradient id="companionBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff9df" stopOpacity=".98" />
            <stop offset="38%" stopColor={`hsl(${hue} 88% 73%)`} stopOpacity=".82" />
            <stop offset="100%" stopColor={`hsl(${hue - 12} 64% 42%)`} stopOpacity=".06" />
          </linearGradient>
          <linearGradient id="robeLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff8d5" stopOpacity=".78" />
            <stop offset="50%" stopColor={`hsl(${hue} 92% 64%)`} stopOpacity=".34" />
            <stop offset="100%" stopColor="#ad621e" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="deepGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <ellipse className="companion-ground" cx="120" cy="330" rx="60" ry="13" />
        <ellipse className="companion-halo halo-large" cx="120" cy="178" rx="96" ry="128" />
        <ellipse className="companion-halo halo-small" cx="120" cy="150" rx="55" ry="82" />

        <g className="companion-rings" fill="none">
          <ellipse cx="120" cy="150" rx="83" ry="37" />
          <ellipse cx="120" cy="155" rx="45" ry="105" transform="rotate(24 120 155)" />
        </g>

        <g className="companion-figure" filter="url(#softGlow)">
          <g className="companion-head-group">
            <path className="companion-hair" d="M91 80C95 49 112 34 132 38c25 5 31 29 22 54-8-18-22-30-39-31-10 0-18 5-24 19Z" fill="url(#robeLight)" />
            <ellipse cx="121" cy="78" rx="29" ry="34" fill="url(#companionCore)" />
            <ellipse className="companion-face-glow" cx="120" cy="80" rx="14" ry="17" fill="#fff" opacity=".58" />
            <path className="companion-crown-line" d="M95 47c9-23 18-29 25-33m2 29c0-25 6-34 13-41m4 47c12-18 20-23 29-25" />
          </g>

          <path className="companion-neck-v2" d="M112 106h18l4 28h-26Z" fill="url(#companionBody)" />
          <path className="companion-torso-v2" d="M89 132c13-12 50-12 64 0 9 27 15 62 9 102-16 18-64 18-82 0-7-38 0-77 9-102Z" fill="url(#companionBody)" />

          <path className="companion-arm-v2 arm-v2-left" d="M91 140c-13 12-25 34-30 65-2 15 1 29 5 42" fill="none" stroke="url(#companionBody)" strokeWidth="12" strokeLinecap="round" />
          <path className="companion-arm-v2 arm-v2-right" d="M151 140c13 12 25 34 30 65 2 15-1 29-5 42" fill="none" stroke="url(#companionBody)" strokeWidth="12" strokeLinecap="round" />
          <circle className="companion-palm palm-left" cx="67" cy="248" r="9" fill="url(#companionCore)" />
          <circle className="companion-palm palm-right" cx="175" cy="248" r="9" fill="url(#companionCore)" />

          <path className="companion-robe-main" d="M78 213c13 12 27 18 43 18s31-6 43-18c13 31 18 66 14 112-31 15-84 15-116 0-3-45 3-82 16-112Z" fill="url(#robeLight)" />
          {Array.from({ length: 11 }).map((_, index) => (
            <path key={index} className="companion-robe-thread" style={{ ["--thread" as string]: index }} d={`M${84 + index * 7.4} 222 Q${76 + index * 9} 274 ${70 + index * 10.2} 330`} />
          ))}

          <circle className="companion-heart-v2" cx="121" cy="169" r="10" fill="#fff8bf" filter="url(#deepGlow)" />
          <path className="companion-spine-v2" d="M121 181v83" />
        </g>

        <g className="companion-particles-v2">
          {Array.from({ length: compact ? 14 : 32 }).map((_, index) => {
            const angle = (index / (compact ? 14 : 32)) * Math.PI * 2;
            const radius = 70 + (index % 6) * 12;
            const x = 120 + Math.cos(angle) * radius;
            const y = 170 + Math.sin(angle) * radius * .82;
            return <circle key={index} cx={x} cy={y} r={1 + (index % 3) * .45} style={{ ["--p" as string]: index }} />;
          })}
        </g>
      </svg>

      <div className="companion-evolution-badge" aria-hidden="true">
        <span>Présence</span>
        <strong>{evolution}%</strong>
        {ecosystem.streakDays > 1 && <small>{ecosystem.streakDays} jours de lien</small>}
      </div>
    </div>
  );
}
