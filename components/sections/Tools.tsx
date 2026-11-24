"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MarqueeCard {
  id: string;
  num: string;
  name: string;
  category: string;
  image: string;
  isPortrait?: boolean;
}

const CARDS: MarqueeCard[] = [
  {
    id: "illustrator",
    num: "01",
    name: "Adobe Illustrator",
    category: "Vector & Identity Systems",
    image: "/images/tools/illustrator.jpg",
    isPortrait: false,
  },
  {
    id: "canva",
    num: "02",
    name: "Canva Pro",
    category: "Rapid Multi-Format Collateral",
    image: "/images/tools/canva.jpg",
    isPortrait: false,
  },
  {
    id: "indesign",
    num: "03",
    name: "Adobe InDesign",
    category: "Editorial & Grid Layouts",
    image: "/images/tools/indesign.jpg",
    isPortrait: false,
  },
  {
    id: "photoshop",
    num: "04",
    name: "Adobe Photoshop",
    category: "Compositing & Retouching",
    image: "/images/tools/photoshop.jpg",
    isPortrait: true,
  },
  {
    id: "davinci",
    num: "05",
    name: "DaVinci Resolve Studio",
    category: "Rec.709 & Log Color Science",
    image: "/images/tools/davinci.jpg",
    isPortrait: false,
  },
  {
    id: "premiere",
    num: "06",
    name: "Adobe Premiere Pro CC",
    category: "NLE Assembly & Timecode",
    image: "/images/tools/premiere.jpg",
    isPortrait: false,
  },
  {
    id: "finalcut",
    num: "07",
    name: "Final Cut Pro X",
    category: "Pacing & Narrative Cuts",
    image: "/images/tools/finalcut.jpg",
    isPortrait: false,
  },
  {
    id: "figma",
    num: "08",
    name: "Figma",
    category: "Interface & Prototype Systems",
    image: "/images/tools/figma.jpg",
    isPortrait: true,
  },
  {
    id: "googleads",
    num: "09",
    name: "Google Ads",
    category: "Search Intent & High-ROAS SEM",
    image: "/images/tools/googleads.jpg",
    isPortrait: false,
  },
  {
    id: "metabusiness",
    num: "10",
    name: "Meta Business Suite",
    category: "Campaigns & Retargeting",
    image: "/images/tools/metabusiness.jpg",
    isPortrait: false,
  },
];

export default function Tools() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState<MarqueeCard | null>(null);

  // Duplicate items for a seamless infinite loop
  const marqueeItems = [...CARDS, ...CARDS];

  return (
    <section
      id="tools"
      aria-label="Creative Tools & Production Arsenal"
      className="relative w-full h-[calc(100vh-4rem)] min-h-[480px] max-h-[720px] overflow-hidden bg-[#07080a] flex flex-col justify-between pt-6 sm:pt-8 md:pt-10 pb-0 select-none border-t border-b border-white/[0.08]"
    >
      {/* ── Background: /images/back.png with subtle cinematic vignette ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/back.png"
          alt="Creative Tools Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft edge darkening for theme coherence */}
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07080a] via-[#07080a]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07080a] via-[#07080a]/75 to-transparent" />
      </div>

      {/* ── Top Editorial Header (Matching Reference Screenshot) ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-12 flex items-start justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
            Engineered
            <br />
            to Create.
          </h2>
          <p className="mt-2 font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.32em] text-[#e11d48]">
            PRODUCTION SUITE // CREATIVE ARSENAL
          </p>
        </div>

        {/* Top-Right Editorial Pillars */}
        <div className="flex flex-col items-end text-right gap-2">
          <div className="font-mono text-[8px] sm:text-[9.5px] leading-tight uppercase tracking-[0.25em] text-zinc-400 font-medium">
            <div>PEOPLE</div>
            <div>IDEAS</div>
            <div>TECHNOLOGY</div>
            <div className="text-white">REAL IMPACT</div>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#e11d48]/90 font-medium pt-1">
            FILM &nbsp;/&nbsp; BRAND &nbsp;/&nbsp; CONTENT &nbsp;/&nbsp; EXPERIENCES
          </div>
        </div>
      </div>

      {/* ── Marquee Stream (Placed directly at the bottom of the section) ── */}
      <div
        className="relative z-20 mt-auto mb-0 pb-3 sm:pb-5 overflow-hidden w-full flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#07080a]/90 via-[#07080a]/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#07080a]/90 via-[#07080a]/40 to-transparent z-10 pointer-events-none" />

        {/* Infinite Marquee Track with items-center so portrait cards align seamlessly */}
        <div
          className="flex items-center gap-4 sm:gap-5 w-max"
          style={{
            animation: "marqueeTrack 45s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {marqueeItems.map((item, idx) => {
            const isHovered = activeCard?.id === item.id;
            return (
              <div
                key={`${item.id}-${idx}`}
                onMouseEnter={() => setActiveCard(item)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-2xl shrink-0 flex items-center justify-center ${
                  item.isPortrait
                    ? "w-[170px] sm:w-[200px] md:w-[220px] aspect-[3/4]"
                    : "w-[220px] sm:w-[260px] md:w-[290px] aspect-[16/10]"
                } ${
                  isHovered
                    ? "border-red-500/90 scale-[1.03] shadow-[0_0_35px_rgba(225,29,72,0.45)] z-30"
                    : "border-white/15 hover:border-red-500/60"
                }`}
              >
                {/* Card Thumbnail Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 240px, 300px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Ambient Red Glow Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-75 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                {/* Top Tool Badge / Title on hover */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <span className="bg-black/85 backdrop-blur-md border border-red-500/40 text-white font-mono text-[8.5px] px-2 py-0.5 rounded tracking-wider truncate max-w-[85%]">
                    {item.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse" />
                </div>

                {/* Bottom-Left Number Identifier */}
                <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 z-20 pointer-events-none">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-white/95 drop-shadow-md tracking-wider">
                    {item.num}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Keyframes for smooth infinite marquee looping */}
      <style jsx>{`
        @keyframes marqueeTrack {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
