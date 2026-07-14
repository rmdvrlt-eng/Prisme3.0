"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calculateLight } from "@/lib/light";
import { musicParameters, musicPreset, MusicTerritory } from "@/lib/music";
import { WorldState } from "@/lib/world";

type AudioNodes = {
  context: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  reverb: ConvolverNode;
  wet: GainNode;
  droneGain: GainNode;
  noiseGain: GainNode;
  windGain: GainNode;
  waterGain: GainNode;
  oscillators: OscillatorNode[];
  noise: AudioBufferSourceNode;
  waterNoise: AudioBufferSourceNode;
};

function makeImpulse(context: AudioContext, seconds = 3.8, decay = 2.8) {
  const length = Math.floor(context.sampleRate * seconds);
  const impulse = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / length, decay);
    }
  }
  return impulse;
}

function makeNoise(context: AudioContext) {
  const length = context.sampleRate * 4;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let index = 0; index < length; index += 1) {
    const white = Math.random() * 2 - 1;
    last = last * .985 + white * .015;
    data[index] = last * 3.2;
  }
  return buffer;
}

export function MusicEngine({ territory, world, enabled = true, compact = false }: {
  territory: MusicTerritory;
  world: WorldState;
  enabled?: boolean;
  compact?: boolean;
}) {
  const [active, setActive] = useState(false);
  const [liveTerritory, setLiveTerritory] = useState<MusicTerritory>(territory);
  const [volume, setVolume] = useState(.42);
  const [now, setNow] = useState(() => new Date());
  const nodesRef = useRef<AudioNodes | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const preset = useMemo(() => musicPreset(liveTerritory), [liveTerritory]);
  const light = useMemo(() => calculateLight(now, world.sky, world.mist), [now, world.sky, world.mist]);
  const params = useMemo(() => musicParameters(world, light.phase, light.season, preset), [world, light.phase, light.season, preset]);

  useEffect(() => {
    setLiveTerritory(territory);
  }, [territory]);

  useEffect(() => {
    function followWorld(event: Event) {
      const detail = (event as CustomEvent<{ territory?: MusicTerritory }>).detail;
      if (detail?.territory) setLiveTerritory(detail.territory);
    }
    window.addEventListener("prisme:music-territory", followWorld);
    return () => window.removeEventListener("prisme:music-territory", followWorld);
  }, []);

  useEffect(() => {
    const stored = Number(localStorage.getItem("prisme.music.volume"));
    if (Number.isFinite(stored) && stored >= 0 && stored <= 1) setVolume(stored);
    const clock = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    const time = nodes.context.currentTime;
    nodes.master.gain.setTargetAtTime(active && enabled ? volume * .12 : 0, time, .5);
    nodes.filter.frequency.setTargetAtTime(Math.max(240, params.filterHz), time, .7);
    nodes.droneGain.gain.setTargetAtTime(params.droneGain, time, .7);
    nodes.noiseGain.gain.setTargetAtTime(params.noiseGain, time, .7);
    const rainAmount = Math.max(0, Math.min(1, (world.mist + world.wildness - 75) / 95));
    const waterAmount = liveTerritory === "relations" ? .075 : liveTerritory === "monde" ? .048 : liveTerritory === "rapport" ? .035 : .016;
    nodes.windGain.gain.setTargetAtTime(.006 + world.wildness / 4200 + rainAmount * .025, time, 1.4);
    nodes.waterGain.gain.setTargetAtTime(waterAmount * (.55 + world.river / 120), time, 1.6);
    nodes.oscillators.forEach((oscillator, index) => {
      const ratio = preset.drone[index % preset.drone.length];
      oscillator.frequency.setTargetAtTime(preset.root * ratio, time, .8);
      oscillator.detune.setTargetAtTime(params.detune, time, .8);
    });
  }, [active, enabled, volume, params, preset]);

  useEffect(() => {
    if (!active || !enabled) return;
    scheduleNext();
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [active, enabled, liveTerritory, params.intervalMs]);

  useEffect(() => () => stop(), []);

  function createNodes() {
    const context = new AudioContext();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    const reverb = context.createConvolver();
    const wet = context.createGain();
    const droneGain = context.createGain();
    const noiseGain = context.createGain();
    const windGain = context.createGain();
    const waterGain = context.createGain();
    reverb.buffer = makeImpulse(context);
    filter.type = "lowpass";
    filter.Q.value = .7;
    master.gain.value = 0;
    wet.gain.value = .36;
    droneGain.gain.value = params.droneGain;
    noiseGain.gain.value = params.noiseGain;
    windGain.gain.value = .012;
    waterGain.gain.value = .025;

    filter.connect(master);
    filter.connect(reverb);
    reverb.connect(wet);
    wet.connect(master);
    master.connect(context.destination);

    const oscillators = preset.drone.map((ratio, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = preset.root * ratio;
      oscillator.detune.value = params.detune;
      gain.gain.value = index === 0 ? 1 : .34;
      oscillator.connect(gain);
      gain.connect(droneGain);
      oscillator.start();
      return oscillator;
    });
    droneGain.connect(filter);

    const noise = context.createBufferSource();
    noise.buffer = makeNoise(context);
    noise.loop = true;
    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 680;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(filter);
    noise.start();

    const windFilter = context.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.value = light.phase === "nuit" ? 420 : 690;
    windFilter.Q.value = .42;
    noise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(master);

    const waterNoise = context.createBufferSource();
    waterNoise.buffer = makeNoise(context);
    waterNoise.loop = true;
    const waterFilter = context.createBiquadFilter();
    waterFilter.type = "bandpass";
    waterFilter.frequency.value = 1150;
    waterFilter.Q.value = .55;
    const waterLfo = context.createOscillator();
    const waterLfoGain = context.createGain();
    waterLfo.frequency.value = .16 + world.river / 420;
    waterLfoGain.gain.value = .016;
    waterLfo.connect(waterLfoGain);
    waterLfoGain.connect(waterGain.gain);
    waterNoise.connect(waterFilter);
    waterFilter.connect(waterGain);
    waterGain.connect(master);
    waterNoise.start();
    waterLfo.start();

    nodesRef.current = { context, master, filter, reverb, wet, droneGain, noiseGain, windGain, waterGain, oscillators: [...oscillators, waterLfo], noise, waterNoise };
  }

  function playNote() {
    const nodes = nodesRef.current;
    if (!nodes || nodes.context.state !== "running") return;
    const context = nodes.context;
    const index = stepRef.current % preset.ratios.length;
    const octave = stepRef.current % 7 === 5 ? 2 : 1;
    const frequency = preset.root * preset.ratios[index] * octave;
    stepRef.current += 1;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const panner = context.createStereoPanner();
    oscillator.type = stepRef.current % 3 === 0 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = params.detune + (Math.random() * 5 - 2.5);
    panner.pan.value = Math.sin(stepRef.current * 1.7) * .55;
    const start = context.currentTime + .02;
    const duration = 2.7 + params.shimmer * 5;
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(params.noteGain * params.brightness, start + .16);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(panner);
    panner.connect(nodes.filter);
    panner.connect(nodes.reverb);
    oscillator.start(start);
    oscillator.stop(start + duration + .1);
  }

  function scheduleNext() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    playNote();
    const variation = .78 + Math.random() * .5;
    timerRef.current = window.setTimeout(scheduleNext, params.intervalMs * variation);
  }

  async function toggle() {
    if (!enabled) return;
    if (!nodesRef.current) createNodes();
    const nodes = nodesRef.current;
    if (!nodes) return;
    if (nodes.context.state === "suspended") await nodes.context.resume();
    setActive((current) => !current);
  }

  function stop() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    const nodes = nodesRef.current;
    if (!nodes) return;
    const time = nodes.context.currentTime;
    nodes.master.gain.cancelScheduledValues(time);
    nodes.master.gain.setTargetAtTime(0, time, .32);
    try { nodes.noise.stop(time + .9); } catch {}
    try { nodes.waterNoise.stop(time + .9); } catch {}
    nodes.oscillators.forEach((oscillator) => { try { oscillator.stop(); } catch {} });
    window.setTimeout(() => { void nodes.context.close(); }, 1000);
    nodesRef.current = null;
  }

  function updateVolume(value: number) {
    setVolume(value);
    localStorage.setItem("prisme.music.volume", String(value));
  }

  if (!enabled) return null;

  return <section className={compact ? "music-engine compact" : "music-engine"}>
    <button className={active ? "music-toggle active" : "music-toggle"} onClick={toggle} aria-pressed={active}>
      <span className="music-bars"><i/><i/><i/><i/></span>
      <span><strong>{active ? "Paysage sonore actif" : "Écouter le monde"}</strong><small>{preset.label} · {light.phase} · {light.season}</small></span>
    </button>
    {!compact && <label className="music-volume"><span>Présence</span><input type="range" min="0.12" max="0.8" step="0.02" value={volume} onChange={(event) => updateVolume(Number(event.target.value))}/></label>}
  </section>;
}
