"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Film, Palette, TrendingUp, Compass, Eye, X } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: "Graphic Design" | "Video Editing" | "Digital Marketing" | "Branding" | "Cinematography";
  description: string;
  image: string;
  deliverables: string[];
  role: string;
  organization: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "film-editing-master",
    title: "Feature Film Cut & Timecode Conform",
    category: "Video Editing",
    description:
      "Evaluating rough assemblies, conforming timecodes, crafting transition pacing, and preparing final cuts for high-profile cinema production.",
    image: "/projects/film_edit.jpg",
    deliverables: ["Timecode Assembly", "DaVinci Resolve Grade", "Transition Timing", "Final Delivery"],
    role: "Assistant Film Editor",
    organization: "Sathya Jyothi Film Production Company",
  },
  {
    id: "brand-identity-system",
    title: "Editorial Brand System & Visual Collateral",
    category: "Branding",
    description:
      "Comprehensive corporate brand guidelines, editorial type specimens, and multi-channel campaign collateral engineered for consistent brand expansion.",
    image: "/projects/brand_design.jpg",
    deliverables: ["Visual Identity", "Typography Systems", "Brand Manual", "Marketing Collateral"],
    role: "Graphic Designer",
    organization: "Populus Empowerment Network & I-Net Labs",
  },
  {
    id: "seo-analytics-growth",
    title: "Performance Marketing & Search Engine Optimization",
    category: "Digital Marketing",
    description:
      "End-to-end technical site audits, keyword taxonomy architectures, and targeted Google Ads campaign structures boosting digital engagement.",
    image: "/projects/digital_marketing.jpg",
    deliverables: ["Site Audits", "Keyword Strategy", "Google Ads", "Conversion Reporting"],
    role: "Digital Marketing Specialist",
    organization: "I-Net Secure Labs Pvt. Ltd.",
  },
  {
    id: "maritime-cinematics",
    title: "Maritime Network Logistics & Vessel Operations",
    category: "Cinematography",
    description:
      "Visual documentary study analyzing maritime logistics, container terminal vessel turnarounds, and operational risk mitigation in high-density port environments.",
    image: "/projects/maritime_cinematography.jpg",
    deliverables: ["Operational Study", "Visual Framing", "Terminal Workflow", "Risk Analysis"],
    role: "Operations & Visual Research",
    organization: "DP World Terminal Studies",
  },
];

const CATEGORIES = [
  "All",
  "Graphic Design",
  "Video Editing",
  "Digital Marketing",
  "Branding",
  "Cinematography",
] as const;

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter(
          (p) =>
            p.category === selectedCategory ||
            (selectedCategory === "Graphic Design" && p.category === "Branding")
        );

  return (
    <section id="projects" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
                04 // Selected Works
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase">
              CREATIVE <span className="text-zinc-500 font-light">PORTFOLIO</span>
            </h2>
          </div>
          <div className="text-zinc-400 font-mono text-xs max-w-sm tracking-wider">
            CURATED CASE STUDIES // INTERSECTING DESIGN, EDITORIAL MOTION, AND PERFORMANCE MARKETING
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-14 border-b border-white/10 pb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-cursor-expand
                className={`px-4 py-2 font-heading text-xs uppercase tracking-widest transition-all duration-200 border ${
                  isActive
                    ? "bg-[#e11d48] border-[#e11d48] text-white font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                    : "bg-transparent border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Large Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor-expand
              className="group cursor-pointer bg-[#0e1015] border border-white/[0.08] hover:border-[#e11d48]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Top Corner Category Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                  <span>{project.category}</span>
                </div>

                {/* Hover Inspect Icon */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#e11d48] text-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Content Description Box */}
              <div className="p-8">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>{project.organization}</span>
                  <span className="text-zinc-600">// 0{idx + 1}</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-white transition-colors mb-3 flex items-center justify-between gap-4">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-[#e11d48] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Deliverables Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.deliverables.map((del) => (
                    <span
                      key={del}
                      className="px-2.5 py-1 bg-black/40 border border-white/10 text-[10px] font-mono text-zinc-400"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0e1015] border border-white/20 p-6 sm:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white border border-white/10 hover:border-[#e11d48] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="font-mono text-xs text-[#e11d48] tracking-widest uppercase mb-2">
              {activeProject.category} // {activeProject.organization}
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl font-black text-white mb-6">
              {activeProject.title}
            </h3>

            <div className="relative aspect-video w-full mb-8 overflow-hidden border border-white/10">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-base text-zinc-300 leading-relaxed font-light mb-8">
              {activeProject.description}
            </p>

            <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase">Role Applied</div>
                <div className="font-heading text-lg font-bold text-white">{activeProject.role}</div>
              </div>
              <div className="flex gap-2">
                {activeProject.deliverables.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-white/5 border border-white/10 font-mono text-xs text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
