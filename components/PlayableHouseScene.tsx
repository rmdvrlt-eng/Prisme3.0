"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  furnitureCatalog,
  FurnitureId,
  HouseActivity,
  PetInteraction,
  petCatalog,
  SanctuaryState
} from "@/lib/sanctuary";
import { PlayableCharacter } from "@/components/PlayableCharacter";
import { RealisticInteriorCanvas } from "@/components/RealisticInteriorCanvas";

const POSITION_KEY = "prisme.house.position.v1";

type Point = { x: number; y: number };
type HouseTarget = {
  id: string;
  label: string;
  x: number;
  y: number;
  activity?: HouseActivity;
  petCare?: boolean;
  exit?: boolean;
};

const activityByFurniture: Partial<Record<FurnitureId, HouseActivity>> = {
  armchair: "silence",
  bookshelf: "read",
  piano: "music",
  desk: "write",
  tea: "tea",
  petBed: "sleep",
  bench: "silence",
  cushions: "silence",
  chest: "tidy",
  altar: "silence",
  mirror: "silence"
};

const petActions: { id: PetInteraction; label: string }[] = [
  { id: "feed", label: "Nourrir" },
  { id: "water", label: "Donner à boire" },
  { id: "brush", label: "Brosser" },
  { id: "pet", label: "Caresser" },
  { id: "play", label: "Jouer" },
  { id: "rest", label: "Laisser dormir" }
];

function loadPosition(): Point {
  if (typeof window === "undefined") return { x: 48, y: 77 };
  try {
    const parsed = JSON.parse(localStorage.getItem(POSITION_KEY) || "null") as Point | null;
    if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) return parsed;
  } catch {}
  return { x: 48, y: 77 };
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function HousePetRig({ id, bond, onClick }: { id: string; bond: number; onClick: () => void }) {
  const kind = id === "deer" ? "deer" : id === "owl" ? "owl" : id === "cat" ? "cat" : id === "rabbit" ? "hare" : id === "dog" ? "dog" : "fox";
  return <button className={`house-pet-rig pet-kind-${kind}`} style={{ ["--pet-bond" as string]: bond / 100 }} onClick={onClick} aria-label="Interagir avec le compagnon">
    <span className="house-pet-shadow"/><span className="house-pet-tail"/><span className="house-pet-body"/><span className="house-pet-head"><i/><i/><b/><b/></span><span className="house-pet-leg l1"/><span className="house-pet-leg l2"/>
  </button>;
}

