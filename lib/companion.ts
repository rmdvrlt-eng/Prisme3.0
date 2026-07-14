import { CompanionMessage, CompanionSource, PsychologyStatement, Report } from "@/types/prisme";

const diagnosticTerms = [
  "diagnostic", "diagnostique", "suis-je tdah", "suis je tdah", "suis-je autiste", "suis je autiste",
  "ai-je un tdah", "ai je un tdah", "ai-je un tsa", "ai je un tsa", "quel trouble", "maladie mentale"
];

const crisisTerms = ["suicide", "me tuer", "mourir", "envie de mourir", "me faire du mal", "automutil"];

const topicRules: { terms: string[]; statementIds: string[]; fallback: string }[] = [
  {
    terms: ["procrast", "commencer", "agir", "action", "motivation", "organisation"],
    statementIds: ["hyp-attention", "obs-meaning", "obs-anxiety"],
    fallback: "Pour comprendre ce blocage, observe ce qui arrive juste avant : ennui, peur de mal faire, fatigue, absence de sens ou difficulté à découper la tâche."
  },
  {
    terms: ["attention", "concentr", "tdah", "dispers", "oubli"],
    statementIds: ["hyp-attention", "pro-attention", "obs-anxiety"],
    fallback: "Les difficultés d’attention peuvent avoir plusieurs causes. Il faut regarder leur ancienneté, leur présence dans plusieurs contextes et leur retentissement réel."
  },
  {
    terms: ["autis", "tsa", "décal", "different", "différent", "social", "sensor"],
    statementIds: ["hyp-autism", "pro-autism", "obs-sensory"],
    fallback: "Un sentiment de décalage ou une sensibilité sensorielle ne suffit pas à identifier un profil neurodéveloppemental. Le contexte et l’histoire de vie comptent beaucoup."
  },
  {
    terms: ["anxi", "stress", "peur", "rumin", "inquiet"],
    statementIds: ["obs-anxiety", "pro-distress", "hyp-rejection"],
    fallback: "Distingue le fait observable, le scénario anticipé et le besoin présent. Cette séparation peut rendre l’expérience plus lisible."
  },
  {
    terms: ["rejet", "relation", "message", "froid", "aband", "attachement"],
    statementIds: ["hyp-rejection", "obs-anxiety"],
    fallback: "Dans une situation relationnelle, sépare ce que l’autre a réellement fait de ce que ton esprit en déduit. Les deux peuvent être importants, mais ce ne sont pas les mêmes données."
  },
  {
    terms: ["créativ", "créer", "inspiration", "musique", "écrire"],
    statementIds: ["obs-creativity", "obs-meaning"],
    fallback: "Ta créativité peut être explorée comme une ressource, sans en faire une obligation de produire."
  },
  {
    terms: ["sens", "mission", "vocation", "direction", "pourquoi"],
    statementIds: ["obs-meaning", "obs-creativity"],
    fallback: "La recherche de sens peut soutenir l’engagement, mais elle peut aussi rendre les tâches ordinaires plus difficiles à investir."
  },
  {
    terms: ["fatigue", "vide", "humeur", "triste", "énergie"],
    statementIds: ["pro-distress", "obs-anxiety", "obs-sensory"],
    fallback: "Avant une interprétation psychologique, observe le sommeil, le rythme, la charge sociale, les événements récents et la durée de cet état."
  }
];

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function toSource(statement: PsychologyStatement): CompanionSource {
  return {
    statementId: statement.id,
    title: statement.title,
    level: statement.level,
    confidence: statement.confidence,
    evidence: statement.evidence.slice(0, 3)
  };
}

function chooseStatements(report: Report, question: string) {
  const normalized = normalize(question);
  const rule = topicRules.find(item => item.terms.some(term => normalized.includes(normalize(term))));
  const ids = rule?.statementIds ?? [];
  const selected = ids
    .map(id => report.psychology?.find(statement => statement.id === id))
    .filter((statement): statement is PsychologyStatement => Boolean(statement));

  if (selected.length) return { selected: selected.slice(0, 2), fallback: rule?.fallback ?? "" };

  const observations = (report.psychology ?? [])
    .filter(statement => statement.level === "observation")
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 2);
  return { selected: observations, fallback: rule?.fallback ?? "" };
}

export function answerCompanion(question: string, report: Report | null): CompanionMessage {
  const normalized = normalize(question);
  const createdAt = new Date().toISOString();

  if (crisisTerms.some(term => normalized.includes(normalize(term)))) {
    return {
      id: crypto.randomUUID(), role: "companion", createdAt, boundary: true,
      text: "Ce que tu décris peut nécessiter une aide humaine immédiate. Prisme ne peut pas assurer ta sécurité ni gérer une crise. Contacte maintenant une personne de confiance ou les services d’urgence de ton pays."
    };
  }

  if (diagnosticTerms.some(term => normalized.includes(normalize(term)))) {
    const relevant = report?.psychology?.filter(item => item.level === "hypothesis" || item.level === "professional").slice(0, 2) ?? [];
    return {
      id: crypto.randomUUID(), role: "companion", createdAt, boundary: true,
      text: "Je ne peux pas déterminer si tu as un trouble. Un diagnostic exige l’histoire complète, le retentissement, les diagnostics alternatifs et un entretien professionnel. Je peux seulement te montrer les pistes exploratoires présentes dans ce rapport.",
      sources: relevant.map(toSource)
    };
  }

  if (!report || !(report.psychology ?? []).length) {
    return {
      id: crypto.randomUUID(), role: "companion", createdAt,
      text: "Je n’ai pas encore de rapport traçable sur lequel m’appuyer. Je préfère ne rien inventer. Tu peux terminer un module, puis me reposer cette question."
    };
  }

  const { selected, fallback } = chooseStatements(report, question);
  if (!selected.length) {
    return {
      id: crypto.randomUUID(), role: "companion", createdAt,
      text: `Les données actuelles ne permettent pas de répondre précisément. ${fallback || "Essaie de décrire une situation concrète : ce qui s’est passé, ce que tu as ressenti et ce que tu as fait ensuite."}`
    };
  }

  const strongest = selected[0];
  const prefix = strongest.level === "observation"
    ? "À partir des réponses observées"
    : "Comme hypothèse prudente";
  const alternatives = strongest.alternatives.length
    ? ` D’autres explications restent possibles : ${strongest.alternatives.slice(0, 3).join(", ").toLowerCase()}.`
    : "";
  const reflection = fallback || "Observe dans quelles situations cette tendance apparaît, et dans lesquelles elle disparaît.";

  return {
    id: crypto.randomUUID(), role: "companion", createdAt,
    text: `${prefix}, ${strongest.body.charAt(0).toLowerCase()}${strongest.body.slice(1)}${alternatives} ${reflection}`,
    sources: selected.map(toSource)
  };
}
