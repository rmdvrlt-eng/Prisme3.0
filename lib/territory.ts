import { MemoryItem, PrismeModule } from "@/types/prisme";
import { WorldState } from "@/lib/world";

export type TerritoryId = MemoryItem["territory"];

export type TerritoryDefinition = {
  id: TerritoryId;
  title: string;
  subtitle: string;
  symbol: string;
  moduleId: string;
  worldAxis: keyof Pick<WorldState,"garden"|"river"|"sky"|"mountain"|"mist"|"wildness"|"memoryGlow">;
  description: string;
  invitation: string;
  palette: [string,string,string];
};

export const territoryDefinitions: TerritoryDefinition[] = [
  { id:"jardin", title:"Le Jardin", subtitle:"Émotions et croissance", symbol:"✤", moduleId:"emotions", worldAxis:"garden", description:"Les émotions déposées prennent la forme de graines, de fleurs et de chemins.", invitation:"Observer ce qui cherche à pousser sans le forcer.", palette:["#301d42","#8b526b","#42694d"] },
  { id:"fleuve", title:"Le Fleuve", subtitle:"Temps et mémoire", symbol:"≈", moduleId:"relations", worldAxis:"river", description:"Les souvenirs et les liens deviennent des reflets qui se déplacent sans disparaître.", invitation:"Regarder ce qui continue de circuler.", palette:["#071c35","#28708c","#58776d"] },
  { id:"foret", title:"La Forêt", subtitle:"Habitudes et rythmes", symbol:"♧", moduleId:"quotidien", worldAxis:"wildness", description:"Les sentiers représentent les habitudes, les répétitions et les façons de retrouver un rythme.", invitation:"Reconnaître les chemins empruntés souvent.", palette:["#0c2924","#2f6453","#66745a"] },
  { id:"observatoire", title:"L’Observatoire", subtitle:"Compréhension et recul", symbol:"⌁", moduleId:"cognition", worldAxis:"memoryGlow", description:"Les hauteurs permettent de relier les détails, les idées et les traces du parcours.", invitation:"Prendre de la hauteur sans se couper du réel.", palette:["#07182f","#315c86","#777f85"] },
  { id:"temple", title:"Le Temple", subtitle:"Valeurs et identité", symbol:"◇", moduleId:"sens_identite", worldAxis:"sky", description:"Les choix importants et les valeurs trouvent ici une architecture calme et ouverte.", invitation:"Approcher ce qui reste essentiel quand le bruit diminue.", palette:["#2d2034","#8a6c61","#8b805d"] },
  { id:"sommets", title:"Les Sommets", subtitle:"Silence et clarté", symbol:"△", moduleId:"personnalite", worldAxis:"mountain", description:"Un territoire plus dépouillé pour observer la structure, la distance et la stabilité.", invitation:"Laisser apparaître une forme plus simple.", palette:["#0b2034","#577487","#b5c3c7"] },
  { id:"volcan", title:"Le Volcan", subtitle:"Énergie et impulsion", symbol:"▲", moduleId:"attention", worldAxis:"mist", description:"L’énergie intense n’est ni punie ni glorifiée : elle cherche seulement une direction.", invitation:"Voir où l’énergie s’accumule et comment elle se libère.", palette:["#29151c","#984638","#c58b54"] },
  { id:"ciel", title:"Le Ciel", subtitle:"Création et imagination", symbol:"✦", moduleId:"neurodiversite", worldAxis:"sky", description:"Les créations, rêves et intérêts intenses deviennent des constellations singulières.", invitation:"Relier les points sans imposer une seule figure.", palette:["#101333","#4e4d8d","#819bd4"] }
];

const KEY="prisme.territory-visits";
export type TerritoryVisitState={visits:Partial<Record<TerritoryId,number>>;lastVisited?:TerritoryId;updatedAt:string};
export function loadTerritoryVisits():TerritoryVisitState{
  if(typeof window==="undefined")return{visits:{},updatedAt:new Date().toISOString()};
  try{return JSON.parse(localStorage.getItem(KEY)||"") as TerritoryVisitState}catch{return{visits:{},updatedAt:new Date().toISOString()}}
}
export function visitTerritory(state:TerritoryVisitState,id:TerritoryId){
  const next={...state,visits:{...state.visits,[id]:(state.visits[id]??0)+1},lastVisited:id,updatedAt:new Date().toISOString()};
  if(typeof window!=="undefined")localStorage.setItem(KEY,JSON.stringify(next));
  return next;
}
export function moduleForTerritory(modules:PrismeModule[],definition:TerritoryDefinition){return modules.find(module=>module.id===definition.moduleId)}
