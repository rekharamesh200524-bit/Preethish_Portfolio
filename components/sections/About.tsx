"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  Layers,
  Target,
  Film,
  TrendingUp,
  MapPin,
  Languages,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   PILLARS DATA
──────────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    number: "01",
    title: "Brand Identity & Graphic Design",
    desc: "Crafting distinct visual identities, marketing collateral, and digital design systems using Adobe Creative Suite and Canva.",
    icon: Layers,
    kanji: "創",
    tools: ["Photoshop", "Illustrator", "InDesign", "Canva"],
  },
  {
    number: "02",
    title: "Digital Marketing & SEO Strategy",
    desc: "Executing technical site audits, high-intent keyword strategies, and targeted Google Ads campaigns to drive qualified traffic.",
    icon: Target,
    kanji: "索",
    tools: ["Google Ads", "Meta Ads", "SEMrush", "Analytics"],
  },
  {
    number: "03",
    title: "Post-Production & Video Editing",
    desc: "Translating raw footage into compelling narrative edits with DaVinci Resolve, Adobe Premiere Pro CC, and Final Cut Pro X.",
    icon: Film,
    kanji: "映",
    tools: ["DaVinci Resolve", "Premiere Pro", "Final Cut Pro X"],
  },
  {
    number: "04",
    title: "Engagement & Brand Growth",
    desc: "Bridging the gap between creative visual storytelling and measurable business growth through social media strategy.",
    icon: TrendingUp,
    kanji: "展",
    tools: ["Content Strategy", "Audience Insights", "Brand Systems"],
  },
];

/* ────────────────────────────────────────────────────────────────
   COMPETENCY MATRIX DATA
──────────────────────────────────────────────────────────────── */
const COMPETENCIES = [
  {
    name: "Social Media Strategy",
    tag: "Expert // Strategy",
    percentage: 95,
  },
  {
    name: "Search Engine Optimization",
    tag: "Audits & Keywords",
    percentage: 90,
  },
  {
    name: "Video Post-Production",
    tag: "Cuts, Timing & Grade",
    percentage: 94,
  },
  {
    name: "Brand Identity Creation",
    tag: "Collateral & Systems",
    percentage: 96,
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/[0.08] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-[#e11d48]/[0.06] blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle background hairline grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48] font-medium">
                01 // Philosophy & Background
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              ABOUT <span className="text-zinc-500 font-light">PREETHISH</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider leading-relaxed">
            BASED IN CHENNAI, TAMIL NADU // COMBINING AESTHETIC REFINEMENT WITH DATA-DRIVEN DIGITAL STRATEGY
          </div>
        </motion.div>

        {/* ──────────────────────────────────────────────────────────
            EDITORIAL NARRATIVE GRID (STATEMENT + MATRIX)
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Main Statement Quote & Background (Col 1-7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-7 space-y-8"
          >
            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal leading-snug tracking-tight text-zinc-100">
              Innovative{" "}
              <span className="text-white font-bold underline decoration-[#e11d48] decoration-2 underline-offset-8">
                Graphic Designer
              </span>{" "}
              and{" "}
              <span className="text-white font-bold underline decoration-[#e11d48] decoration-2 underline-offset-8">
                Digital Marketing
              </span>{" "}
              professional passionate about creating engaging content and driving measurable brand growth.
            </h3>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-light">
              Grounded in academic fundamentals from a{" "}
              <span className="text-zinc-200 font-medium">B.Sc. in Visual Communication</span> and elevated with an{" "}
              <span className="text-zinc-200 font-medium">MBA</span>, I approach creative direction with both an artist&apos;s eye for visual hierarchy and a marketer&apos;s dedication to audience engagement.
            </p>

            {/* Quick Metrics / Verification Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div className="p-4 rounded-lg bg-[#0e1015]/60 border border-white/[0.06] hover:border-[#e11d48]/30 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span>Core Location</span>
                </div>
                <div className="font-heading text-base font-bold text-white">Chennai, India</div>
                <div className="text-[11px] font-mono text-zinc-500 mt-0.5">Tamil Nadu</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0e1015]/60 border border-white/[0.06] hover:border-[#e11d48]/30 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 uppercase mb-1">
                  <Languages className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span>Languages</span>
                </div>
                <div className="font-heading text-base font-bold text-white">Tamil &amp; English</div>
                <div className="text-[11px] font-mono text-[#e11d48] mt-0.5">Proficient</div>
              </div>

              <div className="p-4 rounded-lg bg-[#0e1015]/60 border border-white/[0.06] hover:border-[#e11d48]/30 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 uppercase mb-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#e11d48]" />
                  <span>Education</span>
                </div>
                <div className="font-heading text-base font-bold text-white">MBA + B.Sc VisCom</div>
                <div className="text-[11px] font-mono text-zinc-500 mt-0.5">8.00 &amp; 7.60 CGPA</div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Focus Card: Core Competency Matrix (Col 8-12) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="lg:col-span-5"
          >
            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-white/[0.15] transition-colors p-8 rounded-xl relative group">
              {/* Crimson corner accent mark */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#e11d48] rounded-tr-xl pointer-events-none" />

              <div className="font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Competency Matrix</span>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-light">
                Specialized expertise in bridging cross-functional disciplines: transforming corporate objectives into high-impact visuals, polished video sequences, and targeted digital visibility.
              </p>

              {/* Competency Rows with Smooth Animated Progress Bars */}
              <div className="space-y-4">
                {COMPETENCIES.map((comp, idx) => (
                  <div key={idx} className="group/row">
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="text-zinc-300 group-hover/row:text-white transition-colors">
                        {comp.name}
                      </span>
                      <span className="text-zinc-400 group-hover/row:text-[#e11d48] transition-colors text-[11px]">
                        {comp.tag}
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${comp.percentage}%` } : {}}
                        transition={{ duration: 0.9, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-red-700 via-[#e11d48] to-rose-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ──────────────────────────────────────────────────────────
            THE 4 PILLARS GRID (01, 02, 03, 04)
        ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="group relative bg-[#0e1015]/80 hover:bg-[#12141a] border border-white/[0.08] hover:border-[#e11d48]/40 p-8 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-lg"
              >
                {/* Subtle Japanese Watermark */}
                <div className="absolute right-4 bottom-4 font-serif text-6xl font-black text-white/[0.02] group-hover:text-[#e11d48]/[0.08] transition-colors duration-300 select-none pointer-events-none">
                  {item.kanji}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-[#e11d48] transition-colors font-medium">
                      {item.number}
                    </span>
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-[#e11d48]/40 group-hover:bg-[#e11d48]/10 transition-colors">
                      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#e11d48] transition-colors" />
                    </div>
                  </div>

                  <h4 className="font-heading text-lg font-bold text-white mb-3 group-hover:text-rose-100 transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {/* Tool chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                    {item.tools.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400 border border-white/[0.06] group-hover:border-white/10 group-hover:text-zinc-300 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Expanding hairline crimson accent on hover */}
                  <div className="mt-5 w-full h-[1.5px] bg-gradient-to-r from-[#e11d48] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-400 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
