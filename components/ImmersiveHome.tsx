"use client";

import { JournalEntry, MemoryItem, PrismeModule, Report, Session } from "@/types/prisme";
import { WorldState } from "@/lib/world";
import { EvolvingCompanion } from "@/components/EvolvingCompanion";
import { IntentionGarden } from "@/components/IntentionGarden";
import { HomeSanctuary } from "@/components/HomeSanctuary";
import { CareAction } from "@/lib/intentions";
import { useCallback, useEffect, useState } from "react";
import { PlaceTransition, TransitionMood } from "@/components/PlaceTransition";
import { defaultEcosystem, EcosystemState, loadEcosystem } from "@/lib/ecosystem";
import { ImmersiveTerritoryPage } from "@/components/ImmersiveTerritoryPage";
import { CompanionSanctuary } from "@/components/CompanionSanctuary";
import { TerritoryId } from "@/lib/territory";
import { WorldDestination } from "@/components/PlayableTerritoryWorld";

type Props = {
  modules: PrismeModule[];
  world: WorldState;
  history: Report[];
  journal: JournalEntry[];
  memories: MemoryItem[];
  session: Session | null;
  onStart: (module?: PrismeModule) => void;
  onResume: () => void;
  onOpenSettings: () => void;
  onOpenJournal: () => void;
  onOpenReport: (report: Report) => void;
};

const moduleById = (modules: PrismeModule[], id: string) => modules.find((module) => module.id === id);

