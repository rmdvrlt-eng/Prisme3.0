"use client";

import { useState } from "react";

const moments = [
  {
    eyebrow: "Le Seuil",
    title: "Tu n’es pas ici pour être défini.",
    body: "Prisme est un monde à cultiver : tes gestes, tes intentions et tes observations y laissent des traces.",
  },
  {
    eyebrow: "Ton monde",
    title: "Rien n’est envoyé ailleurs.",
    body: "Dans cette version, tes réponses, ton journal et tes souvenirs restent dans ton navigateur.",
  },
  {
    eyebrow: "Une limite essentielle",
    title: "Le paysage est une métaphore.",
    body: "Les observations ne sont jamais des diagnostics. Elles t’aident à regarder, pas à t’enfermer dans une identité.",
  },
];

export function ImmersiveOnboarding({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [consent, setConsent] = useState(false);
  const moment = moments[index];

  return (
    <main className="threshold-world">
      <div className="threshold-sky" aria-hidden="true" />
      <div className="threshold-mountains" aria-hidden="true"><i/><i/><i/></div>
      <div className="threshold-river" aria-hidden="true" />
      <div className="threshold-forest" aria-hidden="true">{Array.from({length:18}).map((_,i)=><i key={i}/>)}</div>
      <div className="threshold-presence" aria-hidden="true"><span/><i/><b/></div>

      <section className="threshold-copy">
        <span>{moment.eyebrow}</span>
        <h1>{moment.title}</h1>
        <p>{moment.body}</p>
        <div className="threshold-dots">{moments.map((_,i)=><i key={i} className={i===index?"active":""}/>)}</div>
        {index < moments.length - 1 ? (
          <button onClick={() => setIndex(index + 1)}>Avancer dans la lumière <b>→</b></button>
        ) : (
          <>
            <label className="threshold-consent">
              <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)}/>
              <span>J’ai compris les limites de l’expérience.</span>
            </label>
            <button disabled={!consent} onClick={onComplete}>Entrer dans mon monde <b>→</b></button>
          </>
        )}
      </section>
    </main>
  );
}
