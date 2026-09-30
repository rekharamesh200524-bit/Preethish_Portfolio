"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  responsibilities: string[];
  tools: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "inet",
    role: "Digital Marketing and Graphic Designer",
    company: "I-Net Secure Labs Pvt. Ltd.",
    period: "12/2024 – Present",
    location: "Chennai, India",
    isCurrent: true,
    responsibilities: [
      "Crafted graphics and multimedia content with Adobe Creative Suite, Canva, and DaVinci Resolve.",
      "Executed SEO, site audits, keyword strategies, and Google Ads campaigns to boost online engagement.",
    ],
    tools: ["Adobe Creative Suite", "Canva", "DaVinci Resolve", "Google Ads", "SEO Audits"],
  },
  {
    id: "arya",
    role: "Management Trainee",
    company: "Arya Omnitalk",
    period: "09/2024 – 12/2024",
    location: "Chennai, India",
    responsibilities: [
      "Managed CRM updates to maintain accurate records, supporting effective sales operations.",
      "Supported sales operations through preparation of sales order forms and client engagement.",
    ],
    tools: ["CRM Operations", "Sales Operations", "Client Engagement", "Documentation"],
  },
  {
    id: "populus",
    role: "Digital Media Intern",
    company: "Populus Empowerment Network",
    period: "01/2024 – 06/2024",
    location: "Chennai, India",
    responsibilities: [
      "Crafted visually engaging graphics and video editing using Adobe Creative Suite.",
      "Contributed to brand material development and content writing.",
    ],
    tools: ["Graphic Design", "Video Editing", "Adobe Creative Suite", "Content Writing"],
  },
  {
    id: "dpworld",
    role: "Operations Intern",
    company: "DP World",
    period: "10/2023 – 12/2023",
    location: "Chennai, India",
    responsibilities: [
      "Managed risk in maritime network operations for vessels.",
      "Gained knowledge of documentation processes related to terminal operations and cargoes.",
    ],
    tools: ["Maritime Network Operations", "Terminal Operations", "Risk Management", "Vessel Logistics"],
  },
  {
    id: "sathyajyothi",
    role: "Assistant Film Editor",
    company: "Sathya Jyothi Film Production Company",
    period: "01/2022 – 06/2022",
    location: "Chennai, India",
    responsibilities: [
      "Evaluated video content for time codes, edits, and transitions before submitting final cut.",
      "Utilized specialized software programs such as Final Cut Pro X or Adobe Premiere Pro CC to edit films.",
    ],
    tools: ["Final Cut Pro X", "Adobe Premiere Pro CC", "Time Codes", "Transition Editing", "Final Cuts"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
                02 // Career Trajectory
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              PROFESSIONAL <span className="text-zinc-500 font-light">EXPERIENCE</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider">
            CHRONOLOGICAL PRODUCTION LOG // RESUME-VERIFIED POSITIONS IN CREATIVE & OPERATIONS
          </div>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-16 space-y-16">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node */}
              <div
                className={`absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  exp.isCurrent
                    ? "border-[#e11d48] bg-[#e11d48] shadow-[0_0_16px_rgba(225,29,72,0.8)]"
                    : "border-white/30 bg-[#07080a] group-hover:border-[#e11d48] group-hover:bg-[#e11d48]/20"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    exp.isCurrent ? "bg-white animate-pulse" : "bg-white/40 group-hover:bg-white"
                  }`}
                />
              </div>

              {/* Timecode / Period Floating Label on the Left (Desktop) */}
              <div className="hidden md:block absolute -left-48 top-1.5 w-36 text-right font-mono text-xs tracking-wider text-zinc-400 group-hover:text-white transition-colors">
                <span className={exp.isCurrent ? "text-[#e11d48] font-bold" : ""}>
                  {exp.period}
                </span>
              </div>

              {/* Content Card */}
              <div className="bg-[#0e1015] border border-white/[0.08] group-hover:border-[#e11d48]/40 p-6 sm:p-8 transition-all duration-300 relative">
                {/* Current badge */}
                {exp.isCurrent && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#e11d48] text-white font-mono text-[10px] tracking-widest uppercase font-bold">
                    ACTIVE ROLE
                  </div>
                )}

                {/* Mobile Period badge */}
                <div className="md:hidden flex items-center gap-2 text-xs font-mono text-[#e11d48] mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-6">
                  <span className="text-zinc-200 font-semibold text-sm">{exp.company}</span>
                  <span className="text-zinc-600">•</span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <ul className="space-y-2.5 mb-6 text-sm text-zinc-300 font-light leading-relaxed">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5 opacity-80" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech / Competency Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
