import { TerritoryId } from "@/lib/territory";

export type TerritoryRitualKind = "breath" | "gratitude" | "release" | "observe" | "focus" | "values" | "ground" | "create";

export type TerritoryRitual = {
  id: string;
  territory: TerritoryId;
  title: string;
  subtitle: string;
  prompt: string;
  kind: TerritoryRitualKind;
  icon: string;
  reward: string;
};

export type TerritoryInteractionState = {
  discovered: Partial<Record<TerritoryId, string[]>>;
  completed: Partial<Record<TerritoryId, string[]>>;
  points: Partial<Record<TerritoryId, number>>;
  lastCompleted?: string;
  updatedAt: string;
};

const KEY = "prisme.territory-interactions.v1";

export const territoryRituals: Record<TerritoryId, TerritoryRitual[]> = {
  jardin: [
    { id: "jardin-breath", territory: "jardin", title: "La fleur qui respire", subtitle: "Respiration", prompt: "Inspire lentement pendant quatre temps, puis expire pendant six.", kind: "breath", icon: "✤", reward: "Une nouvelle fleur s'ouvre dans le Jardin." },
    { id: "jardin-gratitude", territory: "jardin", title: "Le banc du soir", subtitle: "Gratitude", prompt: "Nomme une chose simple qui a adouci ta journée.", kind: "gratitude", icon: "◌", reward: "Une lumière chaude reste près du banc." },
    { id: "jardin-observe", territory: "jardin", title: "Le papillon immobile", subtitle: "Observation", prompt: "Observe un détail autour de toi pendant trente secondes, sans le commenter.", kind: "observe", icon: "⌁", reward: "Les papillons reviennent plus souvent." }
  ],
  fleuve: [
    { id: "fleuve-release", territory: "fleuve", title: "La feuille confiée au courant", subtitle: "Lâcher prise", prompt: "Écris mentalement ce que tu acceptes de ne pas résoudre aujourd'hui.", kind: "release", icon: "≈", reward: "Le courant emporte une feuille lumineuse." },
    { id: "fleuve-gratitude", territory: "fleuve", title: "Le reflet précieux", subtitle: "Souvenir", prompt: "Choisis un souvenir récent que tu souhaites garder intact.", kind: "gratitude", icon: "◇", reward: "Un reflet durable apparaît sur l'eau." },
    { id: "fleuve-observe", territory: "fleuve", title: "Écouter l'eau", subtitle: "Présence", prompt: "Reste quelques instants sans agir et laisse le rythme ralentir.", kind: "observe", icon: "◍", reward: "La surface du Fleuve devient plus claire." }
  ],
  foret: [
    { id: "foret-ground", territory: "foret", title: "Les cinq racines", subtitle: "Ancrage", prompt: "Repère cinq choses que tu vois, quatre que tu touches, trois que tu entends.", kind: "ground", icon: "♧", reward: "Le sentier devient plus stable sous tes pas." },
    { id: "foret-focus", territory: "foret", title: "La pierre du prochain pas", subtitle: "Action", prompt: "Choisis une action minuscule que tu peux accomplir en moins de deux minutes.", kind: "focus", icon: "▰", reward: "Une pierre lumineuse s'ajoute au sentier." },
    { id: "foret-observe", territory: "foret", title: "La clairière silencieuse", subtitle: "Pause", prompt: "Pose le téléphone un instant et relâche volontairement les épaules.", kind: "observe", icon: "◯", reward: "La clairière gagne en lumière." }
  ],
  observatoire: [
    { id: "observatoire-focus", territory: "observatoire", title: "L'étoile centrale", subtitle: "Clarté", prompt: "Formule en une phrase la question qui occupe le plus ton esprit.", kind: "focus", icon: "✦", reward: "Une constellation s'organise autour d'une étoile centrale." },
    { id: "observatoire-observe", territory: "observatoire", title: "Changer de focale", subtitle: "Recul", prompt: "Imagine la situation vue dans un mois, puis dans un an.", kind: "observe", icon: "⌁", reward: "Le télescope révèle un horizon plus large." },
    { id: "observatoire-values", territory: "observatoire", title: "La carte du ciel", subtitle: "Orientation", prompt: "Demande-toi quelle valeur tu veux protéger dans cette décision.", kind: "values", icon: "◇", reward: "Une ligne relie deux étoiles auparavant séparées." }
  ],
  temple: [
    { id: "temple-values", territory: "temple", title: "La flamme essentielle", subtitle: "Valeurs", prompt: "Choisis une valeur que tu veux incarner aujourd'hui par un geste concret.", kind: "values", icon: "◇", reward: "Une bougie s'allume dans le Temple." },
    { id: "temple-release", territory: "temple", title: "Déposer le masque", subtitle: "Authenticité", prompt: "Nomme une attente extérieure dont tu peux t'éloigner un peu aujourd'hui.", kind: "release", icon: "◐", reward: "La brume se retire autour des marches." },
    { id: "temple-gratitude", territory: "temple", title: "Le bassin des héritages", subtitle: "Transmission", prompt: "Pense à une qualité reçue d'une personne importante.", kind: "gratitude", icon: "◌", reward: "Le bassin reflète une lumière nouvelle." }
  ],
  sommets: [
    { id: "sommets-breath", territory: "sommets", title: "Le souffle d'altitude", subtitle: "Respiration", prompt: "Prends trois respirations lentes en allongeant l'expiration.", kind: "breath", icon: "△", reward: "Les nuages s'ouvrent au-dessus du sommet." },
    { id: "sommets-focus", territory: "sommets", title: "La ligne de crête", subtitle: "Priorité", prompt: "Choisis une seule priorité pour les prochaines heures.", kind: "focus", icon: "⌃", reward: "Le chemin de crête devient plus net." },
    { id: "sommets-observe", territory: "sommets", title: "Le grand silence", subtitle: "Clarté", prompt: "Reste dix secondes sans chercher à produire ni comprendre quoi que ce soit.", kind: "observe", icon: "○", reward: "La neige reflète davantage de lumière." }
  ],
  volcan: [
    { id: "volcan-ground", territory: "volcan", title: "La pierre froide", subtitle: "Régulation", prompt: "Pose les pieds au sol et relâche la mâchoire avant d'agir.", kind: "ground", icon: "▲", reward: "Une pierre sombre refroidit près de la lave." },
    { id: "volcan-release", territory: "volcan", title: "Nommer le feu", subtitle: "Émotion", prompt: "Donne un nom précis à l'énergie présente : colère, urgence, excitation ou peur.", kind: "release", icon: "◒", reward: "Le cratère devient moins opaque." },
    { id: "volcan-focus", territory: "volcan", title: "Canaliser la lave", subtitle: "Direction", prompt: "Choisis une action physique ou créative qui donnera une direction à cette énergie.", kind: "focus", icon: "↟", reward: "La lave forme un nouveau chemin stable." }
  ],
  ciel: [
    { id: "ciel-create", territory: "ciel", title: "La première étoile", subtitle: "Création", prompt: "Écris ou imagine quelque chose pendant deux minutes sans objectif de qualité.", kind: "create", icon: "✦", reward: "Une étoile personnelle apparaît dans le Ciel." },
    { id: "ciel-observe", territory: "ciel", title: "Relier les points", subtitle: "Imagination", prompt: "Relie mentalement deux idées qui n'ont apparemment rien en commun.", kind: "observe", icon: "⌁", reward: "Une constellation inédite prend forme." },
    { id: "ciel-gratitude", territory: "ciel", title: "L'idée à protéger", subtitle: "Intuition", prompt: "Choisis une idée fragile que tu veux garder vivante sans encore la juger.", kind: "gratitude", icon: "◈", reward: "Un halo protège une petite étoile." }
  ]
};

