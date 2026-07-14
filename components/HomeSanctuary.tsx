"use client";

import { useEffect, useMemo, useState } from "react";
import {
  adoptPet,
  furnitureCatalog,
  FurnitureId,
  HouseActivity,
  houseActivities,
  HouseTheme,
  interactWithPet,
  loadSanctuary,
  PetId,
  PetInteraction,
  petCatalog,
  placeFurniture,
  performHouseActivity,
  removeFurniture,
  SanctuaryState,
  saveSanctuary
} from "@/lib/sanctuary";
import { defaultEcosystem, EcosystemState, loadEcosystem } from "@/lib/ecosystem";
import { deriveConiunctio } from "@/lib/coniunctio";
import { loadLivingGarden } from "@/lib/livingGarden";
import { RealisticInteriorCanvas } from "@/components/RealisticInteriorCanvas";
import { PlayableHouseScene } from "@/components/PlayableHouseScene";

const themes: { id: HouseTheme; label: string; note: string }[] = [
  { id: "ambre", label: "Ambre", note: "Feu, bois et lumière chaude" },
  { id: "foret", label: "Forêt", note: "Mousse, plantes et verts profonds" },
  { id: "nuit", label: "Nuit", note: "Bleu sombre et constellations" },
  { id: "aube", label: "Aube", note: "Lin clair et lumière du matin" }
];

function FurnitureModel({ id }: { id: FurnitureId }) {
  return <span className={`furniture-model furniture-${id}`} aria-hidden="true"><i className="part-a"/><i className="part-b"/><i className="part-c"/><i className="part-d"/></span>;
}

function PetModel({ id, large = false }: { id: PetId; large?: boolean }) {
  return <span className={`pet-model pet-${id}${large ? " large" : ""}`} aria-hidden="true"><i className="pet-tail"/><i className="pet-body"/><i className="pet-head"/><i className="pet-ear ear-left"/><i className="pet-ear ear-right"/><i className="pet-eye eye-left"/><i className="pet-eye eye-right"/><i className="pet-leg leg-left"/><i className="pet-leg leg-right"/></span>;
}

const needLabels={hunger:"Faim",thirst:"Soif",cleanliness:"Pelage",energy:"Énergie",affection:"Affection",curiosity:"Curiosité"} as const;
const actionLabels:Record<PetInteraction,string>={feed:"Nourrir",water:"Donner à boire",play:"Jouer",pet:"Caresser",brush:"Brosser",rest:"Laisser dormir"};

