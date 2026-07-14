export type FurnitureId = "armchair" | "bookshelf" | "plant" | "lamp" | "piano" | "rug" | "desk" | "painting" | "cushions" | "tea" | "petBed" | "petBowl" | "mirror" | "altar" | "chest" | "bench";
export type HouseTheme = "ambre" | "foret" | "nuit" | "aube";
export type PetId = "fox" | "owl" | "cat" | "deer" | "rabbit" | "dog";
export type PetInteraction = "feed" | "water" | "play" | "pet" | "brush" | "rest";
export type HouseActivity = "tea" | "fire" | "read" | "write" | "music" | "sleep" | "tidy" | "silence";

export type PlacedFurniture = { id: string; furnitureId: FurnitureId; x: number; y: number };

export type PetNeeds = {
  hunger: number;
  thirst: number;
  cleanliness: number;
  energy: number;
  affection: number;
  curiosity: number;
};

export type PetState = {
  adopted: PetId[];
  active: PetId;
  bond: Record<PetId, number>;
  mood: Record<PetId, number>;
  needs: Record<PetId, PetNeeds>;
  dailyActions: Partial<Record<PetId, Record<string, PetInteraction[]>>>;
  lastCare: Partial<Record<PetId, string>>;
  lastUpdatedAt: string;
};

export type SanctuaryState = {
  theme: HouseTheme;
  placed: PlacedFurniture[];
  inventory: FurnitureId[];
  pet: PetState;
  warmth: number;
  order: number;
  inspiration: number;
  rest: number;
  activityLog: Record<string, HouseActivity[]>;
};

export const furnitureCatalog: Record<FurnitureId, { label: string; symbol: string; description: string }> = {
  armchair: { label: "Fauteuil", symbol: "◒", description: "Un lieu pour ralentir." },
  bookshelf: { label: "Bibliothèque", symbol: "▥", description: "Pour les livres et les traces." },
  plant: { label: "Grande plante", symbol: "♧", description: "Une présence vivante dans la pièce." },
  lamp: { label: "Lampe", symbol: "✦", description: "Une lumière douce pour le soir." },
  piano: { label: "Piano", symbol: "♬", description: "Pour accueillir les créations." },
  rug: { label: "Tapis", symbol: "▱", description: "Réchauffe le centre de la pièce." },
  desk: { label: "Bureau", symbol: "⌑", description: "Un espace pour écrire." },
  painting: { label: "Tableau", symbol: "◇", description: "Un souvenir accroché au mur." },
  cushions: { label: "Coussins", symbol: "◌", description: "Pour s’asseoir près du feu." },
  tea: { label: "Service à thé", symbol: "♨", description: "Un rituel calme et familier." },
  petBed: { label: "Coussin animal", symbol: "◡", description: "Un refuge pour ton compagnon." },
  petBowl: { label: "Bol", symbol: "◠", description: "Pour nourrir et abreuver ton compagnon." },
  mirror: { label: "Miroir", symbol: "◍", description: "Un objet pour observer sans juger." },
  altar: { label: "Table d’intention", symbol: "△", description: "Un point de rencontre entre les opposés." },
  chest: { label: "Coffre", symbol: "▣", description: "Pour conserver les objets trouvés." },
  bench: { label: "Banc", symbol: "▬", description: "Pour partager un silence." }
};

export const petCatalog: Record<PetId, { label: string; temperament: string; affinity: "forest" | "night" | "home" | "river" | "earth" | "social" }> = {
  fox: { label: "Renard", temperament: "Curieux et discret", affinity: "forest" },
  owl: { label: "Hibou", temperament: "Calme et observateur", affinity: "night" },
  cat: { label: "Chat", temperament: "Doux et indépendant", affinity: "home" },
  deer: { label: "Faon", temperament: "Sensible et paisible", affinity: "river" },
  rabbit: { label: "Lapin", temperament: "Vif et prudent", affinity: "earth" },
  dog: { label: "Chien", temperament: "Loyal et joueur", affinity: "social" }
};