export function ImmersiveHome({
  modules,
  world,
  history,
  journal,
  session,
  onStart,
  onResume,
  onOpenSettings,
  onOpenJournal,
  onOpenReport
}: Props) {
  const latestReport = history[0] ?? null;
  const launch = () => (session ? onResume() : onStart());
  const [intentionsOpen, setIntentionsOpen] = useState(false);
  const [sanctuaryOpen, setSanctuaryOpen] = useState(false);
  const [initialCareAction, setInitialCareAction] = useState<CareAction | null>(null);
  const [transition, setTransition] = useState<{ from: TransitionMood; to: TransitionMood; action: () => void } | null>(null);
  const [ecosystem, setEcosystem] = useState<EcosystemState>(defaultEcosystem());
  const [worldEcho, setWorldEcho] = useState(false);
  const [activeTerritory, setActiveTerritory] = useState<TerritoryId | null>(null);
  const [companionOpen, setCompanionOpen] = useState(false);
  useEffect(() => {
    setEcosystem(loadEcosystem());
    function refresh(event: Event) {
      const custom = event as CustomEvent<{ ecosystem?: EcosystemState }>;
      setEcosystem(custom.detail?.ecosystem ?? loadEcosystem());
      setWorldEcho(true);
      window.setTimeout(() => setWorldEcho(false), 5200);
    }
    window.addEventListener("prisme:ecosystem-updated", refresh);
    return () => window.removeEventListener("prisme:ecosystem-updated", refresh);
  }, []);

  const openIntentions = (action?: CareAction) => { setInitialCareAction(action ?? null); setIntentionsOpen(true); };
  const currentMood = (): TransitionMood => {
    if (sanctuaryOpen) return "house";
    if (!activeTerritory) return "world";
    return transitionMoodFor(activeTerritory);
  };
  const travel = (mood: TransitionMood, action: () => void) => setTransition({ from: currentMood(), to: mood, action });
  const finishTravel = useCallback(() => setTransition(null), []);

  const transitionMoodFor = (destination: WorldDestination): TransitionMood => {
    if (destination === "house") return "house";
    if (destination === "jardin") return "garden";
    if (destination === "foret") return "forest";
    if (destination === "fleuve") return "river";
    if (destination === "sommets") return "summits";
    if (destination === "temple" || destination === "volcan") return "temple";
    if (destination === "ciel" || destination === "observatoire") return "sky";
    return "garden";
  };

  const moveThroughWorld = (destination: WorldDestination) => {
    travel(transitionMoodFor(destination), () => {
      setSanctuaryOpen(false);
      setCompanionOpen(false);
      if (destination === "world") {
        setActiveTerritory(null);
        return;
      }
      if (destination === "house") {
        setSanctuaryOpen(true);
        return;
      }
      setActiveTerritory(destination);
    });
  };


  const moduleForTerritory = (id: TerritoryId) => {
    const moduleId: Record<TerritoryId, string> = {
      jardin: "emotions", foret: "quotidien", fleuve: "relations", observatoire: "cognition",
      sommets: "attention", temple: "personnalite", volcan: "neurodiversite", ciel: "sens_identite"
    };
    return moduleById(modules, moduleId[id]);
  };

  if (activeTerritory) {
    return (
      <>
        <ImmersiveTerritoryPage
          id={activeTerritory}
          world={world}
          onBack={() => moveThroughWorld("world")}
          onStartExploration={() => {
            const module = moduleForTerritory(activeTerritory);
            if (module) onStart(module);
          }}
          onOpenIntentions={() => openIntentions()}
          onOpenHouse={() => moveThroughWorld("house")}
          onTravel={moveThroughWorld}
          report={latestReport}
        />
        <IntentionGarden open={intentionsOpen} initialAction={initialCareAction} onClose={() => setIntentionsOpen(false)} />
        <HomeSanctuary open={sanctuaryOpen} onClose={() => setSanctuaryOpen(false)} onTravel={moveThroughWorld} />
        <CompanionSanctuary open={companionOpen} onClose={() => setCompanionOpen(false)} world={world} report={latestReport} />
        {transition && <PlaceTransition from={transition.from} to={transition.to} onSwitch={transition.action} onComplete={finishTravel} />}
      </>
    );
  }

  return (
    <main className="prisme-exact-shell" aria-label="Accueil immersif Prisme">
      <div className="prisme-exact-canvas">
        <img
          className="prisme-exact-reference"
          src="/visuals/prisme-exact-mockup.png"
          alt=""
          aria-hidden="true"
        />

        <div className="prisme-exact-particles" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, index) => (
            <i key={index} style={{ ["--particle" as string]: index }} />
          ))}
        </div>

        <div className="prisme-exact-companion" aria-hidden="true">
          <EvolvingCompanion world={world} report={latestReport} />
        </div>

        <nav className="prisme-hotspots" aria-label="Navigation Prisme">
          <button className="hotspot nav-home" aria-label="Ouvrir la Maison" onClick={() => moveThroughWorld("house")} />
          <button className="hotspot nav-world" aria-label="Le Monde" onClick={() => document.getElementById("territory-strip")?.scrollIntoView({ behavior: "smooth" })} />
          <button className="hotspot nav-journal" aria-label="Journal" onClick={() => travel("journal", onOpenJournal)} />
          <button className="hotspot nav-companion" aria-label="Compagnon" onClick={() => setCompanionOpen(true)} />
          <button className="hotspot nav-library" aria-label="Bibliothèque" onClick={() => latestReport && onOpenReport(latestReport)} disabled={!latestReport} />
          <button className="hotspot nav-observatory" aria-label="Observatoire" onClick={() => moveThroughWorld("observatoire")} />
          <button className="hotspot nav-workshop" aria-label="Atelier" onClick={() => moveThroughWorld("temple")} />
          <button className="hotspot nav-settings" aria-label="Paramètres" onClick={onOpenSettings} />

          <button className="hotspot main-cta" aria-label={session ? "Reprendre ton exploration" : "Commencer une nouvelle exploration"} onClick={() => travel("journey", launch)} />
          <button className="house-customize-cta" onClick={() => moveThroughWorld("house")}>⌂ Aménager ma Maison</button>

          <div id="territory-strip" className="territory-anchor" aria-hidden="true" />
          <button className="hotspot territory-garden" aria-label="Le Jardin" onClick={() => moveThroughWorld("jardin")} />
          <button className="hotspot territory-forest" aria-label="La Forêt" onClick={() => moveThroughWorld("foret")} />
          <button className="hotspot territory-river" aria-label="Le Fleuve" onClick={() => moveThroughWorld("fleuve")} />
          <button className="hotspot territory-summits" aria-label="Les Sommets" onClick={() => moveThroughWorld("sommets")} />
          <button className="hotspot territory-temple" aria-label="Le Temple" onClick={() => moveThroughWorld("temple")} />
          <button className="hotspot territory-sky" aria-label="Le Ciel" onClick={() => moveThroughWorld("ciel")} />

          <button className="hotspot companion-talk" aria-label="Parler avec le compagnon" onClick={() => setCompanionOpen(true)} />
          <button className="hotspot entries-all" aria-label="Voir toutes les entrées" onClick={() => travel("journal", onOpenJournal)} />
          <button className="hotspot history-all" aria-label="Voir mon histoire" onClick={() => latestReport && onOpenReport(latestReport)} disabled={!latestReport} />
          <button className="hotspot state-understand" aria-label="Comprendre mon état intérieur" onClick={() => latestReport && onOpenReport(latestReport)} disabled={!latestReport} />

          <button className="hotspot action-breathe" aria-label="Respirer" onClick={() => openIntentions("breathe")} />
          <button className="hotspot action-meditate" aria-label="Méditer" onClick={() => moveThroughWorld("jardin")} />
          <button className="hotspot action-write" aria-label="Écrire" onClick={() => openIntentions("write")} />
          <button className="hotspot action-observe" aria-label="Observer" onClick={() => openIntentions("observe")} />
          <button className="hotspot action-walk" aria-label="Marcher" onClick={() => openIntentions("walk")} />
          <button className="hotspot action-create" aria-label="Créer" onClick={() => openIntentions("create")} />
        </nav>

        <div className="prisme-live-status" aria-live="polite">
          {journal.length} entrées · {history.length} rapports · {world.answered} réponses · monde {ecosystem.ritualCount} rituels
        </div>
        {worldEcho && ecosystem.lastEffect && <aside className="world-echo" aria-live="polite">
          <span>Le monde a répondu</span>
          <strong>{ecosystem.lastEffect.ritualTitle}</strong>
          <p>{ecosystem.lastEffect.message}</p>
          <div>{ecosystem.lastEffect.kinds.map((kind) => <i key={kind}>{kind}</i>)}</div>
        </aside>}
      </div>
      <IntentionGarden open={intentionsOpen} initialAction={initialCareAction} onClose={() => setIntentionsOpen(false)} />
      <HomeSanctuary open={sanctuaryOpen} onClose={() => setSanctuaryOpen(false)} onTravel={moveThroughWorld} />
      <CompanionSanctuary open={companionOpen} onClose={() => setCompanionOpen(false)} world={world} report={latestReport} />
      {transition && <PlaceTransition from={transition.from} to={transition.to} onSwitch={transition.action} onComplete={finishTravel} />}
    </main>
  );
}
