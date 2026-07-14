"use client";

import { useEffect, useRef } from "react";
import { HouseTheme } from "@/lib/sanctuary";

type Props = { theme: HouseTheme; warmth: number; order: number; rest: number };

type Dust = { x:number; y:number; vx:number; vy:number; size:number; phase:number };
type Ember = { x:number; y:number; vx:number; vy:number; life:number };

const themePalette: Record<HouseTheme,{wall1:string;wall2:string;wood:string;light:string;night:number}> = {
  ambre:{wall1:"#4c3428",wall2:"#2f241f",wood:"#49301f",light:"#ffd493",night:.1},
  foret:{wall1:"#31443a",wall2:"#202d27",wood:"#3e3428",light:"#cce3a4",night:.18},
  nuit:{wall1:"#20283b",wall2:"#151a2a",wood:"#312a2d",light:"#9fc7ff",night:.55},
  aube:{wall1:"#77685c",wall2:"#4f4944",wood:"#5e4632",light:"#ffe2ba",night:.02}
};

export function RealisticInteriorCanvas({theme,warmth,order,rest}:Props){
  const ref=useRef<HTMLCanvasElement|null>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
    const surface:HTMLCanvasElement=canvas;const context:CanvasRenderingContext2D=ctx;
    let w=1,h=1,dpr=1,raf=0;const p=themePalette[theme];const mobile=matchMedia("(max-width:820px)").matches;const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
    const dust:Dust[]=Array.from({length:reduce?8:mobile?22:46},(_,i)=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00005,vy:-.000025-Math.random()*.00007,size:.6+Math.random()*1.7,phase:i*.71}));
    const embers:Ember[]=[];
    function resize(){const r=surface.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);dpr=Math.min(devicePixelRatio||1,mobile?1.3:1.7);surface.width=Math.round(w*dpr);surface.height=Math.round(h*dpr);context.setTransform(dpr,0,0,dpr,0,0)}
    function wall(){const g=context.createLinearGradient(0,0,0,h*.68);g.addColorStop(0,p.wall1);g.addColorStop(1,p.wall2);context.fillStyle=g;context.fillRect(0,0,w,h*.72);context.globalAlpha=.14;for(let y=16;y<h*.7;y+=18){context.strokeStyle="rgba(255,255,255,.08)";context.beginPath();context.moveTo(0,y+Math.sin(y)*2);context.lineTo(w,y+Math.sin(y*.4)*2);context.stroke()}context.globalAlpha=1}
    function floor(t:number){const top=h*.66;const g=context.createLinearGradient(0,top,0,h);g.addColorStop(0,p.wood);g.addColorStop(1,"#1c1511");context.fillStyle=g;context.fillRect(0,top,w,h-top);for(let i=0;i<14;i++){const y=top+i*(h-top)/14;context.strokeStyle=`rgba(255,224,181,${.03+i*.003})`;context.beginPath();context.moveTo(0,y);context.lineTo(w,y);context.stroke()}for(let i=0;i<18;i++){const x=i*w/18;context.strokeStyle="rgba(20,10,6,.18)";context.beginPath();context.moveTo(w/2+(x-w/2)*.35,top);context.lineTo(x,h);context.stroke()}context.globalAlpha=.12+.04*Math.sin(t*.35);context.fillStyle=p.light;context.beginPath();context.ellipse(w*.64,h*.77,w*.27,h*.08,-.08,0,Math.PI*2);context.fill();context.globalAlpha=1}
    function windowLight(t:number){const wx=w*.69,wy=h*.11,ww=w*.22,wh=h*.32;context.fillStyle="rgba(10,19,25,.72)";context.fillRect(wx,wy,ww,wh);const sky=context.createLinearGradient(0,wy,0,wy+wh);sky.addColorStop(0,p.night>.4?"#172542":"#7995a1");sky.addColorStop(1,p.night>.4?"#273351":"#d1b27c");context.fillStyle=sky;context.fillRect(wx+5,wy+5,ww-10,wh-10);context.strokeStyle="rgba(255,239,208,.42)";context.lineWidth=3;context.strokeRect(wx,wy,ww,wh);context.beginPath();context.moveTo(wx+ww/2,wy);context.lineTo(wx+ww/2,wy+wh);context.moveTo(wx,wy+wh/2);context.lineTo(wx+ww,wy+wh/2);context.stroke();const beam=context.createLinearGradient(wx,wy+wh,wx-w*.32,h);beam.addColorStop(0,`rgba(255,225,169,${.18+warmth/480})`);beam.addColorStop(1,"rgba(255,225,169,0)");context.fillStyle=beam;context.beginPath();context.moveTo(wx,wy+wh);context.lineTo(wx+ww,wy+wh);context.lineTo(w*.48,h);context.lineTo(w*.16,h);context.closePath();context.fill();if(p.night>.3){for(let i=0;i<12;i++){context.fillStyle=`rgba(210,229,255,${.25+.15*Math.sin(t+i)})`;context.fillRect(wx+12+(i*37%(ww-20)),wy+12+(i*53%(wh-20)),1.5,1.5)}}}
    function fire(t:number){const fx=w*.16,fy=h*.63;const glow=context.createRadialGradient(fx,fy,0,fx,fy,w*.18);glow.addColorStop(0,`rgba(255,160,67,${.26+warmth/380})`);glow.addColorStop(1,"rgba(255,100,20,0)");context.fillStyle=glow;context.fillRect(0,h*.36,w*.38,h*.52);context.fillStyle="#2a211d";context.fillRect(fx-w*.075,fy-h*.12,w*.15,h*.13);for(let i=0;i<4;i++){const phase=t*(1.8+i*.25)+i;const hh=h*(.05+i*.008)*(1+.18*Math.sin(phase));context.fillStyle=i%2?"rgba(255,190,65,.88)":"rgba(255,108,35,.78)";context.beginPath();context.moveTo(fx+(i-1.5)*8,fy);context.quadraticCurveTo(fx+(i-1.5)*8-8*Math.sin(phase),fy-hh*.62,fx+(i-1.5)*8,fy-hh);context.quadraticCurveTo(fx+(i-1.5)*8+10*Math.sin(phase*.8),fy-hh*.45,fx+(i-1.5)*8,fy);context.fill()}if(!reduce&&Math.random()<.08){embers.push({x:fx+(Math.random()-.5)*20,y:fy-h*.04,vx:(Math.random()-.5)*.18,vy:-.4-Math.random()*.4,life:1})}for(const e of embers){e.x+=e.vx;e.y+=e.vy;e.life*=.97;context.fillStyle=`rgba(255,205,103,${e.life})`;context.fillRect(e.x,e.y,1.5,1.5)}while(embers.length&&embers[0].life<.03)embers.shift()}
    function atmosphere(t:number){for(const d of dust){d.x+=d.vx;d.y+=d.vy;if(d.y<0)d.y=1;if(d.x<0)d.x=1;if(d.x>1)d.x=0;const a=(.15+.22*Math.sin(t*.35+d.phase))*(.55+rest/220);context.fillStyle=`rgba(255,229,180,${a})`;context.beginPath();context.arc(d.x*w,d.y*h,d.size,0,Math.PI*2);context.fill()}const vignette=context.createRadialGradient(w*.5,h*.46,w*.18,w*.5,h*.46,w*.72);vignette.addColorStop(0,"rgba(0,0,0,0)");vignette.addColorStop(1,`rgba(4,5,8,${.32-order/520})`);context.fillStyle=vignette;context.fillRect(0,0,w,h)}
    function draw(ms:number){const t=ms/1000;context.clearRect(0,0,w,h);wall();windowLight(t);floor(t);fire(t);atmosphere(t);raf=requestAnimationFrame(draw)}
    resize();addEventListener("resize",resize);raf=requestAnimationFrame(draw);return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)}
  },[theme,warmth,order,rest]);
  return <canvas ref={ref} className="realistic-interior-canvas" aria-hidden="true"/>;
}
