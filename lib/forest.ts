export type ForestState = {
  x: number;
  y: number;
  rhythm: number;
  pathClarity: number;
  rest: number;
  discoveries: string[];
  answeredPathQuestion: boolean;
  visits: number;
  updatedAt: string;
};

const KEY = "prisme.forest-gameplay";

export const initialForestState: ForestState = {
  x: 48,
  y: 77,
  rhythm: 46,
  pathClarity: 42,
  rest: 58,
  discoveries: [],
  answeredPathQuestion: false,
  visits: 0,
  updatedAt: new Date().toISOString()
};

export function loadForestState(): ForestState {
  if (typeof window === "undefined") return initialForestState;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Partial<ForestState> | null;
    return parsed ? { ...initialForestState, ...parsed } : initialForestState;
  } catch {
    return initialForestState;
  }
}

export function saveForestState(state: ForestState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function enterForest(state: ForestState): ForestState {
  const next = { ...state, visits: state.visits + 1, updatedAt: new Date().toISOString() };
  saveForestState(next);
  return next;
}

export function moveInForest(state: ForestState, dx: number, dy: number): ForestState {
  const next = {
    ...state,
    x: Math.max(7, Math.min(93, state.x + dx)),
    y: Math.max(18, Math.min(90, state.y + dy)),
    updatedAt: new Date().toISOString()
  };
  saveForestState(next);
  return next;
}

export function discoverForestPlace(state: ForestState, id: string): ForestState {
  if (state.discoveries.includes(id)) return state;
  const effects: Record<string, Partial<ForestState>> = {
    clearing: { rest: Math.min(100, state.rest + 8) },
    stones: { pathClarity: Math.min(100, state.pathClarity + 8) },
    grove: { rhythm: Math.min(100, state.rhythm + 7) },
    cabin: { rest: Math.min(100, state.rest + 5), rhythm: Math.min(100, state.rhythm + 4) }
  };
  const next = {
    ...state,
    ...effects[id],
    discoveries: [...state.discoveries, id],
    updatedAt: new Date().toISOString()
  };
  saveForestState(next);
  return next;
}

export function answerPathRitual(state: ForestState, optionIndex: number): ForestState {
  const effects = [
    { rhythm: 9, pathClarity: 3, rest: 2 },
    { rhythm: 4, pathClarity: 8, rest: 1 },
    { rhythm: 2, pathClarity: 3, rest: 9 },
    { rhythm: 7, pathClarity: 1, rest: 4 }
  ];
  const effect = effects[optionIndex] ?? effects[3];
  const next = {
    ...state,
    rhythm: Math.min(100, state.rhythm + effect.rhythm),
    pathClarity: Math.min(100, state.pathClarity + effect.pathClarity),
    rest: Math.min(100, state.rest + effect.rest),
    answeredPathQuestion: true,
    discoveries: state.discoveries.includes("stones") ? state.discoveries : [...state.discoveries, "stones"],
    updatedAt: new Date().toISOString()
  };
  saveForestState(next);
  return next;
}
