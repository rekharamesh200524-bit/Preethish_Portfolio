"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Film,
  Sparkles,
  Volume2,
  VolumeX,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Aperture,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   PHOTOGRAPHIC SKILL REPERTOIRE (RESUME DATA)
──────────────────────────────────────────────────────────────── */
interface SkillPhoto {
  id: string;
  frameNumber: string;
  category: string;
  title: string;
  subtitle: string;
  domain: string;
  image: string;
  settings: {
    lens: string;
    shutter: string;
    aperture: string;
    iso: string;
  };
  summary: string;
  coreCompetencies: {
    name: string;
    level: string;
    detail: string;
  }[];
  tools: string[];
  filmStock: string;
  stamp: string;
  rotation: number;
}

const SKILL_PHOTOS: SkillPhoto[] = [
  {
    id: "cinematography",
    frameNumber: "EXP_01",
    category: "CINEMATOGRAPHY & OPTICS",
    title: "Cinematography & Camera Direction",
    subtitle: "FRAMING GEOMETRY, LIGHTING RATIOS & OPTICAL AXIS",
    domain: "VISUAL COMMUNICATION",
    image: "/projects/maritime_cinematography.jpg",
    settings: {
      lens: "35mm Cine Prime T/1.5",
      shutter: "1/48s 180° Shutter",
      aperture: "f/1.8 Aperture",
      iso: "ISO 800 Log-C",
    },
    summary:
      "Crafting cinematic visual compositions through camera framing depth, controlled lighting ratios, color temperature balancing, and gimbal camera movement.",
    coreCompetencies: [
      { name: "Camera Movement & Tracking", level: "Advanced", detail: "Dolly, gimbal tracking, handheld pacing" },
      { name: "Three-Point Lighting Setups", level: "Expert", detail: "Key, fill, backlight, scrims, diffusion" },
      { name: "Visual Composition & Optics", level: "Mastery", detail: "Rule of thirds, leading lines, golden ratio" },
      { name: "Color Temperature & Exposure", level: "Specialist", detail: "Kelvin matching, false color, waveforms" },
    ],
    tools: ["Sony FX Cine", "Blackmagic 6K", "Cinema Primes", "Gimbal Rigs", "ND Filters"],
    filmStock: "KODAK VISION3 500T // 35MM",
    stamp: "FRAME ACCURATE",
    rotation: -1.2,
  },
  {
    id: "post-production",
    frameNumber: "EXP_02",
    category: "EDITORIAL SUITE",
    title: "Post-Production & Video Editing",
    subtitle: "TIMELINE PACING, MULTICAM SYNC & COLOR SCIENCE",
    domain: "FILM POST-PRODUCTION",
    image: "/projects/film_edit.jpg",
    settings: {
      lens: "DaVinci Resolve Studio",
      shutter: "23.976 Drop-Frame",
      aperture: "ProRes 422 HQ",
      iso: "48kHz 24-Bit Audio",
    },
    summary:
      "Shaping raw cinematic footage into cohesive, high-impact narrative cuts with frame-accurate pacing, DaVinci Resolve color grading, and broadcast delivery.",
    coreCompetencies: [
      { name: "Non-Linear Video Editing (NLE)", level: "Specialist", detail: "DaVinci Resolve, Premiere Pro CC, FCPX" },
      { name: "Color Grading & Color Science", level: "Proficient", detail: "Primary balance wheels, curves, LUTs" },
      { name: "Timecode Conforming & Sync", level: "Mastery", detail: "Multicam sync, audio conforming, L/J cuts" },
      { name: "Broadcast Deliverables", level: "Certified", detail: "4K DCI, ProRes, web-optimized compression" },
    ],
    tools: ["DaVinci Resolve", "Premiere Pro CC", "Final Cut Pro X", "CapCut", "Audition"],
    filmStock: "FUJIFILM ETERNA 250D // NLE",
    stamp: "DAVINCI CERTIFIED",
    rotation: 1.0,
  },
  {
    id: "brand-identity",
    frameNumber: "EXP_03",
    category: "GRAPHIC DESIGN",
    title: "Brand Identity & Design Systems",
    subtitle: "VECTOR TYPOGRAPHY, PRINT COLLATERAL & VISUAL SYSTEMS",
    domain: "CREATIVE DIRECTION",
    image: "/projects/brand_design.jpg",
    settings: {
      lens: "Adobe Creative Suite",
      shutter: "Vector Infinite DPI",
      aperture: "Pantone Coated",
      iso: "CMYK & RGB Dual",
    },
    summary:
      "Architecting distinctive visual identities, scalable vector logos, marketing collateral, and high-impact digital design systems using Adobe Creative Suite and Canva.",
    coreCompetencies: [
      { name: "Vector Logo & Identity Systems", level: "Mastery", detail: "Geometric balance, responsive brand marks" },
      { name: "Typography & Layout Hierarchy", level: "Advanced", detail: "Editorial typesetting, baseline grids, pairings" },
      { name: "Marketing Collateral & Packaging", level: "Core", detail: "Print readiness, bleed margins, digital banners" },
      { name: "Rapid Design Architecture (Canva)", level: "Skilled", detail: "Template kits, rapid social assets, brand kits" },
    ],
    tools: ["Photoshop", "Illustrator", "InDesign", "Canva Pro", "Figma"],
    filmStock: "ILFORD PAN F PLUS // 50 ISO",
    stamp: "VECTOR PRECISION",
    rotation: -0.8,
  },
  {
    id: "seo-marketing",
    frameNumber: "EXP_04",
    category: "GROWTH & SEARCH",
    title: "Digital Marketing & SEO Strategy",
    subtitle: "SEARCH ENGINE ARCHITECTURE, GOOGLE ADS & CONVERSIONS",
    domain: "PERFORMANCE MARKETING",
    image: "/projects/digital_marketing.jpg",
    settings: {
      lens: "Google Ads & SEMrush",
      shutter: "Real-time Bidding",
      aperture: "Target CPA & ROAS",
      iso: "High-Intent Search",
    },
    summary:
      "Executing technical on-page site audits, strategic high-intent keyword mapping, and targeted Google Ads / Meta Ads PPC campaigns to drive measurable commercial growth.",
    coreCompetencies: [
      { name: "Technical SEO & Keyword Mapping", level: "Strategic", detail: "Site architecture audits, search intent indexing" },
      { name: "Google Ads (PPC) Management", level: "Targeted", detail: "Campaign setup, negative keyword pruning, bids" },
      { name: "Audience Retention & Funnels", level: "Expertise", detail: "Click-through optimization, multi-channel funnels" },
      { name: "Social Media Strategic Growth", level: "Proven Impact", detail: "Content calendars, algorithmic distribution" },
    ],
    tools: ["Google Ads", "Meta Ads Manager", "SEMrush", "Google Analytics 4", "Search Console"],
    filmStock: "KODAK TRI-X 400 // SEO DATA",
    stamp: "DATA-DRIVEN ROI",
    rotation: 1.4,
  },
  {
    id: "operations-mba",
    frameNumber: "EXP_05",
    category: "MBA OPERATIONS",
    title: "Strategic Operations & Communications",
    subtitle: "COMMERCIAL ACUMEN, STAKEHOLDER DIPLOMACY & LEADERSHIP",
    domain: "BUSINESS ADMINISTRATION",
    image: "/projects/crm_sales_operations.jpg",
    settings: {
      lens: "MBA Dual-Core Framework",
      shutter: "8.00 CGPA Distinction",
      aperture: "Infosys Springboard",
      iso: "Enterprise Operations",
    },
    summary:
      "Bridging creative direction with executive business operations, commercial ROI analysis, enterprise CRM management, and certified corporate communications.",
    coreCompetencies: [
      { name: "Enterprise CRM & Sales Support", level: "Core Asset", detail: "Sales order forms, client CRM pipelines" },
      { name: "Corporate Communications & Diplomacy", level: "Certified", detail: "Infosys Springboard certified executive reporting" },
      { name: "Operations Analysis & Modeling", level: "Proficient", detail: "Bottleneck identification, throughput optimization" },
      { name: "Content Writing & Creative Briefs", level: "Articulate", detail: "Executive summaries, scripts, value propositions" },
    ],
    tools: ["MS Excel Analytics", "PowerPoint Decks", "Enterprise CRM", "Infosys Frameworks", "Word Documentation"],
    filmStock: "KODACHROME 64 // EXECUTIVE",
    stamp: "MBA DISTINCTION",
    rotation: -0.5,
  },
];

