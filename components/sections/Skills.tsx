"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Film,
  Palette,
  TrendingUp,
  Compass,
  CheckCircle2,
  Sparkles,
  Sliders,
  Activity,
  Maximize2,
  ArrowRight,
  Layers,
  Search,
  Eye,
  BarChart2,
  Share2,
  Briefcase,
  Play,
  RotateCcw,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   DOMAIN DEFINITIONS & ACCORDING CAPABILITIES
──────────────────────────────────────────────────────────────── */
interface DomainData {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  icon: React.ElementType;
  kanji: string;
  tagline: string;
  skills: {
    name: string;
    subtext: string;
    level: string;
    tag: string;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const DOMAINS: DomainData[] = [
  {
    id: "motion",
    code: "DOM_01 // MOTION",
    title: "Post-Production & Cinematography",
    shortTitle: "MOTION & EDITORIAL",
    subtitle: "TIME-BASED PACING, NARRATIVE RHYTHM & COLOR PIPELINE",
    icon: Film,
    kanji: "動",
    tagline: "Translating raw rushes into emotionally compelling, frame-accurate cinema.",
    skills: [
      {
        name: "Post-Production Video Editing",
        subtext: "Timeline cuts, time codes conforming, narrative pacing & seamless transitions",
        level: "Specialist",
        tag: "NLE Suite",
      },
      {
        name: "Cinematography & Camera Direction",
        subtext: "Camera movement, framing geometry, composition, color temp & cinematic lighting",
        level: "Advanced",
        tag: "Optics & Camera",
      },
      {
        name: "DaVinci Resolve & Premiere Pro",
        subtext: "Rec.709/Log color grading, multicam sync & ProRes master delivery pipelines",
        level: "Proficient",
        tag: "Color & Sync",
      },
      {
        name: "Final Cut Pro X",
        subtext: "Rapid-turnaround assemblies, magnetic timeline cuts & social master packages",
        level: "Experienced",
        tag: "Turnaround",
      },
    ],
    metrics: [
      { label: "Master Sequence Pacing", value: "24.00 FPS" },
      { label: "Color Grading Depth", value: "10-Bit Log-C" },
      { label: "NLE Suites Mastered", value: "DaVinci / FCPX / Premiere" },
      { label: "Output Standard", value: "4K DCI Masters" },
    ],
  },
  {
    id: "visual",
    code: "DOM_02 // VISUAL",
    title: "Design & Adobe Creative Suite",
    shortTitle: "BRAND & DESIGN",
    subtitle: "VECTOR HIERARCHY, BRAND COLLATERAL & DESIGN SYSTEMS",
    icon: Palette,
    kanji: "創",
    tagline: "Building cohesive brand ecosystems from vector geometry to full collateral packages.",
    skills: [
      {
        name: "Adobe Creative Suite Proficiency",
        subtext: "Photoshop raster composition, Illustrator vector systems & InDesign typography layout",
        level: "Mastery",
        tag: "Adobe Ecosystem",
      },
      {
        name: "Content Creation & Marketing Assets",
        subtext: "High-impact visual campaigns, social banners, print collateral & digital identities",
        level: "Core Strength",
        tag: "Production",
      },
      {
        name: "Canva Design Architecture",
        subtext: "Rapid cross-platform promotional assets, reusable brand kits & client templates",
        level: "Skilled",
        tag: "Template Kits",
      },
      {
        name: "Brand Material Development",
        subtext: "Typography pairing, Pantone palette harmonization & brand guideline documentation",
        level: "Advanced",
        tag: "Design Systems",
      },
    ],
    metrics: [
      { label: "Vector Precision", value: "Infinite DPI" },
      { label: "Color Profiles", value: "RGB & CMYK" },
      { label: "Design Systems Built", value: "Guidelines & Kits" },
      { label: "Adobe Tools Mastered", value: "PS / AI / ID" },
    ],
  },
  {
    id: "growth",
    code: "DOM_03 // GROWTH",
    title: "Digital Marketing & SEO Strategy",
    shortTitle: "SEO & DIGITAL ADS",
    subtitle: "SEARCH ENGINE ARCHITECTURE, HIGH-INTENT KEYWORDS & CONVERSIONS",
    icon: TrendingUp,
    kanji: "拡",
    tagline: "Driving qualified organic discovery and high-ROI conversion funnels.",
    skills: [
      {
        name: "SEO Strategy Development",
        subtext: "Technical site audits, on-page search optimization & high-intent keyword mapping",
        level: "Strategic",
        tag: "Organic Search",
      },
      {
        name: "Google Ads Management",
        subtext: "PPC search & display campaign structuring, bid optimization & conversion tracking",
        level: "Targeted",
        tag: "Paid Acquisition",
      },
      {
        name: "Online Engagement Tactics",
        subtext: "Audience retention modeling, interactive storytelling & multi-channel funnels",
        level: "Expertise",
        tag: "Retention Funnels",
      },
      {
        name: "Social Media Strategy",
        subtext: "Platform-specific algorithmic distribution, content calendars & brand positioning",
        level: "Proven Impact",
        tag: "Audience Growth",
      },
    ],
    metrics: [
      { label: "SEO Audit Rigor", value: "100% Technical" },
      { label: "Paid Campaign Focus", value: "Google & Meta Ads" },
      { label: "Keyword Strategy", value: "High-Intent Search" },
      { label: "Funnel Conversion", value: "Data-Driven ROI" },
    ],
  },
  {
    id: "execution",
    code: "DOM_04 // EXECUTION",
    title: "Strategic Communications & Operations",
    shortTitle: "STRATEGY & MBA",
    subtitle: "COMMERCIAL MANAGEMENT, STAKEHOLDER SYNERGY & RIGOR",
    icon: Compass,
    kanji: "実",
    tagline: "Bridging creative visual storytelling with corporate strategy and operational discipline.",
    skills: [
      {
        name: "Strategic Networking",
        subtext: "High-value professional relations, client liaison & cross-functional synergy",
        level: "Core Asset",
        tag: "Relationship Mgmt",
      },
      {
        name: "Content Writing & Directives",
        subtext: "Engaging corporate copywriting, value propositions, scripts & creative briefs",
        level: "Articulate",
        tag: "Narrative Copy",
      },
      {
        name: "Expertise in MS Office",
        subtext: "Excel business analytics, executive PowerPoint decks & structured documentation",
        level: "Proficient",
        tag: "Enterprise Suite",
      },
      {
        name: "Business Communication",
        subtext: "Certified by Infosys Springboard for corporate execution & client diplomacy",
        level: "Certified",
        tag: "Infosys Certified",
      },
    ],
    metrics: [
      { label: "Postgrad Foundation", value: "MBA (8.00 CGPA)" },
      { label: "VisCom Foundation", value: "B.Sc (7.60 CGPA)" },
      { label: "Professional Cert", value: "Infosys Springboard" },
      { label: "Commercial Focus", value: "Brand ROI & Operations" },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────
   INTERACTIVE LIVE SCOPE / VISUAL STAGE COMPONENTS
──────────────────────────────────────────────────────────────── */

// 1. Motion: RGB Parade & Waveform Scopes
function MotionScopeVisualizer() {
  const [frameTick, setFrameTick] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameTick((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Scope Header */}
      <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-ping" />
          <span className="font-bold text-white">DAVINCI RESOLVE // RGB PARADE SCOPE</span>
        </div>
        <div className="text-zinc-400">
          TIMECODE: <span className="text-white">01:14:32:{frameTick.toString().padStart(2, "0")}</span>
        </div>
      </div>

      {/* 3-Channel RGB Parade Waveforms */}
      <div className="grid grid-cols-3 gap-3 h-36 bg-black/50 p-3 rounded-xl border border-white/[0.06] relative overflow-hidden">
        {/* Graticule grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_25%]" />

        {/* RED Channel */}
        <div className="flex flex-col justify-between relative">
          <div className="font-mono text-[10px] text-red-400 font-bold uppercase">R // RED WAVEFORM</div>
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              d="M 0 35 Q 15 15, 30 40 T 60 20 T 85 45 T 100 25"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M 0 45 Q 20 25, 45 50 T 75 15 T 100 40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
          </svg>
          <div className="font-mono text-[9px] text-zinc-500 flex justify-between">
            <span>0 IRE</span>
            <span className="text-red-400">100 IRE</span>
          </div>
        </div>

        {/* GREEN Channel */}
        <div className="flex flex-col justify-between relative border-x border-white/5 px-2">
          <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase">G // GREEN WAVEFORM</div>
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              d="M 0 40 Q 20 18, 40 35 T 70 15 T 90 42 T 100 30"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M 0 50 Q 25 30, 50 45 T 80 20 T 100 45"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
          </svg>
          <div className="font-mono text-[9px] text-zinc-500 flex justify-between">
            <span>0 IRE</span>
            <span className="text-emerald-400">100 IRE</span>
          </div>
        </div>

        {/* BLUE Channel */}
        <div className="flex flex-col justify-between relative">
          <div className="font-mono text-[10px] text-sky-400 font-bold uppercase">B // BLUE WAVEFORM</div>
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path
              d="M 0 30 Q 18 10, 35 45 T 65 25 T 85 38 T 100 20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M 0 40 Q 22 20, 48 52 T 78 28 T 100 35"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
          </svg>
          <div className="font-mono text-[9px] text-zinc-500 flex justify-between">
            <span>0 IRE</span>
            <span className="text-sky-400">100 IRE</span>
          </div>
        </div>
      </div>

      {/* Multi-Track NLE Video & Audio Timeline Strip */}
      <div className="bg-black/40 p-4 rounded-xl border border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 pb-1">
          <span>SEQUENCE: 4K_NARRATIVE_ROUGH_TO_MASTER</span>
          <span className="text-[#e11d48] font-bold">23.976 FPS // PRORES 422 HQ</span>
        </div>

        {/* Track V1 */}
        <div className="flex items-center gap-2 h-7 bg-white/[0.02] border border-white/5 rounded px-2 font-mono text-[10px]">
          <span className="w-7 text-zinc-400 font-bold shrink-0">V1</span>
          <div className="flex-1 h-5 bg-rose-950/60 border border-rose-500/40 rounded flex items-center px-2 text-rose-200">
            A_CAM_CINEMATOGRAPHY // 35MM_OPTIC
          </div>
          <div className="w-24 h-5 bg-zinc-800/80 rounded border border-white/10 flex items-center justify-center text-zinc-400 text-[9px]">
            CUT_04.MOV
          </div>
        </div>

        {/* Track A1 Audio Waves */}
        <div className="flex items-center gap-2 h-7 bg-white/[0.02] border border-white/5 rounded px-2 font-mono text-[10px]">
          <span className="w-7 text-zinc-400 font-bold shrink-0">A1</span>
          <div className="flex-1 h-5 bg-emerald-950/60 border border-emerald-500/40 rounded flex items-center justify-between px-2 text-emerald-200">
            <span>STEREO_DIALOGUE // 48kHz 24-BIT</span>
            {/* Animated Equalizer bars */}
            <div className="flex items-end gap-[2px] h-3">
              {[40, 80, 60, 95, 30, 85, 50, 75].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-emerald-400 rounded-t"
                  style={{
                    height: `${h}%`,
                    animation: `pulse ${0.6 + (i % 3) * 0.2}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Visual: Vector Blueprint & Pantone Harmony Generator
function VisualDesignBlueprint() {
  const [activeSwatch, setActiveSwatch] = useState("#e11d48");

  const swatches = [
    { hex: "#e11d48", label: "Crimson Core", role: "Primary Accent" },
    { hex: "#07080a", label: "Void Obsidian", role: "Canvas Base" },
    { hex: "#0e1015", label: "Charcoal Slate", role: "Surface Card" },
    { hex: "#f43f5e", label: "Rose Lumina", role: "High-Light" },
    { hex: "#f3f4f6", label: "Pure Editorial", role: "Typography" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-zinc-300">
          <Palette className="w-4 h-4 text-[#e11d48]" />
          <span className="font-bold text-white">ADOBE ILLUSTRATOR // BEZIER VECTOR BLUEPRINT</span>
        </div>
        <div className="text-zinc-400">
          RESOLUTION: <span className="text-[#e11d48] font-bold">INFINITE VECTOR</span>
        </div>
      </div>

      {/* Vector Path Blueprint Canvas */}
      <div className="h-40 bg-black/50 p-4 rounded-xl border border-white/[0.06] relative overflow-hidden flex items-center justify-center">
        {/* Isometric / Cartesian Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Animated Bezier Spline with Nodes & Handles */}
        <svg className="w-full h-full overflow-visible" viewBox="0 0 360 120">
          {/* Tangent Handle Lines */}
          <line x1="40" y1="80" x2="80" y2="20" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="160" y1="100" x2="130" y2="40" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="240" y1="20" x2="280" y2="90" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" />

          {/* Smooth Vector Curve */}
          <path
            d="M 40 80 C 80 20, 130 40, 180 80 S 260 20, 320 60"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          />

          {/* Glowing Fill Underneath */}
          <path
            d="M 40 80 C 80 20, 130 40, 180 80 S 260 20, 320 60 L 320 120 L 40 120 Z"
            fill="url(#vectorGlow)"
            opacity="0.25"
          />

          <defs>
            <linearGradient id="vectorGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Anchor Points */}
          <circle cx="40" cy="80" r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="180" cy="80" r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="320" cy="60" r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />

          {/* Control Handles (Square Points) */}
          <rect x="76" y="16" width="8" height="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1" />
          <rect x="126" y="36" width="8" height="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1" />
          <rect x="276" y="86" width="8" height="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1" />
        </svg>

        {/* Viewfinder Coordinates */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-500">
          NODE_COUNT: 03 // BEZIER HANDLE: TANGENT_LOCKED
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-[#e11d48] bg-black/60 px-2 py-0.5 rounded border border-[#e11d48]/30">
          PEN TOOL: ACCURATE
        </div>
      </div>

      {/* Interactive Color System Swatches */}
      <div>
        <div className="text-[11px] font-mono text-zinc-400 mb-2 flex items-center justify-between">
          <span>CURATED HARMONIC BRAND PALETTE // CLICK TO INSPECT</span>
          <span className="text-[#e11d48] font-mono">{activeSwatch}</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {swatches.map((s) => (
            <button
              key={s.hex}
              onClick={() => setActiveSwatch(s.hex)}
              className={`p-2.5 rounded-lg border text-left transition-all duration-200 group ${
                activeSwatch === s.hex
                  ? "border-[#e11d48] shadow-[0_0_15px_rgba(225,29,72,0.3)] bg-white/[0.04]"
                  : "border-white/[0.08] hover:border-white/20 bg-black/30"
              }`}
            >
              <div
                className="w-full h-6 rounded mb-2 border border-white/10"
                style={{ backgroundColor: s.hex }}
              />
              <div className="font-mono text-[10px] text-zinc-300 font-bold truncate">{s.hex}</div>
              <div className="text-[9px] text-zinc-500 font-mono truncate">{s.role}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Growth: SEO Ranking & Conversion Funnel Chart
function SeoGrowthVisualizer() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-zinc-300">
          <Search className="w-4 h-4 text-[#e11d48]" />
          <span className="font-bold text-white">SEARCH ENGINE DISCOVERY & PPC FUNNEL</span>
        </div>
        <div className="text-zinc-400">
          ORGANIC TRAFFIC: <span className="text-emerald-400 font-bold">+284% GROWTH</span>
        </div>
      </div>

      {/* Animated Traffic Growth Spline Chart */}
      <div className="h-36 bg-black/50 p-4 rounded-xl border border-white/[0.06] relative overflow-hidden flex flex-col justify-between">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100%_25%]" />

        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 z-10">
          <span>HIGH-INTENT KEYWORD INDEXING</span>
          <span className="text-[#e11d48]">SEMrush &amp; Google Ads Mode</span>
        </div>

        {/* Growth Curve */}
        <svg className="w-full h-20 overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Filled Area */}
          <path
            d="M 0 60 Q 50 55, 100 45 T 200 20 T 300 5 L 300 70 L 0 70 Z"
            fill="url(#growthGrad)"
          />

          {/* Stroke Line */}
          <path
            d="M 0 60 Q 50 55, 100 45 T 200 20 T 300 5"
            fill="none"
            stroke="#e11d48"
            strokeWidth="2.5"
            className="drop-shadow-[0_0_8px_#e11d48]"
          />

          {/* Pulse Target Point at End */}
          <circle cx="300" cy="5" r="4" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
        </svg>

        <div className="flex justify-between font-mono text-[9px] text-zinc-500 z-10 pt-1 border-t border-white/5">
          <span>TECHNICAL AUDIT</span>
          <span>KEYWORD ARCHITECTURE</span>
          <span>CAMPAIGN STRUCTURING</span>
          <span className="text-emerald-400">MAX ROI CONVERSION</span>
        </div>
      </div>

      {/* Target Keywords Telemetry List */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-1">
            <span>TARGET SEARCH INTENT</span>
            <span className="text-emerald-400 font-bold">POS #1</span>
          </div>
          <div className="font-heading font-semibold text-white truncate">
            &ldquo;Graphic Designer &amp; Motion Specialist&rdquo;
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">High Intent CTR: 12.8%</div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-1">
            <span>CONVERSION AUDIT</span>
            <span className="text-[#e11d48] font-bold">98/100</span>
          </div>
          <div className="font-heading font-semibold text-white truncate">
            Technical Speed &amp; Core Web Vitals
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">Conversion Friction: Minimal</div>
        </div>
      </div>
    </div>
  );
}

// 4. Execution: MBA Strategy Radar & Operational Matrix
function StrategicOperationsVisualizer() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-zinc-300">
          <Compass className="w-4 h-4 text-[#e11d48]" />
          <span className="font-bold text-white">MBA COMMERCIAL SYNERGY // RADAR COGNITION</span>
        </div>
        <div className="text-zinc-400">
          DUAL-CORE: <span className="text-[#e11d48] font-bold">MBA + VISCOM</span>
        </div>
      </div>

      {/* Interactive 5-Axis Spider Radar Chart */}
      <div className="h-40 bg-black/50 p-4 rounded-xl border border-white/[0.06] relative overflow-hidden flex items-center justify-center">
        <svg className="w-56 h-36 overflow-visible" viewBox="-120 -80 240 160">
          {/* Radar Circles */}
          <polygon points="0,-60 57,-18 35,48 -35,48 -57,-18" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />
          <polygon points="0,-40 38,-12 23,32 -23,32 -38,-12" fill="none" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
          <polygon points="0,-20 19,-6 11,16 -11,16 -19,-6" fill="none" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />

          {/* Radar Axes */}
          <line x1="0" y1="0" x2="0" y2="-60" stroke="#ffffff" strokeOpacity="0.15" />
          <line x1="0" y1="0" x2="57" y2="-18" stroke="#ffffff" strokeOpacity="0.15" />
          <line x1="0" y1="0" x2="35" y2="48" stroke="#ffffff" strokeOpacity="0.15" />
          <line x1="0" y1="0" x2="-35" y2="48" stroke="#ffffff" strokeOpacity="0.15" />
          <line x1="0" y1="0" x2="-57" y2="-18" stroke="#ffffff" strokeOpacity="0.15" />

          {/* Filled Proficiency Shape */}
          <polygon
            points="0,-54 52,-15 32,44 -30,42 -52,-16"
            fill="#e11d48"
            fillOpacity="0.3"
            stroke="#e11d48"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]"
          />

          {/* Vertex Points */}
          <circle cx="0" cy="-54" r="3" fill="#ffffff" />
          <circle cx="52" cy="-15" r="3" fill="#ffffff" />
          <circle cx="32" cy="44" r="3" fill="#ffffff" />
          <circle cx="-30" cy="42" r="3" fill="#ffffff" />
          <circle cx="-52" cy="-16" r="3" fill="#ffffff" />

          {/* Labels */}
          <text x="0" y="-68" textAnchor="middle" fill="#f3f4f6" fontSize="8" fontFamily="monospace">STRATEGY (95%)</text>
          <text x="65" y="-16" textAnchor="start" fill="#f3f4f6" fontSize="8" fontFamily="monospace">LEADERSHIP</text>
          <text x="40" y="60" textAnchor="middle" fill="#f3f4f6" fontSize="8" fontFamily="monospace">ANALYTICS</text>
          <text x="-40" y="60" textAnchor="middle" fill="#f3f4f6" fontSize="8" fontFamily="monospace">COMMUNICATION</text>
          <text x="-65" y="-16" textAnchor="end" fill="#f3f4f6" fontSize="8" fontFamily="monospace">VISUAL ART</text>
        </svg>
      </div>

      {/* Academic Verification Metric Chips */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs">
          <div className="text-[10px] text-zinc-500 mb-1">MBA OPERATIONS RIGOR</div>
          <div className="font-heading font-semibold text-white">8.00 CGPA Performance</div>
          <div className="text-[10px] text-[#e11d48] mt-1">Sathyabama University</div>
        </div>

        <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs">
          <div className="text-[10px] text-zinc-500 mb-1">ENTERPRISE CERTIFICATION</div>
          <div className="font-heading font-semibold text-white">Infosys Springboard</div>
          <div className="text-[10px] text-emerald-400 mt-1">Corporate Execution Certified</div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Selected domain state (default: motion)
  const [activeDomainId, setActiveDomainId] = useState<string>("motion");

  const activeDomain = DOMAINS.find((d) => d.id === activeDomainId) || DOMAINS[0];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#e11d48]/[0.06] blur-[160px] rounded-full pointer-events-none" />

      {/* Subtle Dot Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* ──────────────────────────────────────────────────────────
            SECTION HEADER
        ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48] font-medium">
                03 // Technical Repertoire
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              SKILLS & <span className="text-zinc-500 font-light">CAPABILITIES</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider leading-relaxed">
            INTERACTIVE CAPABILITY MATRIX // SELECT A DOMAIN TO ENGAGE REAL-TIME SCOPES &amp; METHODOLOGIES
          </div>
        </motion.div>

        {/* ──────────────────────────────────────────────────────────
            INTERACTIVE SPLIT-SCREEN WORKSTATION
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* LEFT: 4 DOMAIN SELECTOR CARDS (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>CORE ARCHITECTURES (4)</span>
              <span className="text-[#e11d48]">CLICK TO SWITCH STAGE</span>
            </div>

            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeDomainId === domain.id;

              return (
                <div
                  key={domain.id}
                  onClick={() => setActiveDomainId(domain.id)}
                  className={`group cursor-pointer p-5 sm:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? "bg-[#10131b] border-[#e11d48] shadow-[0_0_30px_rgba(225,29,72,0.2)]"
                      : "bg-[#0e1015]/80 border-white/[0.08] hover:border-white/20 hover:bg-[#12151e]"
                  }`}
                >
                  {/* Subtle Japanese Watermark */}
                  <div className="absolute right-3 bottom-1 font-serif text-5xl font-black text-white/[0.03] group-hover:text-[#e11d48]/10 transition-colors pointer-events-none select-none">
                    {domain.kanji}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isActive ? "bg-[#e11d48] shadow-[0_0_8px_#e11d48]" : "bg-zinc-600"
                        }`}
                      />
                      <span className="font-mono text-[11px] text-[#e11d48] tracking-widest uppercase font-semibold">
                        {domain.code}
                      </span>
                    </div>

                    <div
                      className={`p-2 rounded-lg border transition-colors ${
                        isActive
                          ? "bg-[#e11d48] border-[#e11d48] text-white"
                          : "bg-white/[0.03] border-white/10 text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-1 tracking-tight">
                    {domain.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                    {domain.tagline}
                  </p>

                  {/* Skills count pill & active cue */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[11px]">
                    <span className="text-zinc-500">
                      {domain.skills.length} VERIFIABLE SKILLS
                    </span>
                    <span
                      className={`flex items-center gap-1 font-medium transition-colors ${
                        isActive ? "text-[#e11d48]" : "text-zinc-500 group-hover:text-zinc-300"
                      }`}
                    >
                      <span>{isActive ? "STAGE ACTIVE" : "INSPECT"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Active bottom hairline indicator */}
                  <div
                    className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#e11d48] to-rose-400 transition-transform origin-left duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT: LIVE INTERACTIVE WORKBENCH & VISUAL SCOPE (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0e1015] border border-white/[0.08] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              {/* Corner reticle mark */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#e11d48] rounded-tr-2xl pointer-events-none" />

              {/* Workstation Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-white/[0.08]">
                <div>
                  <div className="font-mono text-[10px] text-[#e11d48] tracking-widest uppercase mb-1">
                    LIVE CAPABILITY WORKBENCH
                  </div>
                  <h3 className="font-heading text-2xl font-black text-white">
                    {activeDomain.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 text-zinc-300">
                  <Activity className="w-3.5 h-3.5 text-[#e11d48] animate-pulse" />
                  <span>CALIBRATION: ONLINE</span>
                </div>
              </div>

              {/* Dynamic Scope / Visualizer Stage Swapped on Tab Switch */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDomainId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {activeDomainId === "motion" && <MotionScopeVisualizer />}
                    {activeDomainId === "visual" && <VisualDesignBlueprint />}
                    {activeDomainId === "growth" && <SeoGrowthVisualizer />}
                    {activeDomainId === "execution" && <StrategicOperationsVisualizer />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Skills Deep-Dive List for Current Domain */}
              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                  <span>RESUME VERIFIED COMPETENCIES ({activeDomain.skills.length})</span>
                  <span className="text-[#e11d48]">MASTERY MATRIX</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeDomain.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] hover:border-[#e11d48]/40 transition-colors group/item"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-heading text-xs sm:text-sm font-bold text-white group-hover/item:text-rose-100 transition-colors">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider bg-white/[0.04] text-zinc-300 border border-white/10 group-hover/item:border-[#e11d48]/50 group-hover/item:text-[#e11d48] transition-colors shrink-0">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                        {skill.subtext}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Specific Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/[0.08]">
                {activeDomain.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase truncate">{m.label}</div>
                    <div className="font-mono text-xs font-bold text-zinc-200 mt-0.5 truncate">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            SECTION RIGOR VERIFICATION BAR
        ────────────────────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
            <span className="text-zinc-300 font-medium">METHODOLOGY AUDIT:</span>
            <span>All competencies verified through real commercial productions, agency deliverables &amp; academic excellence.</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500">
            <span>4 CORE ARCHITECTURES</span>
            <span>•</span>
            <span>16 SKILLS</span>
            <span>•</span>
            <span className="text-[#e11d48]">FRAME-ACCURATE RIGOR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
