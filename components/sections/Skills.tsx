"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Film,
  Palette,
  TrendingUp,
  Aperture,
  Sliders,
  RotateCcw,
  Check,
  ArrowUpRight,
  Activity,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   STUDIO MASTER CHANNELS DATA (PREETHISH D P RESUME)
──────────────────────────────────────────────────────────────── */
export type StudioChannelId = "post" | "brand" | "marketing" | "optics";

interface ChannelData {
  id: StudioChannelId;
  channelCode: string;
  tag: string;
  title: string;
  subtitle: string;
  domain: string;
  summary: string;
  accentColor: string;
  badge: string;
  primaryImage: string;
  coreCompetencies: {
    name: string;
    level: string;
    pct: number;
    detail: string;
  }[];
  arsenal: string[];
  deliverables: string[];
  productionImpact: string;
}

const CHANNELS: ChannelData[] = [
  {
    id: "post",
    channelCode: "CH_01",
    tag: "COLOR SCIENCE & NLE",
    title: "Post-Production & Color Science",
    subtitle: "DAVINCI RESOLVE STUDIO // PREMIERE PRO CC // TIMECODE CONFORM",
    domain: "FILM POST-PRODUCTION",
    summary:
      "Precision video editing, multi-camera synchronization, Rec.709/Log color grading, and narrative rhythm pacing for commercial and cinematic releases.",
    accentColor: "#e11d48",
    badge: "DAVINCI STUDIO",
    primaryImage: "/projects/film_edit.jpg",
    coreCompetencies: [
      { name: "DaVinci Resolve Color Grading", level: "Expert", pct: 96, detail: "Primary balance, curves, node trees & LUT conforming" },
      { name: "Non-Linear Video Editing (NLE)", level: "Specialist", pct: 94, detail: "Frame-accurate narrative pacing in Premiere Pro & FCPX" },
      { name: "Timecode Conforming & Multicam", level: "Mastery", pct: 95, detail: "Assembly verification, audio conforming & L/J cuts" },
      { name: "Broadcast Deliverables & Encoding", level: "Certified", pct: 92, detail: "4K DCI, Apple ProRes 422 HQ, DCP & Web masters" },
    ],
    arsenal: ["DaVinci Resolve Studio", "Adobe Premiere Pro CC", "Final Cut Pro X", "Rec.709 Color Wheels", "Waveform Scopes"],
    deliverables: ["Cinema Feature Cuts", "Commercial Color Grade", "Multicam Concert Sync", "Broadcast Masters"],
    productionImpact:
      "Conformed rough assemblies, validated timecodes, and shaped dramatic pacing at Sathya Jyothi Film Production Company.",
  },
  {
    id: "brand",
    channelCode: "CH_02",
    tag: "VECTOR & TYPOGRAPHY",
    title: "Brand Identity & Graphic Design",
    subtitle: "ADOBE CREATIVE SUITE // VECTOR GEOMETRY // DESIGN SYSTEMS",
    domain: "VISUAL COMMUNICATION",
    summary:
      "Engineering distinct visual brand languages, multi-channel marketing collateral, typography specimens, and comprehensive design manuals.",
    accentColor: "#fbbf24",
    badge: "ADOBE SUITE",
    primaryImage: "/projects/brand_design.jpg",
    coreCompetencies: [
      { name: "Vector Identity Architecture", level: "Mastery", pct: 97, detail: "Logomarks, monogram glyphs & geometric construction" },
      { name: "Editorial Typography & Hierarchy", level: "Expert", pct: 95, detail: "Font pairings, kerning systems, optical balance" },
      { name: "Brand Guidelines & Systems", level: "Specialist", pct: 93, detail: "Pantone palettes, tone of voice, spacing guidelines" },
      { name: "Print & Digital Collateral", level: "Advanced", pct: 94, detail: "Vector packaging, editorial layouts, pitch decks" },
    ],
    arsenal: ["Adobe Photoshop CC", "Adobe Illustrator CC", "Adobe InDesign", "Canva Pro", "Pantone Formula Guides"],
    deliverables: ["Visual Identity Manuals", "Editorial Collateral", "Typography Specimens", "Campaign Systems"],
    productionImpact:
      "Architected complete corporate visual collateral, logo suites, and multi-platform promotional layouts for I-Net Labs and Populus.",
  },
  {
    id: "marketing",
    channelCode: "CH_03",
    tag: "GROWTH & PERFORMANCE",
    title: "Digital Marketing & SEO Strategy",
    subtitle: "TECHNICAL AUDITS // GOOGLE ADS // KEYWORD TAXONOMIES",
    domain: "SEARCH & CONVERSION",
    summary:
      "Accelerating online brand visibility through programmatic SEO architecture, keyword taxonomy engineering, Google Ads campaign management, and analytics.",
    accentColor: "#38bdf8",
    badge: "GOOGLE ADS & SEO",
    primaryImage: "/projects/digital_marketing.jpg",
    coreCompetencies: [
      { name: "Technical SEO & Site Audits", level: "Expert", pct: 94, detail: "Crawlability, Core Web Vitals, schema architecture" },
      { name: "Google & Meta Paid Campaigns", level: "Specialist", pct: 92, detail: "High-intent PPC bidding, audience segmentation & ROAS" },
      { name: "Keyword Taxonomy & Content Strategy", level: "Mastery", pct: 95, detail: "Search intent clustering, competitive SEM analysis" },
      { name: "Conversion Rate Optimization (CRO)", level: "Advanced", pct: 89, detail: "A/B testing, landing page funnels, analytics tracking" },
    ],
    arsenal: ["Google Ads Manager", "SEMrush", "Meta Ads Suite", "Google Analytics 4", "Search Console"],
    deliverables: ["Technical Audit Reports", "High-ROAS Ad Campaigns", "Keyword Matrices", "Executive ROI Dashboards"],
    productionImpact:
      "Spearheaded technical audits, high-intent Google Ads PPC campaigns, and organic ranking boosts for enterprise SaaS and cybersecurity.",
  },
  {
    id: "optics",
    channelCode: "CH_04",
    tag: "CINEMATIC FRAMING",
    title: "Cinematography & Optical Geometry",
    subtitle: "ANAMORPHIC OPTICS // LIGHTING RATIOS // CAMERA DIRECTION",
    domain: "OPTICAL DIRECTION",
    summary:
      "Crafting arresting camera compositions through optical axis alignment, dramatic key-to-fill lighting ratios, 2.39:1 anamorphic framing, and visual pacing.",
    accentColor: "#a855f7",
    badge: "CINE PRIMES",
    primaryImage: "/projects/maritime_cinematography.jpg",
    coreCompetencies: [
      { name: "Camera Movement & Optical Axis", level: "Advanced", pct: 93, detail: "Gimbal tracking, slow dolly sweeps, handheld pacing" },
      { name: "Three-Point Lighting Setups", level: "Expert", pct: 95, detail: "Key, fill, rim lighting, soft diffusion & negative fill" },
      { name: "Composition & Aspect Ratios", level: "Mastery", pct: 96, detail: "2.39:1 Anamorphic, golden spiral, leading visual axes" },
      { name: "Exposure Tools & False Color", level: "Specialist", pct: 91, detail: "Waveforms, false color exposure, Kelvin color matching" },
    ],
    arsenal: ["Sony FX Cine", "Blackmagic 6K", "Cinema Primes", "Gimbal Systems", "ND Optical Filters"],
    deliverables: ["Documentary Studies", "Corporate Brand Films", "Commercial Cinematography", "Lighting Blueprints"],
    productionImpact:
      "Documented high-density maritime vessel logistics at DP World terminals with cinematic optical framing and documentary clarity.",
  },
];

