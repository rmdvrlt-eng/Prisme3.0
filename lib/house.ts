import { JournalEntry, MemoryItem, Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";

export type HouseRoomId = "bibliotheque" | "atelier" | "serre" | "grenier" | "salon" | "balcon" | "cave";

export type HouseVisitState = {
  visited: Partial<Record<HouseRoomId, string>>;
  lastRoom?: HouseRoomId;
};

const KEY = "prisme.house";

export const rooms: { id: HouseRoomId; title: string; subtitle: string; symbol: string; description: string }[] = [
  { id: "bibliotheque", title: "La Bibliothèque", subtitle: "Rapports et compréhension", symbol: "▤", description: "Les stèles du parcours deviennent des volumes que l’on peut rouvrir." },
  { id: "atelier", title: "L’Atelier", subtitle: "Créations et élans", symbol: "✦", description: "Chansons, rêves, idées et projets prennent une place dans la maison." },
  { id: "serre", title: "La Serre", subtitle: "Journal et croissance", symbol: "❋", description: "Les entrées du journal deviennent des plantes et des graines de mémoire." },
  { id: "grenier", title: "Le Grenier", subtitle: "Traces anciennes", symbol: "⌂", description: "Les souvenirs les plus anciens restent accessibles sans envahir le présent." },
  { id: "salon", title: "Le Salon", subtitle: "Près du feu", symbol: "◉", description: "Les souvenirs épinglés sont rassemblés dans un espace calme et familier." },
  { id: "balcon", title: "Le Balcon", subtitle: "Vue sur le monde", symbol: "⌁", description: "Une lecture simple de l’état actuel du Jardin, du Fleuve, du Ciel et des Montagnes." },
  { id: "cave", title: "La Cave", subtitle: "Déposer ce qui pèse", symbol: "◒", description: "Un lieu volontaire pour conserver à distance les moments plus lourds, sans les effacer." }
];

export function loadHouseState(): HouseVisitState {
  if (typeof window === "undefined") return { visited: {} };
  const raw = localStorage.getItem(KEY);
  if (!raw) return { visited: {} };
  try { return JSON.parse(raw) as HouseVisitState; } catch { return { visited: {} }; }
}

export function visitRoom(state: HouseVisitState, room: HouseRoomId): HouseVisitState {
  const next = { ...state, lastRoom: room, visited: { ...state.visited, [room]: new Date().toISOString() } };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function roomCount(room: HouseRoomId, memories: MemoryItem[], journal: JournalEntry[], reports: Report[]) {
  if (room === "bibliotheque") return reports.length;
  if (room === "atelier") return memories.filter((item) => item.kind === "creation").length;
  if (room === "serre") return journal.length;
  if (room === "grenier") return memories.filter((item) => Date.now() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24 * 30).length;
  if (room === "salon") return memories.filter((item) => item.pinned).length;
  if (room === "cave") return journal.filter((entry) => entry.mood <= 2 || entry.socialLoad >= 5).length;
  return 1;
}

export function balconySummary(world: WorldState) {
  return [
    { label: "Jardin", value: world.garden, note: "croissance et création" },
    { label: "Fleuve", value: world.river, note: "mémoire et continuité" },
    { label: "Ciel", value: world.sky, note: "sens et imagination" },
    { label: "Montagnes", value: world.mountain, note: "structure et action" },
    { label: "Brume", value: world.mist, note: "charge et incertitude" }
  ];
}
