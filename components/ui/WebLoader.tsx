"use client";

import React, { useEffect, useRef, useState } from "react";

interface WebLoaderProps {
  onComplete?: () => void;
}

const TOTAL_PRELOAD_FRAMES = 50;
const SPOKE_COUNT = 16;
const MAX_RINGS = 18;
const MIN_DURATION = 2400; // minimum duration (ms) for the web to weave to screen edges

export default function WebLoader({ onComplete }: WebLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const progressRef = useRef(0);
  const loadedCountRef = useRef(0);
  const startTimeRef = useRef(0);

  // Preload critical initial video frames and alter-ego assets
  useEffect(() => {
    startTimeRef.current = performance.now();
    let isCancelled = false;

    const assetsToLoad: string[] = [];
    for (let i = 0; i < TOTAL_PRELOAD_FRAMES; i++) {
      const padded = String(i).padStart(3, "0");
      assetsToLoad.push(`/frames/hero/frame_${padded}.jpg`);
    }
    assetsToLoad.push("/images/batman_alter_ego.jpg");
    assetsToLoad.push("/images/spiderman_noir_alter_ego.jpg");

    const totalAssets = assetsToLoad.length;

    assetsToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        if (isCancelled) return;
        loadedCountRef.current++;
      };
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Lock scroll while loader is visible
  useEffect(() => {
    if (!isFinished) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isFinished]);

  // Main Canvas Spider-Web Weaving & Expanding Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId: number;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Floating dew/light sparkles along web strands
    const sparkles: { angleIdx: number; ringT: number; speed: number; alpha: number; size: number }[] = [];
    for (let i = 0; i < 36; i++) {
      sparkles.push({
        angleIdx: Math.floor(Math.random() * SPOKE_COUNT),
        ringT: Math.random(),
        speed: 0.0015 + Math.random() * 0.0025,
        alpha: 0.4 + Math.random() * 0.6,
        size: 1.5 + Math.random() * 2,
      });
    }

    const render = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / MIN_DURATION);
      const assetsRatio = Math.min(1, loadedCountRef.current / (TOTAL_PRELOAD_FRAMES + 2));

      // Progress is smoothly bound by both time (so web expansion looks cinematic) and asset loading
      const targetPercent = Math.min(100, Math.floor((timeRatio * 0.7 + assetsRatio * 0.3) * 100));
      progressRef.current += (targetPercent - progressRef.current) * 0.12;

      const currentP = progressRef.current / 100;
      setProgress(Math.round(progressRef.current));

      // Check if finished
      if (progressRef.current >= 99 && elapsed >= MIN_DURATION && !isExiting) {
        setIsExiting(true);
        setTimeout(() => {
          setIsFinished(true);
          onComplete?.();
        }, 650);
      }

      const cw = canvas.width;
      const ch = canvas.height;
      const cx = cw / 2;
      const cy = ch / 2;
      const maxScreenRadius = Math.hypot(cx, cy) * 1.08;

      // Dark cinematic canvas backdrop
      ctx.fillStyle = "#07080a";
      ctx.fillRect(0, 0, cw, ch);

      // Web expansion curve: ease-out cubic
      const easedExpansion = 1 - Math.pow(1 - currentP, 2.2);
      const currentWebRadius = Math.max(25, easedExpansion * maxScreenRadius);

      // Subtle background ambient red/silver radial glow in the center
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(60, currentWebRadius * 0.6));
      bgGrad.addColorStop(0, "rgba(225, 29, 72, 0.14)");
      bgGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
      bgGrad.addColorStop(1, "rgba(7, 8, 10, 0)");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(60, currentWebRadius * 0.6), 0, Math.PI * 2);
      ctx.fill();

      // 1. Draw Radial Spokes radiating from center
      const spokeAngles: number[] = [];
      const wobble = Math.sin(time * 0.002) * 0.005;

      for (let i = 0; i < SPOKE_COUNT; i++) {
        const baseAngle = (i * 2 * Math.PI) / SPOKE_COUNT;
        const angle = baseAngle + (i % 2 === 0 ? wobble : -wobble);
        spokeAngles.push(angle);

        // Spokes extend slightly beyond active radius to lead the expansion
        const spokeLength = Math.min(maxScreenRadius, currentWebRadius + 45);

        ctx.strokeStyle = i % 4 === 0 ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.22)";
        ctx.lineWidth = i % 4 === 0 ? 1.5 : 1.0;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * spokeLength, cy + Math.sin(angle) * spokeLength);
        ctx.stroke();
      }

      // 2. Draw Concentric Spiral Rings connecting the spokes (Spider Web Arcs)
      for (let r = 1; r <= MAX_RINGS; r++) {
        // Non-linear ring spacing: tighter in center, expanding wider outwards
        const ringFraction = Math.pow(r / MAX_RINGS, 1.25);
        const ringRadius = ringFraction * maxScreenRadius;

        if (ringRadius > currentWebRadius) break;

        // How close is this ring to the expanding frontier
        const distToEdge = currentWebRadius - ringRadius;
        const ringAlpha = Math.min(1, distToEdge / 35);

        const isCrimsonRing = r % 5 === 0;
        ctx.strokeStyle = isCrimsonRing
          ? `rgba(225, 29, 72, ${0.75 * ringAlpha})`
          : `rgba(240, 240, 245, ${0.45 * ringAlpha})`;
        ctx.lineWidth = isCrimsonRing ? 1.4 : 1.0;

        ctx.beginPath();
        for (let i = 0; i < SPOKE_COUNT; i++) {
          const a1 = spokeAngles[i];
          const a2 = spokeAngles[(i + 1) % SPOKE_COUNT];

          const p1x = cx + Math.cos(a1) * ringRadius;
          const p1y = cy + Math.sin(a1) * ringRadius;
          const p2x = cx + Math.cos(a2) * ringRadius;
          const p2y = cy + Math.sin(a2) * ringRadius;

          // Natural spider silk droop towards center (catenary curve)
          const midX = (p1x + p2x) / 2;
          const midY = (p1y + p2y) / 2;
          const droop = 0.12; // curve tension factor
          const ctrlX = midX + (cx - midX) * droop;
          const ctrlY = midY + (cy - midY) * droop;

          if (i === 0) {
            ctx.moveTo(p1x, p1y);
          }
          ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);
        }
        ctx.closePath();
        ctx.stroke();

        // Little nodes / dew drops at intersections
        for (let i = 0; i < SPOKE_COUNT; i++) {
          const a = spokeAngles[i];
          const nx = cx + Math.cos(a) * ringRadius;
          const ny = cy + Math.sin(a) * ringRadius;

          ctx.fillStyle = isCrimsonRing ? "rgba(225, 29, 72, 0.9)" : "rgba(255, 255, 255, 0.75)";
          ctx.beginPath();
          ctx.arc(nx, ny, isCrimsonRing ? 2.2 : 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Dynamic Frontier: Active Weaving Filament & Shockwave Pulse
      const activePulse = (time * 0.003) % 1;
      const pulseRadius = currentWebRadius * (0.85 + activePulse * 0.15);

      ctx.strokeStyle = `rgba(225, 29, 72, ${(1 - activePulse) * 0.65})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Frontier spinning spider silk tracer
      const tracerAngle = (time * 0.0028) % (Math.PI * 2);
      const tracerX = cx + Math.cos(tracerAngle) * currentWebRadius;
      const tracerY = cy + Math.sin(tracerAngle) * currentWebRadius;

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#e11d48";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(tracerX, tracerY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Floating silk sparkles traveling along radial lines
      for (const sp of sparkles) {
        sp.ringT = (sp.ringT + sp.speed) % 1;
        const spDist = sp.ringT * currentWebRadius;
        if (spDist <= currentWebRadius) {
          const spAngle = spokeAngles[sp.angleIdx];
          const sx = cx + Math.cos(spAngle) * spDist;
          const sy = cy + Math.sin(spAngle) * spDist;

          ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha * (1 - sp.ringT * 0.5)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Central Spider Web Core / Nucleus
      const corePulse = 1 + Math.sin(time * 0.005) * 0.08;
      ctx.fillStyle = "#07080a";
      ctx.strokeStyle = "rgba(225, 29, 72, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 18 * corePulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      if (!isFinished) {
        rafId = requestAnimationFrame(render);
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [isExiting, isFinished, onComplete]);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between select-none pointer-events-auto bg-[#07080a] transition-all duration-700 ease-out ${
        isExiting ? "opacity-0 scale-125 blur-sm pointer-events-none" : "opacity-100 scale-100"
      }`}
      aria-label="Weaving cinematic assets loading screen"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Spider Web Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Center Spider Crest / Emblem Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center z-10">
        {/* Futuristic Spider Icon in Center */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#e11d48]/20 blur-xl animate-ping" />
          <svg
            className="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(225,29,72,0.85)] animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Geometric stylized spider mark */}
            <circle cx="12" cy="12" r="3.2" fill="currentColor" fillOpacity="0.3" />
            <ellipse cx="12" cy="7.5" rx="1.8" ry="1.4" fill="currentColor" />
            {/* Legs */}
            <path d="M9 10 L5 6 M5 6 L3 8" />
            <path d="M15 10 L19 6 M19 6 L21 8" />
            <path d="M8.8 12.5 L3.5 13.5 M3.5 13.5 L2 16" />
            <path d="M15.2 12.5 L20.5 13.5 M20.5 13.5 L22 16" />
            <path d="M9.5 14.5 L6 19 M6 19 L4 21" />
            <path d="M14.5 14.5 L18 19 M18 19 L20 21" />
          </svg>
        </div>

        {/* Brand Monogram */}
        <span className="font-heading font-black text-xs sm:text-sm tracking-[0.35em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          PREETHISH <span className="text-[#e11d48]">D P</span>
        </span>
      </div>

      {/* Top Meta Bar */}
      <div className="relative z-10 w-full pt-8 px-8 sm:px-12 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-ping" />
          <span>NEURAL ASSET WEAVE</span>
        </div>

        <div className="text-[10px] font-mono tracking-widest text-zinc-500">
          CH-IN // 2026
        </div>
      </div>

      {/* Bottom Progress Counter & Silk Tension Meter */}
      <div className="relative z-10 w-full pb-10 px-8 sm:px-12 max-w-xl flex flex-col items-center text-center pointer-events-none">
        {/* Numeric Percentage */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
            {String(progress).padStart(2, "0")}
          </span>
          <span className="font-mono text-sm text-[#e11d48] font-bold">%</span>
        </div>

        {/* Minimal Silk Tension Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3.5 relative">
          <div
            className="h-full bg-gradient-to-r from-white via-[#e11d48] to-[#e11d48] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(225,29,72,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Line */}
        <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-zinc-400 uppercase">
          {progress < 40
            ? "SPINNING RADIAL SILK SPOKES..."
            : progress < 80
            ? "WEAVING CONCENTRIC WEB MATRIX..."
            : progress < 100
            ? "BUFFERING CINEMATIC FRAMES..."
            : "INITIALIZING PORTFOLIO EXPERIENCE"}
        </p>
      </div>
    </div>
  );
}
