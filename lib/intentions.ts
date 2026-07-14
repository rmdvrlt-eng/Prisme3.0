export type CareAction = "breathe" | "gratitude" | "observe" | "walk" | "write" | "create";

export type Intention = {
  id: string;
  text: string;
  plantedAt: string;
  carePoints: number;
  careLog: Record<string, CareAction[]>;
  lastCareAt?: string;
};

const KEY = "prisme.intentions.v1";

export const careActions: Record<CareAction, { label: string; icon: string; prompt: string }> = {
  breathe: { label: "Respirer", icon: "◌", prompt: "Prends une minute pour respirer lentement." },
  gratitude: { label: "Voir le positif", icon: "✦", prompt: "Note une chose positive de ta journée." },
  observe: { label: "Observer", icon: "◉", prompt: "Observe un détail beau ou vivant autour de toi." },
  walk: { label: "Marcher", icon: "⌁", prompt: "Marche quelques minutes en présence." },
  write: { label: "Écrire", icon: "✎", prompt: "Écris une phrase qui soutient ton intention." },
  create: { label: "Créer", icon: "◇", prompt: "Fais un petit geste créatif, même imparfait." }
};

export function loadIntentions(): Intention[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveIntentions(items: Intention[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 12)));
}

export function intentionStage(points: number) {
  if (points >= 10) return { key: "flower", label: "Fleurie", progress: 100 };
  if (points >= 6) return { key: "bud", label: "En bouton", progress: 72 };
  if (points >= 3) return { key: "sprout", label: "Jeune pousse", progress: 42 };
  return { key: "seed", label: "Graine", progress: Math.max(8, points * 12) };
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
