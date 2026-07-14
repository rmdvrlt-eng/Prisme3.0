import { LivingGardenState } from "@/lib/livingGarden";
import { SanctuaryState } from "@/lib/sanctuary";

export type ConiunctioAxis = "fireWater" | "lightShadow" | "solitudeRelation" | "structureFlow";

export type ConiunctioState = {
  axes: Record<ConiunctioAxis, number>;
  harmony: number;
  activeUnion: ConiunctioAxis;
  message: string;
};

const clamp=(value:number)=>Math.max(0,Math.min(100,value));

export function deriveConiunctio(garden:LivingGardenState,sanctuary:SanctuaryState):ConiunctioState{
  const mature=garden.plants.filter(plant=>plant.growth>=70).length;
  const flowerCount=garden.plants.filter(plant=>{
    const category=(plant.speciesId||"");
    return Boolean(category);
  }).length;
  const pet=sanctuary.pet.active;
  const petBond=sanctuary.pet.bond[pet]??0;
  const petMood=sanctuary.pet.mood[pet]??50;
  const axes:Record<ConiunctioAxis,number>={
    fireWater:clamp((sanctuary.warmth+garden.waterReserve)/2),
    lightShadow:clamp((garden.clarity+sanctuary.rest)/2),
    solitudeRelation:clamp((sanctuary.inspiration+petBond+petMood)/3),
    structureFlow:clamp((sanctuary.order+garden.soil+garden.harmony)/3)
  };
  const activeUnion=(Object.entries(axes).sort((a,b)=>a[1]-b[1])[0]?.[0]??"fireWater") as ConiunctioAxis;
  const harmony=Math.round(Object.values(axes).reduce((sum,value)=>sum+value,0)/4 + Math.min(8,mature*.6)+Math.min(4,flowerCount*.1));
  const messages:Record<ConiunctioAxis,string>={
    fireWater:"Le feu de la Maison et l’eau du Jardin cherchent un rythme commun.",
    lightShadow:"La lumière n’efface pas l’ombre : elles apprennent à se contenir.",
    solitudeRelation:"Le refuge intérieur et la présence de l’autre peuvent grandir ensemble.",
    structureFlow:"L’ordre de la Maison peut soutenir la liberté du vivant sans l’enfermer."
  };
  return {axes,harmony:clamp(harmony),activeUnion,message:messages[activeUnion]};
}
