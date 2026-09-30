import React from "react";
import LenisProvider from "@/components/ui/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import WebLoader from "@/components/ui/WebLoader";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Tools from "@/components/sections/Tools";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <LenisProvider>
      {/* Spider-Web Expanding Preloader */}
      <WebLoader />

      {/* Interactive custom desktop cursor */}
      <CustomCursor />

      {/* Persistent cinematic navigation */}
      <Navbar />

      <main className="relative bg-[#07080a] min-h-screen text-[#f3f4f6] overflow-x-clip">
        {/* Cinematic Cursor-Controlled Camera Hero */}
        <Hero />

        {/* Section 01: Editorial About Preethish D P */}
        <About />

        {/* Section 02: Career Trajectory & Experience Timeline */}
        <Experience />

        {/* Section 03: Technical Repertoire & Skill Matrix */}
        <Skills />

        {/* Section 04: Creative Tools & Arsenal */}
        <Tools />

        {/* Section 05: Selected Works & Portfolio Gallery */}
        <Projects />

        {/* Section 06: Academic Foundation, Research & Certifications */}
        <Education />

        {/* Section 06: Final Cinematic CTA & Contact Form */}
        <Contact />
      </main>
    </LenisProvider>
  );
}