export const houseActivities: Record<HouseActivity,{label:string;duration:string;prompt:string;warmth:number;order:number;inspiration:number;rest:number}> = {
  tea:{label:"Préparer une infusion",duration:"3 min",prompt:"Prépare une boisson chaude lentement. Observe la vapeur, l’odeur et la chaleur dans tes mains.",warmth:7,order:1,inspiration:1,rest:5},
  fire:{label:"S’asseoir près du feu",duration:"2 min",prompt:"Pose-toi sans écran. Regarde la lumière et laisse ta respiration ralentir.",warmth:10,order:0,inspiration:2,rest:7},
  read:{label:"Lire quelques pages",duration:"5 min",prompt:"Lis lentement quelques pages sans chercher à avancer vite.",warmth:2,order:1,inspiration:8,rest:3},
  write:{label:"Écrire une page",duration:"5 min",prompt:"Écris sans corriger pendant cinq minutes. Laisse venir ce qui demande une forme.",warmth:2,order:2,inspiration:10,rest:1},
  music:{label:"Écouter ou jouer",duration:"4 min",prompt:"Écoute une musique sans faire autre chose, ou joue quelques notes si tu le peux.",warmth:4,order:0,inspiration:10,rest:4},
  sleep:{label:"Préparer le repos",duration:"3 min",prompt:"Baisse la lumière, éloigne l’écran et prépare un espace calme pour ton corps.",warmth:4,order:4,inspiration:0,rest:12},
  tidy:{label:"Ranger un petit espace",duration:"3 min",prompt:"Choisis une surface minuscule et rends-la plus claire sans chercher la perfection.",warmth:2,order:12,inspiration:2,rest:2},
  silence:{label:"Partager le silence",duration:"2 min",prompt:"Reste deux minutes sans remplir le moment. Laisse simplement la Maison être là.",warmth:5,order:0,inspiration:3,rest:8}
};

const KEY = "prisme.sanctuary.v2";
const LEGACY_KEY = "prisme.sanctuary.v1";
const nowIso=()=>new Date().toISOString();
const dayKey=()=>new Date().toISOString().slice(0,10);

const baseNeeds = ():PetNeeds=>({hunger:72,thirst:74,cleanliness:76,energy:70,affection:55,curiosity:58});
const allPets:PetId[]=["fox","owl","cat","deer","rabbit","dog"];

const defaultPlaced: PlacedFurniture[] = [
  { id: "f-rug", furnitureId: "rug", x: 2, y: 2 },
  { id: "f-chair", furnitureId: "armchair", x: 1, y: 2 },
  { id: "f-lamp", furnitureId: "lamp", x: 1, y: 1 },
  { id: "f-books", furnitureId: "bookshelf", x: 4, y: 1 },
  { id: "f-plant", furnitureId: "plant", x: 5, y: 2 },
  { id: "f-bowl", furnitureId: "petBowl", x: 5, y: 3 },
  { id: "f-bed", furnitureId: "petBed", x: 4, y: 3 }
];

export function defaultSanctuary(): SanctuaryState {
  const needs=Object.fromEntries(allPets.map(id=>[id,baseNeeds()])) as Record<PetId,PetNeeds>;
  return {
    theme: "ambre", placed: defaultPlaced, inventory: Object.keys(furnitureCatalog) as FurnitureId[],
    warmth:58,order:52,inspiration:48,rest:55,activityLog:{},
    pet: {
      adopted: ["fox"], active: "fox",
      bond: { fox: 12, owl: 0, cat: 0, deer: 0, rabbit:0, dog:0 },
      mood: { fox: 54, owl: 42, cat: 48, deer: 46, rabbit:50, dog:52 },
      needs, dailyActions: {}, lastCare: {}, lastUpdatedAt:nowIso()
    }
  };
}

function evolvePetState(pet:PetState):PetState{
  const elapsed=Math.max(0,(Date.now()-new Date(pet.lastUpdatedAt||Date.now()).getTime())/3_600_000);
  if(elapsed<.1)return pet;
  const needs={...pet.needs};
  for(const id of allPets){
    const current={...baseNeeds(),...(needs[id]??{})};
    needs[id]={
      hunger:Math.max(8,current.hunger-elapsed*1.2),
      thirst:Math.max(6,current.thirst-elapsed*1.5),
      cleanliness:Math.max(15,current.cleanliness-elapsed*.45),
      energy:Math.max(12,current.energy-elapsed*.65),
      affection:Math.max(15,current.affection-elapsed*.25),
      curiosity:Math.min(100,current.curiosity+elapsed*.2)
    };
  }
  return {...pet,needs,lastUpdatedAt:nowIso()};
}

