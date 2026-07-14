import { JournalEntry, MemoryItem, MemoryKind, Report } from "@/types/prisme";

const KEY = "prisme.memories";

function titleFromText(text: string, fallback: string) {
  const cleaned = text.trim().replace(/\s+/g, " ");
  if (!cleaned) return fallback;
  return cleaned.length > 48 ? `${cleaned.slice(0, 47)}…` : cleaned;
}

export function loadMemories(): MemoryItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as MemoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMemories(items: MemoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 500)));
}

export function syncGeneratedMemories(
  current: MemoryItem[],
  journal: JournalEntry[],
  reports: Report[]
): MemoryItem[] {
  const bySource = new Map(current.map((item) => [`${item.kind}:${item.sourceId}`, item]));
  const generated: MemoryItem[] = [];

  for (const entry of journal) {
    const key = `journal:${entry.id}`;
    generated.push(bySource.get(key) ?? {
      id: crypto.randomUUID(),
      sourceId: entry.id,
      kind: "journal",
      title: titleFromText(entry.note, "Une humeur déposée"),
      body: entry.note || `Humeur ${entry.mood}/5 · énergie ${entry.energy}/5 · clarté ${entry.clarity}/5`,
      createdAt: entry.createdAt,
      intensity: Math.round(((entry.mood + entry.energy + entry.clarity + (6 - entry.socialLoad)) / 20) * 100),
      territory: entry.socialLoad >= 4 ? "foret" : entry.clarity >= 4 ? "observatoire" : "jardin",
      pinned: false
    });
  }

  for (const report of reports) {
    const key = `report:${report.createdAt}`;
    generated.push(bySource.get(key) ?? {
      id: crypto.randomUUID(),
      sourceId: report.createdAt,
      kind: "report",
      title: report.mode,
      body: report.summary,
      createdAt: report.createdAt,
      intensity: Math.round(report.metrics.slice(0, 4).reduce((sum, metric) => sum + metric.value, 0) / Math.max(1, Math.min(4, report.metrics.length))),
      territory: report.season.name.includes("Hiver") ? "sommets" : report.season.name.includes("Printemps") ? "jardin" : report.season.name.includes("Été") ? "ciel" : "fleuve",
      pinned: false
    });
  }

  const manual = current.filter((item) => item.kind === "creation");
  return [...manual, ...generated].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function createMemory(kind: MemoryKind, title: string, body: string, territory: MemoryItem["territory"]): MemoryItem {
  return {
    id: crypto.randomUUID(),
    sourceId: crypto.randomUUID(),
    kind,
    title: title.trim() || "Souvenir sans titre",
    body: body.trim(),
    createdAt: new Date().toISOString(),
    intensity: 70,
    territory,
    pinned: false
  };
}
