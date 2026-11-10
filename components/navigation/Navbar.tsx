"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Download } from "lucide-react";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Tools", href: "#tools" },
  { name: "Work", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let lastSection = "hero";

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const scrolled = window.scrollY > 40;
        if (scrolled !== lastScrolled) {
          lastScrolled = scrolled;
          setIsScrolled(scrolled);
        }

        const sections = ["hero", "about", "experience", "projects", "skills", "tools", "education", "contact"];
        const scrollPos = window.scrollY + 220;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              if (sectionId !== lastSection) {
                lastSection = sectionId;
                setActiveSection(sectionId);
              }
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07080a]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#hero"
          data-cursor-expand
          className="group flex items-center gap-2 text-white font-heading font-black tracking-tighter text-lg md:text-xl transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#e11d48] group-hover:scale-125 transition-transform" />
          <span>PREETHISH <span className="text-[#e11d48]">DP</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                data-cursor-expand
                className={`relative font-heading text-xs uppercase tracking-widest transition-colors py-1 ${
                  isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#e11d48] shadow-[0_0_10px_#e11d48]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action / Resume & Contact Links */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume/Preethish_DP_Resume.pdf"
            download="Preethish_DP_Resume.pdf"
            data-cursor-expand
            className="flex items-center gap-1.5 px-3.5 py-2 border border-white/15 bg-black/40 hover:border-[#e11d48] hover:text-[#e11d48] text-zinc-200 text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 rounded-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            data-cursor-expand
            className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 hover:border-[#e11d48] hover:bg-[#e11d48] hover:text-white text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 rounded-none"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto bg-[#07080a]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-3 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-heading text-sm uppercase tracking-widest text-zinc-300 hover:text-[#e11d48] transition-colors py-2.5 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <a
              href="/resume/Preethish_DP_Resume.pdf"
              download="Preethish_DP_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 border border-white/20 bg-white/5 text-white font-heading text-xs font-bold uppercase tracking-widest"
            >
              <Download className="w-4 h-4 text-[#e11d48]" />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-[#e11d48] text-white font-heading text-xs font-bold uppercase tracking-widest"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
