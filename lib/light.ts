export type DayPhase = "aube" | "jour" | "crépuscule" | "nuit";
export type VisualSeason = "printemps" | "été" | "automne" | "hiver";

export type LightState = {
  phase: DayPhase;
  season: VisualSeason;
  sunX: number;
  sunY: number;
  ambient: number;
  warmth: number;
  starOpacity: number;
  cloudOpacity: number;
  skyTop: string;
  skyBottom: string;
  sunColor: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function visualSeason(date = new Date()): VisualSeason {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "printemps";
  if (month >= 5 && month <= 7) return "été";
  if (month >= 8 && month <= 10) return "automne";
  return "hiver";
}

export function calculateLight(date = new Date(), skyEnergy = 50, mist = 10): LightState {
  const hour = date.getHours() + date.getMinutes() / 60;
  const daylight = clamp(Math.sin(((hour - 6) / 12) * Math.PI));
  const sunX = clamp((hour - 5.5) / 13) * 100;
  const sunY = 78 - daylight * 62;
  const phase: DayPhase = hour < 6.5 ? "nuit" : hour < 9 ? "aube" : hour < 18.5 ? "jour" : hour < 21 ? "crépuscule" : "nuit";
  const season = visualSeason(date);
  const energy = clamp(skyEnergy / 100);
  const haze = clamp(mist / 100);

  const palettes: Record<DayPhase, [string, string, string]> = {
    nuit: ["#07101d", "#14254a", "#bfd4ff"],
    aube: ["#1b2745", "#d78c75", "#ffe6a3"],
    jour: ["#3c78a3", "#9bc4ca", "#fff2c4"],
    crépuscule: ["#282a50", "#b06773", "#ffd0a5"]
  };
  const [skyTop, skyBottom, sunColor] = palettes[phase];

  return {
    phase,
    season,
    sunX,
    sunY,
    ambient: 0.32 + daylight * 0.68,
    warmth: phase === "aube" || phase === "crépuscule" ? 0.82 : phase === "jour" ? 0.35 : 0.08,
    starOpacity: clamp((1 - daylight) * (0.45 + energy * 0.55)),
    cloudOpacity: clamp(0.12 + haze * 0.55),
    skyTop,
    skyBottom,
    sunColor
  };
}
