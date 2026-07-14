import { Answer, EvidenceItem, PsychologyStatement, Report } from "@/types/prisme";
import { modules } from "@/data/modules";
import { branches } from "@/data/branches";

const labels: Record<string, string> = {
  meaning: "Recherche de sens", creativity: "Créativité", sensitivity: "Sensibilité émotionnelle",
  symbolic: "Pensée symbolique", depth: "Besoin de profondeur", innerWorld: "Monde intérieur",
  structure: "Besoin de structure", execution: "Mise en action", flexibility: "Flexibilité",
  avoidance: "Évitement", analysis: "Analyse", anxiety: "Anxiété anticipatoire", rumination: "Rumination",
  adhdAttention: "Inattention exploratoire", attentionVariability: "Variabilité attentionnelle",
  executiveDifficulty: "Difficultés exécutives", impulsivity: "Impulsivité", childhoodAdhd: "Indices dans l’enfance",
  motivationVariability: "Motivation dépendante de l’intérêt", rejectionSensitivity: "Sensibilité au rejet",
  perfectionism: "Perfectionnisme", sensorySensitivity: "Sensibilité sensorielle",
  autisticTraits: "Traits autistiques exploratoires", specialInterests: "Intérêts intenses",
  lowMood: "Baisse d’élan", innerRestlessness: "Agitation intérieure", empathy: "Empathie",
  attachmentIntensity: "Intensité relationnelle", introversion: "Besoin de solitude",
  visualThinking: "Pensée visuelle", divergence: "Pensée divergente",
  complexityTolerance: "Tolérance à la complexité", habitStability: "Stabilité des habitudes",
  sleepStability: "Régularité du sommeil", purpose: "Sentiment de direction",
  aesthetic: "Sensibilité esthétique", achievement: "Orientation réussite", planning: "Planification",
  workingMemory: "Mémoire de travail", assertiveness: "Assertivité",
  attachmentSecurity: "Sécurité relationnelle", masking: "Masquage social",
  cognitiveRigidity: "Rigidité cognitive", values: "Fidélité aux valeurs",
  identityExploration: "Exploration identitaire", independence: "Autonomie",
  novelty: "Besoin de nouveauté", boundaries: "Limites relationnelles"
};

const questionBank = [...modules.flatMap((module) => module.questions), ...Object.values(branches).flatMap((branch) => branch.questions)];
const questionMap = new Map(questionBank.map((question) => [question.id, question]));

