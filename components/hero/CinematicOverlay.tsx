"use client";

import React from "react";
import { ArrowDownRight, Sparkles, Film, ArrowUpRight } from "lucide-react";

interface CinematicOverlayProps {
  overlayX: number;
  overlayY: number;
  isRevealed: boolean;
}

export default function CinematicOverlay({
  overlayX,
  overlayY,
  isRevealed,
}: CinematicOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20">
      {/* Top Left: Main Editorial Monogram & Name */}
      <div
        className={`transition-all duration-1000 delay-300 ease-out pointer-events-auto ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
        style={{
          transform: `translate3d(${overlayX * 0.4}px, ${overlayY * 0.4}px, 0)`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2.5 h-[1.5px] bg-[#e11d48]" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-400">
            Portfolio Archive 2025–2026
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
          <span className="font-mono text-[10px] tracking-wider text-emerald-400">AVAILABLE FOR ROLES</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none">
          PREETHISH <span className="text-[#e11d48]">D P</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-zinc-400">
          CHENNAI, IN // 13.0827° N, 80.2707° E
        </p>
      </div>

      {/* Bottom Area: Asymmetrical Staggered Identity & Bottom Right Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
        {/* Bottom Left: Identity & Supporting Narrative (Col 1-7) */}
        <div
          className={`lg:col-span-7 transition-all duration-1000 delay-500 ease-out pointer-events-auto ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: `translate3d(${overlayX * 0.8}px, ${overlayY * 0.8}px, 0)`,
          }}
        >
          {/* Staggered Main Professional Identities */}
          <div className="space-y-1 sm:space-y-1.5 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#e11d48]">01</span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/95">
                GRAPHIC DESIGNER
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-500">02</span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/80">
                DIGITAL MARKETER
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#e11d48]">03</span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/95">
                VISUAL STORYTELLER
              </h2>
            </div>
          </div>

          {/* Exact Supporting Text from Requirement */}
          <p className="max-w-xl text-sm sm:text-base text-zinc-300/90 font-normal leading-relaxed border-l border-[#e11d48]/50 pl-4 py-1">
            Creating visual identities, digital experiences, and stories that connect brands with people.
          </p>

          {/* Direct CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              data-cursor-expand
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-white text-black font-heading text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-[#e11d48] hover:text-white"
            >
              <span>Explore Works</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              data-cursor-expand
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none border border-white/20 bg-black/40 backdrop-blur-sm text-white font-heading text-xs tracking-widest font-semibold uppercase transition-all duration-300 hover:border-[#e11d48] hover:bg-[#e11d48]/10"
            >
              <span>Initiate Dialogue</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 pl-2">
              <Film className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>Cinematic Portfolio 2026</span>
            </div>
          </div>
        </div>

        {/* Bottom Right: Scroll & Interactive Camera Indicator (Col 8-12) */}
        <div
          className={`lg:col-span-5 flex flex-col items-start lg:items-end transition-all duration-1000 delay-700 ease-out pointer-events-auto ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: `translate3d(${overlayX * 0.5}px, ${overlayY * 0.5}px, 0)`,
          }}
        >
          <a
            href="#about"
            data-cursor-expand
            className="group flex items-center gap-4 p-3 border border-white/10 bg-black/50 backdrop-blur-md rounded-none hover:border-[#e11d48]/50 transition-all duration-300"
          >
            <div className="text-left lg:text-right">
              <div className="font-heading text-xs font-bold tracking-widest uppercase text-white group-hover:text-[#e11d48] transition-colors">
                Scroll / Explore
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Move cursor to steer camera
              </div>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e11d48] group-hover:bg-[#e11d48]/10 transition-colors">
              <ArrowDownRight className="w-4 h-4 text-zinc-400 group-hover:text-[#e11d48] transition-colors" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
