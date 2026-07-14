import { PsychologyStatement } from "@/types/prisme";

const meta = {
  observation: { label: "Observation", icon: "◎", description: "Directement reliée à tes choix dans cette passation." },
  hypothesis: { label: "Hypothèse", icon: "◇", description: "Interprétation possible, jamais une conclusion." },
  professional: { label: "À explorer", icon: "+", description: "Question qui demanderait un entretien ou une évaluation professionnelle." }
} as const;

export function PsychologyReport({ statements }: { statements?: PsychologyStatement[] }) {
  const safeStatements = statements ?? [];
  if (!safeStatements.length) {
    return <section className="glass psychology-engine"><span className="kicker">Psychology Engine</span><p>Aucune analyse traçable n’est disponible pour cet ancien rapport.</p></section>;
  }

  return <section className="glass psychology-engine">
    <div className="psychology-heading">
      <div><span className="kicker">Psychology Engine</span><h2>Ce que les réponses permettent — et ne permettent pas — de dire</h2></div>
      <p>Chaque lecture indique son niveau, sa confiance, ses preuves et d’autres explications possibles.</p>
    </div>
    <div className="psychology-legend">
      {Object.entries(meta).map(([key, value]) => <article key={key}><b>{value.icon}</b><span><strong>{value.label}</strong><small>{value.description}</small></span></article>)}
    </div>
    <div className="psychology-statements">
      {safeStatements.map(statement => {
        const level = meta[statement.level];
        return <details className={`psychology-card ${statement.level}`} key={statement.id} open={statement.level === "observation"}>
          <summary>
            <span className="psychology-level"><b>{level.icon}</b>{level.label}</span>
            <span className="psychology-title"><strong>{statement.title}</strong><small>Confiance {statement.confidence}%</small></span>
            <i>⌄</i>
          </summary>
          <div className="psychology-body">
            <p>{statement.body}</p>
            {statement.evidence.length > 0 && <section className="evidence-block"><h3>Réponses qui soutiennent cette lecture</h3><div className="evidence-list">{statement.evidence.map(item => <article key={`${statement.id}-${item.questionId}`}><small>{item.prompt}</small><strong>« {item.answer} »</strong><span className={item.contribution > 0 ? "positive" : "negative"}>{item.contribution > 0 ? "+" : ""}{item.contribution}</span></article>)}</div></section>}
            {statement.alternatives.length > 0 && <section className="alternative-block"><h3>Autres explications possibles</h3><div>{statement.alternatives.map(item => <span key={item}>{item}</span>)}</div></section>}
            {statement.axes.length > 0 && <footer>Axes utilisés : {statement.axes.join(" · ")}</footer>}
          </div>
        </details>;
      })}
    </div>
  </section>;
}