export function loadSanctuary(): SanctuaryState {
  if (typeof window === "undefined") return defaultSanctuary();
  const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
  if (!raw) return defaultSanctuary();
  try {
    const parsed = JSON.parse(raw) as Partial<SanctuaryState>;
    const base=defaultSanctuary();
    const petParsed=parsed.pet??base.pet;
    const mergedPet=evolvePetState({...base.pet,...petParsed,bond:{...base.pet.bond,...(petParsed.bond??{})},mood:{...base.pet.mood,...(petParsed.mood??{})},needs:{...base.pet.needs,...(petParsed.needs??{})},dailyActions:petParsed.dailyActions??{}});
    return {...base,...parsed,placed:parsed.placed??base.placed,inventory:parsed.inventory??base.inventory,activityLog:parsed.activityLog??{},pet:mergedPet};
  } catch { return defaultSanctuary(); }
}

export function saveSanctuary(state: SanctuaryState) { if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify({...state,pet:{...state.pet,lastUpdatedAt:nowIso()}})); }

export function placeFurniture(state: SanctuaryState, furnitureId: FurnitureId, x: number, y: number): SanctuaryState {
  const occupied = state.placed.find((item) => item.x === x && item.y === y);
  const withoutOccupied = occupied ? state.placed.filter((item) => item.id !== occupied.id) : state.placed;
  const existing = withoutOccupied.find((item) => item.furnitureId === furnitureId);
  const placed = existing ? withoutOccupied.map((item) => item.id === existing.id ? { ...item, x, y } : item) : [...withoutOccupied, { id: crypto.randomUUID(), furnitureId, x, y }];
  return { ...state, placed };
}

export function removeFurniture(state: SanctuaryState, id: string): SanctuaryState { return { ...state, placed: state.placed.filter((item) => item.id !== id) }; }
export function adoptPet(state: SanctuaryState, petId: PetId): SanctuaryState { const adopted = state.pet.adopted.includes(petId) ? state.pet.adopted : [...state.pet.adopted, petId]; return { ...state, pet: { ...state.pet, adopted, active: petId } }; }

export function performHouseActivity(state:SanctuaryState,activity:HouseActivity):{state:SanctuaryState;accepted:boolean}{
  const day=dayKey();const done=state.activityLog[day]??[];if(done.includes(activity))return{state,accepted:false};
  const effect=houseActivities[activity];
  return {accepted:true,state:{...state,warmth:Math.min(100,state.warmth+effect.warmth),order:Math.min(100,state.order+effect.order),inspiration:Math.min(100,state.inspiration+effect.inspiration),rest:Math.min(100,state.rest+effect.rest),activityLog:{...state.activityLog,[day]:[...done,activity]}}};
}

export function interactWithPet(state: SanctuaryState, petId: PetId, action: PetInteraction): { state: SanctuaryState; accepted: boolean } {
  const today = dayKey();
  const dailyForPet = state.pet.dailyActions[petId] ?? {};
  const done = dailyForPet[today] ?? [];
  if (done.includes(action)) return { state, accepted: false };
  const needs={...state.pet.needs[petId]};
  const deltas:Record<PetInteraction,Partial<PetNeeds>>={
    feed:{hunger:24,affection:3},water:{thirst:26,affection:2},play:{energy:-10,curiosity:18,affection:8},pet:{affection:14,energy:3},brush:{cleanliness:24,affection:7},rest:{energy:22,curiosity:-5}
  };
  for(const [key,value] of Object.entries(deltas[action]) as [keyof PetNeeds,number][]){needs[key]=Math.max(0,Math.min(100,needs[key]+value));}
  const average=Object.values(needs).reduce((sum,value)=>sum+value,0)/Object.values(needs).length;
  const bondDelta=action==="play"?6:action==="pet"||action==="brush"?5:4;
  return {accepted:true,state:{...state,pet:{...state.pet,bond:{...state.pet.bond,[petId]:Math.min(100,(state.pet.bond[petId]??0)+bondDelta)},mood:{...state.pet.mood,[petId]:Math.round(Math.min(100,average))},needs:{...state.pet.needs,[petId]:needs},dailyActions:{...state.pet.dailyActions,[petId]:{...dailyForPet,[today]:[...done,action]}}}}};
}
