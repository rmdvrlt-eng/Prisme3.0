import { JournalEntry, PsychologyStatement, Report } from "@/types/prisme";
import { WorldState } from "@/lib/world";

export type PresenceTrigger = "profile-change" | "journal-trend" | "return" | "territory" | "milestone";

export type PresenceEvent = {
  id: string;
  signature: string;
  trigger: PresenceTrigger;
  title: string;
  text: string;
  createdAt: string;
  sourceLabel: string;
  sourceDetail: string;
  statement?: PsychologyStatement;
};

export type PresenceState = {
  lastShownAt?: string;
  seenSignatures: string[];
  dismissedIds: string[];
};

const KEY = "prisme.presence";
const COOLDOWN_MS = 72 * 60 * 60 * 1000;

export function loadPresenceState(): PresenceState {
  if (typeof window === "undefined") return { seenSignatures: [], dismissedIds: [] };
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { seenSignatures: [], dismissedIds: [], ...JSON.parse(raw) } : { seenSignatures: [], dismissedIds: [] };
  } catch {
    return { seenSignatures: [], dismissedIds: [] };
  }
}

export function savePresenceState(state: PresenceState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify({
    ...state,
    seenSignatures: state.seenSignatures.slice(-80),
    dismissedIds: state.dismissedIds.slice(-80)
  }));
}

function metric(report: Report | undefined, key: string) {
  return report?.metrics.find(item => item.key === key);
}

function elapsedDays(iso?: string) {
  if (!iso) return Infinity;
  const time = new Date(iso).getTime();
  return Number.isFinite(time) ? Math.max(0, (Date.now() - time) / 86_400_000) : Infinity;
}

function cooldownPassed(state: PresenceState) {
  if (!state.lastShownAt) return true;
  return Date.now() - new Date(state.lastShownAt).getTime() >= COOLDOWN_MS;
}

