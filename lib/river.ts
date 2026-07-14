export type RiverState = {
  x: number;
  progress: number;
  current: number;
  clarity: number;
  reflections: string[];
  answeredStoneQuestion: boolean;
  visits: number;
  updatedAt: string;
};

const KEY = "prisme.river-gameplay";

export const initialRiverState: RiverState = {
  x: 12,
  progress: 8,
  current: 48,
  clarity: 54,
  reflections: [],
  answeredStoneQuestion: false,
  visits: 0,
  updatedAt: new Date().toISOString()
};

export function loadRiverState(): RiverState {
  if (typeof window === "undefined") return initialRiverState;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Partial<RiverState> | null;
    return parsed ? { ...initialRiverState, ...parsed } : initialRiverState;
  } catch {
    return initialRiverState;
  }
}

export function saveRiverState(state: RiverState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function enterRiver(state: RiverState): RiverState {
  const next = { ...state, visits: state.visits + 1, updatedAt: new Date().toISOString() };
  saveRiverState(next);
  return next;
}

export function moveAlongRiver(state: RiverState, delta: number): RiverState {
  const x = Math.max(5, Math.min(95, state.x + delta));
  const next = { ...state, x, progress: Math.max(state.progress, Math.round(x)), updatedAt: new Date().toISOString() };
  saveRiverState(next);
  return next;
}

export function discoverReflection(state: RiverState, id: string): RiverState {
  if (state.reflections.includes(id)) return state;
  const next = {
    ...state,
    reflections: [...state.reflections, id],
    clarity: Math.min(100, state.clarity + 5),
    current: Math.min(100, state.current + 2),
    updatedAt: new Date().toISOString()
  };
  saveRiverState(next);
  return next;
}

export function answerStoneRitual(state: RiverState, optionIndex: number): RiverState {
  const effects = [
    { current: 4, clarity: 8 },
    { current: 8, clarity: 3 },
    { current: 2, clarity: 7 },
    { current: 6, clarity: 1 }
  ];
  const effect = effects[optionIndex] ?? effects[3];
  const next = {
    ...state,
    current: Math.min(100, state.current + effect.current),
    clarity: Math.min(100, state.clarity + effect.clarity),
    answeredStoneQuestion: true,
    reflections: state.reflections.includes("stone") ? state.reflections : [...state.reflections, "stone"],
    updatedAt: new Date().toISOString()
  };
  saveRiverState(next);
  return next;
}
