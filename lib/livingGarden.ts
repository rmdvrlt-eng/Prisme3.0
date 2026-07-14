export type PlantCategory = "flower" | "fruit" | "vegetable" | "herb" | "tree" | "vine";
export type GardenCareAction = "mindfulWater" | "breathe" | "gratitude" | "observe" | "move" | "create" | "rest" | "release";

export type PlantSpecies = {
  id: string;
  name: string;
  category: PlantCategory;
  symbol: string;
  description: string;
  bloomColor: string;
  secondaryColor: string;
  growthHours: number;
  yieldLabel?: string;
  season: "spring" | "summer" | "autumn" | "winter" | "all";
  archetype: "water" | "fire" | "earth" | "air" | "union";
  pollinator?: "bee" | "butterfly" | "bird" | "night";
};

export type LivingPlant = {
  id: string;
  speciesId: string;
  intention: string;
  plantedAt: string;
  updatedAt: string;
  growth: number;
  vitality: number;
  water: number;
  x: number;
  lane: number;
  harvested: number;
  careLog: Record<string, GardenCareAction[]>;
};

export type LivingGardenState = {
  plants: LivingPlant[];
  seeds: Record<string, number>;
  harvests: Record<string, number>;
  soil: number;
  clarity: number;
  waterReserve: number;
  totalCare: number;
  harmony: number;
  lastVisitAt: string;
};

