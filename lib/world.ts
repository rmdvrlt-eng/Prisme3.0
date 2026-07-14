import { Answer, JournalEntry, Report } from "@/types/prisme";

export type WorldState = {
  version: 2;
  visits: number;
  answered: number;
  journalSeeds: number;
  reports: number;
  garden: number;
  river: number;
  sky: number;
  mountain: number;
  mist: number;
  wildness: number;
  memoryGlow: number;
  absenceDays: number;
  unlocked: string[];
  lastVisit: string;
  createdAt: string;
};

const KEY = "prisme.world";
const territories = ["jardin", "observatoire", "foret", "fleuve", "volcan", "sommets", "ciel", "temple"];
const thresholds = [0, 12, 28, 45, 65, 88, 112, 140];
const clamp = (value: number) => Math.max(5, Math.min(100, Math.round(value)));

export function defaultWorld(now = new Date()): WorldState {
  const iso = now.toISOString();
  return {
    version: 2,
    visits: 0,
    answered: 0,
    journalSeeds: 0,
    reports: 0,
    garden: 12,
    river: 18,
    sky: 15,
    mountain: 20,
    mist: 8,
    wildness: 12,
    memoryGlow: 8,
    absenceDays: 0,
    unlocked: ["jardin"],
    lastVisit: iso,
    createdAt: iso
  };
}

function elapsedDays(lastVisit: string, now: Date) {
  const previous = new Date(lastVisit).getTime();
  if (!Number.isFinite(previous)) return 0;
  return Math.max(0, Math.min(365, (now.getTime() - previous) / 86_400_000));
}

export function ageWorld(current: WorldState, now = new Date()): WorldState {
  const days = elapsedDays(current.lastVisit, now);
  if (days < 0.04) return { ...current, visits: current.visits + 1, absenceDays: days, lastVisit: now.toISOString() };
  return {
    ...current,
    visits: current.visits + 1,
    garden: clamp(current.garden + Math.min(7, days * 0.22)),
    wildness: clamp(current.wildness + Math.min(16, days * 0.7)),
    river: clamp(current.river + Math.min(4, days * 0.1)),
    mist: clamp(current.mist * Math.max(0.76, 1 - days * 0.018)),
    memoryGlow: clamp(current.memoryGlow + Math.min(5, Math.sqrt(days))),
    absenceDays: days,
    lastVisit: now.toISOString()
  };
}

export function loadWorld(): WorldState {
  if (typeof window === "undefined") return defaultWorld();
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultWorld();
  try {
    const parsed = JSON.parse(raw) as Partial<WorldState>;
    return ageWorld({ ...defaultWorld(), ...parsed, version: 2 });
  } catch {
    return defaultWorld();
  }
}

export function evolveWorld(current: WorldState, answers: Answer[], journal: JournalEntry[], reports: Report[]): WorldState {
  const answered = answers.filter((answer) => !answer.skipped).length;
  const score = answers.reduce<Record<string, number>>((acc, answer) => {
    Object.entries(answer.scores).forEach(([key, value]) => { acc[key] = (acc[key] ?? 0) + value; });
    return acc;
  }, {});
  const progress = answered + journal.length * 2 + reports.length * 8;
  const unlocked = territories.filter((_, index) => progress >= thresholds[index]);
  const recentJournal = journal.slice(0, 14);
  const average = (key: "mood" | "energy" | "clarity" | "socialLoad") => recentJournal.length
    ? recentJournal.reduce((sum, entry) => sum + entry[key], 0) / recentJournal.length
    : 3;

  return {
    ...current,
    answered,
    journalSeeds: journal.length,
    reports: reports.length,
    garden: clamp(15 + answered * 0.35 + (score.creativity ?? 0) * 1.5 + journal.length * 1.8),
    river: clamp(15 + reports.length * 12 + journal.length * 1.2 + (score.flexibility ?? 0) + average("clarity") * 2),
    sky: clamp(15 + (score.meaning ?? 0) * 2 + (score.symbolic ?? 0) * 1.4 + reports.length * 5),
    mountain: clamp(18 + (score.structure ?? 0) * 1.5 + (score.execution ?? 0) * 1.4 + reports.length * 5),
    mist: clamp(8 + Math.max(0, (score.anxiety ?? 0) * 1.7) + Math.max(0, score.rumination ?? 0) + (3 - average("mood")) * 5 - journal.length * 0.3),
    wildness: clamp(10 + current.wildness * 0.25 + Math.max(0, 3.2 - average("energy")) * 8),
    memoryGlow: clamp(10 + journal.length * 2 + reports.length * 10 + average("clarity") * 4),
    unlocked: unlocked.length ? unlocked : ["jardin"],
    lastVisit: new Date().toISOString()
  };
}

export function saveWorld(world: WorldState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(world));
}
