"use client";

import React from "react";
import { MarketingToolItem } from "./marketingToolsData";
import { ToolIcon } from "./ToolIcons";
import { ArrowUpRight, TrendingUp } from "lucide-react";

interface MarketingToolBlock3DProps {
  tool: MarketingToolItem;
  tilt: { x: number; y: number };
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

export function MarketingToolBlock3D({
  tool,
  tilt,
  isHovered,
  onHover,
  onClick,
}: MarketingToolBlock3DProps) {
  // Depth parallax multiplier
  const parallaxX = tilt.x * (tool.side === "left" ? 1.4 : -1.4);
  const parallaxY = tilt.y * 1.2;

  return (
    <div
      data-cursor-expand
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="absolute cursor-pointer select-none transition-all duration-300 ease-out"
      style={{
        left: `${tool.gridPos.x}%`,
        top: `${tool.gridPos.y}%`,
        transformStyle: "preserve-3d",
        transform: `
          translate(-50%, -50%)
          translate3d(${parallaxX}px, ${parallaxY}px, ${isHovered ? 38 : 0}px)
          rotateY(${tool.gridPos.rotateY + tilt.x * 0.4}deg)
          rotateX(${tool.gridPos.rotateX + tilt.y * 0.4}deg)
          scale(${isHovered ? tool.gridPos.scale * 1.1 : tool.gridPos.scale})
        `,
        zIndex: isHovered ? 40 : 20,
        willChange: "transform",
      }}
    >
      {/* ── 3D PHYSICAL BEVELED CUBE CHASSIS ── */}
      <div
        className="relative group rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          width: "clamp(88px, 8.5vw, 132px)",
          height: "clamp(84px, 8.2vw, 126px)",
          background: "linear-gradient(145deg, rgba(17,19,26,0.92) 0%, rgba(8,9,13,0.96) 100%)",
          border: isHovered
            ? `1.5px solid ${tool.color}`
            : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: isHovered
            ? `0 20px 40px rgba(0,0,0,0.95), 0 0 30px ${tool.color}50, inset 0 1px 0 rgba(255,255,255,0.3)`
            : "0 14px 28px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Top Gloss Reflection Bevel */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${isHovered ? tool.color : "rgba(255,255,255,0.4)"}, transparent)`,
            opacity: isHovered ? 1 : 0.5,
          }}
        />

        {/* Ambient Corner Flare */}
        <div
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: tool.color,
            opacity: isHovered ? 0.35 : 0.08,
          }}
        />

        {/* Cube Face Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-2.5 sm:p-3 text-center gap-1.5">
          {/* Brand Logo */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            <ToolIcon id={tool.id} className="w-full h-full object-contain" />
          </div>

          {/* Tool Name */}
          <div className="font-heading font-black text-[10px] sm:text-[11.5px] md:text-[12.5px] text-white tracking-tight leading-tight line-clamp-1 group-hover:text-white transition-colors">
            {tool.name}
          </div>

          {/* Quick Domain Tag */}
          <div className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-zinc-400 font-semibold line-clamp-1">
            {tool.domainLabel.split(" ")[0]}
          </div>
        </div>

        {/* Subtle Corner Arrow on Hover */}
        <div
          className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.6)",
            background: tool.color,
            color: "#000",
          }}
        >
          <ArrowUpRight className="w-2.5 h-2.5 stroke-[3]" />
        </div>
      </div>

      {/* ── HOVER FLOATING KPI PILL (Sleek HUD Badge) ── */}
      {isHovered && (
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-200 z-50 flex items-center gap-1.5"
          style={{
            boxShadow: `0 8px 20px rgba(0,0,0,0.9), 0 0 15px ${tool.color}40`,
          }}
        >
          <TrendingUp className="w-2.5 h-2.5" style={{ color: tool.color }} />
          <span className="font-mono text-[8.5px] font-bold text-white uppercase tracking-wider">
            {tool.kpiMetric}
          </span>
          <span className="font-mono text-[7.5px] text-zinc-400 uppercase">
            {tool.badge}
          </span>
        </div>
      )}
    </div>
  );
}