export const plantSpecies: PlantSpecies[] = [
  { id:"rose", name:"Rose", category:"flower", symbol:"✿", description:"Douceur, courage et ouverture du cœur.", bloomColor:"#d9788f", secondaryColor:"#f4bac6", growthHours:36, season:"spring", archetype:"union", pollinator:"bee" },
  { id:"hibiscus", name:"Hibiscus", category:"flower", symbol:"❀", description:"Vitalité, présence et élan solaire.", bloomColor:"#ef6f70", secondaryColor:"#ffb180", growthHours:30, season:"summer", archetype:"fire", pollinator:"butterfly" },
  { id:"honeysuckle", name:"Chèvrefeuille", category:"vine", symbol:"⌁", description:"Lien, confiance et chemin partagé.", bloomColor:"#f1d687", secondaryColor:"#fff0b5", growthHours:42, season:"summer", archetype:"union", pollinator:"night" },
  { id:"jasmine", name:"Jasmin", category:"vine", symbol:"✧", description:"Présence subtile, intimité et accueil.", bloomColor:"#f8f4de", secondaryColor:"#dce9c8", growthHours:38, season:"summer", archetype:"air", pollinator:"night" },
  { id:"wisteria", name:"Glycine", category:"vine", symbol:"⋰", description:"Patience, beauté lente et continuité.", bloomColor:"#9f8acb", secondaryColor:"#d5c3ef", growthHours:68, season:"spring", archetype:"water", pollinator:"bee" },
  { id:"lavender", name:"Lavande", category:"herb", symbol:"⋮", description:"Calme, repos et clarté respiratoire.", bloomColor:"#9b86c9", secondaryColor:"#cab8e6", growthHours:24, yieldLabel:"brins", season:"summer", archetype:"air", pollinator:"bee" },
  { id:"camellia", name:"Camélia", category:"flower", symbol:"✺", description:"Dignité, constance et douceur intérieure.", bloomColor:"#d66f83", secondaryColor:"#f3b2bd", growthHours:50, season:"winter", archetype:"water", pollinator:"bee" },
  { id:"iris", name:"Iris", category:"flower", symbol:"⚜", description:"Passage, discernement et vision.", bloomColor:"#6f78c7", secondaryColor:"#d5b9ea", growthHours:34, season:"spring", archetype:"air", pollinator:"bee" },
  { id:"waterlily", name:"Nénuphar", category:"flower", symbol:"◉", description:"Calme profond et émergence depuis l’eau.", bloomColor:"#f1dfe9", secondaryColor:"#f5a6c8", growthHours:44, season:"summer", archetype:"water", pollinator:"bee" },
  { id:"poppy", name:"Coquelicot", category:"flower", symbol:"✹", description:"Fragilité vivante, courage et renouveau.", bloomColor:"#d93f3f", secondaryColor:"#ff8a66", growthHours:22, season:"spring", archetype:"fire", pollinator:"bee" },
  { id:"peony", name:"Pivoine", category:"flower", symbol:"❁", description:"Abondance, générosité et confiance.", bloomColor:"#df879d", secondaryColor:"#ffd0d8", growthHours:48, season:"spring", archetype:"earth", pollinator:"bee" },
  { id:"magnolia", name:"Magnolia", category:"tree", symbol:"✤", description:"Ancienneté, noblesse et nouveau départ.", bloomColor:"#f2d8dc", secondaryColor:"#fff0ed", growthHours:110, yieldLabel:"fleurs", season:"spring", archetype:"union", pollinator:"bee" },
  { id:"hydrangea", name:"Hortensia", category:"flower", symbol:"✣", description:"Nuance, mémoire et émotions multiples.", bloomColor:"#769cc8", secondaryColor:"#d5a5d9", growthHours:54, season:"summer", archetype:"water", pollinator:"bee" },
  { id:"tulip", name:"Tulipe", category:"flower", symbol:"♢", description:"Élan simple et choix assumé.", bloomColor:"#e78565", secondaryColor:"#ffd4a2", growthHours:26, season:"spring", archetype:"fire", pollinator:"bee" },
  { id:"dahlia", name:"Dahlia", category:"flower", symbol:"✵", description:"Créativité structurée et force douce.", bloomColor:"#b95678", secondaryColor:"#ed9bb1", growthHours:46, season:"autumn", archetype:"earth", pollinator:"butterfly" },
  { id:"sunflower", name:"Tournesol", category:"flower", symbol:"☀", description:"Confiance, orientation et lumière.", bloomColor:"#e9bd45", secondaryColor:"#ffe37f", growthHours:32, season:"summer", archetype:"fire", pollinator:"bee" },
  { id:"orchid", name:"Orchidée", category:"flower", symbol:"✦", description:"Singularité, patience et délicatesse.", bloomColor:"#be77bb", secondaryColor:"#f1c2e7", growthHours:72, season:"all", archetype:"union", pollinator:"night" },
  { id:"blueberry-flower", name:"Bleuet", category:"flower", symbol:"✶", description:"Clarté, fidélité et regard neuf.", bloomColor:"#5e83ce", secondaryColor:"#a8c7ff", growthHours:24, season:"summer", archetype:"air", pollinator:"bee" },
  { id:"edelweiss", name:"Edelweiss", category:"flower", symbol:"✣", description:"Résilience, altitude et sobriété.", bloomColor:"#f2f0df", secondaryColor:"#cfd5c3", growthHours:64, season:"summer", archetype:"earth", pollinator:"butterfly" },
  { id:"strawberry", name:"Fraisier", category:"fruit", symbol:"♥", description:"Joie simple, douceur et attention au quotidien.", bloomColor:"#f2f0e7", secondaryColor:"#d94a52", growthHours:28, yieldLabel:"fraises", season:"spring", archetype:"earth", pollinator:"bee" },
  { id:"raspberry", name:"Framboisier", category:"fruit", symbol:"●", description:"Générosité, souplesse et plaisir partagé.", bloomColor:"#f3ece2", secondaryColor:"#b83f66", growthHours:42, yieldLabel:"framboises", season:"summer", archetype:"earth", pollinator:"bee" },
  { id:"blueberry", name:"Myrtillier", category:"fruit", symbol:"●", description:"Ressource discrète et mémoire des sous-bois.", bloomColor:"#e7edf8", secondaryColor:"#5266a8", growthHours:44, yieldLabel:"myrtilles", season:"summer", archetype:"water", pollinator:"bee" },
  { id:"tomato", name:"Tomate", category:"vegetable", symbol:"●", description:"Patience, soin régulier et abondance concrète.", bloomColor:"#f1db71", secondaryColor:"#db5548", growthHours:34, yieldLabel:"tomates", season:"summer", archetype:"fire", pollinator:"bee" },
  { id:"zucchini", name:"Courgette", category:"vegetable", symbol:"◇", description:"Croissance généreuse et stabilité.", bloomColor:"#e8c856", secondaryColor:"#6d9c56", growthHours:38, yieldLabel:"courgettes", season:"summer", archetype:"earth", pollinator:"bee" },
  { id:"eggplant", name:"Aubergine", category:"vegetable", symbol:"◒", description:"Maturation, profondeur et patience.", bloomColor:"#9274b4", secondaryColor:"#543f7a", growthHours:40, yieldLabel:"aubergines", season:"summer", archetype:"water", pollinator:"bee" },
  { id:"bean", name:"Haricot", category:"vegetable", symbol:"⌇", description:"Lien, ascension et soutien mutuel.", bloomColor:"#f3ece0", secondaryColor:"#65a65f", growthHours:30, yieldLabel:"haricots", season:"summer", archetype:"union", pollinator:"bee" },
  { id:"lettuce", name:"Salade", category:"vegetable", symbol:"◍", description:"Fraîcheur, simplicité et soin de base.", bloomColor:"#b7d98c", secondaryColor:"#6ba467", growthHours:18, yieldLabel:"salades", season:"spring", archetype:"earth" },
  { id:"carrot", name:"Carotte", category:"vegetable", symbol:"▾", description:"Enracinement, patience et énergie cachée.", bloomColor:"#f4eee3", secondaryColor:"#e5853f", growthHours:32, yieldLabel:"carottes", season:"autumn", archetype:"earth" },
  { id:"radish", name:"Radis", category:"vegetable", symbol:"◆", description:"Action courte, netteté et commencement.", bloomColor:"#f5f1e7", secondaryColor:"#d5546a", growthHours:16, yieldLabel:"radis", season:"spring", archetype:"fire" },
  { id:"beet", name:"Betterave", category:"vegetable", symbol:"●", description:"Force vitale, profondeur et transformation.", bloomColor:"#ddc8d4", secondaryColor:"#8a385b", growthHours:30, yieldLabel:"betteraves", season:"autumn", archetype:"earth" },
  { id:"basil", name:"Basilic", category:"herb", symbol:"♢", description:"Fraîcheur, discernement et vitalité.", bloomColor:"#a6d486", secondaryColor:"#5c9b55", growthHours:20, yieldLabel:"feuilles", season:"summer", archetype:"air", pollinator:"bee" },
  { id:"mint", name:"Menthe", category:"herb", symbol:"♧", description:"Réveil, respiration et mouvement.", bloomColor:"#bfe1c2", secondaryColor:"#5da071", growthHours:18, yieldLabel:"feuilles", season:"all", archetype:"air", pollinator:"bee" },
  { id:"thyme", name:"Thym", category:"herb", symbol:"⋰", description:"Courage humble et constance.", bloomColor:"#c7b9d7", secondaryColor:"#718060", growthHours:22, yieldLabel:"brins", season:"summer", archetype:"fire", pollinator:"bee" },
  { id:"rosemary", name:"Romarin", category:"herb", symbol:"⌇", description:"Mémoire, fidélité et endurance.", bloomColor:"#8da1cc", secondaryColor:"#54715e", growthHours:26, yieldLabel:"brins", season:"all", archetype:"air", pollinator:"bee" },
  { id:"sage", name:"Sauge", category:"herb", symbol:"◇", description:"Discernement, purification et sagesse pratique.", bloomColor:"#a492be", secondaryColor:"#6d8272", growthHours:26, yieldLabel:"feuilles", season:"summer", archetype:"air", pollinator:"bee" },
  { id:"verbena", name:"Verveine", category:"herb", symbol:"✧", description:"Apaisement, légèreté et retour au corps.", bloomColor:"#d7c2e6", secondaryColor:"#82a46d", growthHours:24, yieldLabel:"feuilles", season:"summer", archetype:"water", pollinator:"butterfly" },
  { id:"chamomile", name:"Camomille", category:"herb", symbol:"✹", description:"Repos, consolation et douceur.", bloomColor:"#f5f2db", secondaryColor:"#e1b83f", growthHours:20, yieldLabel:"fleurs", season:"summer", archetype:"water", pollinator:"bee" },
  { id:"apple", name:"Pommier", category:"tree", symbol:"♧", description:"Durée, mémoire et transmission.", bloomColor:"#f1c5c7", secondaryColor:"#c95a54", growthHours:96, yieldLabel:"pommes", season:"spring", archetype:"union", pollinator:"bee" },
  { id:"pear", name:"Poirier", category:"tree", symbol:"♧", description:"Maturité, douceur et patience.", bloomColor:"#f0eee4", secondaryColor:"#9cb455", growthHours:94, yieldLabel:"poires", season:"spring", archetype:"earth", pollinator:"bee" },
  { id:"cherry", name:"Cerisier", category:"tree", symbol:"✿", description:"Impermanence, beauté et célébration.", bloomColor:"#f5c8d5", secondaryColor:"#b9364e", growthHours:90, yieldLabel:"cerises", season:"spring", archetype:"union", pollinator:"bee" },
  { id:"peach", name:"Pêcher", category:"tree", symbol:"❀", description:"Tendresse, vitalité et sensualité douce.", bloomColor:"#f1a8a8", secondaryColor:"#ed9b63", growthHours:92, yieldLabel:"pêches", season:"spring", archetype:"fire", pollinator:"bee" },
  { id:"apricot", name:"Abricotier", category:"tree", symbol:"☀", description:"Chaleur, confiance et abondance estivale.", bloomColor:"#f4d4c7", secondaryColor:"#e6a14a", growthHours:90, yieldLabel:"abricots", season:"spring", archetype:"fire", pollinator:"bee" },
  { id:"plum", name:"Prunier", category:"tree", symbol:"●", description:"Intériorité, maturation et richesse cachée.", bloomColor:"#eee8ef", secondaryColor:"#6b4f8a", growthHours:94, yieldLabel:"prunes", season:"spring", archetype:"water", pollinator:"bee" },
  { id:"lemon", name:"Citronnier", category:"tree", symbol:"◉", description:"Clarté, énergie et fraîcheur.", bloomColor:"#f7f3e5", secondaryColor:"#e7d746", growthHours:88, yieldLabel:"citrons", season:"all", archetype:"air", pollinator:"bee" },
  { id:"orange", name:"Oranger", category:"tree", symbol:"●", description:"Joie solaire, vitalité et accueil.", bloomColor:"#f7f3e6", secondaryColor:"#ec9b3b", growthHours:92, yieldLabel:"oranges", season:"all", archetype:"fire", pollinator:"bee" },
  { id:"fig", name:"Figuier", category:"tree", symbol:"♣", description:"Intimité, fécondité et sagesse ancienne.", bloomColor:"#d7d7bb", secondaryColor:"#7c5376", growthHours:88, yieldLabel:"figues", season:"summer", archetype:"earth", pollinator:"bird" },
  { id:"olive", name:"Olivier", category:"tree", symbol:"⌇", description:"Paix, endurance et temps long.", bloomColor:"#e7e3c8", secondaryColor:"#88935d", growthHours:120, yieldLabel:"olives", season:"all", archetype:"union" },
  { id:"pomegranate", name:"Grenadier", category:"tree", symbol:"✺", description:"Multiplicité, unité et fécondité.", bloomColor:"#ef7f68", secondaryColor:"#a52f40", growthHours:100, yieldLabel:"grenades", season:"summer", archetype:"union", pollinator:"bee" },
  { id:"walnut", name:"Noyer", category:"tree", symbol:"♧", description:"Protection, profondeur et intelligence.", bloomColor:"#d7d2b8", secondaryColor:"#6f5b3f", growthHours:130, yieldLabel:"noix", season:"autumn", archetype:"earth" },
  { id:"hazel", name:"Noisetier", category:"tree", symbol:"⌁", description:"Intuition, refuge et connaissance cachée.", bloomColor:"#d5c59c", secondaryColor:"#8a6944", growthHours:112, yieldLabel:"noisettes", season:"autumn", archetype:"air" }
];

