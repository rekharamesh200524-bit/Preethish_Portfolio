"use client";

import React from "react";

interface FloatingElementsProps {
  coordX: number;
  coordY: number;
}

export default function FloatingElements({ coordX, coordY }: FloatingElementsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30">
      {/* Top Center Camera HUD Meta */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[11px] font-mono tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span className="text-white font-medium">REC</span>
        </div>
        <span className="text-zinc-600">|</span>
        <span>24.00 FPS</span>
        <span className="text-zinc-600">|</span>
        <span>4K RAW</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-300">
          X: {coordX >= 0 ? `+${coordX.toFixed(2)}` : coordX.toFixed(2)} Y:{" "}
          {coordY >= 0 ? `+${coordY.toFixed(2)}` : coordY.toFixed(2)}
        </span>
      </div>

      {/* Focus Viewfinder Brackets around Center Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-5xl h-[70vh] pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-8 h-8 hud-corner-tl" />
        <div className="absolute top-0 right-0 w-8 h-8 hud-corner-tr" />
        <div className="absolute bottom-0 left-0 w-8 h-8 hud-corner-bl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 hud-corner-br" />

        {/* Subtle center crosshairs */}
        <div className="absolute top-1/2 left-4 w-4 h-[1px] bg-white/30 -translate-y-1/2" />
        <div className="absolute top-1/2 right-4 w-4 h-[1px] bg-white/30 -translate-y-1/2" />
        <div className="absolute top-4 left-1/2 h-4 w-[1px] bg-white/30 -translate-x-1/2" />
        <div className="absolute bottom-4 left-1/2 h-4 w-[1px] bg-white/30 -translate-x-1/2" />
      </div>

      {/* Left Vertical Frame Indicator */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[10px] font-mono tracking-[0.3em] text-zinc-500 [writing-mode:vertical-lr] rotate-180">
        <span className="text-red-500/80">DIRECTOR OF CREATIVE</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-red-500/60 via-zinc-700 to-transparent" />
        <span className="text-zinc-600">PREETHISH D P // CHENNAI</span>
      </div>

      {/* Right Vertical Frame Indicator */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-[10px] font-mono tracking-[0.3em] text-zinc-500 [writing-mode:vertical-lr]">
        <span className="text-zinc-400">PORTFOLIO // 2025-2026</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-zinc-700 to-red-500/60" />
        <span className="text-zinc-600">VISUAL COMMUNICATION</span>
      </div>

      {/* Star / Sparkle Coordinate Marker (Matching Reference Video) */}
      <div className="absolute bottom-28 right-16 hidden md:block text-zinc-600 opacity-60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
      <div className="absolute top-36 left-20 hidden md:block text-zinc-600 opacity-40">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>
  );
}
