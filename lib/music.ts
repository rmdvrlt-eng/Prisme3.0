import { DayPhase, VisualSeason } from "@/lib/light";
import { WorldState } from "@/lib/world";

export type MusicTerritory = "personnalite" | "attention" | "emotions" | "relations" | "cognition" | "neurodiversite" | "quotidien" | "sens_identite" | "monde" | "rapport";

export type MusicPreset = {
  label: string;
  root: number;
  ratios: number[];
  drone: number[];
  brightness: number;
  pulse: number;
};

const presets: Record<MusicTerritory, MusicPreset> = {
  personnalite: { label: "Atelier du Soi", root: 110, ratios: [1, 1.25, 1.5, 2, 2.5], drone: [1, 1.5], brightness: .62, pulse: .84 },
  attention: { label: "Labyrinthe de l’Attention", root: 98, ratios: [1, 1.125, 1.5, 1.75, 2], drone: [1, 2], brightness: .72, pulse: 1.12 },
  emotions: { label: "Jardin des Émotions", root: 130.81, ratios: [1, 1.2, 1.5, 1.8, 2.4], drone: [1, 1.5], brightness: .52, pulse: .72 },
  relations: { label: "Galerie des Liens", root: 123.47, ratios: [1, 1.25, 1.5, 1.875, 2.5], drone: [1, 1.25], brightness: .58, pulse: .78 },
  cognition: { label: "Observatoire de l’Esprit", root: 146.83, ratios: [1, 1.125, 1.5, 2, 2.25], drone: [.5, 1], brightness: .82, pulse: .92 },
  neurodiversite: { label: "Chambre des Sens", root: 103.83, ratios: [1, 1.2, 1.6, 2, 2.4], drone: [1, 1.2], brightness: .46, pulse: .66 },
  quotidien: { label: "Maison des Rythmes", root: 87.31, ratios: [1, 1.25, 1.5, 2, 2.25], drone: [1, 1.5], brightness: .48, pulse: 1 },
  sens_identite: { label: "Bibliothèque du Sens", root: 110, ratios: [1, 1.333, 1.5, 2, 2.667], drone: [.5, 1], brightness: .7, pulse: .62 },
  monde: { label: "Monde-mémoire", root: 98, ratios: [1, 1.25, 1.5, 2, 2.5], drone: [.5, 1], brightness: .58, pulse: .74 },
  rapport: { label: "Paysage intérieur", root: 110, ratios: [1, 1.25, 1.5, 2, 3], drone: [.5, 1], brightness: .68, pulse: .58 }
};

export function musicPreset(territory: MusicTerritory) {
  return presets[territory] ?? presets.monde;
}

export function musicParameters(world: WorldState, phase: DayPhase, season: VisualSeason, preset: MusicPreset) {
  const phaseBrightness: Record<DayPhase, number> = { nuit: .52, aube: .72, jour: 1, crépuscule: .68 };
  const seasonTempo: Record<VisualSeason, number> = { printemps: 1.08, été: 1.16, automne: .88, hiver: .72 };
  return {
    filterHz: Math.round(520 + world.sky * 15 + preset.brightness * 900 - world.mist * 5),
    shimmer: Math.max(.03, Math.min(.28, world.sky / 420 + preset.brightness / 10)),
    droneGain: Math.max(.025, Math.min(.13, .035 + world.mountain / 1300)),
    noiseGain: Math.max(.008, Math.min(.055, .012 + world.mist / 2600 + world.wildness / 5000)),
    noteGain: Math.max(.025, Math.min(.11, .04 + world.garden / 1400)),
    intervalMs: Math.round(5200 / (preset.pulse * seasonTempo[season]) + (100 - world.river) * 12),
    brightness: phaseBrightness[phase],
    detune: season === "hiver" ? -7 : season === "été" ? 5 : 0
  };
}
