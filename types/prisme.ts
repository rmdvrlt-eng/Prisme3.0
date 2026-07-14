export type ScoreMap = Record<string, number>;

export type Option = {
  text: string;
  scores: ScoreMap;
};

export type Question = {
  id: string;
  moduleId: string;
  scene: string;
  prompt: string;
  options: Option[];
};

export type PrismeModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
};

export type Answer = {
  questionId: string;
  moduleId: string;
  optionIndex: number;
  optionText: string;
  scores: ScoreMap;
  skipped?: boolean;
};

export type Session = {
  id: string;
  mode: string;
  questionIds: string[];
  index: number;
  answers: Answer[];
  startedAt: string;
};

export type Metric = {
  key: string;
  label: string;
  value: number;
  confidence: number;
};

export type EvidenceItem = {
  questionId: string;
  moduleId: string;
  prompt: string;
  answer: string;
  contribution: number;
};

export type PsychologyStatement = {
  id: string;
  level: "observation" | "hypothesis" | "professional";
  title: string;
  body: string;
  confidence: number;
  axes: string[];
  alternatives: string[];
  evidence: EvidenceItem[];
};

export type Report = {
  createdAt: string;
  mode: string;
  metrics: Metric[];
  insights: { title: string; body: string }[];
  interactions: string[];
  psychology: PsychologyStatement[];
  season: { name: string; symbol: string; description: string };
  archetypes: { name: string; score: number; description: string }[];
  exercises: { title: string; duration: string; body: string }[];
  summary: string;
};

export type JournalEntry = {
  id: string;
  createdAt: string;
  mood: number;
  energy: number;
  clarity: number;
  socialLoad: number;
  note: string;
};

export type MemoryKind = "journal" | "report" | "creation";

export type MemoryItem = {
  id: string;
  sourceId: string;
  kind: MemoryKind;
  title: string;
  body: string;
  createdAt: string;
  intensity: number;
  territory: "jardin" | "observatoire" | "foret" | "fleuve" | "volcan" | "sommets" | "ciel" | "temple";
  pinned: boolean;
};

export type NarrativeEffect = "growth" | "light" | "flow" | "stone" | "mist" | "stars" | "fire" | "bridge";

export type NarrativeEvent = {
  id: string;
  questionId: string;
  moduleId: string;
  choice: string;
  effect: NarrativeEffect;
  intensity: number;
  createdAt: string;
};

export type CompanionSource = {
  statementId: string;
  title: string;
  level: PsychologyStatement["level"];
  confidence: number;
  evidence: EvidenceItem[];
};

export type CompanionMessage = {
  id: string;
  role: "user" | "companion";
  text: string;
  createdAt: string;
  sources?: CompanionSource[];
  boundary?: boolean;
};
