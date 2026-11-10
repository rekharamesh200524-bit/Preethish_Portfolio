"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Building2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Ship,
  Users,
  Compass,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   RIGOROUS ACADEMIC CHRONOLOGY DATA (2019 — 2024)
──────────────────────────────────────────────────────────────── */
interface EducationMilestone {
  id: string;
  yearDisplay: string;
  yearNumber: number;
  period: string;
  category: "DEGREE" | "RESEARCH" | "CERTIFICATION";
  categoryBadge: string;
  title: string;
  institution: string;
  location: string;
  cgpa?: string;
  cgpaPercentage: number;
  scoreLabel: string;
  summary: string;
  keyHighlights: string[];
  skills: string[];
  image: string;
  field: string;
}

const MILESTONES: EducationMilestone[] = [
  {
    id: "bsc-viscom",
    yearDisplay: "2019 — 2022",
    yearNumber: 2019,
    period: "06/2019 to 04/2022",
    category: "DEGREE",
    categoryBadge: "UNDERGRADUATE DEGREE",
    title: "Bachelor of Science in Visual Communication (B.Sc)",
    institution: "Guru Nanak College (Autonomous), Chennai",
    location: "Affiliated with University of Madras",
    cgpa: "7.60 CGPA",
    cgpaPercentage: 76,
    scoreLabel: "FIRST CLASS DISTINCTION",
    summary:
      "Comprehensive 3-year foundational program mastering visual grammar, cinematography, lighting geometry, non-linear video editing, and vector layout design.",
    keyHighlights: [
      "Extensive studio and on-location cinematography, camera framing, and lighting aesthetics.",
      "Non-linear post-production editing pipelines, timecode conforming, and pacing.",
      "Vector typography hierarchy, branding systems, and visual media communication.",
    ],
    skills: ["Cinematography", "Video Editing", "Visual Hierarchy", "Typography", "Media Sociology"],
    image: "/projects/brand_design.jpg",
    field: "VISUAL COMMUNICATION",
  },
  {
    id: "video-edit-cert",
    yearDisplay: "2021",
    yearNumber: 2021,
    period: "Certified 2021",
    category: "CERTIFICATION",
    categoryBadge: "TECHNICAL SPECIALIZATION",
    title: "Professional Non-Linear Video Editing Course",
    institution: "Certified Post-Production Specialist",
    location: "Chennai, India",
    cgpa: "SPECIALIST",
    cgpaPercentage: 94,
    scoreLabel: "FRAME-ACCURATE MASTERY",
    summary:
      "Professional certification in non-linear editing workflows, multi-camera synchronization, DaVinci Resolve color grading (Rec.709/Log), and broadcast exports.",
    keyHighlights: [
      "Narrative rhythm cutting, seamless audio cross-fades, and pacing.",
      "DaVinci Resolve color grading with primary balance wheels and curves.",
      "Broadcast ProRes 422 delivery specifications and audio sync.",
    ],
    skills: ["DaVinci Resolve", "Premiere Pro CC", "Color Grading", "Audio Conforming", "Multicam Sync"],
    image: "/projects/film_edit.jpg",
    field: "FILM POST-PRODUCTION",
  },
  {
    id: "mba-degree",
    yearDisplay: "2022 — 2024",
    yearNumber: 2022,
    period: "07/2022 to 04/2024",
    category: "DEGREE",
    categoryBadge: "POSTGRADUATE DEGREE",
    title: "Master of Business Administration (MBA)",
    institution: "Sathyabama Institute of Science and Technology",
    location: "Deemed to be University, Chennai",
    cgpa: "8.00 CGPA",
    cgpaPercentage: 80,
    scoreLabel: "FIRST CLASS WITH DISTINCTION",
    summary:
      "Two-year postgraduate business degree specializing in operational strategies, brand management, consumer behavioral analytics, and corporate execution.",
    keyHighlights: [
      "Bridging creative direction with quantifiable commercial ROI and marketing funnels.",
      "Operations optimization, supply bottleneck analysis, and resource planning.",
      "Consumer analytics, organizational leadership, and executive decision-making.",
    ],
    skills: ["Operations Strategy", "Brand Leadership", "Consumer Analytics", "Strategic Marketing", "Process Optimization"],
    image: "/projects/crm_sales_operations.jpg",
    field: "OPERATIONS & STRATEGY",
  },
  {
    id: "research-dpworld",
    yearDisplay: "2023",
    yearNumber: 2023,
    period: "Academic Year 2023",
    category: "RESEARCH",
    categoryBadge: "OPERATIONS RESEARCH STUDY",
    title: "Operations Implementation & Effectiveness at DP World",
    institution: "Academic Research Project // DP World Container Terminal",
    location: "Chennai Port Container Terminal",
    cgpa: "EMPIRICAL STUDY",
    cgpaPercentage: 92,
    scoreLabel: "MARITIME LOGISTICS AUDIT",
    summary:
      "In-depth empirical research analyzing maritime terminal workflows, vessel risk management, container throughput optimization, and operational efficiency.",
    keyHighlights: [
      "Mapped container handling workflows and vessel turnaround timeframes.",
      "Analyzed vessel risk management and documentation protocols.",
      "Synthesized operational throughput improvements for port logistics.",
    ],
    skills: ["Maritime Logistics", "Terminal Workflows", "Vessel Risk Control", "Empirical Research", "Throughput Modeling"],
    image: "/projects/maritime_cinematography.jpg",
    field: "PORT OPERATIONS & LOGISTICS",
  },
  {
    id: "research-hr",
    yearDisplay: "2024",
    yearNumber: 2024,
    period: "Academic Year 2024",
    category: "RESEARCH",
    categoryBadge: "CAPSTONE DISSERTATION",
    title: "HR Practices & Job Satisfaction Dynamics in IT Sector",
    institution: "MBA Postgraduate Research Dissertation",
    location: "Chennai IT Corridors & Tech Parks",
    cgpa: "PUBLISHED THESIS",
    cgpaPercentage: 90,
    scoreLabel: "ORGANIZATIONAL STUDY",
    summary:
      "Quantitative and qualitative study evaluating human resource retention models, motivation metrics, compensation benchmarks, and employee job satisfaction in IT corporations.",
    keyHighlights: [
      "Conducted structured employee surveying across Chennai IT corporate hubs.",
      "Evaluated hybrid workplace policies on attrition and satisfaction indices.",
      "Delivered strategic engagement frameworks for executive management.",
    ],
    skills: ["Quantitative Surveying", "HR Frameworks", "Attrition Modeling", "Data Synthesis", "Corporate Strategy"],
    image: "/projects/digital_marketing.jpg",
    field: "ORGANIZATIONAL BEHAVIOR",
  },
  {
    id: "cert-infosys",
    yearDisplay: "2024",
    yearNumber: 2024,
    period: "Certified 2024",
    category: "CERTIFICATION",
    categoryBadge: "ENTERPRISE ACCREDITATION",
    title: "Business Communication & Corporate Diplomacy",
    institution: "Infosys Springboard Accredited",
    location: "Corporate Enterprise Certification",
    cgpa: "CERTIFIED",
    cgpaPercentage: 98,
    scoreLabel: "ENTERPRISE DIPLOMACY",
    summary:
      "Accredited enterprise credential emphasizing executive stakeholder presentations, cross-functional diplomacy, corporate negotiations, and business reporting.",
    keyHighlights: [
      "Executive summary presentation to senior enterprise leadership.",
      "Cross-functional stakeholder negotiation and client communications.",
      "Structured business writing, proposal articulation, and documentation.",
    ],
    skills: ["Executive Presentation", "Corporate Diplomacy", "Stakeholder Negotiation", "Business Reporting"],
    image: "/projects/brand_design.jpg",
    field: "ENTERPRISE COMMUNICATIONS",
  },
];