/* ────────────────────────────────────────────────────────────────
   LIVE WORKSTATION 1: DAVINCI COLOR GRADING LAB & WAVEFORM
──────────────────────────────────────────────────────────────── */
function ColorGradingLab() {
  const [temperature, setTemperature] = useState(12);
  const [contrast, setContrast] = useState(115);
  const [saturation, setSaturation] = useState(120);
  const [brightness, setBrightness] = useState(102);
  const [activeLut, setActiveLut] = useState<string>("kodak");
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);

  const applyLut = (name: string) => {
    setActiveLut(name);
    if (name === "kodak") {
      setTemperature(18);
      setContrast(122);
      setSaturation(115);
      setBrightness(100);
    } else if (name === "noir") {
      setTemperature(-25);
      setContrast(135);
      setSaturation(130);
      setBrightness(98);
    } else if (name === "mono") {
      setTemperature(0);
      setContrast(140);
      setSaturation(0);
      setBrightness(104);
    } else {
      setTemperature(0);
      setContrast(100);
      setSaturation(100);
      setBrightness(100);
    }
  };

  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const renderWaveform = () => {
      t += 0.05;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "rgba(7, 8, 10, 0.45)";
      ctx.fillRect(0, 0, w, h);

      // Baseline reference lines (0%, 50%, 100% IRE)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      [0.2, 0.5, 0.8].forEach((pct) => {
        ctx.beginPath();
        ctx.moveTo(0, h * pct);
        ctx.lineTo(w, h * pct);
        ctx.stroke();
      });

      // Animated Red, Green, Blue Parade traces
      const colors = ["#ef4444", "#22c55e", "#3b82f6"];
      colors.forEach((col, cIdx) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const yOffset = (cIdx - 1) * 6 + (temperature * 0.3 * (cIdx === 0 ? 1 : -0.5));
        for (let x = 0; x < w; x += 4) {
          const noise = Math.sin(x * 0.08 + t + cIdx) * 12 + Math.cos(x * 0.04 - t * 0.8) * 8;
          const satMult = saturation / 100;
          const y = h * 0.52 + noise * satMult + yOffset;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animId = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => cancelAnimationFrame(animId);
  }, [temperature, saturation, contrast]);

  const filterString = `contrast(${contrast}%) saturate(${saturation}%) brightness(${brightness}%) hue-rotate(${temperature * 0.8}deg)`;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Visual Live Graded Footage Viewport */}
      <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
        <Image
          src="/projects/film_edit.jpg"
          alt="DaVinci Resolve Real-Time Color Grade Simulation"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover transition-all duration-150 ease-out"
          style={{ filter: filterString }}
        />

        {/* Live Cinema Scope Letterbox Bar */}
        <div className="absolute inset-x-0 top-0 h-4 bg-black/90 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-black/90 pointer-events-none" />

        {/* Top Scope Telemetry Readout */}
        <div className="absolute top-5 left-2.5 right-2.5 sm:top-6 sm:left-3 sm:right-3 flex items-center justify-between gap-2 text-[9px] sm:text-[10px] font-mono text-white/90 bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded border border-white/10 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse shrink-0" />
            <span className="font-bold truncate">DAVINCI COLOR WHEEL // LIVE</span>
          </div>
          <div className="text-zinc-400 hidden sm:block shrink-0">
            IRE 100 // LOG-C &rarr; REC.709
          </div>
        </div>

        {/* Embedded Real-Time RGB Waveform Scope (Bottom Right) */}
        <div className="absolute bottom-5 right-2.5 sm:bottom-6 sm:right-3 w-32 sm:w-48 h-16 sm:h-20 bg-black/85 backdrop-blur-md border border-white/20 rounded-lg p-1 shadow-lg pointer-events-none">
          <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-zinc-400 px-1 mb-0.5">
            <span>RGB WAVEFORM</span>
            <span className="text-emerald-400">SYNCED</span>
          </div>
          <canvas
            ref={waveformCanvasRef}
            width={180}
            height={60}
            className="w-full h-10 sm:h-14 block rounded"
          />
        </div>
      </div>

      {/* Preset LUT Quick Selectors */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold mr-1">
          Preset LUTs:
        </span>
        {[
          { id: "kodak", label: "Kodak 2383 Gold" },
          { id: "noir", label: "Neo-Noir Teal/Cyan" },
          { id: "mono", label: "Archival Silver B&W" },
          { id: "rec709", label: "Rec.709 Neutral" },
        ].map((lut) => (
          <button
            key={lut.id}
            onClick={() => applyLut(lut.id)}
            className={`px-3 py-1 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer ${
              activeLut === lut.id
                ? "bg-[#e11d48] text-white shadow-[0_0_12px_rgba(225,29,72,0.6)]"
                : "bg-white/5 border border-white/10 text-zinc-300 hover:border-white/30"
            }`}
          >
            {lut.label}
          </button>
        ))}
        <button
          onClick={() => applyLut("rec709")}
          className="ml-auto flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          title="Reset to default"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Interactive Precision Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0d0f14] p-3 rounded-xl border border-white/10">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>KELVIN TEMP</span>
            <span className={temperature > 0 ? "text-amber-400" : temperature < 0 ? "text-sky-400" : "text-zinc-400"}>
              {temperature > 0 ? `+${temperature}°` : `${temperature}°`}
            </span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={temperature}
            onChange={(e) => {
              setTemperature(Number(e.target.value));
              setActiveLut("custom");
            }}
            className="w-full accent-[#e11d48] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>CONTRAST</span>
            <span className="text-[#e11d48]">{contrast}%</span>
          </div>
          <input
            type="range"
            min="80"
            max="150"
            value={contrast}
            onChange={(e) => {
              setContrast(Number(e.target.value));
              setActiveLut("custom");
            }}
            className="w-full accent-[#e11d48] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>SATURATION</span>
            <span className="text-amber-400">{saturation}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={saturation}
            onChange={(e) => {
              setSaturation(Number(e.target.value));
              setActiveLut("custom");
            }}
            className="w-full accent-[#e11d48] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE WORKSTATION 2: BRAND IDENTITY & VECTOR TYPOGRAPHY WORKSHOP
──────────────────────────────────────────────────────────────── */
function BrandTypographyLab() {
  const [fontWeight, setFontWeight] = useState(700);
  const [letterSpacing, setLetterSpacing] = useState(0.08);
  const [fontSize, setFontSize] = useState(32);
  const [selectedSwatch, setSelectedSwatch] = useState("#e11d48");
  const [showGridGuide, setShowGridGuide] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const SWATCHES = [
    { name: "Pantone 199 C", hex: "#e11d48" },
    { name: "Pantone 426 C", hex: "#0e1015" },
    { name: "Pantone 123 C", hex: "#fbbf24" },
    { name: "Pantone 7461 C", hex: "#06b6d4" },
    { name: "Pantone Cool Gray", hex: "#f3f4f6" },
  ];

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(hex);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Live Interactive Specimen Canvas */}
      <div className="relative min-h-[14rem] sm:h-64 rounded-xl overflow-hidden border border-white/15 bg-[#0a0c10] flex flex-col justify-between p-4 sm:p-6 shadow-2xl">
        {showGridGuide && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-500/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-500/40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-amber-400/30" />
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedSwatch }} />
            <span className="font-bold text-white">VECTOR TYPE SPECIMEN</span>
          </div>
          <button
            onClick={() => setShowGridGuide(!showGridGuide)}
            className={`px-2 py-0.5 rounded text-[9px] font-mono transition-colors cursor-pointer ${
              showGridGuide ? "bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40" : "bg-white/5 text-zinc-400"
            }`}
          >
            GRID: {showGridGuide ? "ON" : "OFF"}
          </button>
        </div>

        <div className="my-auto py-3 z-10 transition-all duration-75 min-w-0">
          <h3
            className="font-heading tracking-tight leading-none uppercase select-none break-words"
            style={{
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              fontSize: `clamp(18px, 5.5vw, ${fontSize}px)`,
              color: selectedSwatch,
              textShadow: selectedSwatch === "#0e1015" ? "0 0 1px rgba(255,255,255,0.4)" : "none",
            }}
          >
            CRAFTING VISUAL LEGACIES
          </h3>
          <p className="font-mono text-[10px] sm:text-xs text-zinc-400 mt-2 tracking-widest uppercase">
            GEOMETRIC VECTOR MASTERY // CHENNAI 2026
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-500 z-10 pt-2 border-t border-white/[0.08]">
          <span>WEIGHT: {fontWeight}</span>
          <span>KERNING: {letterSpacing.toFixed(2)}em</span>
          <span>SIZE: {fontSize}PX</span>
        </div>
      </div>

      {/* Pantone Swatch Interactive Palette */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold">
            Pantone Formula System (Click to copy &amp; apply):
          </span>
          {copiedCode && (
            <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1 animate-pulse">
              <Check className="w-3 h-3" /> COPIED {copiedCode}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SWATCHES.map((sw) => (
            <button
              key={sw.name}
              onClick={() => {
                setSelectedSwatch(sw.hex);
                copyHex(sw.hex);
              }}
              className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                selectedSwatch === sw.hex
                  ? "border-white/60 bg-white/10 shadow-lg scale-102"
                  : "border-white/10 bg-black/40 hover:border-white/30"
              }`}
            >
              <div
                className="w-full h-6 rounded mb-1.5 shadow-inner border border-white/10"
                style={{ backgroundColor: sw.hex }}
              />
              <div className="font-mono text-[10px] font-bold text-white truncate">{sw.name}</div>
              <div className="font-mono text-[8px] text-zinc-400">{sw.hex}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Typography Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0d0f14] p-3 rounded-xl border border-white/10">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>FONT WEIGHT</span>
            <span className="text-[#fbbf24]">{fontWeight}</span>
          </div>
          <input
            type="range"
            min="300"
            max="900"
            step="100"
            value={fontWeight}
            onChange={(e) => setFontWeight(Number(e.target.value))}
            className="w-full accent-[#fbbf24] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>TRACKING / KERNING</span>
            <span className="text-[#fbbf24]">{letterSpacing.toFixed(2)}em</span>
          </div>
          <input
            type="range"
            min="-0.02"
            max="0.30"
            step="0.01"
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(Number(e.target.value))}
            className="w-full accent-[#fbbf24] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 mb-1">
            <span>SCALE RATIO</span>
            <span className="text-[#fbbf24]">{fontSize}px</span>
          </div>
          <input
            type="range"
            min="20"
            max="42"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-[#fbbf24] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE WORKSTATION 3: DIGITAL MARKETING & SEO PERFORMANCE RADAR
──────────────────────────────────────────────────────────────── */
function GrowthMarketingLab() {
  const [monthlySpend, setMonthlySpend] = useState(2500);
  const radarCanvasRef = useRef<HTMLCanvasElement>(null);

  const estimatedImpressions = Math.round(monthlySpend * 36);
  const estimatedClicks = Math.round(monthlySpend * 2.3);
  const projectedConversions = Math.round(estimatedClicks * 0.054);
  const projectedRevenue = Math.round(monthlySpend * 4.4);

  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const dimensions = [
      { name: "TECH SEO", score: 0.94 },
      { name: "KEYWORD VELOCITY", score: 0.92 },
      { name: "PPC ROAS", score: 0.95 },
      { name: "CONVERSION (CRO)", score: 0.88 },
      { name: "BRAND RETENTION", score: 0.91 },
    ];

    const numPoints = dimensions.length;

    const renderRadar = () => {
      t += 0.02;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) * 0.72;

      ctx.clearRect(0, 0, w, h);

      // Draw Concentric Rings
      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        const ringRad = (r / 4) * radius;
        for (let i = 0; i < numPoints; i++) {
          const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
          const x = cx + Math.cos(angle) * ringRad;
          const y = cy + Math.sin(angle) * ringRad;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw Radial Axis Spokes
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.stroke();

        const lx = cx + Math.cos(angle) * (radius + 16);
        const ly = cy + Math.sin(angle) * (radius + 16);
        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.font = "8px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(dimensions[i].name, lx, ly);
      }

      // Draw Filled Radar Shape with Subtle Pulse
      const pulse = Math.sin(t) * 0.03;
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const score = dimensions[i].score + pulse;
        const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * score;
        const y = cy + Math.sin(angle) * radius * score;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(56, 189, 248, 0.22)";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node Points
      for (let i = 0; i < numPoints; i++) {
        const score = dimensions[i].score + pulse;
        const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius * score;
        const y = cy + Math.sin(angle) * radius * score;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderRadar);
    };

    renderRadar();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Upper Split: Radar Chart & Live Keyword Monitor */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:h-64">
        {/* Left: Animated Radar Canvas (7 cols) */}
        <div className="sm:col-span-7 h-56 sm:h-auto relative rounded-xl border border-white/15 bg-[#0a0c12] p-3 flex flex-col justify-between overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              SEO PERFORMANCE RADAR
            </span>
            <span className="text-sky-400 font-bold">94.2% SCORE</span>
          </div>

          <div className="relative flex-1 flex items-center justify-center min-h-0">
            <canvas ref={radarCanvasRef} width={280} height={190} className="max-h-full max-w-full block" />
          </div>
        </div>

        {/* Right: High-Intent Keyword Rank Monitor (5 cols) */}
        <div className="sm:col-span-5 rounded-xl border border-white/15 bg-[#0d0f17] p-3 flex flex-col justify-between shadow-2xl">
          <div className="text-[10px] font-mono text-zinc-400 uppercase pb-1.5 border-b border-white/10 font-bold">
            Live SERP Rank Tracker:
          </div>

          <div className="space-y-2 my-auto">
            {[
              { kw: "Brand Identity Designer", rank: "#1", volume: "14.2K", trend: "+312%" },
              { kw: "Film Post-Production Studio", rank: "#2", volume: "8.6K", trend: "+185%" },
              { kw: "Google Ads High-ROAS Agency", rank: "#1", volume: "19.4K", trend: "+420%" },
            ].map((k) => (
              <div key={k.kw} className="p-2 rounded bg-black/60 border border-white/10 flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="font-heading text-[11px] font-bold text-white truncate">{k.kw}</div>
                  <div className="font-mono text-[8px] text-zinc-500">{k.volume} VOL // {k.trend}</div>
                </div>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  {k.rank}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[9px] font-mono text-zinc-500 pt-1 border-t border-white/10">
            ENGINE: GOOGLE SERP ALGORITHM
          </div>
        </div>
      </div>

      {/* Interactive Ad Spend & ROAS Calculator Slider */}
      <div className="bg-[#0d0f14] p-3.5 rounded-xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-white uppercase">
              Campaign Spend &amp; ROAS Simulator:
            </span>
          </div>
          <span className="font-heading text-base font-black text-sky-400">
            ${monthlySpend.toLocaleString()} / MO
          </span>
        </div>

        <input
          type="range"
          min="500"
          max="10000"
          step="250"
          value={monthlySpend}
          onChange={(e) => setMonthlySpend(Number(e.target.value))}
          className="w-full accent-sky-400 cursor-pointer"
        />

        {/* Real-Time Calculated Metrics Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-white/10">
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <div className="text-[9px] font-mono text-zinc-400">EST. IMPRESSIONS</div>
            <div className="font-heading text-sm font-bold text-white">{estimatedImpressions.toLocaleString()}</div>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <div className="text-[9px] font-mono text-zinc-400">QUALIFIED CLICKS</div>
            <div className="font-heading text-sm font-bold text-sky-300">{estimatedClicks.toLocaleString()}</div>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <div className="text-[9px] font-mono text-zinc-400">CONVERSIONS (5.4%)</div>
            <div className="font-heading text-sm font-bold text-emerald-400">{projectedConversions} LEADS</div>
          </div>
          <div className="p-2 rounded bg-black/40 border border-white/5">
            <div className="text-[9px] font-mono text-zinc-400">PROJECTED RETURN</div>
            <div className="font-heading text-sm font-bold text-amber-400">${projectedRevenue.toLocaleString()} (4.4x)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   LIVE WORKSTATION 4: CINEMATOGRAPHY & OPTICAL FRAMING VIEWFINDER
──────────────────────────────────────────────────────────────── */
function CineOpticsLab() {
  const [aspectRatio, setAspectRatio] = useState<"2.39" | "1.85" | "16:9" | "4:3">("2.39");
  const [focalLength, setFocalLength] = useState<number>(35);
  const [showGuides, setShowGuides] = useState(true);
  const [hasAnamorphicFlare, setHasAnamorphicFlare] = useState(true);

  const letterboxClass =
    aspectRatio === "2.39"
      ? "h-8 sm:h-10"
      : aspectRatio === "1.85"
      ? "h-4 sm:h-5"
      : aspectRatio === "16:9"
      ? "h-0"
      : "px-10 sm:px-14";

  const scaleValue = focalLength === 24 ? 1.0 : focalLength === 35 ? 1.08 : focalLength === 50 ? 1.18 : 1.32;
  const depthBlur = focalLength === 85 ? "blur-[0.8px]" : "blur-0";

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Director's Cine Viewfinder Stage */}
      <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden border border-white/15 bg-black flex items-center justify-center shadow-2xl">
        <div
          className={`relative w-full h-full transition-transform duration-500 ease-out ${depthBlur}`}
          style={{ transform: `scale(${scaleValue})` }}
        >
          <Image
            src="/projects/maritime_cinematography.jpg"
            alt="Cinematography and Optical Framing Viewfinder"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        {/* Dynamic Aspect Ratio Letterbox Mattes */}
        {aspectRatio !== "4:3" ? (
          <>
            <div className={`absolute inset-x-0 top-0 bg-black transition-all duration-300 pointer-events-none z-10 ${letterboxClass}`} />
            <div className={`absolute inset-x-0 bottom-0 bg-black transition-all duration-300 pointer-events-none z-10 ${letterboxClass}`} />
          </>
        ) : (
          <>
            <div className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-black transition-all duration-300 pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-16 bg-black transition-all duration-300 pointer-events-none z-10" />
          </>
        )}

        {/* Anamorphic Horizontal Blue Streak Optical Flare Overlay */}
        {hasAnamorphicFlare && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-cyan-400 blur-sm opacity-65 pointer-events-none shadow-[0_0_35px_#38bdf8] mix-blend-screen" />
        )}

        {/* Optical Rule of Thirds Composition Grid */}
        {showGuides && (
          <div className="absolute inset-0 pointer-events-none z-20 opacity-35">
            <div className="absolute top-1/3 inset-x-0 h-[1px] bg-white" />
            <div className="absolute top-2/3 inset-x-0 h-[1px] bg-white" />
            <div className="absolute left-1/3 inset-y-0 w-[1px] bg-white" />
            <div className="absolute left-2/3 inset-y-0 w-[1px] bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-red-500 rounded-full" />
          </div>
        )}

        {/* Viewfinder Outer Four Corners */}
        <div className="absolute inset-4 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/70" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/70" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/70" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/70" />
        </div>

        {/* Camera HUD Telemetry Strip */}
        <div className="absolute top-3 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between gap-2 text-[8px] sm:text-[9px] font-mono text-white bg-black/75 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded border border-white/10 z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shrink-0" />
            <span>24 FPS // 180° SHUTTER</span>
          </div>
          <div className="text-purple-300 font-bold truncate">
            {focalLength}MM T/1.5 // {aspectRatio}:1
          </div>
        </div>
      </div>

      {/* Aspect Ratio Selector Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold mr-1">
            Aspect Ratio:
          </span>
          {[
            { id: "2.39", label: "2.39:1 CinemaScope" },
            { id: "1.85", label: "1.85:1 Theatrical" },
            { id: "16:9", label: "16:9 Broadcast" },
            { id: "4:3", label: "4:3 Academy" },
          ].map((ar) => (
            <button
              key={ar.id}
              onClick={() => setAspectRatio(ar.id as "2.39" | "1.85" | "16:9" | "4:3")}
              className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                aspectRatio === ar.id
                  ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                  : "bg-white/5 border border-white/10 text-zinc-300 hover:border-white/30"
              }`}
            >
              {ar.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuides(!showGuides)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              showGuides ? "bg-white/15 text-white" : "bg-white/5 text-zinc-400"
            }`}
          >
            GRID: {showGuides ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => setHasAnamorphicFlare(!hasAnamorphicFlare)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
              hasAnamorphicFlare ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "bg-white/5 text-zinc-400"
            }`}
          >
            FLARE: {hasAnamorphicFlare ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Focal Length Selector Wheel */}
      <div className="bg-[#0d0f14] p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] font-mono text-zinc-300">
          <span className="text-zinc-500 mr-2">FOCAL PRIME:</span>
          <span className="text-purple-400 font-bold">{focalLength}MM T/1.5</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[24, 35, 50, 85].map((fl) => (
            <button
              key={fl}
              onClick={() => setFocalLength(fl)}
              className={`px-3 py-1 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                focalLength === fl
                  ? "bg-purple-600 text-white shadow-md scale-105"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {fl}mm
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN COMPONENT: STUDIO MASTER CONTROL DECK
──────────────────────────────────────────────────────────────── */
export default function Skills() {
  const [activeChannelId, setActiveChannelId] = useState<StudioChannelId>("post");
  const sectionRef = useRef<HTMLElement>(null);

  const activeChannel = CHANNELS.find((c) => c.id === activeChannelId) || CHANNELS[0];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#07080a] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#e11d48]/[0.06] blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Technical Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* ── 1. SECTION EDITORIAL HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse shadow-[0_0_10px_#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48] font-bold">
                03 // CREATIVE SUITE &amp; MASTER CONTROL
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              INTERACTIVE <span className="text-[#e11d48]">STUDIO DECK</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE TELEMETRY: 4 WORKSTATIONS ONLINE</span>
            </div>
          </div>
        </div>

        {/* ── 2. MASTER SWITCHER BAR (4 CHANNELS) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {CHANNELS.map((ch) => {
            const isActive = activeChannelId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChannelId(ch.id)}
                className={`relative p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-[#11131c] border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] scale-101"
                    : "bg-[#0b0d13] border-white/10 hover:border-white/20 hover:bg-[#0e1017]"
                }`}
              >
                {/* Active Channel Glow Indicator */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: ch.accentColor, boxShadow: `0 0 10px ${ch.accentColor}` }}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-black tracking-widest text-zinc-400">
                    {ch.channelCode}
                  </span>
                  {/* Tally Light */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "animate-pulse" : "opacity-30"
                      }`}
                      style={{ backgroundColor: ch.accentColor }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                      {isActive ? "ON AIR" : "STANDBY"}
                    </span>
                  </div>
                </div>

                <div className="font-heading text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                  {ch.title.split("&")[0]}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                  {ch.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── 3. SPLIT STAGE: LIVE WORKSTATION + TELEMETRY DESK ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* ── LEFT: INTERACTIVE LIVE WORKSTATION (Col 1-7) ── */}
          <div className="lg:col-span-7 bg-[#090b10] border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
            {/* Workstation Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#e11d48]" />
                <span className="font-bold text-white uppercase tracking-wider">
                  {activeChannel.channelCode} {"//"} {activeChannel.title}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 hidden sm:inline">
                INTERACTIVE CONSOLE
              </span>
            </div>

            {/* Dynamic Interactive Channel Simulator */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChannelId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  {activeChannelId === "post" && <ColorGradingLab />}
                  {activeChannelId === "brand" && <BrandTypographyLab />}
                  {activeChannelId === "marketing" && <GrowthMarketingLab />}
                  {activeChannelId === "optics" && <CineOpticsLab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: PRODUCTION TELEMETRY & COMPETENCY DESK (Col 8-12) ── */}
          <div className="lg:col-span-5 bg-[#0b0d14] border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              {/* Discipline Monogram & Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider border"
                  style={{
                    color: activeChannel.accentColor,
                    borderColor: `${activeChannel.accentColor}40`,
                    backgroundColor: `${activeChannel.accentColor}10`,
                  }}
                >
                  {activeChannel.badge}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  {activeChannel.domain}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                {activeChannel.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {activeChannel.summary}
              </p>

              {/* 4 Core Competency Meters */}
              <div className="space-y-3.5 mb-6">
                <div className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                  Verified Core Competencies:
                </div>
                {activeChannel.coreCompetencies.map((comp) => (
                  <div key={comp.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-heading font-bold text-white">{comp.name}</span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {comp.level} {"//"} <span className="text-white font-bold">{comp.pct}%</span>
                      </span>
                    </div>
                    {/* Meter Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${comp.pct}%`,
                          backgroundColor: activeChannel.accentColor,
                        }}
                      />
                    </div>
                    <div className="text-[10px] text-zinc-500 font-light leading-tight">
                      {comp.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hardware & Software Arsenal */}
              <div className="space-y-2 mb-6">
                <div className="font-mono text-[10px] uppercase text-zinc-400 font-bold tracking-wider">
                  Production Arsenal &amp; Tooling:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeChannel.arsenal.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Production Impact Note */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-zinc-300 leading-relaxed border-l-2" style={{ borderLeftColor: activeChannel.accentColor }}>
                <span className="font-mono text-[9px] uppercase tracking-wider block text-zinc-400 font-bold mb-1">
                  Verified Production Result:
                </span>
                {activeChannel.productionImpact}
              </div>
            </div>

            {/* Direct Action Link to Contact */}
            <a
              href="#contact"
              className="w-full py-3 px-4 rounded-xl font-heading text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all duration-300 bg-white/10 hover:bg-[#e11d48] text-white border border-white/15 hover:border-transparent shadow-lg cursor-pointer"
            >
              <span>Engage on {activeChannel.title.split("&")[0]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── 4. DECK BOTTOM STATUS BAR ── */}
        <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>ENGINE: GPU ACCELERATED</span>
            <span>COLOR SPACE: REC.709 D65</span>
            <span className="hidden sm:inline">RESOLUTION: 4K MASTER READY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">CH 0{CHANNELS.findIndex((c) => c.id === activeChannelId) + 1} / 04</span>
            <span className="text-zinc-600">•</span>
            <span className="text-[#e11d48] font-bold">PREETHISH D P REPERTOIRE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
