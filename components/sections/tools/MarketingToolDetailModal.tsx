"use client";

import React, { useEffect } from "react";
import { MarketingToolItem } from "./marketingToolsData";
import { ToolIcon } from "./ToolIcons";
import { X, CheckCircle2, TrendingUp, Clock, Sparkles } from "lucide-react";

interface ModalProps {
  tool: MarketingToolItem | null;
  onClose: () => void;
}

export function MarketingToolDetailModal({ tool, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-[#0c0e14] border border-white/15 shadow-2xl z-10 transition-transform animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: `0 25px 60px -15px rgba(0,0,0,0.95), 0 0 45px ${tool.color}30`,
        }}
      >
        {/* Top Glow Bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${tool.color}, #ff7700, #ff1a40)`,
          }}
        />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center p-2.5 shadow-lg shrink-0"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1.5px solid ${tool.color}50`,
                }}
              >
                <ToolIcon id={tool.id} className="w-full h-full object-contain" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tool.color }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    {tool.domainLabel}
                  </span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                  {tool.name}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              data-cursor-expand
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
            {tool.description}
          </p>

          {/* KPI Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                <TrendingUp className="w-3.5 h-3.5" style={{ color: tool.color }} />
                <span className="uppercase tracking-wider">Performance Metric</span>
              </div>
              <div className="text-2xl font-heading font-black text-white">
                {tool.kpiMetric}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {tool.kpiLabel}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                <Clock className="w-3.5 h-3.5 text-[#00d8ff]" />
                <span className="uppercase tracking-wider">Experience</span>
              </div>
              <div className="text-2xl font-heading font-black text-white">
                {tool.experienceYears}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                {tool.proficiency}% Mastery Level
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>Core Execution &amp; Strategy</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tool.coreCompetencies.map((comp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-200"
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: tool.color }}
                  />
                  <span className="truncate">{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Close button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              data-cursor-expand
              className="px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all shadow-md"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