function makeEvent(input: Omit<PresenceEvent, "id" | "createdAt">): PresenceEvent {
  return { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
}

function profileChange(history: Report[]): PresenceEvent | null {
  const [latest, previous] = history;
  if (!latest || !previous) return null;
  const candidates = latest.metrics
    .map(current => {
      const before = previous.metrics.find(item => item.key === current.key);
      return before ? { current, before, delta: current.value - before.value } : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter(item => item.current.confidence >= 60 && item.before.confidence >= 60 && Math.abs(item.delta) >= 14)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));

  const change = candidates[0];
  if (!change) return null;
  const direction = change.delta > 0 ? "plus présente" : "moins présente";
  const statement = latest.psychology?.find(item => item.axes.includes(change.current.key));
  return makeEvent({
    signature: `profile:${change.current.key}:${Math.sign(change.delta)}:${Math.round(Math.abs(change.delta) / 5)}`,
    trigger: "profile-change",
    title: "Quelque chose semble avoir bougé.",
    text: `Dans les deux dernières passations, la dimension « ${change.current.label.toLowerCase()} » apparaît ${direction}. Ce mouvement mérite peut-être seulement d’être observé, sans lui donner trop vite une signification.`,
    sourceLabel: "Comparaison de deux rapports",
    sourceDetail: `${change.before.value}/100 puis ${change.current.value}/100, avec des niveaux de confiance de ${change.before.confidence}% et ${change.current.confidence}%.`,
    statement
  });
}

function journalTrend(journal: JournalEntry[]): PresenceEvent | null {
  if (journal.length < 6) return null;
  const recent = journal.slice(0, 3);
  const earlier = journal.slice(3, 6);
  const average = (items: JournalEntry[], key: "mood" | "energy" | "clarity" | "socialLoad") => items.reduce((sum, item) => sum + item[key], 0) / items.length;
  const fields = [
    { key: "energy" as const, label: "énergie" },
    { key: "mood" as const, label: "humeur" },
    { key: "clarity" as const, label: "clarté mentale" },
    { key: "socialLoad" as const, label: "charge sociale" }
  ];
  const changes = fields.map(field => ({ ...field, delta: average(recent, field.key) - average(earlier, field.key) }))
    .filter(item => Math.abs(item.delta) >= 1.15)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const change = changes[0];
  if (!change) return null;
  const rising = change.delta > 0;
  const wording = change.key === "socialLoad"
    ? rising ? "semble plus lourde" : "semble plus légère"
    : rising ? "semble remonter" : "semble diminuer";
  return makeEvent({
    signature: `journal:${change.key}:${Math.sign(change.delta)}:${Math.round(Math.abs(change.delta) * 2)}`,
    trigger: "journal-trend",
    title: "Le rythme récent n’est pas tout à fait le même.",
    text: `Dans tes six dernières entrées, ta ${change.label} ${wording}. Ce n’est qu’une courte tendance, mais elle peut valoir un moment d’attention.`,
    sourceLabel: "Six entrées récentes du journal",
    sourceDetail: `Écart moyen observé : ${Math.abs(change.delta).toFixed(1)} point sur 5 entre les trois entrées récentes et les trois précédentes.`
  });
}

function returnEvent(world: WorldState): PresenceEvent | null {
  const days = world.absenceDays ?? elapsedDays(world.lastVisit);
  if (days < 21) return null;
  const band = days >= 90 ? "season" : days >= 45 ? "long" : "short";
  return makeEvent({
    signature: `return:${band}`,
    trigger: "return",
    title: "Le monde a continué sans te presser.",
    text: `Environ ${Math.round(days)} jours se sont écoulés depuis ta dernière visite. La végétation a suivi son cours et les traces sont restées à leur place.`,
    sourceLabel: "Temps écoulé entre deux visites",
    sourceDetail: `Dernière visite enregistrée : ${new Date(world.lastVisit).toLocaleDateString("fr-FR")}.`
  });
}

function territoryEvent(world: WorldState): PresenceEvent | null {
  if (world.unlocked.length < 2) return null;
  const latest = world.unlocked[world.unlocked.length - 1];
  return makeEvent({
    signature: `territory:${latest}`,
    trigger: "territory",
    title: "Un nouveau chemin est devenu visible.",
    text: `Le territoire « ${latest} » est maintenant accessible. Ce déverrouillage reflète seulement le temps consacré à l’exploration, pas une réussite psychologique.`,
    sourceLabel: "Progression dans l’expérience",
    sourceDetail: `${world.answered} réponses, ${world.journalSeeds} entrées de journal et ${world.reports} rapport(s) ont contribué à l’ouverture.`
  });
}

function milestoneEvent(world: WorldState): PresenceEvent | null {
  const milestones = [150, 100, 50, 25];
  const reached = milestones.find(value => world.answered >= value);
  if (!reached) return null;
  return makeEvent({
    signature: `milestone:${reached}`,
    trigger: "milestone",
    title: "Beaucoup de chemins ont déjà été parcourus.",
    text: `${reached} réponses ont maintenant laissé une trace dans le monde. Cette quantité améliore la couverture du portrait, sans transformer les résultats en certitudes.`,
    sourceLabel: "Historique de la passation",
    sourceDetail: `${world.answered} réponses non ignorées sont actuellement enregistrées.`
  });
}

export function selectPresenceEvent(input: {
  history: Report[];
  journal: JournalEntry[];
  world: WorldState;
  state: PresenceState;
}): PresenceEvent | null {
  if (!cooldownPassed(input.state)) return null;
  const candidates = [
    profileChange(input.history),
    journalTrend(input.journal),
    returnEvent(input.world),
    territoryEvent(input.world),
    milestoneEvent(input.world)
  ].filter((event): event is PresenceEvent => Boolean(event));

  return candidates.find(event => !input.state.seenSignatures.includes(event.signature)) ?? null;
}

export function markPresenceShown(state: PresenceState, event: PresenceEvent): PresenceState {
  return {
    ...state,
    lastShownAt: new Date().toISOString(),
    seenSignatures: [...state.seenSignatures, event.signature]
  };
}

export function dismissPresence(state: PresenceState, event: PresenceEvent): PresenceState {
  return { ...state, dismissedIds: [...state.dismissedIds, event.id] };
}
