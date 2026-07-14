import { NarrativeEffect, NarrativeEvent, Question } from "@/types/prisme";

const KEY = "prisme.narrative-events";

const moduleEffects: Record<string, NarrativeEffect[]> = {
  personnalite: ["light", "stars", "growth", "stone"],
  attention: ["flow", "stone", "mist", "light"],
  emotions: ["growth", "mist", "flow", "light"],
  relations: ["bridge", "growth", "light", "mist"],
  cognition: ["stars", "light", "stone", "flow"],
  neurodiversite: ["mist", "stars", "stone", "flow"],
  quotidien: ["stone", "growth", "flow", "light"],
  sens_identite: ["stars", "fire", "light", "growth"]
};

export function effectForChoice(question: Question, optionIndex: number): NarrativeEffect {
  const set = moduleEffects[question.moduleId] ?? moduleEffects.personnalite;
  return set[Math.max(0, optionIndex) % set.length];
}

export function createNarrativeEvent(question: Question, choice: string, optionIndex: number): NarrativeEvent {
  const values = optionIndex >= 0 ? Object.values(question.options[optionIndex]?.scores ?? {}) : [];
  const intensity = Math.max(1, Math.min(4, Math.round(values.reduce((sum, value) => sum + Math.abs(value), 0) / 2) || 1));
  return {
    id: crypto.randomUUID(),
    questionId: question.id,
    moduleId: question.moduleId,
    choice,
    effect: optionIndex < 0 ? "mist" : effectForChoice(question, optionIndex),
    intensity,
    createdAt: new Date().toISOString()
  };
}

export function loadNarrativeEvents(): NarrativeEvent[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as NarrativeEvent[]; } catch { return []; }
}

export function saveNarrativeEvents(events: NarrativeEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(events.slice(0, 500)));
}

export const narrativeCopy: Record<string, { place: string; invitation: string }> = {
  personnalite: { place: "L’Atelier du Soi", invitation: "Une forme cherche à apparaître dans la lumière." },
  attention: { place: "Le Labyrinthe de l’Attention", invitation: "Le chemin ne se révèle qu’au prochain pas." },
  emotions: { place: "Le Jardin des Émotions", invitation: "Quelque chose bouge sous les feuilles." },
  relations: { place: "La Galerie des Liens", invitation: "Deux rives attendent qu’un passage se dessine." },
  cognition: { place: "L’Observatoire de l’Esprit", invitation: "Une constellation demande à être reliée." },
  neurodiversite: { place: "La Chambre des Sens", invitation: "Le monde baisse la voix pour te laisser observer." },
  quotidien: { place: "La Maison des Rythmes", invitation: "Un sentier quotidien se forme sous tes pas." },
  sens_identite: { place: "La Bibliothèque du Sens", invitation: "Une page blanche s’éclaire au loin." }
};