/* ────────────────────────────────────────────────────────────────
   SYNTHESIZED MECHANICAL CAMERA SHUTTER SOUND (WEB AUDIO API)
──────────────────────────────────────────────────────────────── */
function playAuthenticShutterSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Shutter mirror slap (Mechanical noise)
    const bufferSize = ctx.sampleRate * 0.045;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(1900, now);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.045);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Heavy focal plane curtain thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);

    // 3. Second shutter return click
    const noise2 = ctx.createBufferSource();
    noise2.buffer = buffer;
    const noiseGain2 = ctx.createGain();
    noiseGain2.gain.setValueAtTime(0.2, now + 0.08);
    noiseGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise2.connect(noiseFilter);
    noiseFilter.connect(noiseGain2);
    noiseGain2.connect(ctx.destination);
    noise2.start(now + 0.08);
  } catch {
    // Ignore browser restrictions
  }
}

/* ────────────────────────────────────────────────────────────────
   MAIN SCROLL-DRIVEN CAMERA & FLYING PHOTOGRAPH SECTION
──────────────────────────────────────────────────────────────── */
export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const prevIndexRef = useRef(0);

  // Trigger camera snap: flash & sound
  const triggerShutter = useCallback(() => {
    setIsFlashing(true);
    if (soundEnabled) {
      playAuthenticShutterSound();
    }
    setTimeout(() => {
      setIsFlashing(false);
    }, 200);
  }, [soundEnabled]);

  // Scroll listener that pins section and drives camera clicking per step
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Progress normalized 0.0 to 1.0
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(progress);

      // Divide scroll evenly across the 5 photographic skills
      const count = SKILL_PHOTOS.length;
      const activeIdx = Math.min(count - 1, Math.floor(progress * count * 0.999));

      // Trigger realistic shutter click whenever index changes via scroll
      if (activeIdx !== prevIndexRef.current) {
        prevIndexRef.current = activeIdx;
        setCurrentIndex(activeIdx);
        triggerShutter();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [triggerShutter]);

  // Smooth scroll to jump to a specific exposure
  const scrollToExposure = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    const targetProgress = (index + 0.5) / SKILL_PHOTOS.length;
    const targetScroll =
      window.scrollY + rect.top + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const activePhoto = SKILL_PHOTOS[currentIndex];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-[#07080a] text-white border-t border-white/[0.08] min-h-[500vh] select-none"
    >
      {/* ──────────────────────────────────────────────────────────
          STICKY FULL-SCREEN CAMERA WORKBENCH
          Padded top (pt-20 md:pt-24) to never overlap with fixed navbar
          Padded bottom (pb-6 md:pb-8) so footer is completely visible
      ────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-20 md:pt-24 pb-6 md:pb-8 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 box-border">
        {/* Ambient background glows */}
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

        {/* Realistic Camera Flash Burst Overlay */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-50 pointer-events-none bg-white shadow-[inset_0_0_150px_rgba(255,255,255,1)]"
            />
          )}
        </AnimatePresence>

        {/* ──────────────────────────────────────────────────────────
            1. FULLY VISIBLE TOP HEADER (NEVER CUT OFF)
        ────────────────────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between gap-4 pb-3 border-b border-white/[0.08] relative z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse shadow-[0_0_10px_#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48] font-semibold">
                03 // Optical Repertoire &amp; Photography
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black tracking-tight uppercase flex items-center gap-2.5">
              <span>SKILLS &amp;</span>
              <span className="text-zinc-500 font-light">CAPABILITIES CAMERA</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-[#e11d48]/40 transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span className="hidden sm:inline">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
                  <span className="hidden sm:inline">AUDIO OFF</span>
                </>
              )}
            </button>

            {/* Scroll indicator prompt */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px]">
              <span>SCROLL TO SNAP &amp; FLY</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#e11d48] animate-bounce" />
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            2. SPLIT STAGE: REAL CAMERA (LEFT) & FLYING PHOTOGRAPH (RIGHT)
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center flex-1 my-auto py-2 min-h-0">
          {/* ── LEFT: REAL PHOTOREALISTIC CAMERA APPARATUS (Col 1-5) ── */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Real Camera Visual Frame */}
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square rounded-3xl overflow-hidden bg-[#0a0c10] border-2 border-white/15 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              {/* Photorealistic Camera Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src="/images/real_camera.jpg"
                  alt="Real Vintage Leica 35mm Rangefinder Cinema Camera"
                  fill
                  priority
                  className="object-contain filter contrast-110 drop-shadow-2xl"
                />

                {/* Hotshoe Flash Bulb Effect */}
                {isFlashing && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full blur-md animate-ping" />
                )}

                {/* Live Shutter Status Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#e11d48]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-ping" />
                  <span>EXP 0{currentIndex + 1}/05</span>
                </div>

                {/* Mechanical Discharge Slot Indicator under the camera */}
                <div className="absolute bottom-2 inset-x-4 bg-black/80 backdrop-blur-md py-1 px-2 rounded-lg border border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span className="text-[#e11d48] font-bold">EJECTION TRAY</span>
                  <span className="text-zinc-500">DISPENSING TO RIGHT &rarr;</span>
                </div>
              </div>
            </div>

            {/* Step Navigation Pill Indicator */}
            <div className="flex items-center gap-2 mt-3">
              {SKILL_PHOTOS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToExposure(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? "w-7 bg-[#e11d48] shadow-[0_0_10px_#e11d48]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  title={`Jump to ${p.title}`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: FLYING PHOTOGRAPH LANDING WORKBENCH (Col 6-12) ── */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.id}
                // Flies from under the camera on the left to the right side!
                initial={{
                  opacity: 0,
                  x: -240,
                  y: 90,
                  scale: 0.45,
                  rotate: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: activePhoto.rotation,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: -35,
                  rotate: -activePhoto.rotation * 2,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full bg-[#0f1118] border-2 border-white/20 rounded-2xl p-4 sm:p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] max-h-[72vh] overflow-y-auto"
              >
                {/* Photographic Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 pb-2 mb-2.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Film className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span className="text-zinc-200 font-bold">{activePhoto.filmStock}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#e11d48] font-bold">{activePhoto.frameNumber}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-300 font-semibold">{activePhoto.stamp}</span>
                  </div>
                </div>

                {/* Developed High-Res Photograph with Scaled Height */}
                <div className="relative h-40 sm:h-48 md:h-56 rounded-xl overflow-hidden border border-white/10 shadow-xl bg-zinc-950 mb-3 group">
                  <Image
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark Photographic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Photographic Telemetry Tag */}
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-white bg-black/75 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    LENS // {activePhoto.settings.lens}
                  </div>

                  {/* Bottom Metadata Stamp */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    <span className="text-zinc-300 font-semibold">{activePhoto.domain}</span>
                    <span className="text-[#e11d48] font-bold">{activePhoto.settings.shutter}</span>
                  </div>
                </div>

                {/* Photograph Card Content Details */}
                <div className="space-y-2.5">
                  <div>
                    <div className="font-mono text-[9px] sm:text-[10px] text-[#e11d48] uppercase tracking-widest font-semibold">
                      {activePhoto.category}
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight leading-snug">
                      {activePhoto.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {activePhoto.summary}
                  </p>

                  {/* 4 Core Competency Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/[0.08]">
                    {activePhoto.coreCompetencies.map((skill, si) => (
                      <div
                        key={si}
                        className="p-2 rounded-lg bg-black/40 border border-white/[0.06] hover:border-[#e11d48]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-heading text-xs font-bold text-white">
                            {skill.name}
                          </span>
                          <span className="px-1.5 py-0.5 rounded font-mono text-[8px] uppercase bg-white/[0.05] text-[#e11d48] border border-white/10 font-bold shrink-0">
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 font-light leading-tight">
                          {skill.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.08]">
                    {activePhoto.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            3. FULLY VISIBLE FOOTER (NEVER CUT OFF)
        ────────────────────────────────────────────────────────── */}
        <div className="shrink-0 pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400 relative z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" />
            <span className="text-zinc-300 font-bold hidden sm:inline">OPTICAL CINEMA RIGOR:</span>
            <span className="text-zinc-500">
              FRAME 0{currentIndex + 1} / 05 // SCROLL TO OPERATE DISCHARGE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToExposure(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-2.5 py-1 rounded border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              &larr; PREV
            </button>
            <button
              onClick={() => scrollToExposure(Math.min(SKILL_PHOTOS.length - 1, currentIndex + 1))}
              disabled={currentIndex === SKILL_PHOTOS.length - 1}
              className="px-2.5 py-1 rounded border border-white/10 hover:border-[#e11d48] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              NEXT &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