export function PlayableHouseScene({
  state,
  onClose,
  onDecorate,
  onCompanions,
  onRitual,
  onPetAction,
  onTravel
}: {
  state: SanctuaryState;
  onClose: () => void;
  onDecorate: () => void;
  onCompanions: () => void;
  onRitual: (activity: HouseActivity) => void;
  onPetAction: (action: PetInteraction) => void;
  onTravel?: (destination: "world" | "jardin" | "foret" | "fleuve") => void;
}) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Point>(() => loadPosition());
  const [moving, setMoving] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | "front" | "back">("front");
  const [petMenu, setPetMenu] = useState(false);
  const [feedback, setFeedback] = useState("Touche le sol pour marcher dans la Maison.");
  const [travelMenu, setTravelMenu] = useState(false);

  useEffect(() => {
    localStorage.setItem(POSITION_KEY, JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    if (!moving) return;
    const timer = window.setTimeout(() => setMoving(false), 760);
    return () => window.clearTimeout(timer);
  }, [moving, position]);

  const targets = useMemo<HouseTarget[]>(() => {
    const furniture = state.placed.map((item) => {
      const x = 13 + item.x * 14.3;
      const y = 39 + item.y * 12.5;
      return {
        id: item.id,
        label: furnitureCatalog[item.furnitureId].label,
        x,
        y,
        activity: activityByFurniture[item.furnitureId],
        petCare: item.furnitureId === "petBowl"
      } satisfies HouseTarget;
    });
    return [
      ...furniture,
      { id: "fire", label: "Le feu", x: 15, y: 58, activity: "fire" },
      { id: "door", label: "Sortir de la Maison", x: 90, y: 67, exit: true }
    ];
  }, [state.placed]);

  const nearest = useMemo(() => {
    const candidate = targets
      .map((target) => ({ target, d: distance(position, target) }))
      .sort((a, b) => a.d - b.d)[0];
    return candidate && candidate.d < 15 ? candidate.target : null;
  }, [position, targets]);

  function moveTo(clientX: number, clientY: number) {
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    const next = {
      x: Math.max(7, Math.min(93, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(35, Math.min(86, ((clientY - rect.top) / rect.height) * 100))
    };
    const dx = next.x - position.x;
    const dy = next.y - position.y;
    setDirection(Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "back" : "front"));
    setPosition(next);
    setMoving(true);
    setPetMenu(false);
  }

  function interact() {
    if (!nearest) return;
    if (nearest.exit) {
      setTravelMenu(true);
      setFeedback("Le seuil s’ouvre sur les chemins du monde.");
      return;
    }
    if (nearest.petCare) {
      setPetMenu(true);
      setFeedback(`${petCatalog[state.pet.active].label} s’approche du bol.`);
      return;
    }
    if (nearest.activity) {
      onRitual(nearest.activity);
      setFeedback(`${nearest.label} t’invite à ralentir.`);
      return;
    }
    setFeedback(`${nearest.label} est simplement présent dans la pièce.`);
  }

  const petPosition = { x: Math.max(10, Math.min(89, position.x + (direction === "left" ? 10 : -10))), y: Math.min(86, position.y + 3) };

  return <section className={`playable-house-world theme-${state.theme}`}>
    <RealisticInteriorCanvas theme={state.theme} warmth={state.warmth} order={state.order} rest={state.rest} />
    <header className="playable-house-hud">
      <div><span className="kicker">La Maison</span><strong>Un refuge habitable</strong></div>
      <div><button onClick={onDecorate}>Aménager</button><button onClick={onCompanions}>Animaux</button><button onClick={() => setTravelMenu(true)}>Sortir</button></div>
    </header>

    <div
      ref={sceneRef}
      className="playable-house-scene"
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("button")) return;
        moveTo(event.clientX, event.clientY);
      }}
    >
      <div className="house-depth-wall"/><div className="house-depth-floor"/>
      <div className="house-window-world"><i/><i/><span/></div>
      <div className="house-fire-world"><i/><i/><i/><b/><b/></div>
      <div className="house-door-world"><span>Sortie</span></div>

      {state.placed.map((item) => {
        const x = 13 + item.x * 14.3;
        const y = 39 + item.y * 12.5;
        return <button
          key={item.id}
          className={`house-world-object object-${item.furnitureId}${nearest?.id === item.id ? " nearby" : ""}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          onClick={(event) => {
            event.stopPropagation();
            setPosition({ x, y: Math.min(86, y + 5) });
            setMoving(true);
            setFeedback(`Tu t’approches de ${furnitureCatalog[item.furnitureId].label.toLowerCase()}.`);
          }}
          aria-label={furnitureCatalog[item.furnitureId].label}
        >
          <span className="house-object-model"><i/><i/><i/><i/></span>
          <small>{furnitureCatalog[item.furnitureId].label}</small>
        </button>;
      })}

      <div className="house-player" style={{ left: `${position.x}%`, top: `${position.y}%` }}>
        <PlayableCharacter direction={direction} moving={moving} resting={!moving}/>
      </div>

      <div className="house-following-pet" style={{ left: `${petPosition.x}%`, top: `${petPosition.y}%` }}>
        <HousePetRig id={state.pet.active} bond={state.pet.bond[state.pet.active] ?? 0} onClick={() => setPetMenu(true)}/>
      </div>

      {nearest && <button className="house-context-action" onClick={interact}>
        {nearest.petCare ? `Prendre soin de ${petCatalog[state.pet.active].label.toLowerCase()}` : nearest.exit ? "Franchir la porte" : `Utiliser ${nearest.label.toLowerCase()}`}
      </button>}


      {travelMenu && <div className="house-travel-sheet">
        <header><div><span className="kicker">Le Seuil</span><strong>Où souhaites-tu aller ?</strong></div><button onClick={() => setTravelMenu(false)}>×</button></header>
        <p>Choisis un chemin. La Maison restera telle que tu l’as laissée.</p>
        <div>
          <button onClick={() => onTravel?.("jardin")}><i>✤</i><span><strong>Le Jardin</strong><small>Retrouver les graines et les fleurs</small></span></button>
          <button onClick={() => onTravel?.("foret")}><i>♧</i><span><strong>La Forêt</strong><small>Marcher sous les arbres</small></span></button>
          <button onClick={() => onTravel?.("fleuve")}><i>≈</i><span><strong>Le Ruisseau</strong><small>Suivre l’eau et les reflets</small></span></button>
          <button onClick={() => onTravel ? onTravel("world") : onClose()}><i>⌂</i><span><strong>Le Monde</strong><small>Prendre de la hauteur</small></span></button>
        </div>
      </div>}

      {petMenu && <div className="house-pet-care-sheet">
        <header><div><span className="kicker">Compagnon</span><strong>{petCatalog[state.pet.active].label}</strong></div><button onClick={() => setPetMenu(false)}>×</button></header>
        <div>{petActions.map((action) => <button key={action.id} onClick={() => { onPetAction(action.id); setFeedback(`${action.label} : un moment partagé.`); }}>{action.label}</button>)}</div>
      </div>}
    </div>

    <footer className="playable-house-footer"><span>{feedback}</span><small>Chaleur {Math.round(state.warmth)}% · ordre {Math.round(state.order)}% · repos {Math.round(state.rest)}%</small></footer>
  </section>;
}
