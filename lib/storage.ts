import { CompanionMessage, JournalEntry, Report, Session } from "@/types/prisme";

const SESSION = "prisme.session";
const HISTORY = "prisme.history";
const JOURNAL = "prisme.journal";
const COMPANION = "prisme.companion";

export function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION);
  return raw ? JSON.parse(raw) : null;
}
export function saveSession(session: Session) {
  localStorage.setItem(SESSION, JSON.stringify(session));
}
export function clearSession() {
  localStorage.removeItem(SESSION);
}
export function loadHistory(): Report[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY);
  return raw ? JSON.parse(raw) : [];
}
export function saveReport(report: Report) {
  const history = loadHistory();
  localStorage.setItem(HISTORY, JSON.stringify([report, ...history].slice(0, 20)));
}
export function loadJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(JOURNAL);
  return raw ? JSON.parse(raw) : [];
}
export function saveJournal(entries: JournalEntry[]) {
  localStorage.setItem(JOURNAL, JSON.stringify(entries.slice(0, 180)));
}

export function loadCompanionMessages(): CompanionMessage[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(COMPANION);
  return raw ? JSON.parse(raw) : [];
}
export function saveCompanionMessages(messages: CompanionMessage[]) {
  localStorage.setItem(COMPANION, JSON.stringify(messages.slice(-80)));
}
export function clearCompanionMessages() {
  localStorage.removeItem(COMPANION);
}
