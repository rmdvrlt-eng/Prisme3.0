import { loadSanctuary, saveSanctuary } from "@/lib/sanctuary";
import { loadWorld, saveWorld, WorldState } from "@/lib/world";

export type EcosystemEffectKind = "garden" | "home" | "companion" | "animal" | "river" | "sky" | "mountain" | "mist";

export type EcosystemState = {
  version: 1;
  gardenVitality: number;
  homeWarmth: number;
  companionGrowth: number;
  companionCalm: number;
  animalTrust: number;
  ritualCount: number;
  streakDays: number;
  lastActiveDay?: string;
  lastEffect?: {
    ritualId: string;
    ritualTitle: string;
    message: string;
    kinds: EcosystemEffectKind[];
    createdAt: string;
  };
  updatedAt: string;
};

export type RitualEffectInput = {
  id: string;
  title: string;
  kind: string;
  territory: string;
};

const KEY = "prisme.ecosystem.v1";
const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function defaultEcosystem(): EcosystemState {
  return {
    version: 1,
    gardenVitality: 16,
    homeWarmth: 22,
    companionGrowth: 10,
    companionCalm: 18,
    animalTrust: 8,
    ritualCount: 0,
    streakDays: 0,
    updatedAt: new Date().toISOString()
  };
}

export function loadEcosystem(): EcosystemState {
  if (typeof window === "undefined") return defaultEcosystem();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaultEcosystem(), ...JSON.parse(raw) } : defaultEcosystem();
  } catch {
    return defaultEcosystem();
  }
}

export function saveEcosystem(state: EcosystemState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

function streakFor(previousDay: string | undefined, today: string, current: number) {
  if (!previousDay) return 1;
  if (previousDay === today) return current;
  const delta = Math.round((new Date(`${today}T12:00:00`).getTime() - new Date(`${previousDay}T12:00:00`).getTime()) / 86_400_000);
  return delta === 1 ? current + 1 : 1;
}

function effectMessage(input: RitualEffectInput) {
  switch (input.kind) {
    case "breath": return "Le souffle apaise la présence, éclaircit la brume et réchauffe doucement la Maison.";
    case "gratitude": return "Une lumière nouvelle nourrit le Jardin et rapproche ton compagnon animal.";
    case "observe": return "Le monde ralentit : la présence devient plus calme et les détails du Jardin gagnent en netteté.";
    case "ground": return "Les racines se renforcent, la Maison paraît plus stable et ton compagnon se sent en sécurité.";
    case "focus": return "Un chemin se précise dans le monde et la présence gagne en densité.";
    case "values": return "Une flamme durable s’allume dans la Maison et le Ciel devient plus lisible.";
    case "release": return "La brume se retire, le Fleuve emporte une part de la tension et le foyer respire davantage.";
    case "create": return "Une étoile apparaît, le Jardin se colore et la présence devient plus lumineuse.";
    default: return `${input.title} laisse une trace visible dans ton monde.`;
  }
}

function effectsFor(input: RitualEffectInput): EcosystemEffectKind[] {
  switch (input.kind) {
    case "breath": return ["companion", "mist", "home"];
    case "gratitude": return ["garden", "animal", "home"];
    case "observe": return ["garden", "companion", "mist"];
    case "ground": return ["mountain", "home", "animal"];
    case "focus": return ["mountain", "companion", "sky"];
    case "values": return ["home", "sky", "companion"];
    case "release": return ["river", "mist", "home"];
    case "create": return ["sky", "garden", "companion"];
    default: return ["garden"];
  }
}

function evolveWorldForRitual(world: WorldState, input: RitualEffectInput): WorldState {
  const next = { ...world };
  switch (input.kind) {
    case "breath":
      next.mist = clamp(next.mist - 5);
      next.memoryGlow = clamp(next.memoryGlow + 2);
      break;
    case "gratitude":
      next.garden = clamp(next.garden + 5);
      next.memoryGlow = clamp(next.memoryGlow + 4);
      break;
    case "observe":
      next.garden = clamp(next.garden + 3);
      next.mist = clamp(next.mist - 3);
      break;
    case "ground":
      next.mountain = clamp(next.mountain + 5);
      next.wildness = clamp(next.wildness - 2);
      break;
    case "focus":
      next.mountain = clamp(next.mountain + 4);
      next.sky = clamp(next.sky + 2);
      break;
    case "values":
      next.sky = clamp(next.sky + 5);
      next.memoryGlow = clamp(next.memoryGlow + 3);
      break;
    case "release":
      next.river = clamp(next.river + 5);
      next.mist = clamp(next.mist - 5);
      break;
    case "create":
      next.sky = clamp(next.sky + 6);
      next.garden = clamp(next.garden + 3);
      break;
  }
  next.lastVisit = new Date().toISOString();
  return next;
}

export function applyRitualToEcosystem(input: RitualEffectInput): EcosystemState {
  const current = loadEcosystem();
  const today = new Date().toISOString().slice(0, 10);
  const streakDays = streakFor(current.lastActiveDay, today, current.streakDays);
  const effects = effectsFor(input);

  const next: EcosystemState = {
    ...current,
    gardenVitality: clamp(current.gardenVitality + (effects.includes("garden") ? 5 : 1)),
    homeWarmth: clamp(current.homeWarmth + (effects.includes("home") ? 5 : 1)),
    companionGrowth: clamp(current.companionGrowth + (effects.includes("companion") ? 4 : 1)),
    companionCalm: clamp(current.companionCalm + (["breath", "observe", "release", "ground"].includes(input.kind) ? 5 : 1)),
    animalTrust: clamp(current.animalTrust + (effects.includes("animal") ? 5 : 1)),
    ritualCount: current.ritualCount + 1,
    streakDays,
    lastActiveDay: today,
    lastEffect: {
      ritualId: input.id,
      ritualTitle: input.title,
      message: effectMessage(input),
      kinds: effects,
      createdAt: new Date().toISOString()
    },
    updatedAt: new Date().toISOString()
  };

  saveEcosystem(next);

  const world = evolveWorldForRitual(loadWorld(), input);
  saveWorld(world);

  const sanctuary = loadSanctuary();
  const active = sanctuary.pet.active;
  const petBonus = effects.includes("animal") ? 3 : 1;
  const updatedSanctuary = {
    ...sanctuary,
    pet: {
      ...sanctuary.pet,
      bond: {
        ...sanctuary.pet.bond,
        [active]: clamp((sanctuary.pet.bond[active] ?? 0) + petBonus)
      }
    }
  };
  saveSanctuary(updatedSanctuary);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("prisme:ecosystem-updated", { detail: { ecosystem: next, world, sanctuary: updatedSanctuary } }));
  }
  return next;
}