export const gardenCare: Record<GardenCareAction,{label:string;duration:string;seconds:number;prompt:string;growth:number;water:number;clarity:number;soil:number;harmony:number}> = {
  mindfulWater:{label:"Boire en conscience",duration:"1 min",seconds:60,prompt:"Bois un verre d’eau lentement. Sens la température, le mouvement et le moment où ton corps reçoit l’eau.",growth:10,water:18,clarity:4,soil:0,harmony:2},
  breathe:{label:"Respirer",duration:"1 min",seconds:60,prompt:"Inspire doucement pendant quatre temps, puis expire pendant six. Recommence sans forcer.",growth:5,water:0,clarity:15,soil:1,harmony:4},
  gratitude:{label:"Voir le positif",duration:"2 min",seconds:120,prompt:"Choisis une chose réellement positive de ta journée, même petite, et reste quelques secondes avec elle.",growth:7,water:3,clarity:8,soil:2,harmony:5},
  observe:{label:"Observer",duration:"1 min",seconds:60,prompt:"Regarde un détail vivant autour de toi sans le nommer ni l’analyser.",growth:4,water:0,clarity:10,soil:3,harmony:3},
  move:{label:"Bouger",duration:"3 min",seconds:180,prompt:"Marche, étire-toi ou fais quelques mouvements lents en restant attentif à ton corps.",growth:6,water:0,clarity:3,soil:10,harmony:3},
  create:{label:"Créer",duration:"5 min",seconds:300,prompt:"Trace, écris, chante ou compose quelque chose sans chercher à le réussir.",growth:8,water:1,clarity:5,soil:5,harmony:5},
  rest:{label:"Se déposer",duration:"2 min",seconds:120,prompt:"Pose les épaules, relâche la mâchoire et autorise-toi à ne rien résoudre pendant deux minutes.",growth:3,water:2,clarity:8,soil:4,harmony:5},
  release:{label:"Laisser partir",duration:"2 min",seconds:120,prompt:"Nomme intérieurement une tension que tu peux cesser de porter pour l’instant, puis expire en la laissant s’éloigner.",growth:4,water:1,clarity:12,soil:2,harmony:6}
};

