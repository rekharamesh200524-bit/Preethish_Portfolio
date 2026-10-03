"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  ChevronRight,
  ChevronLeft,
  Compass,
  X,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   EXPERIENCE DATA — STRICTLY EXTRACTED FROM RESUME (SOURCE OF TRUTH)
   Preethish D P | Chennai, India
──────────────────────────────────────────────────────────────── */
export interface ExperienceItem {
  id: string;
  yearDisplay: string;
  yearNumber: number;
  role: string;
  shortRole: string;
  company: string;
  shortCompany: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  summary: string;
  responsibilities: string[];
  project?: string;
  technologies: string[];
  image: string;
  category: string;
  // Precise curve coordinates in 1440x850 SVG space
  nodeX: number;
  nodeY: number;
  // Screen placement percentage for the cascading ribbon cards
  cardLeftPct: number;
  cardTopPct: number;
  // Progress threshold (0.0 to 1.0) when this card emerges
  revealThreshold: number;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "sathya-jyothi-films",
    yearDisplay: "2022",
    yearNumber: 2022,
    role: "Assistant Film Editor",
    shortRole: "ASSISTANT FILM EDITOR",
    company: "Sathya Jyothi Film Production Company",
    shortCompany: "SATHYA JYOTHI FILMS",
    period: "01/2022 to 06/2022",
    location: "Chennai",
    summary:
      "Evaluated video content for time codes, edits, and transitions before submitting final cut. Utilized specialized software programs such as Final Cut Pro X or Adobe Premiere Pro CC to edit films.",
    responsibilities: [
      "Evaluated video content for time codes, edits, and transitions before submitting final cut.",
      "Utilized specialized software programs such as Final Cut Pro X or Adobe Premiere Pro CC to edit films.",
    ],
    technologies: [
      "Final Cut Pro X",
      "Adobe Premiere Pro CC",
      "Time Code Conforming",
      "Film Editing",
      "Pacing & Transitions",
    ],
    image: "/projects/film_edit.jpg",
    category: "FILM PRODUCTION",
    nodeX: 300,
    nodeY: 175,
    cardLeftPct: 15,
    cardTopPct: 27,
    revealThreshold: 0.0,
  },
  {
    id: "dp-world",
    yearDisplay: "2023",
    yearNumber: 2023,
    role: "Operations Intern",
    shortRole: "OPERATIONS INTERN",
    company: "DP World",
    shortCompany: "DP WORLD",
    period: "10/2023 to 12/2023",
    location: "Chennai",
    summary:
      "Managed risk in maritime network operations for vessels and gained knowledge of documentation processes related to terminal operations and cargoes.",
    responsibilities: [
      "Managed risk in maritime network operations for vessels.",
      "Gained knowledge of documentation processes related to terminal operations and cargoes.",
    ],
    project: "A Study on Operations implementation and its effectiveness in DP World",
    technologies: [
      "Maritime Network Operations",
      "Risk Management",
      "Terminal Operations",
      "Cargo Documentation",
    ],
    image: "/projects/maritime_cinematography.jpg",
    category: "MARITIME LOGISTICS",
    nodeX: 510,
    nodeY: 245,
    cardLeftPct: 28,
    cardTopPct: 34,
    revealThreshold: 0.2,
  },
  {
    id: "populus-empowerment-network",
    yearDisplay: "2024",
    yearNumber: 2024,
    role: "Digital Media Intern",
    shortRole: "DIGITAL MEDIA INTERN",
    company: "Populus Empowerment Network",
    shortCompany: "POPULUS NETWORK",
    period: "01/2024 to 06/2024",
    location: "Chennai",
    summary:
      "Crafted visually engaging graphics and video editing using Adobe Creative Suite. Contributed to brand material development and content writing.",
    responsibilities: [
      "Crafted visually engaging graphics and video editing using Adobe Creative Suite.",
      "Contributed to brand material development and content writing.",
    ],
    technologies: [
      "Adobe Creative Suite",
      "Video Editing",
      "Brand Material Development",
      "Content Writing",
    ],
    image: "/projects/brand_design.jpg",
    category: "DIGITAL MEDIA",
    nodeX: 720,
    nodeY: 320,
    cardLeftPct: 41,
    cardTopPct: 42,
    revealThreshold: 0.4,
  },
  {
    id: "arya-omnitalk",
    yearDisplay: "2024",
    yearNumber: 2024,
    role: "Management Trainee",
    shortRole: "MANAGEMENT TRAINEE",
    company: "Arya Omnitalk",
    shortCompany: "ARYA OMNITALK",
    period: "09/2024 to 12/2024",
    location: "Chennai",
    summary:
      "Managed CRM updates to maintain accurate records, supporting effective sales operations. Supported sales operations through preparation of sales order forms and client engagement.",
    responsibilities: [
      "Managed CRM updates to maintain accurate records, supporting effective sales operations.",
      "Supported sales operations through preparation of sales order forms, client engagement.",
    ],
    technologies: [
      "CRM Updates",
      "Sales Operations",
      "Sales Order Forms",
      "Client Engagement",
    ],
    image: "/projects/crm_sales_operations.jpg",
    category: "ENTERPRISE CRM",
    nodeX: 930,
    nodeY: 380,
    cardLeftPct: 54,
    cardTopPct: 48,
    revealThreshold: 0.6,
  },
  {
    id: "inet-secure-labs",
    yearDisplay: "2026",
    yearNumber: 2026,
    role: "Digital marketing and Graphic designer",
    shortRole: "DIGITAL MARKETING & DESIGN",
    company: "I-Net secure labs Pvt. Ltd.",
    shortCompany: "I-NET SECURE LABS",
    period: "12/2024 to Current",
    location: "Chennai",
    isCurrent: true,
    summary:
      "Crafted graphics and multimedia content with Adobe Creative Suite, Canva, and DaVinci Resolve. Executed SEO, site audits, keyword strategies, and Google Ads campaigns to boost online engagement.",
    responsibilities: [
      "Crafted graphics and multimedia content with Adobe Creative Suite, Canva, and DaVinci Resolve.",
      "Executed SEO, site audits, keyword strategies, and Google Ads campaigns to boost online engagement.",
    ],
    technologies: [
      "Adobe Creative Suite",
      "Canva",
      "DaVinci Resolve",
      "SEO Strategy",
      "Google Ads",
      "Site Audits",
      "Keyword Strategies",
    ],
    image: "/projects/digital_marketing.jpg",
    category: "GRAPHIC & DIGITAL",
    nodeX: 1120,
    nodeY: 388,
    cardLeftPct: 67,
    cardTopPct: 50,
    revealThreshold: 0.8,
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const upperPathRef = useRef<SVGPathElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pathLength, setPathLength] = useState(900);
  const [activeCoords, setActiveCoords] = useState({ x: 300, y: 175 });
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  // Exact trajectory curve path sweeping from upper-left into the chronometer arc
  const upperCurveD = "M 270 160 C 480 230, 750 350, 1140 388";

  // Measure path length once mounted
  useEffect(() => {
    if (upperPathRef.current) {
      const len = upperPathRef.current.getTotalLength();
      setPathLength(len);
    }
  }, []);

  // Realistic luxury chronometer clock geometry
  const clockData = useMemo(() => {
    const cx = 990;
    const cy = 145;
    const rOuter = 275;
    const rInner = 258;
    const ticks = [];
    const labels = [];

    // Ticks and degree marks along the chronometer arc
    // deg is measured from straight down (6 o'clock = 0 deg)
    for (let deg = -80; deg <= 80; deg += 2.5) {
      const isMajor = Math.abs(deg) % 15 === 0;
      const isMid = Math.abs(deg) % 5 === 0;
      const rad = (deg * Math.PI) / 180;
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);

      const r1 = isMajor ? rInner - 6 : isMid ? rInner - 2 : rInner;
      const r2 = rOuter;

      ticks.push({
        x1: cx + sin * r1,
        y1: cy + cos * r1,
        x2: cx + sin * r2,
        y2: cy + cos * r2,
        isMajor,
        isMid,
        deg,
      });

      if (isMajor && deg >= -75 && deg <= 75) {
        const lx = cx + sin * (rOuter + 14);
        const ly = cy + cos * (rOuter + 14);
        const val = Math.abs(Math.round(deg));
        labels.push({ x: lx, y: ly, text: `${val.toString().padStart(2, "0")}°` });
      }
    }

    // Arc path strings from deg = -82 to +82 along the bottom
    const radStart = (-82 * Math.PI) / 180;
    const radEnd = (82 * Math.PI) / 180;
    const x1Outer = cx + Math.sin(radStart) * rOuter;
    const y1Outer = cy + Math.cos(radStart) * rOuter;
    const x2Outer = cx + Math.sin(radEnd) * rOuter;
    const y2Outer = cy + Math.cos(radEnd) * rOuter;
    const outerArcD = `M ${x1Outer.toFixed(1)} ${y1Outer.toFixed(1)} A ${rOuter} ${rOuter} 0 0 0 ${x2Outer.toFixed(1)} ${y2Outer.toFixed(1)}`;

    const x1Inner = cx + Math.sin(radStart) * rInner;
    const y1Inner = cy + Math.cos(radStart) * rInner;
    const x2Inner = cx + Math.sin(radEnd) * rInner;
    const y2Inner = cy + Math.cos(radEnd) * rInner;
    const innerArcD = `M ${x1Inner.toFixed(1)} ${y1Inner.toFixed(1)} A ${rInner} ${rInner} 0 0 0 ${x2Inner.toFixed(1)} ${y2Inner.toFixed(1)}`;

    // Left fixed reference hand at -34 deg
    const leftArmAngleRad = (-34 * Math.PI) / 180;
    const leftArmX = cx + Math.sin(leftArmAngleRad) * rOuter;
    const leftArmY = cy + Math.cos(leftArmAngleRad) * rOuter;
    const diamondX = cx + 0.62 * (leftArmX - cx);
    const diamondY = cy + 0.62 * (leftArmY - cy);

    return {
      cx,
      cy,
      rOuter,
      rInner,
      ticks,
      labels,
      outerArcD,
      innerArcD,
      leftArmX,
      leftArmY,
      diamondX,
      diamondY,
    };
  }, []);

  // Apex pivot point of the astronomical clock dial (centered at cx, cy)
  const apexPoint = useMemo(() => ({ x: clockData.cx, y: clockData.cy }), [clockData]);

  // Dynamic clockwise needle tracking the active milestone
  const needleTip = useMemo(() => {
    // Rotates clockwise from -34° (down-left) to +28.5° (down-right at 2026 milestone)
    const startAngle = -34;
    const endAngle = 28.5;
    const currentAngleDeg = startAngle + scrollProgress * (endAngle - startAngle);
    const rad = (currentAngleDeg * Math.PI) / 180;

    return {
      x: clockData.cx + Math.sin(rad) * clockData.rOuter,
      y: clockData.cy + Math.cos(rad) * clockData.rOuter,
      angleDeg: currentAngleDeg,
    };
  }, [scrollProgress, clockData]);

  // Pinned scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Progress from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      setScrollProgress(progress);

      // Determine active index
      const count = EXPERIENCES.length;
      const idx = Math.min(count - 1, Math.floor(progress * count));
      setActiveIndex(idx);

      // Track light position on curve
      if (upperPathRef.current) {
        const len = upperPathRef.current.getTotalLength();
        const pt = upperPathRef.current.getPointAtLength(progress * len);
        setActiveCoords({ x: pt.x, y: pt.y });
      } else {
        const exp = EXPERIENCES[idx];
        setActiveCoords({ x: exp.nodeX, y: exp.nodeY });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to chapter
  const scrollToChapter = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    const targetScroll =
      window.scrollY +
      rect.top +
      (index / (EXPERIENCES.length - 1)) * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const currentExp = EXPERIENCES[activeIndex];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-[#050608] text-[#f3f4f6]"
    >
      {/* ════════════════════════════════════════════════════════════════
          DESKTOP & TABLET: THE CINEMATIC "JOURNEY THROUGH TIME" (md+)
      ════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block relative" style={{ height: "420vh" }}>
        {/* Sticky 100vh Full Viewport Stage */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#050608] flex flex-col justify-between p-6 lg:p-10 select-none">
          
          {/* Ambient Warm Golden Lighting & Vignette */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Focal golden aura moving with active coordinate */}
            <div
              className="absolute w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-700 pointer-events-none"
              style={{
                top: `${currentExp.cardTopPct - 15}%`,
                left: `${currentExp.cardLeftPct - 10}%`,
                background:
                  "radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.06) 45%, rgba(5, 6, 8, 0) 75%)",
              }}
            />

            {/* Film grain texture */}
            <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />

            {/* Dark vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />
          </div>

          {/* ── LEFT EDITORIAL TITLE: "A JOURNEY THROUGH TIME" ── */}
          <div className="absolute top-8 left-8 lg:top-12 lg:left-14 z-30 pointer-events-auto">
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-amber-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#f59e0b]" />
              MY EXPERIENCE
            </div>

            <h2 className="font-heading text-xl lg:text-2xl xl:text-3xl font-black uppercase text-white tracking-[0.2em] leading-[1.2]">
              A<br />
              JOURNEY<br />
              THROUGH<br />
              TIME
            </h2>

            <div className="mt-5 space-y-1 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
              <div>IDEAS</div>
              <div>EXPERIENCES</div>
              <div>PEOPLE</div>
              <div>PROJECTS</div>
              <div className="pt-2 text-amber-500/70 font-bold">— 02</div>
            </div>
          </div>

          {/* ── MAIN ASTRONOMICAL SVG STAGE (1440 x 850) ── */}
          <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <svg
              viewBox="0 0 1440 850"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Golden Beam Gradient */}
                <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </linearGradient>

                {/* Trajectory Gradient */}
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#fef08a" stopOpacity="1" />
                </linearGradient>

                {/* Intense Golden Glow */}
                <filter id="goldGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="5" result="blur1" />
                  <feGaussianBlur stdDeviation="12" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── 1. REALISTIC LUXURY CHRONOMETER CLOCK BEZEL & GRADUATIONS ── */}
              <g opacity="0.65" className="transition-opacity duration-700">
                {/* Subtle full reference track */}
                <circle
                  cx={clockData.cx}
                  cy={clockData.cy}
                  r={clockData.rOuter}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  opacity="0.15"
                  strokeDasharray="4 6"
                />

                {/* Primary Outer Bezel Arc */}
                <path
                  d={clockData.outerArcD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  opacity="0.85"
                  filter="url(#goldGlowFilter)"
                />
                <path
                  d={clockData.outerArcD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  opacity="0.9"
                />

                {/* Inner Bezel Arc */}
                <path
                  d={clockData.innerArcD}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.2"
                  opacity="0.6"
                />

                {/* Precision Bezel Graduations & Ticks */}
                {clockData.ticks.map((t, idx) => (
                  <line
                    key={idx}
                    x1={t.x1}
                    y1={t.y1}
                    x2={t.x2}
                    y2={t.y2}
                    stroke={t.isMajor ? "#fef08a" : t.isMid ? "#fbbf24" : "#f59e0b"}
                    strokeWidth={t.isMajor ? 1.6 : t.isMid ? 1.1 : 0.75}
                    opacity={t.isMajor ? 0.95 : t.isMid ? 0.7 : 0.4}
                  />
                ))}

                {/* Bezel Degree Markings */}
                {clockData.labels.map((l, idx) => (
                  <text
                    key={idx}
                    x={l.x}
                    y={l.y}
                    fill="rgba(251, 191, 36, 0.75)"
                    fontSize="7.5"
                    fontFamily="monospace"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {l.text}
                  </text>
                ))}
              </g>

              {/* ── 2. CELESTIAL APEX PIVOT & REALISTIC CHRONO NEEDLES ── */}
              <g>
                {/* Left Reference Hand with Diamond Breguet Marker */}
                <line
                  x1={apexPoint.x}
                  y1={apexPoint.y}
                  x2={clockData.leftArmX}
                  y2={clockData.leftArmY}
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  filter="url(#goldGlowFilter)"
                  opacity="0.6"
                />
                <line
                  x1={apexPoint.x}
                  y1={apexPoint.y}
                  x2={clockData.leftArmX}
                  y2={clockData.leftArmY}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* Diamond Marker on Left Needle */}
                <polygon
                  points={`${clockData.diamondX},${clockData.diamondY - 7} ${clockData.diamondX + 6},${clockData.diamondY} ${clockData.diamondX},${clockData.diamondY + 7} ${clockData.diamondX - 6},${clockData.diamondY}`}
                  fill="#fef08a"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  filter="url(#goldGlowFilter)"
                />

                {/* Right Dynamic Laser Needle - Smooth Clockwise Chrono Sweep */}
                <line
                  x1={apexPoint.x}
                  y1={apexPoint.y}
                  x2={needleTip.x}
                  y2={needleTip.y}
                  stroke="url(#laserBeamGrad)"
                  strokeWidth="2.8"
                  filter="url(#goldGlowFilter)"
                  className="transition-all duration-75 ease-out"
                />
                <line
                  x1={apexPoint.x}
                  y1={apexPoint.y}
                  x2={needleTip.x}
                  y2={needleTip.y}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.95"
                  className="transition-all duration-75 ease-out"
                />

                {/* Dynamic Needle Tip Radiant Sparkle / Flare */}
                <circle
                  cx={needleTip.x}
                  cy={needleTip.y}
                  r="5.5"
                  fill="#fef08a"
                  filter="url(#goldGlowFilter)"
                />
                <circle
                  cx={needleTip.x}
                  cy={needleTip.y}
                  r="2.8"
                  fill="#ffffff"
                />
                <circle
                  cx={needleTip.x}
                  cy={needleTip.y}
                  r="10"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-ping"
                />

                {/* Apex Jewel Bearing Pivot */}
                <circle
                  cx={apexPoint.x}
                  cy={apexPoint.y}
                  r="13"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle
                  cx={apexPoint.x}
                  cy={apexPoint.y}
                  r="8.5"
                  fill="#0c0d14"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                />
                <circle
                  cx={apexPoint.x}
                  cy={apexPoint.y}
                  r="5"
                  fill="#fbbf24"
                  filter="url(#goldGlowFilter)"
                />
                <circle
                  cx={apexPoint.x}
                  cy={apexPoint.y}
                  r="2.2"
                  fill="#ffffff"
                />
              </g>

              {/* ── 3. SLEEK ORBITAL TIMELINE TRAJECTORY (SINGLE GLOWING PATH) ── */}
              {/* Invisible reference path for length measurement */}
              <path
                ref={upperPathRef}
                d={upperCurveD}
                fill="none"
                stroke="transparent"
                strokeWidth="1"
              />

              {/* Faint Base Reference Curve */}
              <path
                d={upperCurveD}
                fill="none"
                stroke="rgba(245, 158, 11, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />

              {/* Luminous Golden Glow Stroke (Progress Drawn) */}
              <path
                d={upperCurveD}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                filter="url(#goldGlowFilter)"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - scrollProgress)}
                strokeLinecap="round"
                opacity="0.8"
                className="transition-all duration-150 ease-out"
              />

              {/* Core Golden Trajectory Beam */}
              <path
                d={upperCurveD}
                fill="none"
                stroke="url(#orbitGrad)"
                strokeWidth="2"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - scrollProgress)}
                strokeLinecap="round"
                className="transition-all duration-150 ease-out"
              />

              {/* ── 5. STATIC YEAR STOPS & GLOWING NODES ALONG LADDER ── */}
              {EXPERIENCES.map((exp, idx) => {
                const isPassed = scrollProgress >= exp.revealThreshold;
                const isActive = idx === activeIndex;

                return (
                  <g
                    key={exp.id}
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => {
                      scrollToChapter(idx);
                      setSelectedExp(exp);
                    }}
                    opacity={isPassed ? 1 : 0.25}
                  >
                    {/* Active Node Pulsing Ring */}
                    {isActive && (
                      <circle
                        cx={exp.nodeX}
                        cy={exp.nodeY}
                        r="14"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{
                          transformOrigin: `${exp.nodeX}px ${exp.nodeY}px`,
                          animationDuration: "8s",
                        }}
                      />
                    )}

                    {/* Node Pearl Dot */}
                    <circle
                      cx={exp.nodeX}
                      cy={exp.nodeY}
                      r={isActive ? 7 : 4}
                      fill={isActive ? "#fbbf24" : isPassed ? "#f59e0b" : "#4b5563"}
                      filter={isActive ? "url(#goldGlowFilter)" : undefined}
                      className="transition-all duration-300"
                    />

                    <circle
                      cx={exp.nodeX}
                      cy={exp.nodeY}
                      r={isActive ? 3 : 1.5}
                      fill="#ffffff"
                    />

                    {/* YEAR LABEL DIRECTLY ABOVE THE LADDER */}
                    <text
                      x={exp.nodeX}
                      y={exp.nodeY - (isActive ? 16 : 12)}
                      fill={isActive ? "#fef08a" : isPassed ? "#fde68a" : "#71717a"}
                      fontSize={isActive ? "17" : "13"}
                      fontWeight={isActive ? "900" : "700"}
                      fontFamily="var(--font-heading), sans-serif"
                      letterSpacing="1"
                      textAnchor="middle"
                      filter={isActive ? "url(#goldGlowFilter)" : undefined}
                      className="transition-all duration-300 select-none"
                    >
                      {exp.yearDisplay}
                    </text>
                  </g>
                );
              })}

              {/* ── 6. TRAVELING LIGHT BEAD / SOLAR FLARE AT HEAD ── */}
              <g
                transform={`translate(${activeCoords.x}, ${activeCoords.y})`}
                className="transition-transform duration-100 ease-out"
              >
                {/* Multi-Point Radiant Flare */}
                <line x1="-18" y1="0" x2="18" y2="0" stroke="#ffffff" strokeWidth="1.5" opacity="0.95" />
                <line x1="0" y1="-18" x2="0" y2="18" stroke="#ffffff" strokeWidth="1.5" opacity="0.95" />
                <line x1="-10" y1="-10" x2="10" y2="10" stroke="#fde047" strokeWidth="1" opacity="0.75" />
                <line x1="-10" y1="10" x2="10" y2="-10" stroke="#fde047" strokeWidth="1" opacity="0.75" />

                {/* Core White Sparkle */}
                <circle cx="0" cy="0" r="4.5" fill="#ffffff" filter="url(#goldGlowFilter)" />
              </g>
            </svg>
          </div>

          {/* ── PROGRESSIVELY REVEALED CASCADING CARDS ── */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {EXPERIENCES.map((exp, idx) => {
              const isRevealed = scrollProgress >= exp.revealThreshold;
              const isActive = idx === activeIndex;

              return (
                <div
                  key={exp.id}
                  data-cursor-expand
                  onClick={() => {
                    if (isRevealed) {
                      scrollToChapter(idx);
                      setSelectedExp(exp);
                    }
                  }}
                  className={`absolute transition-all duration-500 ease-out group ${
                    isRevealed ? "pointer-events-auto cursor-pointer" : "pointer-events-none"
                  } ${
                    isActive
                      ? "z-30"
                      : "z-15 hover:opacity-100"
                  }`}
                  style={{
                    left: `${exp.cardLeftPct}%`,
                    top: `${exp.cardTopPct}%`,
                    opacity: isRevealed ? (isActive ? 1 : 0.75) : 0,
                    transform: isRevealed
                      ? `scale(${isActive ? 1.05 : 0.94}) translateY(0px)`
                      : "scale(0.85) translateY(25px)",
                  }}
                  title="Click to view full dossier"
                >
                  {/* Card Container */}
                  <div
                    className={`w-[195px] lg:w-[220px] xl:w-[245px] rounded-[3px] overflow-hidden border backdrop-blur-md transition-all duration-500 ${
                      isActive
                        ? "bg-[#0b0c11] border-2 border-amber-500 shadow-[0_0_35px_rgba(245,158,11,0.45)] ring-1 ring-amber-400/50"
                        : "bg-[#07080c] border border-white/10 group-hover:border-amber-400/40 shadow-[0_10px_25px_rgba(0,0,0,0.85)]"
                    }`}
                  >
                    {/* Cinematic Media Window */}
                    <div className="relative w-full h-[125px] lg:h-[145px] xl:h-[160px] overflow-hidden bg-black">
                      <Image
                        src={exp.image}
                        alt={exp.role}
                        fill
                        sizes="245px"
                        className={`object-cover transition-transform duration-700 ${
                          isActive ? "scale-105 brightness-105" : "scale-100 brightness-80 group-hover:scale-105"
                        }`}
                        priority={idx <= 1}
                      />

                      {/* Film Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c11] via-transparent to-black/30 pointer-events-none" />

                      {/* Category Tag */}
                      <div className="absolute top-2 left-2 z-10">
                        <span
                          className={`px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider font-bold rounded-[1px] border ${
                            isActive
                              ? "bg-amber-500 text-black border-amber-300 font-black"
                              : "bg-black/75 text-zinc-300 border-white/15"
                          }`}
                        >
                          {exp.category}
                        </span>
                      </div>

                      {/* Current Role Indicator */}
                      {exp.isCurrent && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-widest font-black rounded-[1px] bg-[#e11d48] text-white animate-pulse">
                            CURRENT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Compact Typography Base */}
                    <div className="p-3 bg-[#0a0b10] border-t border-white/[0.06]">
                      <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold mb-1">
                        <span>{exp.yearDisplay}</span>
                        <span className="text-[9px] text-zinc-400 font-normal">{exp.period}</span>
                      </div>

                      <h3 className="font-heading text-xs lg:text-[13px] font-bold uppercase text-white tracking-tight line-clamp-1">
                        {exp.shortRole}
                      </h3>

                      <div className="mt-0.5 font-mono text-[9px] text-zinc-400 uppercase tracking-wider truncate">
                        {exp.shortCompany}
                      </div>

                      <div className="mt-2 flex items-center justify-between font-mono text-[8.5px] text-zinc-500 pt-1.5 border-t border-white/[0.05]">
                        <span>{exp.location}</span>
                        <span className="text-amber-400/90 group-hover:text-amber-300 flex items-center gap-0.5 font-bold transition-colors">
                          DOSSIER <ChevronRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM HUD NAVIGATION & CHRONOMETER BAR ── */}
          <div className="relative z-30 flex items-center justify-between border-t border-white/10 pt-3 pointer-events-auto mt-auto">
            {/* Year Selector Pills */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-[0.2em] font-bold">
                TIMELINE:
              </span>
              <div className="flex items-center gap-1">
                {EXPERIENCES.map((exp, idx) => (
                  <button
                    key={exp.id}
                    data-cursor-expand
                    onClick={() => {
                      scrollToChapter(idx);
                      setSelectedExp(exp);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded-[2px] transition-all flex items-center gap-1 ${
                      idx === activeIndex
                        ? "bg-amber-500 text-black font-black shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                        : idx < activeIndex
                        ? "bg-white/[0.06] text-amber-300 hover:bg-white/10"
                        : "bg-white/[0.03] text-zinc-500 hover:text-white"
                    }`}
                  >
                    <span>{exp.yearDisplay}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "14s" }} />
              <span>SCROLL TO ADVANCE TIME // CLICK CARD FOR DOSSIER</span>
              <ChevronRight className="w-3 h-3 text-amber-400 animate-pulse" />
            </div>

            {/* Linear Progress Gauge */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-amber-400 font-bold">
                {Math.round(scrollProgress * 100)}%
              </span>
              <div className="w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-300 rounded-full transition-all duration-100"
                  style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL POPUP FOR FULL RESUME DOSSIER (OPENS ON CARD CLICK) ── */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-200 animate-in fade-in"
          onClick={() => setSelectedExp(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0b0c13] border border-amber-500/40 rounded-[3px] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.15)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Media Strip */}
            <div className="relative w-full h-[140px] sm:h-[180px] bg-black">
              <Image
                src={selectedExp.image}
                alt={selectedExp.role}
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c13] via-[#0b0c13]/50 to-transparent" />

              {/* Close Button */}
              <button
                data-cursor-expand
                onClick={() => setSelectedExp(null)}
                className="absolute top-3 right-3 z-20 flex items-center gap-1 text-zinc-300 hover:text-white bg-black/70 hover:bg-black/90 border border-white/15 px-2.5 py-1 text-xs font-mono rounded-[2px] transition-all"
              >
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Header inside cover */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 bg-amber-500 text-black font-mono text-[9px] uppercase font-black tracking-wider rounded-[1px]">
                    {selectedExp.yearDisplay} // {selectedExp.category}
                  </span>
                  {selectedExp.isCurrent && (
                    <span className="px-2 py-0.5 bg-[#e11d48] text-white font-mono text-[9px] uppercase font-bold tracking-widest rounded-[1px]">
                      CURRENT ROLE
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                  {selectedExp.role}
                </h3>
              </div>
            </div>

            {/* Modal Body Dossier */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Meta: Company, Period, Location */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08] text-xs font-mono">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-zinc-100">{selectedExp.company}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{selectedExp.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{selectedExp.location}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-1.5 font-bold">
                  ROLE OVERVIEW
                </span>
                <p className="font-body text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light">
                  {selectedExp.summary}
                </p>
              </div>

              {/* Key Contributions & Responsibilities */}
              <div>
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-2 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  CORE RESPONSIBILITIES &amp; CONTRIBUTIONS
                </span>
                <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-200 font-light">
                  {selectedExp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional Research Project */}
              {selectedExp.project && (
                <div className="p-3 bg-black/50 border border-white/10 rounded-[2px] text-xs font-mono">
                  <span className="text-amber-500 uppercase text-[9px] font-bold block mb-1">
                    RESEARCH &amp; PROJECT STUDY:
                  </span>
                  <span className="text-zinc-200">{selectedExp.project}</span>
                </div>
              )}

              {/* Tools & Technologies */}
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">
                  TECHNOLOGIES &amp; TOOLSET
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedExp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-black/70 border border-white/10 text-[10px] font-mono text-zinc-300 rounded-[2px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════
          MOBILE VIEWPORT (<md)
      ════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden py-14 px-5 relative overflow-hidden bg-[#050608]">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-amber-500/10 pointer-events-none" />

        {/* Mobile Header */}
        <div className="mb-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-amber-400 font-bold mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            MY EXPERIENCE
          </div>

          <h2 className="font-heading text-2xl font-black uppercase text-white tracking-[0.15em] leading-tight">
            A JOURNEY<br />THROUGH TIME
          </h2>

          <p className="mt-1 font-mono text-[10px] text-zinc-500">
            CHRONOLOGICAL TRAJECTORY // 2022 — PRESENT
          </p>
        </div>

        {/* Mobile Arc */}
        <div className="relative w-full h-[100px] mb-6 bg-[#08090f] border border-white/10 rounded-[2px] p-2 flex flex-col justify-center overflow-hidden">
          <svg viewBox="0 0 380 80" className="w-full h-full overflow-visible">
            <path
              d="M 15 65 Q 190 15 365 60"
              fill="none"
              stroke="rgba(245, 158, 11, 0.2)"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            <path
              d="M 15 65 Q 190 15 365 60"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="380"
              strokeDashoffset={380 * (1 - (activeIndex + 1) / EXPERIENCES.length)}
              className="transition-all duration-300"
            />

            {EXPERIENCES.map((exp, idx) => {
              const t = idx / (EXPERIENCES.length - 1);
              const px = (1 - t) * (1 - t) * 15 + 2 * (1 - t) * t * 190 + t * t * 365;
              const py = (1 - t) * (1 - t) * 65 + 2 * (1 - t) * t * 15 + t * t * 60;
              const isActive = idx === activeIndex;

              return (
                <g
                  key={exp.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    setSelectedExp(exp);
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    cx={px}
                    cy={py}
                    r={isActive ? 5.5 : 3}
                    fill={isActive ? "#fbbf24" : idx <= activeIndex ? "#f59e0b" : "#4b5563"}
                  />
                  <text
                    x={px}
                    y={py - 10}
                    fill={isActive ? "#fbbf24" : "#9ca3af"}
                    fontSize={isActive ? "10" : "8"}
                    fontWeight={isActive ? "bold" : "normal"}
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {exp.yearDisplay}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile Card */}
        <div
          onClick={() => setSelectedExp(currentExp)}
          className="relative bg-[#090a10] border border-amber-500/50 rounded-[2px] overflow-hidden shadow-2xl cursor-pointer"
        >
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={currentExp.image}
              alt={currentExp.role}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-black/30" />
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 bg-amber-500 text-black font-mono text-[8.5px] uppercase font-bold">
                {currentExp.category}
              </span>
            </div>
            {currentExp.isCurrent && (
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 bg-[#e11d48] text-white font-mono text-[8px] uppercase font-black animate-pulse">
                  CURRENT
                </span>
              </div>
            )}
            <div className="absolute bottom-2 right-3 font-heading text-3xl font-black text-white/20 select-none">
              {currentExp.yearDisplay}
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span className="text-amber-400 font-bold">{currentExp.period}</span>
              <span>{currentExp.location}</span>
            </div>

            <h3 className="font-heading text-base font-bold text-white uppercase tracking-tight">
              {currentExp.role}
            </h3>

            <div className="text-xs font-medium text-amber-400/90 mb-2.5">
              {currentExp.company}
            </div>

            <p className="text-xs font-body text-zinc-300 font-light leading-relaxed mb-3 line-clamp-2">
              {currentExp.summary}
            </p>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-amber-400 font-bold">
              <span>TAP CARD FOR FULL DOSSIER</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((p) => Math.max(0, p - 1));
                }}
                disabled={activeIndex === 0}
                className="px-2.5 py-1 bg-white/5 border border-white/10 disabled:opacity-25 text-xs font-mono text-zinc-300 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> PREV
              </button>

              <span className="font-mono text-xs text-amber-400 font-bold">
                {activeIndex + 1} / {EXPERIENCES.length}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((p) => Math.min(EXPERIENCES.length - 1, p + 1));
                }}
                disabled={activeIndex === EXPERIENCES.length - 1}
                className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 disabled:opacity-25 text-xs font-mono text-amber-300 flex items-center gap-1"
              >
                NEXT <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
