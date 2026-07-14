"use client";

import { useEffect, useRef } from "react";
import { TerritoryId } from "@/lib/territory";

const palettes: Record<TerritoryId | "monde", { skyTop: string; skyBottom: string; mountain: string; mountain2: string; water: string; foliage: string; glow: string }> = {
  monde: { skyTop: "#14263e", skyBottom: "#dfb479", mountain: "#384d58", mountain2: "#607064", water: "#447f8b", foliage: "#294f3b", glow: "#ffd79a" },
  jardin: { skyTop: "#31556b", skyBottom: "#f0c896", mountain: "#526e64", mountain2: "#7e8c6d", water: "#5b9ca0", foliage: "#315e42", glow: "#ffe0a2" },
  foret: { skyTop: "#132b30", skyBottom: "#6e8063", mountain: "#26443e", mountain2: "#37584c", water: "#396c6d", foliage: "#173d2c", glow: "#bde0a1" },
  fleuve: { skyTop: "#23415b", skyBottom: "#b8c6b4", mountain: "#3c5660", mountain2: "#667a78", water: "#4d91a4", foliage: "#2b5244", glow: "#cdefff" },
  observatoire: { skyTop: "#07142e", skyBottom: "#263d63", mountain: "#29394c", mountain2: "#3d5067", water: "#243f5e", foliage: "#243d3d", glow: "#a6cfff" },
  sommets: { skyTop: "#2b4966", skyBottom: "#d8e6e6", mountain: "#546678", mountain2: "#8fa2aa", water: "#6f9da7", foliage: "#3b5a4a", glow: "#f9f4d9" },
  temple: { skyTop: "#332a43", skyBottom: "#c6a56e", mountain: "#514656", mountain2: "#786c64", water: "#68757a", foliage: "#3f5540", glow: "#ffe2a0" },
  volcan: { skyTop: "#2b0f16", skyBottom: "#8b3c2c", mountain: "#3c2427", mountain2: "#6c3027", water: "#7b3c32", foliage: "#2d3025", glow: "#ff9b55" },
  ciel: { skyTop: "#100f34", skyBottom: "#4a3f76", mountain: "#333356", mountain2: "#58537a", water: "#394f79", foliage: "#263c52", glow: "#d9c4ff" }
};

type Particle = { x: number; y: number; vx: number; vy: number; size: number; phase: number };
type Bird = { x: number; y: number; speed: number; wing: number; depth: number };
type Ripple = { x: number; y: number; radius: number; alpha: number };

type Props = {
  territory?: TerritoryId | "monde";
  intensity?: number;
  interactive?: boolean;
};