const KEY="prisme.livingGarden.v2";
const LEGACY_KEY="prisme.livingGarden.v1";
const nowIso=()=>new Date().toISOString();
export const gardenDayKey=()=>new Date().toISOString().slice(0,10);

export function defaultLivingGarden(): LivingGardenState {
  return {
    plants:[],
    seeds:Object.fromEntries(plantSpecies.map(species=>[species.id, species.category==="tree"?1:species.category==="vine"?2:3])),
    harvests:{}, soil:58, clarity:54, waterReserve:60, totalCare:0, harmony:50, lastVisitAt:nowIso()
  };
}

function passiveGrowth(plant:LivingPlant, at=Date.now()) {
  const species=plantSpecies.find(item=>item.id===plant.speciesId)??plantSpecies[0];
  const elapsed=Math.max(0,at-new Date(plant.updatedAt).getTime());
  const hours=elapsed/3_600_000;
  const passive=(hours/species.growthHours)*100;
  const condition=(plant.vitality*.45+plant.water*.35+50*.2)/100;
  return Math.min(100,plant.growth+passive*(.35+condition*.65));
}

export function evolveLivingGarden(state:LivingGardenState):LivingGardenState {
  const at=Date.now();
  const plants=state.plants.map(plant=>{
    const hours=Math.max(0,(at-new Date(plant.updatedAt).getTime())/3_600_000);
    return {...plant,growth:passiveGrowth(plant,at),water:Math.max(8,plant.water-hours*1.25),vitality:Math.max(25,plant.vitality-hours*.15),updatedAt:new Date(at).toISOString()};
  });
  return {...state,plants,lastVisitAt:new Date(at).toISOString()};
}