export function loadTerritoryInteractions(): TerritoryInteractionState {
  const empty: TerritoryInteractionState = { discovered: {}, completed: {}, points: {}, updatedAt: new Date().toISOString() };
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function saveTerritoryInteractions(state: TerritoryInteractionState) {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
}

export function discoverRitual(state: TerritoryInteractionState, ritual: TerritoryRitual): TerritoryInteractionState {
  const list = state.discovered[ritual.territory] ?? [];
  if (list.includes(ritual.id)) return state;
  const next = { ...state, discovered: { ...state.discovered, [ritual.territory]: [...list, ritual.id] }, updatedAt: new Date().toISOString() };
  saveTerritoryInteractions(next);
  return next;
}

export function completeRitual(state: TerritoryInteractionState, ritual: TerritoryRitual): TerritoryInteractionState {
  const today = new Date().toISOString().slice(0, 10);
  const token = `${ritual.id}:${today}`;
  const completed = state.completed[ritual.territory] ?? [];
  if (completed.includes(token)) return state;
  const next = {
    ...state,
    completed: { ...state.completed, [ritual.territory]: [...completed, token] },
    points: { ...state.points, [ritual.territory]: Math.min(100, (state.points[ritual.territory] ?? 0) + 12) },
    lastCompleted: token,
    updatedAt: new Date().toISOString()
  };
  saveTerritoryInteractions(next);
  return next;
}

export function ritualDoneToday(state: TerritoryInteractionState, ritual: TerritoryRitual) {
  const today = new Date().toISOString().slice(0, 10);
  return (state.completed[ritual.territory] ?? []).includes(`${ritual.id}:${today}`);
}