export function RealisticWorldCanvas({ territory = "monde", intensity = 1, interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const ripples = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const surface: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;

    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    const palette = palettes[territory];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    const particleCount = reduce ? 8 : mobile ? 24 : 52;
    const birdCount = reduce ? 0 : mobile ? 3 : 7;
    const particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random(), y: Math.random(), vx: .00005 + Math.random() * .00012, vy: -.00005 - Math.random() * .0001,
      size: 1 + Math.random() * 2.4, phase: i * .87
    }));
    const birds: Bird[] = Array.from({ length: birdCount }, () => ({
      x: Math.random(), y: .12 + Math.random() * .28, speed: .00018 + Math.random() * .00024, wing: Math.random() * Math.PI * 2, depth: .45 + Math.random() * .55
    }));

    function resize() {
      const rect = surface.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75);
      surface.width = Math.round(width * dpr);
      surface.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const gradient = (top: string, bottom: string) => {
      const g = context.createLinearGradient(0, 0, 0, height);
      g.addColorStop(0, top); g.addColorStop(1, bottom); return g;
    };

    function mountainLayer(baseY: number, amp: number, color: string, offset: number, parallax: number) {
      context.beginPath(); context.moveTo(0, height);
      for (let x = 0; x <= width + 18; x += 18) {
        const nx = x / width;
        const wave = Math.sin(nx * 7.2 + offset) * .42 + Math.sin(nx * 16.3 + offset * .7) * .16;
        const peaks = Math.pow(Math.max(0, Math.sin(nx * Math.PI * 3.1 + offset)), 2.7) * .62;
        const y = baseY - (wave + peaks) * amp + (pointer.current.x - .5) * parallax;
        context.lineTo(x, y);
      }
      context.lineTo(width, height); context.closePath(); context.fillStyle = color; context.fill();
    }

    function drawTree(x: number, ground: number, scale: number, sway: number, alpha = 1) {
      context.save(); context.globalAlpha = alpha; context.translate(x, ground); context.rotate(sway);
      context.fillStyle = "rgba(34,25,18,.72)"; context.fillRect(-2.2 * scale, -31 * scale, 4.4 * scale, 31 * scale);
      const colors = [palette.foliage, "#335c3d", "#47734c"];
      for (let i = 0; i < 5; i++) {
        context.beginPath(); const y = -30 * scale - i * 9 * scale; const r = (15 - i * 1.3) * scale;
        context.arc((i % 2 ? 2 : -2) * scale, y, r, 0, Math.PI * 2);
        context.fillStyle = colors[i % colors.length]; context.fill();
      }
      context.restore();
    }

    function drawWater(t: number) {
      const waterY = height * .66;
      context.fillStyle = gradient("rgba(55,113,129,.68)", palette.water); context.fillRect(0, waterY, width, height - waterY);
      context.save(); context.globalCompositeOperation = "screen";
      for (let line = 0; line < 11; line++) {
        context.beginPath(); const y = waterY + 8 + line * ((height - waterY) / 12);
        for (let x = 0; x <= width; x += 8) {
          const wave = Math.sin(x * .018 + t * (.7 + line * .03) + line) * (1.2 + line * .13);
          context.lineTo(x, y + wave + pointer.current.x * 1.6);
        }
        context.strokeStyle = `rgba(215,239,231,${.05 + line * .003})`; context.lineWidth = .7 + line * .06; context.stroke();
      }
      const glow = context.createRadialGradient(width * .64, waterY + 15, 0, width * .64, waterY + 15, width * .33);
      glow.addColorStop(0, "rgba(255,225,158,.22)"); glow.addColorStop(1, "rgba(255,225,158,0)"); context.fillStyle = glow; context.fillRect(0, waterY, width, height - waterY);
      context.restore();

      ripples.current = ripples.current.filter(r => r.alpha > .015);
      for (const r of ripples.current) {
        context.beginPath(); context.ellipse(r.x, r.y, r.radius * 1.7, r.radius * .45, 0, 0, Math.PI * 2);
        context.strokeStyle = `rgba(226,244,234,${r.alpha})`; context.lineWidth = 1.2; context.stroke(); r.radius += 1.45; r.alpha *= .972;
      }
    }

    function drawAnimals(t: number) {
      if (territory === "foret" || territory === "jardin" || territory === "monde") {
        const foxX = width * (.24 + Math.sin(t * .08) * .025); const ground = height * .78;
        context.save(); context.translate(foxX, ground); context.scale(.75, .75); context.fillStyle = "rgba(175,91,42,.84)";
        context.beginPath(); context.ellipse(0, 0, 19, 8, 0, 0, Math.PI * 2); context.fill(); context.beginPath(); context.arc(17, -5, 7, 0, Math.PI * 2); context.fill();
        context.beginPath(); context.moveTo(15,-11);context.lineTo(18,-20);context.lineTo(21,-10);context.fill();context.beginPath();context.moveTo(21,-10);context.lineTo(26,-18);context.lineTo(27,-7);context.fill();
        context.lineWidth=7;context.lineCap="round";context.strokeStyle="rgba(175,91,42,.84)";context.beginPath();context.moveTo(-17,-1);context.quadraticCurveTo(-34,-12,-39,2);context.stroke();
        context.restore();
      }
      if (territory === "fleuve" || territory === "jardin") {
        context.save(); context.globalAlpha = .5; context.fillStyle = "#edf3d4";
        for (let i=0;i<4;i++){const x=width*(.38+i*.09)+Math.sin(t*.7+i)*10;const y=height*(.62+i*.012);context.beginPath();context.ellipse(x,y,5,1.5,0,0,Math.PI*2);context.fill();}
        context.restore();
      }
    }

    function draw(t: number) {
      frame++; pointer.current.x += (pointer.current.tx - pointer.current.x) * .045; pointer.current.y += (pointer.current.ty - pointer.current.y) * .045;
      context.clearRect(0, 0, width, height);
      context.fillStyle = gradient(palette.skyTop, palette.skyBottom); context.fillRect(0, 0, width, height);

      const time = new Date(); const hour = time.getHours() + time.getMinutes() / 60;
      const sunX = width * (.08 + Math.min(1, Math.max(0, (hour - 5) / 14)) * .82) + (pointer.current.x - .5) * 14;
      const sunY = height * (.33 - Math.sin(Math.min(1, Math.max(0, (hour - 5) / 14)) * Math.PI) * .22);
      const sun = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * .24);
      sun.addColorStop(0, "rgba(255,245,211,.62)"); sun.addColorStop(.12, "rgba(255,221,155,.31)"); sun.addColorStop(1, "rgba(255,205,130,0)"); context.fillStyle = sun; context.fillRect(0,0,width,height);

      mountainLayer(height*.58, height*.23, palette.mountain2, t*.015, 12);
      mountainLayer(height*.67, height*.19, palette.mountain, 1.4+t*.01, 20);
      drawWater(t);

      const groundY = height * .83;
      context.fillStyle = palette.foliage; context.fillRect(0, groundY, width, height-groundY);
      for (let i=0;i<(mobile?15:28);i++) {
        const x = (i/(mobile?14:27))*width + Math.sin(i*2.4)*14;
        const scale = .45 + ((i*37)%100)/140;
        const sway = Math.sin(t*.7+i)*.012*intensity;
        drawTree(x, groundY + Math.sin(i)*7, scale, sway, .6 + scale*.35);
      }

      drawAnimals(t);
      for (const b of birds) {
        b.x += b.speed * (reduce ? .25 : 1); if (b.x > 1.1) { b.x = -.1; b.y = .12 + Math.random()*.25; }
        b.wing += .14; const bx=b.x*width, by=b.y*height+(pointer.current.x-.5)*8*b.depth;
        context.strokeStyle=`rgba(31,37,35,${.42*b.depth})`;context.lineWidth=1.2*b.depth;context.beginPath();context.moveTo(bx-7*b.depth,by);context.quadraticCurveTo(bx-2,by-Math.sin(b.wing)*5,bx,by);context.quadraticCurveTo(bx+2,by-Math.sin(b.wing)*5,bx+7*b.depth,by);context.stroke();
      }

      for (const p of particles) {
        p.x += p.vx * (reduce ? .2 : 1); p.y += p.vy * (reduce ? .2 : 1); if (p.x>1.05)p.x=-.05;if(p.y<-.05)p.y=1.05;
        const pulse=.35+.45*Math.sin(t*.8+p.phase);context.fillStyle=`rgba(255,225,155,${pulse*.55})`;context.beginPath();context.arc(p.x*width+(pointer.current.x-.5)*18,p.y*height,p.size,0,Math.PI*2);context.fill();
      }

      const mist = context.createLinearGradient(0,height*.46,0,height*.82); mist.addColorStop(0,"rgba(225,236,219,0)");mist.addColorStop(.5,"rgba(225,236,219,.08)");mist.addColorStop(1,"rgba(225,236,219,0)");context.fillStyle=mist;context.fillRect(0,height*.43,width,height*.42);
      raf = requestAnimationFrame(() => draw(performance.now()/1000));
    }

    function move(e: PointerEvent) { if (!interactive) return; const r=surface.getBoundingClientRect();pointer.current.tx=(e.clientX-r.left)/r.width;pointer.current.ty=(e.clientY-r.top)/r.height; }
    function down(e: PointerEvent) { if (!interactive) return; const r=surface.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;pointer.current.tx=x/r.width;pointer.current.ty=y/r.height;if(y>height*.58)ripples.current.push({x,y,radius:4,alpha:.62}); }
    resize(); window.addEventListener("resize", resize); surface.addEventListener("pointermove", move); surface.addEventListener("pointerdown", down); draw(0);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); surface.removeEventListener("pointermove", move); surface.removeEventListener("pointerdown", down); };
  }, [territory, intensity, interactive]);

  return <canvas ref={canvasRef} className={`realistic-world-canvas canvas-${territory}`} aria-hidden="true" />;
}
