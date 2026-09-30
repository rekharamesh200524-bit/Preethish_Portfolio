"use client";

import React from "react";
import Image from "next/image";

interface HeroPortraitProps {
  portraitX: number;
  portraitY: number;
  rotateX: number;
  rotateY: number;
  isRevealed: boolean;
}

export default function HeroPortrait({
  portraitX,
  portraitY,
  rotateX,
  rotateY,
  isRevealed,
}: HeroPortraitProps) {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center lg:justify-end lg:pr-[12vw] pointer-events-none select-none z-20 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Motion Wrapper with Smooth Spring Lerp Coordinates */}
      <div
        className={`relative w-[340px] sm:w-[440px] md:w-[540px] lg:w-[600px] xl:w-[640px] aspect-[4/5] transition-opacity duration-1000 ease-out ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          transform: `translate3d(${portraitX}px, ${portraitY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Soft crimson rim backlight reflection */}
        <div className="absolute -inset-4 bg-gradient-to-t from-transparent via-red-600/15 to-red-500/25 blur-2xl rounded-full opacity-60 pointer-events-none" />

        {/* Portrait Image Container with Bottom Editorial Feathering */}
        <div className="relative w-full h-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)]">
          <Image
            src="/images/preethish-portrait.jpg"
            alt="Preethish D P — Graphic Designer, Digital Marketer & Visual Storyteller"
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover object-top transition-transform duration-700 ease-out"
          />

          {/* Subtle cinematic lighting overlay matching studio reference */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#07080a]/50 pointer-events-none" />
        </div>

        {/* Camera Focus Brackets on Face (Micro-interaction) */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-44 h-44 pointer-events-none opacity-20 hidden md:block">
          <div className="w-full h-full border border-dashed border-red-500/40 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500/60" />
        </div>
      </div>
    </div>
  );
}
