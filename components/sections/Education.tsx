"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, CheckCircle } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
                05 // Academic Foundations
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              EDUCATION & <span className="text-zinc-500 font-light">RESEARCH</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider">
            FOUNDATIONAL RIGOR // COMBINING BUSINESS ADMINISTRATION WITH VISUAL COMMUNICATION
          </div>
        </div>

        {/* 3-Column Editorial Grid: Degrees | Certifications | Academic Research */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Column 1: Degrees (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>University Degrees</span>
            </div>

            {/* MBA Card */}
            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-[#e11d48]/40 p-8 transition-colors relative">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[#e11d48]">04/2024</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300">
                  CGPA: 8.00
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-1">
                Master of Business Administration (MBA)
              </h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                Sathyabama Institute of Science and Technology, Chennai
              </p>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Postgraduate specialization emphasizing operational strategies, strategic management, corporate engagement, and organizational performance.
              </p>
            </div>

            {/* B.Sc VisCom Card */}
            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-[#e11d48]/40 p-8 transition-colors relative">
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="font-mono text-xs text-[#e11d48]">04/2022</span>
                <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300">
                  CGPA: 7.60
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-white mb-1">
                B.Sc. Visual Communication
              </h3>
              <p className="text-sm font-mono text-zinc-400 mb-4">
                Guru Nanak College, Chennai
              </p>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Comprehensive training in cinematography, post-production video editing, visual storytelling, graphic design, and media sociology.
              </p>
            </div>
          </div>

          {/* Column 2: Academic Research Projects (Col 6-8) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Academic Projects</span>
            </div>

            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-white/20 p-8 transition-colors flex flex-col justify-between h-[calc(50%-12px)]">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
                  PROJECT 01 // OPERATIONS RESEARCH
                </span>
                <h4 className="font-heading text-lg font-bold text-white mb-3">
                  A Study on Operations Implementation and Its Effectiveness in DP World
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  In-depth empirical investigation analyzing container terminal workflows, vessel risk management, and operational throughput optimization.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2 font-mono text-[11px] text-[#e11d48]">
                <span>Focus: DP World Logistics</span>
              </div>
            </div>

            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-white/20 p-8 transition-colors flex flex-col justify-between h-[calc(50%-12px)]">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
                  PROJECT 02 // ORGANIZATIONAL DYNAMICS
                </span>
                <h4 className="font-heading text-lg font-bold text-white mb-3">
                  A Study on HR Practices and Its Effects on Job Satisfaction in IT Sector
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Quantitative and qualitative study evaluating human resource strategies, employee engagement indices, and retention frameworks within IT organizations.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-2 font-mono text-[11px] text-[#e11d48]">
                <span>Focus: IT Industry Culture</span>
              </div>
            </div>
          </div>

          {/* Column 3: Professional Certifications (Col 9-12) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-4">
              <Award className="w-4 h-4" />
              <span>Certificates</span>
            </div>

            <div className="bg-[#0e1015] border border-white/[0.08] hover:border-[#e11d48]/40 p-8 transition-colors space-y-8">
              <div>
                <div className="flex items-center gap-2 text-white font-heading font-semibold text-base mb-1">
                  <CheckCircle className="w-4 h-4 text-[#e11d48]" />
                  <span>Video Editing Course</span>
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed pl-6">
                  Professional post-production certification covering non-linear editing, timing cuts, and transition aesthetics.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-white font-heading font-semibold text-base mb-1">
                  <CheckCircle className="w-4 h-4 text-[#e11d48]" />
                  <span>Business Communication</span>
                </div>
                <div className="font-mono text-[11px] text-[#e11d48] pl-6 mb-1">
                  Infosys Springboard
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed pl-6">
                  Accredited corporate communication certification emphasizing executive presentation, stakeholder dialogue, and articulate technical reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
