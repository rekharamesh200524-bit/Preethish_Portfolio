"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API dispatch latency
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Trigger subtle cinematic confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#e11d48", "#ffffff", "#881337"],
      });
    } catch {
      // Ignore if canvas-confetti is unsupported
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-[#07080a] text-white border-t border-white/[0.08]">
      {/* Background glowing red flare */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-red-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header with exact prompt copy */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#e11d48]">
              06 // Initiate Collaboration
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none max-w-5xl">
            LET&apos;S CREATE SOMETHING <span className="text-[#e11d48]">WORTH REMEMBERING.</span>
          </h2>

          <p className="mt-6 text-zinc-400 font-light text-base sm:text-lg max-w-2xl">
            Open for Graphic Design, Digital Marketing, and Post-Production Video Editing engagements. Reach out directly or initiate a project brief below.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Resume Contact Details (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e1015] border border-white/[0.08] p-8 space-y-8">
              <div className="font-mono text-xs text-[#e11d48] tracking-widest uppercase">
                Direct Channels // Preethish D P
              </div>

              {/* Email */}
              <div className="group">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Email Communication
                </span>
                <a
                  href="mailto:preethish94@gmail.com"
                  data-cursor-expand
                  className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#e11d48] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-[#e11d48]" />
                  <span>preethish94@gmail.com</span>
                </a>
              </div>

              {/* Phone */}
              <div className="group">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Telephone Contact
                </span>
                <a
                  href="tel:+916369687044"
                  data-cursor-expand
                  className="font-heading text-xl font-bold text-white group-hover:text-[#e11d48] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#e11d48]" />
                  <span>+91 6369687044</span>
                </a>
              </div>

              {/* LinkedIn */}
              <div className="group">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Professional Network
                </span>
                <a
                  href="https://linkedin.com/in/preethishdp"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-expand
                  className="font-heading text-lg font-bold text-white group-hover:text-[#e11d48] transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5 text-[#e11d48] fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>linkedin.com/in/preethishdp</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </a>
              </div>

              {/* Location */}
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  Operating Base
                </span>
                <div className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#e11d48]" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-6 border border-white/[0.08] bg-black/40 flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-xs font-mono text-zinc-300">
                STATUS: ACCEPTING CREATIVE BRIEFS & EMPLOYMENT INQUIRIES
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form (Col 6-12) */}
          <div className="lg:col-span-7 bg-[#0e1015] border border-white/[0.08] p-8 sm:p-10 relative">
            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-8 tracking-wider">
              STRUCTURED DISPATCH // READY FOR DIRECT API INTEGRATION
            </p>

            {isSuccess && (
              <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <strong className="font-bold block">Transmission Received!</strong>
                  Thank you for reaching out. Preethish will respond to your inquiry promptly.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Maya Shankar"
                  {...register("fullName", { required: "Name is required" })}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#e11d48] transition-colors rounded-none font-sans text-sm"
                />
                {errors.fullName && (
                  <span className="text-[#e11d48] text-xs font-mono mt-1 block">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#e11d48] transition-colors rounded-none font-sans text-sm"
                />
                {errors.email && (
                  <span className="text-[#e11d48] text-xs font-mono mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2"
                >
                  Inquiry Topic *
                </label>
                <select
                  id="subject"
                  {...register("subject", { required: "Please select an inquiry topic" })}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#e11d48] transition-colors rounded-none font-sans text-sm"
                >
                  <option value="" className="bg-[#0e1015] text-zinc-400">Select project discipline...</option>
                  <option value="graphic-design" className="bg-[#0e1015]">Graphic Design & Brand Collateral</option>
                  <option value="video-editing" className="bg-[#0e1015]">Post-Production Video Editing / Color Grading</option>
                  <option value="digital-marketing" className="bg-[#0e1015]">Digital Marketing, SEO & Google Ads</option>
                  <option value="employment" className="bg-[#0e1015]">Full-time / Strategic Employment Opportunity</option>
                  <option value="other" className="bg-[#0e1015]">General Creative Dialogue</option>
                </select>
                {errors.subject && (
                  <span className="text-[#e11d48] text-xs font-mono mt-1 block">
                    {errors.subject.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2"
                >
                  Project Details / Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Outline your project scope, timeline, or requirements..."
                  {...register("message", { required: "Message is required", minLength: { value: 10, message: "Minimum 10 characters required" } })}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#e11d48] transition-colors rounded-none font-sans text-sm resize-none"
                />
                {errors.message && (
                  <span className="text-[#e11d48] text-xs font-mono mt-1 block">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor-expand
                className="w-full py-4 bg-[#e11d48] hover:bg-red-600 text-white font-heading font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(225,29,72,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Dispatch...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-28 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 PREETHISH D P. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>CHENNAI // INDIA</span>
            <span>•</span>
            <span>GRAPHIC DESIGN & DIGITAL MARKETING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