export function HomeSanctuary({ open, onClose, onTravel }: { open: boolean; onClose: () => void; onTravel?: (destination: "world" | "jardin" | "foret" | "fleuve") => void }) {
  const [state, setState] = useState<SanctuaryState>(() => loadSanctuary());
  const [selected, setSelected] = useState<FurnitureId | null>(null);
  const [tab, setTab] = useState<"live" | "decorate" | "companions" | "rituals">("live");
  const [message, setMessage] = useState("Choisis un objet, puis touche une place dans la pièce.");
  const [ecosystem, setEcosystem] = useState<EcosystemState>(defaultEcosystem());
  const [activeRitual,setActiveRitual]=useState<HouseActivity|null>(null);
  const [ritualRunning,setRitualRunning]=useState(false);
  const [seconds,setSeconds]=useState(0);

  useEffect(() => { if (open) { setState(loadSanctuary()); setEcosystem(loadEcosystem()); } }, [open]);
  useEffect(()=>{if(!ritualRunning)return;const timer=window.setInterval(()=>setSeconds(value=>Math.max(0,value-1)),1000);return()=>window.clearInterval(timer)},[ritualRunning]);
  useEffect(() => {
    function refresh(event: Event) { const custom = event as CustomEvent<{ ecosystem?: EcosystemState; sanctuary?: SanctuaryState }>; setEcosystem(custom.detail?.ecosystem ?? loadEcosystem()); setState(custom.detail?.sanctuary ?? loadSanctuary()); }
    window.addEventListener("prisme:ecosystem-updated", refresh); return () => window.removeEventListener("prisme:ecosystem-updated", refresh);
  }, []);

  const activePet = petCatalog[state.pet.active];
  const activeBond = Math.min(100, (state.pet.bond[state.pet.active] ?? 0) + Math.round(ecosystem.animalTrust * .12));
  const activeMood = state.pet.mood[state.pet.active] ?? 50;
  const activeNeeds=state.pet.needs[state.pet.active];
  const petStage = activeBond >= 75 ? "Il choisit spontanément de rester près de toi" : activeBond >= 40 ? "Votre lien devient familier" : "Il apprend encore à te connaître";
  const placedByCell = useMemo(() => new Map(state.placed.map((item) => [`${item.x}-${item.y}`, item])), [state.placed]);
  const coniunctio=useMemo(()=>deriveConiunctio(loadLivingGarden(),state),[state]);

  function commit(next: SanctuaryState) { setState(next); saveSanctuary(next); window.dispatchEvent(new CustomEvent("prisme:sanctuary-updated",{detail:{sanctuary:next}})); }
  function chooseTheme(theme: HouseTheme) { commit({ ...state, theme }); }
  function place(x: number, y: number) {
    if (!selected) { const item = placedByCell.get(`${x}-${y}`); if (item) { commit(removeFurniture(state, item.id)); setMessage(`${furnitureCatalog[item.furnitureId].label} rangé dans l’inventaire.`); } return; }
    commit(placeFurniture(state, selected, x, y)); setMessage(`${furnitureCatalog[selected].label} installé.`); setSelected(null);
  }
  function selectPet(petId: PetId) { commit(adoptPet(state, petId)); setMessage(`${petCatalog[petId].label} a rejoint la Maison.`); }
  function petAction(action: PetInteraction) {
    const result = interactWithPet(state, state.pet.active, action); commit(result.state);
    setMessage(result.accepted ? `${actionLabels[action]} : ${activePet.label.toLowerCase()} réagit et son état évolue.` : "Ce geste a déjà été partagé aujourd’hui.");
  }
  function beginHouseRitual(activity:HouseActivity){setActiveRitual(activity);setSeconds(Number.parseInt(houseActivities[activity].duration)*60||120);setRitualRunning(false)}
  function finishHouseRitual(){if(!activeRitual)return;const result=performHouseActivity(state,activeRitual);commit(result.state);setMessage(result.accepted?`${houseActivities[activeRitual].label} a changé l’atmosphère de la Maison.`:"Ce rituel a déjà été accompli aujourd’hui.");setActiveRitual(null);setRitualRunning(false)}

  if (!open) return null;

  return <div className="sanctuary-overlay" role="dialog" aria-modal="true" aria-label="Aménager la Maison">
    <section className={`sanctuary-shell theme-${state.theme}`} style={{ ["--home-warmth" as string]: state.warmth / 100, ["--animal-trust" as string]: ecosystem.animalTrust / 100 }}>
      <RealisticInteriorCanvas theme={state.theme} warmth={state.warmth} order={state.order} rest={state.rest} />
      <header className="sanctuary-header"><div><span className="kicker">Ta Maison</span><h2>Un refuge qui se transforme avec toi</h2><p>Aménage, accomplis des gestes conscients et prends soin des êtres qui vivent ici.</p><small className="ecosystem-indicator">Chaleur {Math.round(state.warmth)}% · ordre {Math.round(state.order)}% · inspiration {Math.round(state.inspiration)}% · repos {Math.round(state.rest)}%</small></div><button onClick={onClose} aria-label="Fermer">×</button></header>
      <div className="sanctuary-tabs"><button className={tab === "live" ? "active" : ""} onClick={() => setTab("live")}>Explorer</button><button className={tab === "decorate" ? "active" : ""} onClick={() => setTab("decorate")}>Aménager</button><button className={tab === "companions" ? "active" : ""} onClick={() => setTab("companions")}>Animaux</button><button className={tab === "rituals" ? "active" : ""} onClick={() => setTab("rituals")}>Habiter</button></div>

      {tab === "live" && <PlayableHouseScene state={state} onClose={onClose} onDecorate={()=>setTab("decorate")} onCompanions={()=>setTab("companions")} onRitual={beginHouseRitual} onPetAction={petAction} onTravel={onTravel}/>}

      {tab === "decorate" && <div className="sanctuary-layout"><aside className="sanctuary-catalog"><h3>Ambiance</h3><div className="theme-picker">{themes.map(theme=><button key={theme.id} className={state.theme===theme.id?"active":""} onClick={()=>chooseTheme(theme.id)}><i/><span><strong>{theme.label}</strong><small>{theme.note}</small></span></button>)}</div><h3>Objets</h3><div className="furniture-picker">{state.inventory.map(id=><button key={id} className={selected===id?"active":""} onClick={()=>{setSelected(id);setMessage(`Touche un emplacement pour placer ${furnitureCatalog[id].label.toLowerCase()}.`)}}><FurnitureModel id={id}/><strong>{furnitureCatalog[id].label}</strong></button>)}</div></aside>
        <main className="sanctuary-room-wrap"><div className="sanctuary-room"><div className="room-ceiling-beam beam-one"/><div className="room-ceiling-beam beam-two"/><div className="room-wall-texture"/><div className="room-floor"/><div className="room-rug-shadow"/><div className="sanctuary-window"><span/><i/><b/></div><div className="window-light"/><button className="sanctuary-fire" onClick={()=>beginHouseRitual("fire")}><span className="fireplace-stone"/><i/><i/><i/><b className="ember e1"/><b className="ember e2"/><b className="ember e3"/></button><div className="fire-glow"/><div className="room-dust">{Array.from({length:18}).map((_,i)=><i key={i} style={{["--dust" as string]:i}}/>)}</div><div className="sanctuary-grid">{Array.from({length:24}).map((_,index)=>{const x=index%6,y=Math.floor(index/6),item=placedByCell.get(`${x}-${y}`);return <button key={index} className={item?"occupied":""} onClick={()=>place(x,y)} aria-label={item?furnitureCatalog[item.furnitureId].label:"Emplacement libre"}>{item&&<FurnitureModel id={item.furnitureId}/>}</button>})}</div><button className="sanctuary-pet-in-room" style={{["--bond" as string]:activeBond/100}} onClick={()=>setTab("companions")}><PetModel id={state.pet.active}/><small>{activePet.label}</small></button></div><p className="sanctuary-message">{message}</p></main></div>}

      {tab === "companions" && <div className="pet-sanctuary"><section className="active-pet-card"><div className="pet-glow"><PetModel id={state.pet.active} large/></div><div><span className="kicker">Compagnon actuel</span><h3>{activePet.label}</h3><p>{activePet.temperament}. {petStage}.</p><div className="pet-needs-grid">{Object.entries(activeNeeds).map(([key,value])=><div key={key}><span>{needLabels[key as keyof typeof needLabels]}</span><i><b style={{width:`${value}%`}}/></i><strong>{Math.round(value)}%</strong></div>)}</div><div className="pet-action-buttons six">{(Object.keys(actionLabels) as PetInteraction[]).map(action=><button key={action} onClick={()=>petAction(action)}>{actionLabels[action]}</button>)}</div></div></section><section className="pet-choices"><h3>Les visiteurs de la Maison</h3><div>{(Object.keys(petCatalog) as PetId[]).map(id=>{const adopted=state.pet.adopted.includes(id);return <button key={id} className={state.pet.active===id?"active":""} onClick={()=>selectPet(id)}><PetModel id={id}/><strong>{petCatalog[id].label}</strong><small>{adopted?`Lien ${state.pet.bond[id]??0}%`:"Inviter"}</small></button>})}</div></section><p className="sanctuary-message">{message}</p></div>}

      {tab === "rituals" && <div className="house-ritual-space"><section className="coniunctio-card"><span>Coniunctio</span><h3>Réunir ce qui semblait opposé</h3><p>{coniunctio.message}</p><div>{Object.entries(coniunctio.axes).map(([key,value])=><i key={key}><b style={{width:`${value}%`}}/><span>{key}</span></i>)}</div><strong>Harmonie du lieu {Math.round(coniunctio.harmony)}%</strong></section><div className="house-activity-grid">{(Object.keys(houseActivities) as HouseActivity[]).map(activity=><button key={activity} onClick={()=>beginHouseRitual(activity)}><strong>{houseActivities[activity].label}</strong><small>{houseActivities[activity].duration}</small><p>{houseActivities[activity].prompt}</p></button>)}</div><p className="sanctuary-message">{message}</p></div>}

      {activeRitual&&<div className="garden-modal ritual-modal"><section><button className="garden-modal-close" onClick={()=>{setActiveRitual(null);setRitualRunning(false)}}>×</button><span>Habiter la Maison</span><h3>{houseActivities[activeRitual].label}</h3><p>{houseActivities[activeRitual].prompt}</p><div className={`ritual-orb ${ritualRunning?"running":""}`}><b>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2,"0")}</b></div>{!ritualRunning?<button className="garden-confirm" onClick={()=>setRitualRunning(true)}>Commencer</button>:<button className="garden-confirm" onClick={finishHouseRitual}>{seconds>0?"J’ai terminé en conscience":"Transformer la Maison"}</button>}</section></div>}
    </section>
  </div>;
}