/* ────────────────────────────────────────────────────────────────
   ANIMATED CIRCULAR CGPA / DISTINCTION GAUGE
──────────────────────────────────────────────────────────────── */
function CircularScoreGauge({
  percentage,
  valueText,
  labelText,
}: {
  percentage: number;
  valueText: string;
  labelText: string;
}) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-lg">
      <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#e11d48"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute font-mono text-[9px] font-bold text-white">
          {percentage}%
        </span>
      </div>

      <div>
        <div className="font-heading text-sm font-bold text-white leading-tight">
          {valueText}
        </div>
        <div className="font-mono text-[9px] text-[#e11d48] uppercase tracking-wider font-semibold">
          {labelText}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   SHARED MILESTONE CARD (USED IN BOTH MOBILE & DESKTOP VIEWPORTS)
──────────────────────────────────────────────────────────────── */
function EducationMilestoneCard({
  milestone,
}: {
  milestone: EducationMilestone;
}) {
  return (
    <motion.div
      key={milestone.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full bg-[#0e1015] border border-white/[0.08] rounded-2xl p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl"
    >
      {/* Viewfinder Corner Reticles */}
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-[#e11d48] rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-l-2 border-white/10 rounded-bl-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* LEFT: Project Photography & Dynamic Circular CGPA Gauge */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group shadow-2xl bg-zinc-950">
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Vignette Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Stage Identifier Tag */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 max-w-[calc(100%-1.25rem)] truncate text-[9px] sm:text-[10px] font-mono text-[#e11d48] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-[#e11d48]/40">
              DISCIPLINE: {milestone.field}
            </div>

            {/* Circular Score Gauge Floating on Image */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between">
              <CircularScoreGauge
                percentage={milestone.cgpaPercentage}
                valueText={milestone.cgpa || "FIRST CLASS"}
                labelText={milestone.scoreLabel}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: In-Depth Curriculum & Methodology Rigor */}
        <div className="lg:col-span-7 space-y-4">
          {/* Header Tag & Period */}
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs mb-1.5">
              <span className="px-2.5 py-0.5 rounded bg-[#e11d48]/10 border border-[#e11d48]/30 text-[#e11d48] font-bold">
                {milestone.categoryBadge}
              </span>
              <span className="text-zinc-600">{"//"}</span>
              <span className="text-zinc-400">{milestone.period}</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {milestone.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-1.5 font-mono text-xs text-zinc-300">
              <Building2 className="w-3.5 h-3.5 text-[#e11d48] shrink-0" />
              <span className="font-semibold text-white">{milestone.institution}</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-400 hidden sm:inline">{milestone.location}</span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {milestone.summary}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 pt-3 border-t border-white/[0.08]">
            <div className="font-mono text-[10px] text-[#e11d48] uppercase tracking-wider font-semibold">
              Core Methodologies &amp; Empirical Focus:
            </div>
            {milestone.keyHighlights.map((highlight, hi) => (
              <div key={hi} className="flex items-start gap-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e11d48] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* Skills pills */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.08]">
            {milestone.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN SCROLL-PINNED STEPPER EDUCATION SECTION
──────────────────────────────────────────────────────────────── */
export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStepFraction, setCurrentStepFraction] = useState(0);

  // Scroll listener tracking continuous progress across milestones on desktop viewports
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        // Skip computations if section is completely outside the viewport
        if (rect.bottom < -60 || rect.top > window.innerHeight + 60) return;

        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance <= 0) return;

        // Progress normalized from 0.0 to 1.0
        const rawProgress = -rect.top / scrollableDistance;
        const progress = Math.max(0, Math.min(1, rawProgress));
        setScrollProgress(progress);

        // Map progress with generous, comfortable dwell across the 6 milestones
        const count = MILESTONES.length;
        const rawIndex = progress * count;
        const activeIdx = Math.min(count - 1, Math.floor(rawIndex));
        setCurrentIndex(activeIdx);

        // Fraction within current milestone (0.0 to 1.0)
        const fraction = Math.min(1, Math.max(0, rawIndex - activeIdx));
        setCurrentStepFraction(fraction);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Select a milestone directly on mobile or smooth-scroll to it on desktop
  const scrollToMilestone = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setCurrentIndex(index);
      setScrollProgress(index / Math.max(1, MILESTONES.length - 1));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    // Align with the comfortable center of each milestone interval
    const targetProgress = (index + 0.5) / MILESTONES.length;
    const targetScroll =
      window.scrollY + rect.top + targetProgress * scrollableDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const activeMilestone = MILESTONES[currentIndex];

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative bg-[#07080a] text-white border-t border-white/[0.08] lg:min-h-[500vh] select-none"
    >
      {/* ──────────────────────────────────────────────────────────
          MOBILE & TABLET FLOW LAYOUT (<lg) — NO CLIPPING
      ────────────────────────────────────────────────────────── */}
      <div className="lg:hidden py-20 px-5 sm:px-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse shadow-[0_0_10px_#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e11d48] font-medium">
                05 // Academic Foundations &amp; Research
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-tight uppercase">
              EDUCATION &amp; <span className="text-zinc-500 font-light">RESEARCH TIMELINE</span>
            </h2>
          </div>

          {/* Clickable Mobile Stepper */}
          <div className="bg-[#0e1015]/80 border border-white/[0.08] rounded-xl p-3">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {MILESTONES.map((m, idx) => {
                const isActive = currentIndex === idx;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    className={`py-2 px-2 rounded-lg border font-mono text-xs transition-all flex flex-col items-center justify-center ${
                      isActive
                        ? "bg-[#e11d48] border-white/60 text-white font-bold shadow-[0_0_14px_rgba(225,29,72,0.5)]"
                        : "bg-black/40 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] opacity-80">0{idx + 1}</span>
                    <span className="font-bold">{m.yearNumber}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Unclipped Milestone Card */}
          <AnimatePresence mode="wait">
            <EducationMilestoneCard milestone={activeMilestone} />
          </AnimatePresence>

          {/* Mobile PREV / NEXT Controls */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-zinc-400">
            <button
              type="button"
              onClick={() => scrollToMilestone(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              &larr; PREV
            </button>
            <span className="text-zinc-300 font-bold">
              0{currentIndex + 1} / 0{MILESTONES.length}
            </span>
            <button
              type="button"
              onClick={() => scrollToMilestone(Math.min(MILESTONES.length - 1, currentIndex + 1))}
              disabled={currentIndex === MILESTONES.length - 1}
              className="px-4 py-2 rounded border border-white/10 hover:border-[#e11d48] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              NEXT &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          DESKTOP STICKY FULL-SCREEN TIMELINE VIEWPORT (lg+)
      ────────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-between py-6 sm:py-8">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/[0.07] blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#e11d48]/[0.06] blur-[170px] rounded-full pointer-events-none" />

        {/* Subtle Dot Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full flex-1 flex flex-col justify-between relative z-10">
          {/* 1. COMPACT EDITORIAL HEADER WITH LIVE STEPPER TELEMETRY */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse shadow-[0_0_10px_#e11d48]" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48] font-medium">
                  05 // Academic Foundations &amp; Research
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase">
                EDUCATION &amp; <span className="text-zinc-500 font-light">RESEARCH TIMELINE</span>
              </h2>
            </div>

            {/* Scroll Stepper Live Indicator */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-zinc-400 font-medium">
                  MILESTONE 0{currentIndex + 1} / 0{MILESTONES.length}
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-600 to-[#e11d48] rounded-full transition-all duration-100"
                      style={{ width: `${Math.max(5, currentStepFraction * 100)}%` }}
                    />
                  </div>
                  <span className="text-[#e11d48] text-[10px] font-bold tracking-wider min-w-[28px] text-right">
                    {Math.round(currentStepFraction * 100)}%
                  </span>
                </div>
              </div>

              {/* Scroll guidance badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px]">
                <span>SCROLL PACING</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#e11d48] animate-bounce" />
              </div>
            </div>
          </div>

          {/* 2. THE BIG CHRONO-STEPPER RAIL (TRACKS SCROLL PROGRESS) */}
          <div className="my-3 py-2 bg-[#0e1015]/80 border border-white/[0.08] rounded-2xl px-5 sm:px-8 relative shadow-lg">
            <div className="relative py-3">
              {/* Inactive Base Rail */}
              <div className="absolute top-1/2 -translate-y-1/2 inset-x-2 h-[2px] bg-white/[0.08]" />

              {/* Dynamic Scroll Progress Fill Rail */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-2 h-[2px] bg-gradient-to-r from-[#e11d48] via-rose-500 to-rose-300 shadow-[0_0_12px_#e11d48] transition-all duration-150 ease-out"
                style={{
                  width: `${scrollProgress * 97}%`,
                }}
              />

              {/* 6 Milestone Nodes */}
              <div className="relative flex justify-between items-center">
                {MILESTONES.map((m, idx) => {
                  const isActive = currentIndex === idx;
                  const isPassed = currentIndex >= idx;

                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => scrollToMilestone(idx)}
                      className="group/node relative flex flex-col items-center focus:outline-none cursor-pointer"
                    >
                      {/* Node Circle */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-[#e11d48] border-white text-white shadow-[0_0_18px_#e11d48] scale-110"
                            : isPassed
                            ? "bg-[#07080a] border-[#e11d48] text-[#e11d48]"
                            : "bg-[#07080a] border-white/20 text-zinc-500 group-hover/node:border-white/40"
                        }`}
                      >
                        <span className="font-mono text-xs font-bold">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Year Label */}
                      <div
                        className={`mt-1.5 font-mono text-[10px] sm:text-xs font-bold tracking-wider transition-colors ${
                          isActive
                            ? "text-[#e11d48]"
                            : "text-zinc-500 group-hover/node:text-zinc-300"
                        }`}
                      >
                        {m.yearNumber}
                      </div>

                      {/* Moniker */}
                      <div className="hidden lg:block text-[8px] font-mono text-zinc-600 uppercase tracking-wider">
                        {m.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. BIG CINEMATIC HERO SHOWCASE STAGE (STEPS WITH SCROLL) */}
          <div className="flex-1 my-2 flex items-center">
            <AnimatePresence mode="wait">
              <EducationMilestoneCard milestone={activeMilestone} />
            </AnimatePresence>
          </div>

          {/* 4. FOOTER: PREV / NEXT NAVIGATION & ACADEMIC VERIFICATION */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e11d48]" />
              <span className="text-zinc-300 font-bold hidden sm:inline">DUAL-DISCIPLINE RIGOR:</span>
              <span className="text-zinc-500">
                MBA Operations (8.00 CGPA) &bull; B.Sc VisCom (7.60 CGPA)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollToMilestone(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-3 py-1 rounded border border-white/10 hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                &larr; PREV
              </button>
              <button
                type="button"
                onClick={() => scrollToMilestone(Math.min(MILESTONES.length - 1, currentIndex + 1))}
                disabled={currentIndex === MILESTONES.length - 1}
                className="px-3 py-1 rounded border border-white/10 hover:border-[#e11d48] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                NEXT &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
