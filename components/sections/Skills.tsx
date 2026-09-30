"use client";

import React, { useState } from "react";
import { Sparkles, Video, Palette, TrendingUp, Cpu, MonitorCheck, Film, Compass } from "lucide-react";

interface SkillCategory {
  title: string;
  categoryCode: string;
  icon: React.ElementType;
  skills: {
    name: string;
    subtext: string;
    level: string;
  }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Post-Production & Cinematography",
    categoryCode: "CAT_01 // MOTION",
    icon: Film,
    skills: [
      {
        name: "Post-Production Video Editing",
        subtext: "Timeline cuts, time codes, pacing & transitions",
        level: "Specialist",
      },
      {
        name: "Cinematography",
        subtext: "Camera movement, framing, composition & lighting",
        level: "Advanced",
      },
      {
        name: "DaVinci Resolve & Premiere Pro",
        subtext: "Color grading, multicam edits & export pipelines",
        level: "Proficient",
      },
      {
        name: "Final Cut Pro X",
        subtext: "Fast-turnaround rough cuts to master deliverables",
        level: "Experienced",
      },
    ],
  },
  {
    title: "Design & Adobe Creative Suite",
    categoryCode: "CAT_02 // VISUAL",
    icon: Palette,
    skills: [
      {
        name: "Adobe Creative Suite Proficiency",
        subtext: "Photoshop, Illustrator, Premiere Pro CC ecosystem",
        level: "Mastery",
      },
      {
        name: "Content Creation",
        subtext: "Visual campaign assets, digital banners & print collateral",
        level: "Core",
      },
      {
        name: "Canva Design Architecture",
        subtext: "Rapid high-impact marketing layouts and templates",
        level: "Skilled",
      },
      {
        name: "Brand Material Development",
        subtext: "Typography hierarchy, color systems & guidelines",
        level: "Advanced",
      },
    ],
  },
  {
    title: "Digital Marketing & SEO",
    categoryCode: "CAT_03 // GROWTH",
    icon: TrendingUp,
    skills: [
      {
        name: "SEO Strategy Development",
        subtext: "Technical site audits, on-page optimization, keyword architecture",
        level: "Strategic",
      },
      {
        name: "Google Ads Management",
        subtext: "PPC campaign setup, bid optimization & conversion tracking",
        level: "Targeted",
      },
      {
        name: "Online Engagement Tactics",
        subtext: "Audience retention, interactive media, growth funnels",
        level: "Expertise",
      },
      {
        name: "Social Media Strategy",
        subtext: "Platform-specific narrative formats and brand engagement",
        level: "Proven",
      },
    ],
  },
  {
    title: "Strategic Communications & Operations",
    categoryCode: "CAT_04 // EXECUTION",
    icon: Compass,
    skills: [
      {
        name: "Strategic Networking",
        subtext: "High-value professional relations and industry synergy",
        level: "Core Asset",
      },
      {
        name: "Content Writing",
        subtext: "Engaging copywriting, value propositions, script outlines",
        level: "Articulate",
      },
      {
        name: "Expertise in MS Office",
        subtext: "Excel analytics, PowerPoint decks, Word documentation",
        level: "Proficient",
      },
      {
        name: "Business Communication",
        subtext: "Certified by Infosys Springboard for corporate execution",
        level: "Certified",
      },
    ],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-red-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
                03 // Technical Repertoire
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              SKILLS & <span className="text-zinc-500 font-light">CAPABILITIES</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider">
            CROSS-DISCIPLINARY STACK // NO ARBITRARY PERCENTAGES, ONLY VERIFIABLE RESUME EXPERTISE
          </div>
        </div>

        {/* Interactive Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-[#0e1015] border border-white/[0.08] hover:border-white/20 p-8 sm:p-10 transition-all duration-300 relative group"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
                  <div>
                    <div className="font-mono text-[10px] text-[#e11d48] tracking-widest uppercase mb-1">
                      {cat.categoryCode}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#e11d48] group-hover:border-[#e11d48]/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Skills Interactive List */}
                <div className="space-y-4">
                  {cat.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    return (
                      <div
                        key={skill.name}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`p-4 transition-all duration-200 border ${
                          isHovered
                            ? "bg-white/[0.04] border-[#e11d48]/50 translate-x-1"
                            : "bg-black/30 border-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-heading text-base font-semibold text-white tracking-wide">
                            {skill.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase border transition-colors ${
                              isHovered
                                ? "bg-[#e11d48] border-[#e11d48] text-white"
                                : "bg-transparent border-white/10 text-zinc-400"
                            }`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-zinc-400 font-light leading-normal">
                          {skill.subtext}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
