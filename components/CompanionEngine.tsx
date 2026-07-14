"use client";

import { useMemo, useState } from "react";
import { answerCompanion } from "@/lib/companion";
import { clearCompanionMessages, saveCompanionMessages } from "@/lib/storage";
import { CompanionMessage, Report } from "@/types/prisme";

const suggestions = [
  "Pourquoi ai-je du mal à commencer certaines tâches ?",
  "Que montrent mes réponses sur l’attention ?",
  "Pourquoi certaines relations restent-elles longtemps dans mon esprit ?",
  "Comment ma créativité apparaît-elle dans le rapport ?"
];

const levelLabels = { observation: "Observation", hypothesis: "Hypothèse", professional: "À explorer" } as const;

export function CompanionEngine({ report, initialMessages = [] }: { report: Report | null; initialMessages?: CompanionMessage[] }) {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [openSources, setOpenSources] = useState<string | null>(null);

  const ready = useMemo(() => Boolean(report?.psychology?.length), [report]);

  function send(value = input) {
    const text = value.trim();
    if (!text) return;
    const user: CompanionMessage = { id: crypto.randomUUID(), role: "user", text, createdAt: new Date().toISOString() };
    const response = answerCompanion(text, report);
    const next = [...messages, user, response].slice(-80);
    setMessages(next);
    saveCompanionMessages(next);
    setInput("");
  }

  function reset() {
    setMessages([]);
    clearCompanionMessages();
  }

  return <section className="glass companion-engine">
    <div className="companion-heading">
      <div className="companion-presence"><span /></div>
      <div><span className="kicker">Companion Engine</span><h2>Une présence qui ne dépasse pas les données</h2><p>{ready ? "Chaque réponse cite les lectures et réponses utilisées." : "Termine un module pour obtenir un rapport traçable."}</p></div>
      {messages.length > 0 && <button className="companion-clear" onClick={reset}>Effacer</button>}
    </div>

    <div className="companion-suggestions">
      {suggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}
    </div>

    <div className="companion-thread" aria-live="polite">
      {messages.length === 0 && <div className="companion-empty"><b>◎</b><p>Pose une question sur ton fonctionnement. Si le rapport ne permet pas de répondre, la présence le dira explicitement.</p></div>}
      {messages.map(message => <article className={`companion-message ${message.role} ${message.boundary ? "boundary" : ""}`} key={message.id}>
        <p>{message.text}</p>
        {message.sources && message.sources.length > 0 && <>
          <button className="source-toggle" onClick={() => setOpenSources(openSources === message.id ? null : message.id)}>
            {message.sources.length} source{message.sources.length > 1 ? "s" : ""} du rapport {openSources === message.id ? "↑" : "↓"}
          </button>
          {openSources === message.id && <div className="companion-sources">
            {message.sources.map(source => <article key={`${message.id}-${source.statementId}`}>
              <header><span>{levelLabels[source.level]}</span><strong>{source.title}</strong><small>Confiance {source.confidence}%</small></header>
              {source.evidence.length > 0 ? <div>{source.evidence.map(item => <p key={item.questionId}><small>{item.prompt}</small><b>« {item.answer} »</b></p>)}</div> : <p>Aucune réponse détaillée enregistrée pour cette ancienne passation.</p>}
            </article>)}
          </div>}
        </>}
      </article>)}
    </div>

    <div className="companion-compose">
      <input value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter") send(); }} placeholder="Décris une situation ou pose une question…" />
      <button onClick={() => send()}>Envoyer</button>
    </div>
    <footer>Le compagnon est local, non diagnostique et ne remplace pas une personne qualifiée.</footer>
  </section>;
}
