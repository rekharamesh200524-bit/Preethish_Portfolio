"use client";

import React from "react";
import { Sparkles, Layers, Target, TrendingUp, Compass, Film, Globe } from "lucide-react";

export default function About() {
  const pillars = [
    {
      number: "01",
      title: "Brand Identity & Graphic Design",
      desc: "Crafting distinct visual identities, marketing collateral, and digital design systems using Adobe Creative Suite and Canva.",
      icon: Layers,
    },
    {
      number: "02",
      title: "Digital Marketing & SEO Strategy",
      desc: "Executing technical site audits, high-intent keyword strategies, and targeted Google Ads campaigns to drive qualified traffic.",
      icon: Target,
    },
    {
      number: "03",
      title: "Post-Production & Video Editing",
      desc: "Translating raw footage into compelling narrative edits with DaVinci Resolve, Adobe Premiere Pro CC, and Final Cut Pro X.",
      icon: Film,
    },
    {
      number: "04",
      title: "Engagement & Brand Growth",
      desc: "Bridging the gap between creative visual storytelling and measurable business growth through social media strategy.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      {/* Background radial accent */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
                01 // Philosophy & Background
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              ABOUT <span className="text-zinc-500 font-light">PREETHISH</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider">
            BASED IN CHENNAI, TAMIL NADU // COMBINING AESTHETIC REFINEMENT WITH DATA-DRIVEN DIGITAL STRATEGY
          </div>
        </div>

        {/* Editorial Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Main Statement Quote (Col 1-7) */}
          <div className="lg:col-span-7 space-y-8">
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
              Grounded in academic fundamentals from a <span className="text-zinc-200 font-medium">B.Sc. in Visual Communication</span> and elevated with an <span className="text-zinc-200 font-medium">MBA</span>, I approach creative direction with both an artist&apos;s eye for visual hierarchy and a marketer&apos;s dedication to audience engagement.
            </p>

            {/* Quick Metrics / Verification Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/[0.08]">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase">Core Location</div>
                <div className="font-heading text-base font-bold text-white mt-1">Chennai, India</div>
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase">Languages</div>
                <div className="font-heading text-base font-bold text-white mt-1">Tamil & English</div>
                <div className="text-[11px] font-mono text-[#e11d48]">Proficient</div>
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase">Education</div>
                <div className="font-heading text-base font-bold text-white mt-1">MBA + B.Sc VisCom</div>
                <div className="text-[11px] font-mono text-zinc-400">8.00 & 7.60 CGPA</div>
              </div>
            </div>
          </div>

          {/* Editorial Focus Card (Col 8-12) */}
          <div className="lg:col-span-5 bg-[#0e1015] border border-white/[0.08] p-8 relative">
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#e11d48]/60 pointer-events-none" />
            <div className="font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Competency Matrix</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-light">
              Specialized expertise in bridging cross-functional disciplines: transforming corporate objectives into high-impact visuals, polished video sequences, and targeted digital visibility.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Social Media Strategy</span>
                <span className="text-white font-medium">Expert</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Search Engine Optimization</span>
                <span className="text-white font-medium">Audits & Keywords</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Video Post-Production</span>
                <span className="text-white font-medium">Cuts, Timing & Grade</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-zinc-400">Brand Identity Creation</span>
                <span className="text-white font-medium">Collateral & Systems</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="group relative bg-[#0e1015]/60 hover:bg-[#12141a] border border-white/[0.08] hover:border-[#e11d48]/40 p-8 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-[#e11d48] transition-colors">
                      {item.number}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400 group-hover:text-[#e11d48] transition-colors" />
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 w-full h-[1px] bg-gradient-to-r from-[#e11d48]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
