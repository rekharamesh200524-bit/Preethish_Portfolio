"use client";

import React from "react";
import { ToolItem } from "./toolsData";
import { ToolIcon } from "./ToolIcons";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface ToolCard3DProps {
  tool: ToolItem;
  angle: number;
  radius: number;
  rotation: number;
  isFrontLayer: boolean;
  isHovered: boolean;
  isActiveFilter: boolean;
  onHover: (hovered: boolean) => void;
  onClick: () => void;
}

export function ToolCard3D({
  tool,
  angle,
  radius,
  rotation,
  isFrontLayer,
  isHovered,
  isActiveFilter,
  onHover,
  onClick,
}: ToolCard3DProps) {
  // Current orbital angle in degrees
  const currentAngle = ((angle + rotation) % 360 + 360) % 360;
  const rad = (currentAngle * Math.PI) / 180;
  const cosVal = Math.cos(rad); // 1 = Front (closest), -1 = Back (farthest)
  const sinVal = Math.sin(rad);

  // Cross-fade boundary between front and back layers (-0.1 to +0.1)
  const frontWeight = Math.max(0, Math.min(1, (cosVal + 0.12) / 0.24));
  const layerOpacity = isFrontLayer ? frontWeight : 1 - frontWeight;

  // Cull if not meant to render in this layer
  if (layerOpacity <= 0.02) return null;

  // Filter visibility: if filtered out, fade down to 0.18
  const filterMultiplier = isActiveFilter ? 1.0 : 0.2;

  // Depth-dependent lighting & scale
  const depthScale = 0.82 + (cosVal + 1) * 0.14; // 0.82 to 1.10
  const depthBrightness = 0.65 + (cosVal + 1) * 0.22; // 0.65 to 1.09
  const finalOpacity = (0.45 + (cosVal + 1) * 0.28) * layerOpacity * filterMultiplier;

  return (
    <div
      className="absolute top-1/2 left-1/2 select-none"
      style={{
        transformStyle: "preserve-3d",
        transform: `
          translate(-50%, -50%)
          rotateY(${angle}deg)
          translateZ(${radius}px)
          translateY(${tool.orbitElevation ?? 0}px)
          scale(${depthScale * (tool.orbitScale ?? 1)})
        `,
        opacity: finalOpacity,
        filter: `brightness(${depthBrightness})`,
        pointerEvents: isFrontLayer && isActiveFilter ? "auto" : "none",
        zIndex: isFrontLayer ? 25 : 5,
        transition: "opacity 300ms ease, filter 300ms ease",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
    >
      <div
        data-cursor-expand
        className={`relative group cursor-pointer transition-all duration-300 ease-out rounded-xl overflow-hidden ${
          isHovered ? "scale-110 -translate-y-2" : "hover:scale-105"
        }`}
        style={{
          width: "190px",
          background: "linear-gradient(135deg, rgba(16,18,27,0.88) 0%, rgba(9,10,15,0.92) 100%)",
          border: isHovered
            ? `1px solid ${tool.color}`
            : "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: isHovered
            ? `0 16px 36px rgba(0,0,0,0.9), 0 0 28px ${tool.color}35`
            : "0 10px 24px rgba(0,0,0,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Top Edge Metallic Glow Line */}
        <div
          className="absolute top-0 inset-x-0 h-[2px] transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)`,
            opacity: isHovered ? 1 : 0.45,
          }}
        />

        {/* Ambient Corner Specular Highlight */}
        <div
          className="absolute -top-12 -right-12 w-24 h-24 rounded-full pointer-events-none blur-2xl transition-opacity duration-300"
          style={{
            background: tool.color,
            opacity: isHovered ? 0.35 : 0.12,
          }}
        />

        {/* Card Content Body */}
        <div className="relative p-3.5 flex flex-col gap-2.5">
          {/* Header Row: Icon + Category Tag + Arrow */}
          <div className="flex items-center justify-between gap-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <ToolIcon id={tool.id} className="w-full h-full object-contain" />
            </div>

            <div className="min-w-0 flex-1 flex flex-col">
              <span className="font-heading font-black text-sm text-white tracking-tight truncate group-hover:text-white transition-colors">
                {tool.name}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 truncate">
                {tool.categoryLabel}
              </span>
            </div>

            <div
              className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
              style={{
                background: isHovered ? tool.color : "rgba(255,255,255,0.06)",
                color: isHovered ? "#07080a" : "#888899",
              }}
            >
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* Technical Badge Pill */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: tool.color }}
            />
            <span className="font-mono text-[8.5px] uppercase tracking-wide text-zinc-300 truncate font-semibold">
              {tool.badge}
            </span>
          </div>

          {/* Proficiency Meter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400">
              <span className="uppercase tracking-wider">{tool.level}</span>
              <span className="font-bold text-zinc-200">{tool.proficiency}%</span>
            </div>
            <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${tool.proficiency}%`,
                  background: `linear-gradient(90deg, ${tool.color}, #ff7700)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Interactive Prompt on Hover */}
        <div
          className="px-3.5 py-1.5 bg-white/[0.03] border-t border-white/[0.08] flex items-center justify-between text-[8px] font-mono transition-colors duration-200"
          style={{
            color: isHovered ? tool.color : "#71717a",
          }}
        >
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>CLICK TO INSPECT</span>
          </span>
          <span className="font-bold uppercase tracking-wider">{tool.experienceYears}</span>
        </div>
      </div>
    </div>
  );
}
