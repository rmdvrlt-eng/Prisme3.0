export type GardenState = {
  x: number;
  y: number;
  growth: number;
  water: number;
  light: number;
  visits: number;
  discoveries: string[];
  answeredTreeQuestion: boolean;
  updatedAt: string;
};

const KEY = "prisme.garden-gameplay";

export const initialGardenState: GardenState = {
  x: 50,
  y: 78,
  growth: 34,
  water: 46,
  light: 52,
  visits: 0,
  discoveries: [],
  answeredTreeQuestion: false,
  updatedAt: new Date().toISOString()
};

export function loadGardenState(): GardenState {
  if (typeof window === "undefined") return initialGardenState;
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Partial<GardenState> | null;
    return parsed ? { ...initialGardenState, ...parsed } : initialGardenState;
  } catch {
    return initialGardenState;
  }
}

export function saveGardenState(state: GardenState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function enterGarden(state: GardenState): GardenState {
  const next = { ...state, visits: state.visits + 1, updatedAt: new Date().toISOString() };
  saveGardenState(next);
  return next;
}

export function discoverGardenObject(state: GardenState, id: string): GardenState {
  if (state.discoveries.includes(id)) return state;
  const next = {
    ...state,
    discoveries: [...state.discoveries, id],
    growth: Math.min(100, state.growth + (id === "tree" ? 5 : id === "flowers" ? 4 : 2)),
    water: Math.min(100, state.water + (id === "pond" ? 6 : 0)),
    light: Math.min(100, state.light + (id === "lantern" ? 7 : 0)),
    updatedAt: new Date().toISOString()
  };
  saveGardenState(next);
  return next;
}

export function answerTreeRitual(state: GardenState, optionIndex: number): GardenState {
  const effects = [
    { growth: 8, water: 1, light: 2 },
    { growth: 3, water: 8, light: 1 },
    { growth: 5, water: 3, light: 7 },
    { growth: 2, water: 2, light: 4 }
  ];
  const effect = effects[optionIndex] ?? effects[3];
  const next = {
    ...state,
    growth: Math.min(100, state.growth + effect.growth),
    water: Math.min(100, state.water + effect.water),
    light: Math.min(100, state.light + effect.light),
    answeredTreeQuestion: true,
    discoveries: state.discoveries.includes("tree") ? state.discoveries : [...state.discoveries, "tree"],
    updatedAt: new Date().toISOString()
  };
  saveGardenState(next);
  return next;
}