export function rawScores(answers: Answer[]) {
  const raw: Record<string, number> = {};
  const counts: Record<string, number> = {};
  for (const answer of answers) {
    for (const [key, value] of Object.entries(answer.scores)) {
      raw[key] = (raw[key] ?? 0) + value;
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return { raw, counts };
}

function normalize(raw: number, count: number) {
  const denom = Math.max(2, count * 2.2);
  return Math.round(50 + Math.max(-1, Math.min(1, raw / denom)) * 50);
}

function evidenceFor(answers: Answer[], axes: string[], limit = 5): EvidenceItem[] {
  return answers
    .map((answer) => {
      const contribution = axes.reduce((sum, axis) => sum + (answer.scores[axis] ?? 0), 0);
      const question = questionMap.get(answer.questionId);
      return {
        questionId: answer.questionId,
        moduleId: answer.moduleId,
        prompt: question ? `${question.scene} ${question.prompt}` : answer.questionId,
        answer: answer.optionText,
        contribution
      };
    })
    .filter((item) => item.contribution !== 0)
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, limit);
}

export function buildReport(answers: Answer[], mode: string): Report {
  const { raw, counts } = rawScores(answers);
  const metrics = Object.entries(raw)
    .filter(([key]) => labels[key] && (counts[key] ?? 0) >= 2)
    .map(([key, value]) => ({ key, label: labels[key], value: normalize(value, counts[key]), confidence: Math.min(95, 35 + (counts[key] ?? 0) * 9) }))
    .sort((a, b) => (b.value * b.confidence) - (a.value * a.confidence));

  const v = (key: string) => metrics.find((metric) => metric.key === key)?.value ?? 50;
  const c = (key: string) => metrics.find((metric) => metric.key === key)?.confidence ?? 0;
  const reliable = (key: string, threshold = 65) => v(key) >= threshold && c(key) >= 50;
  const psychology: PsychologyStatement[] = [];
  const add = (statement: Omit<PsychologyStatement, "evidence">) => psychology.push({ ...statement, evidence: evidenceFor(answers, statement.axes) });

  if (reliable("meaning")) add({ id: "obs-meaning", level: "observation", title: "L’engagement semble dépendre du sens", body: "Tu as souvent choisi des réponses où la cohérence personnelle et la portée profonde soutiennent l’élan.", confidence: c("meaning"), axes: ["meaning"], alternatives: ["Ce résultat peut aussi refléter les thèmes particuliers des questions rencontrées."] });
  if (reliable("creativity")) add({ id: "obs-creativity", level: "observation", title: "La création ressort comme une ressource", body: "Plusieurs réponses associent les émotions, les idées ou les périodes de vide à une activité créative.", confidence: c("creativity"), axes: ["creativity", "symbolic"], alternatives: ["La créativité déclarée ne renseigne pas à elle seule sur la fréquence ou la concrétisation réelle."] });
  if (reliable("anxiety")) add({ id: "obs-anxiety", level: "observation", title: "Une anticipation importante apparaît", body: "Tes réponses indiquent que certaines situations sont préparées mentalement longtemps avant l’action.", confidence: c("anxiety"), axes: ["anxiety", "rumination"], alternatives: ["Une période ponctuellement stressante, le sommeil ou le contexte actuel peuvent accentuer ces réponses."] });
  if (reliable("sensorySensitivity")) add({ id: "obs-sensory", level: "observation", title: "Les stimulations semblent coûteuses", body: "Le bruit, la foule ou les signaux multiples paraissent mobiliser une part notable de ton énergie.", confidence: c("sensorySensitivity"), axes: ["sensorySensitivity"], alternatives: ["La fatigue, l’anxiété et certains environnements peuvent augmenter temporairement cette sensibilité."] });

  if (reliable("adhdAttention") && reliable("executiveDifficulty")) {
    const childhood = reliable("childhoodAdhd", 60);
    add({ id: "hyp-attention", level: "hypothesis", title: childhood ? "Une piste TDAH mérite d’être examinée" : "Des difficultés attentionnelles actuelles ressortent", body: childhood ? "L’association entre attention fluctuante, difficultés exécutives et indices anciens est compatible avec une piste TDAH, sans permettre de conclure." : "L’attention et la mise en action semblent difficiles actuellement, mais les éléments anciens sont trop faibles pour orienter spécifiquement vers un TDAH.", confidence: Math.min(c("adhdAttention"), c("executiveDifficulty"), childhood ? c("childhoodAdhd") : 70), axes: ["adhdAttention", "executiveDifficulty", "childhoodAdhd"], alternatives: ["Anxiété", "Sommeil insuffisant", "Baisse d’humeur", "Surcharge ou environnement peu stimulant", "Stress chronique"] });
  }
  if (reliable("autisticTraits") && reliable("sensorySensitivity", 60)) add({ id: "hyp-autism", level: "hypothesis", title: "Des traits neurodéveloppementaux peuvent être explorés", body: "La combinaison de sensorialité, besoin de clarté, routines ou décalage social peut être compatible avec plusieurs profils, dont un TSA, mais elle est très peu spécifique.", confidence: Math.min(c("autisticTraits"), c("sensorySensitivity")), axes: ["autisticTraits", "sensorySensitivity", "masking", "cognitiveRigidity"], alternatives: ["Introversion", "Anxiété sociale", "Haute sensibilité", "Expériences relationnelles", "Fatigue ou surcharge"] });
  if (reliable("rejectionSensitivity") && reliable("rumination", 60)) add({ id: "hyp-rejection", level: "hypothesis", title: "Les relations peuvent prolonger l’activation émotionnelle", body: "Les changements de ton ou de proximité semblent parfois rester longtemps présents dans l’esprit.", confidence: Math.min(c("rejectionSensitivity"), c("rumination")), axes: ["rejectionSensitivity", "rumination"], alternatives: ["Contexte relationnel réellement instable", "Attachement", "Stress actuel", "Expériences passées"] });

  if (psychology.some((item) => item.id === "hyp-attention")) add({ id: "pro-attention", level: "professional", title: "À discuter lors d’une évaluation attentionnelle", body: "Un professionnel pourrait explorer l’enfance, le retentissement dans plusieurs domaines, le sommeil, l’humeur, l’anxiété et les stratégies de compensation.", confidence: 100, axes: ["adhdAttention", "executiveDifficulty", "childhoodAdhd"], alternatives: [] });
  if (psychology.some((item) => item.id === "hyp-autism")) add({ id: "pro-autism", level: "professional", title: "À discuter lors d’une évaluation neurodéveloppementale", body: "Une évaluation sérieuse examinerait le développement précoce, la communication sociale, les routines, la sensorialité, le masquage et le retentissement quotidien.", confidence: 100, axes: ["autisticTraits", "sensorySensitivity", "masking"], alternatives: [] });
  if (reliable("lowMood", 70) || reliable("anxiety", 78)) add({ id: "pro-distress", level: "professional", title: "Un échange professionnel peut être utile si cela te fait souffrir", body: "Un score exploratoire ne mesure ni la gravité ni l’urgence. Le critère important est le retentissement réel sur ta vie et ta souffrance.", confidence: 100, axes: ["lowMood", "anxiety"], alternatives: [] });

  if (!psychology.some((item) => item.level === "observation")) add({ id: "obs-balanced", level: "observation", title: "Aucune tendance fortement étayée", body: "Les réponses ne font pas ressortir un axe dominant avec un niveau de confiance suffisant.", confidence: 65, axes: [], alternatives: ["Un module plus complet ou une passation à un autre moment pourrait donner une image différente."] });

  const insights = psychology.filter((item) => item.level !== "professional").map(({ title, body }) => ({ title, body }));
  const interactions: string[] = [];
  if (reliable("meaning") && v("execution") < 45) interactions.push("Sens élevé + mise en action plus faible : l’écart entre vision et régularité peut devenir une source de frustration.");
  if (reliable("anxiety") && reliable("avoidance", 60)) interactions.push("Anxiété + évitement : certaines procrastinations peuvent venir du stress plus que d’un déficit attentionnel.");
  if (reliable("creativity") && reliable("attentionVariability", 60)) interactions.push("Créativité + attention variable : l’intérêt semble amplifier fortement la concentration.");
  if (!interactions.length) interactions.push("Aucune interaction forte et suffisamment fiable ne ressort pour le moment.");

  const archetypes = [
    { name: "Le Créateur", score: Math.round(v("creativity")*.55+v("symbolic")*.25+v("sensitivity")*.2), description: "Transformer l’expérience en forme." },
    { name: "Le Sage", score: Math.round(v("analysis")*.55+v("meaning")*.25+v("complexityTolerance")*.2), description: "Comprendre avant d’agir." },
    { name: "L’Explorateur", score: Math.round(v("flexibility")*.4+v("novelty")*.35+v("independence")*.25), description: "Ouvrir de nouveaux chemins." },
    { name: "Le Protecteur", score: Math.round(v("empathy")*.45+v("attachmentSecurity")*.3+v("boundaries")*.25), description: "Préserver les liens et les repères." },
    { name: "Le Visionnaire", score: Math.round(v("meaning")*.4+v("purpose")*.35+v("symbolic")*.25), description: "Relier le présent à une direction." },
    { name: "Le Bâtisseur", score: Math.round(v("execution")*.45+v("structure")*.35+v("planning")*.2), description: "Donner une forme stable aux intentions." }
  ].sort((a,b)=>b.score-a.score).slice(0,3);

  const energy=100-v("lowMood");
  const season=energy<45||v("anxiety")>75?{name:"Hiver intérieur",symbol:"❄",description:"Réduire la pression, protéger l’énergie et revenir à l’essentiel."}:v("creativity")>70&&v("execution")<60?{name:"Printemps intérieur",symbol:"✿",description:"Beaucoup de possibles émergent ; le défi est de choisir ce qui mérite de grandir."}:v("execution")>68&&v("purpose")>62?{name:"Été intérieur",symbol:"☀",description:"L’énergie, la direction et l’action semblent mieux alignées."}:{name:"Automne intérieur",symbol:"◒",description:"Une période propice au tri, à l’intégration et à la transformation."};

  const exercises: Report["exercises"]=[];
  if(v("execution")<48||v("executiveDifficulty")>65)exercises.push({title:"L’action de deux minutes",duration:"2 min",body:"Réduis une tâche évitée à une première action presque trop simple pour échouer."});
  if(v("anxiety")>65||v("rumination")>65)exercises.push({title:"Fait, interprétation, besoin",duration:"5 min",body:"Écris ce qui est objectivement arrivé, ce que tu en conclus, puis ce dont tu as besoin."});
  if(v("sensorySensitivity")>65)exercises.push({title:"La chambre basse",duration:"10 min",body:"Crée un espace à faible stimulation : lumière douce, silence et téléphone éloigné."});
  if(!exercises.length)exercises.push({title:"L’observation douce",duration:"4 min",body:"Note une situation récente, ton émotion, ton besoin et la plus petite action utile."});

  const top=metrics.filter(metric=>metric.confidence>=50).slice(0,3);
  return {createdAt:new Date().toISOString(),mode,metrics,insights,interactions,psychology,season,archetypes,exercises:exercises.slice(0,4),summary:top.length?`Les axes les plus saillants sont : ${top.map(metric=>metric.label.toLowerCase()).join(", ")}.`:"Les données sont encore trop limitées pour isoler des axes fiables."};
}