export function loadLivingGarden():LivingGardenState {
  if(typeof window==="undefined")return defaultLivingGarden();
  try {
    const raw=localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
    if(!raw)return defaultLivingGarden();
    const parsed=JSON.parse(raw) as Partial<LivingGardenState>;
    const base=defaultLivingGarden();
    return evolveLivingGarden({...base,...parsed,seeds:{...base.seeds,...(parsed.seeds??{})},harvests:parsed.harvests??{},plants:parsed.plants??[]});
  } catch { return defaultLivingGarden(); }
}

export function saveLivingGarden(state:LivingGardenState){
  if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(state));
}

export function plantSeed(state:LivingGardenState,speciesId:string,intention:string):LivingGardenState {
  if((state.seeds[speciesId]??0)<=0)return state;
  const index=state.plants.length;
  const plant:LivingPlant={id:crypto.randomUUID(),speciesId,intention:intention.trim(),plantedAt:nowIso(),updatedAt:nowIso(),growth:1,vitality:75,water:58,x:8+(index*19)%84,lane:index%3,harvested:0,careLog:{}};
  return {...state,plants:[...state.plants,plant],seeds:{...state.seeds,[speciesId]:(state.seeds[speciesId]??0)-1},soil:Math.max(10,state.soil-2)};
}

