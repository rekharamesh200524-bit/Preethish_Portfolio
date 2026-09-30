"use client";

import React from "react";

interface HeroBackgroundProps {
  offsetX: number;
  offsetY: number;
  lightX: number;
  lightY: number;
}

export default function HeroBackground({
  offsetX,
  offsetY,
  lightX,
  lightY,
}: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Base Dark Gradient */}
      <div className="absolute inset-0 bg-[#07080a]" />

      {/* Dynamic Cursor-Controlled Atmospheric Rim Light */}
      <div
        className="absolute w-[600px] h-[600px] md:w-[850px] md:h-[850px] rounded-full blur-[120px] opacity-40 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.45) 0%, rgba(136, 19, 55, 0.15) 50%, transparent 70%)",
          left: `calc(50% + ${lightX * 120}px - 300px)`,
          top: `calc(42% + ${lightY * 90}px - 300px)`,
        }}
      />

      {/* Deep Studio Ambient Gradient */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#07080a]/60 to-[#07080a] opacity-90" />

      {/* Subtle Studio Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.04] transition-transform duration-500 ease-out"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translate3d(${offsetX * 0.4}px, ${offsetY * 0.4}px, 0)`,
        }}
      />

      {/* Layer 2: Concentric Circular Backdrop Rings (Direct Reference to Video) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${offsetX * 0.7}px), calc(-50% + ${offsetY * 0.7}px), 0)`,
        }}
      >
        {/* Outer Ring */}
        <div className="w-[500px] h-[500px] md:w-[720px] md:h-[720px] rounded-full border border-white/[0.04] relative flex items-center justify-center">
          {/* Middle Ring with Crimson Rim */}
          <div className="w-[360px] h-[360px] md:w-[540px] md:h-[540px] rounded-full border border-red-500/20 shadow-[0_0_50px_rgba(225,29,72,0.12)] relative flex items-center justify-center">
            {/* Inner Ring */}
            <div className="w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full border border-white/[0.06]" />
            {/* Precision Tick Marks on the Ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-red-500/60" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/20" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-white/20" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-white/20" />
          </div>
        </div>
      </div>

      {/* Layer 3: Crimson Horizontal Graphic Slab (Direct Reference to Video) */}
      <div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl h-[130px] md:h-[190px] transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          transform: `translate3d(calc(-50% + ${offsetX * 1.1}px), calc(-50% + ${offsetY * 1.1}px), 0)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-red-700/80 via-red-600/90 to-red-800/80 rounded-none shadow-[0_0_60px_rgba(225,29,72,0.25)] relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Graphic Details inside the Red Slab */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_50%,transparent_100%)]" />
          <div className="absolute bottom-3 left-6 flex items-center gap-3 text-[10px] font-mono text-white/40 tracking-[0.25em]">
            <span>COLOR GRADE: FILM MATRIX</span>
            <span className="text-white/20">|</span>
            <span>GAMMA 2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
