export type CompanionInteraction = "silence" | "breathe" | "share" | "walk" | "light";

export type CompanionMemory = {
  id: string;
  createdAt: string;
  text: string;
};

export type CompanionLifeState = {
  bond: number;
  calm: number;
  curiosity: number;
  light: number;
  interactions: number;
  lastInteractionAt?: string;
  daily: Record<string, CompanionInteraction[]>;
  memories: CompanionMemory[];
};

const KEY = "prisme.companion.life.v1";

export const companionInteractions: Record<CompanionInteraction, { label: string; description: string; symbol: string }> = {
  silence: { label: "Rester en silence", description: "Vous observez le monde ensemble, sans chercher à le remplir.", symbol: "◌" },
  breathe: { label: "Respirer ensemble", description: "Une respiration lente stabilise sa lumière et la tienne.", symbol: "◎" },
  share: { label: "Partager une pensée", description: "Tu lui confies une phrase qu’il gardera comme une petite lumière.", symbol: "✦" },
  walk: { label: "Partir marcher", description: "Vous suivez un sentier et laissez le paysage changer autour de vous.", symbol: "⌁" },
  light: { label: "Offrir de la lumière", description: "Un geste symbolique qui renforce votre lien pour aujourd’hui.", symbol: "☼" }
};

export function defaultCompanionLife(): CompanionLifeState {
  return { bond: 12, calm: 46, curiosity: 38, light: 34, interactions: 0, daily: {}, memories: [] };
}

export function loadCompanionLife(): CompanionLifeState {
  if (typeof window === "undefined") return defaultCompanionLife();
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultCompanionLife();
  try {
    const parsed = JSON.parse(raw) as Partial<CompanionLifeState>;
    return { ...defaultCompanionLife(), ...parsed, daily: parsed.daily ?? {}, memories: parsed.memories ?? [] };
  } catch {
    return defaultCompanionLife();
  }
}

export function saveCompanionLife(state: CompanionLifeState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function interactWithCompanion(state: CompanionLifeState, action: CompanionInteraction, text?: string) {
  const today = new Date().toISOString().slice(0, 10);
  const done = state.daily[today] ?? [];
  const already = done.includes(action);
  const delta = already ? 1 : 5;
  const memories = action === "share" && text?.trim()
    ? [{ id: crypto.randomUUID(), createdAt: new Date().toISOString(), text: text.trim() }, ...state.memories].slice(0, 24)
    : state.memories;

  const next: CompanionLifeState = {
    ...state,
    bond: Math.min(100, state.bond + delta),
    calm: Math.min(100, state.calm + (action === "silence" || action === "breathe" ? (already ? 1 : 7) : 2)),
    curiosity: Math.min(100, state.curiosity + (action === "walk" || action === "share" ? (already ? 1 : 6) : 1)),
    light: Math.min(100, state.light + (action === "light" ? (already ? 1 : 8) : 2)),
    interactions: state.interactions + 1,
    lastInteractionAt: new Date().toISOString(),
    daily: { ...state.daily, [today]: already ? done : [...done, action] },
    memories
  };
  return { state: next, repeated: already };
}