export function careForPlant(state:LivingGardenState,plantId:string,action:GardenCareAction):LivingGardenState {
  const day=gardenDayKey(); const care=gardenCare[action];
  let applied=false;
  const plants=state.plants.map(plant=>{
    if(plant.id!==plantId)return plant;
    const done=plant.careLog[day]??[];
    if(done.includes(action))return plant;
    applied=true;
    return {...plant,growth:Math.min(100,passiveGrowth(plant)+care.growth),water:Math.min(100,plant.water+care.water),vitality:Math.min(100,plant.vitality+5+care.soil*.2),updatedAt:nowIso(),careLog:{...plant.careLog,[day]:[...done,action]}};
  });
  if(!applied)return state;
  return {...state,plants,soil:Math.min(100,state.soil+care.soil),clarity:Math.min(100,state.clarity+care.clarity),waterReserve:Math.max(0,state.waterReserve-Math.max(0,care.water*.25)),totalCare:state.totalCare+1,harmony:Math.min(100,state.harmony+care.harmony)};
}

export function harvestPlant(state:LivingGardenState,plantId:string):LivingGardenState {
  let speciesId=""; let canHarvest=false;
  const plants=state.plants.map(plant=>{
    if(plant.id!==plantId||plant.growth<100)return plant;
    speciesId=plant.speciesId;canHarvest=true;
    return {...plant,growth:plantSpecies.find(s=>s.id===plant.speciesId)?.category==="tree"?72:55,harvested:plant.harvested+1,updatedAt:nowIso(),vitality:Math.max(45,plant.vitality-8)};
  });
  if(!canHarvest)return state;
  return {...state,plants,harvests:{...state.harvests,[speciesId]:(state.harvests[speciesId]??0)+1},seeds:{...state.seeds,[speciesId]:(state.seeds[speciesId]??0)+1},harmony:Math.min(100,state.harmony+3)};
}

export function plantStage(growth:number){
  if(growth<12)return "seed";
  if(growth<38)return "sprout";
  if(growth<70)return "growing";
  if(growth<100)return "bud";
  return "mature";
}
