"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ── Use the original H.264 video — browser-seekable
// Trim last 2s in JS: we stop scrubbing at VIDEO_DURATION (4.5s of the 6.5s total)
const TOOLS_VIDEO = "/videos/Editing_video_with_red_theme_20261015152554.mp4";
const TOOLS_POSTER = "/images/tools_poster.jpg";

// We treat only the first 4.5s as our "universe" (last 2s trimmed in JS)
const VIDEO_DURATION = 4.5;

export default function Tools() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const videoReadyRef = useRef(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(false);
  const isRafActiveRef = useRef(false);

  // ── 1. Start or wake the rAF loop only when needed ───────────
  const startRafLoop = useCallback(() => {
    if (isRafActiveRef.current || !isIntersectingRef.current) return;
    isRafActiveRef.current = true;

    const tick = () => {
      if (!isIntersectingRef.current) {
        isRafActiveRef.current = false;
        return;
      }

      const diff = targetProgressRef.current - currentProgressRef.current;
      const lerped = currentProgressRef.current + diff * 0.1;
      currentProgressRef.current = lerped;

      // Update progress bar DOM directly without triggering full React component re-renders
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, lerped * 100))}%`;
      }

      // Safe video seek: only scrub when video decoder is NOT busy seeking
      const video = videoRef.current;
      if (video && videoReadyRef.current && !video.seeking) {
        const t = Math.max(0, Math.min(VIDEO_DURATION, lerped * VIDEO_DURATION));
        if (Math.abs(video.currentTime - t) > 0.045) {
          try {
            video.currentTime = t;
          } catch {
            // Safe guard against seek interruptions
          }
        }
      }

      // If progress has settled and video caught up, sleep the rAF loop
      if (Math.abs(diff) < 0.0008) {
        isRafActiveRef.current = false;
        return;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  // ── 2. Compute scroll progress whenever the user scrolls ─────
  const handleScroll = useCallback(() => {
    if (!isIntersectingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    const raw = Math.max(0, Math.min(1, -rect.top / scrollable));
    targetProgressRef.current = raw;
    startRafLoop();
  }, [startRafLoop]);

  // ── 3. Viewport observer: pause seeking & RAF when off-screen ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            handleScroll();
            startRafLoop();
          } else {
            isRafActiveRef.current = false;
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll, startRafLoop]);

  // ── 3. Attach scroll listener ─────────────────────────────────
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // seed initial position
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ── 4. Video setup — pause immediately, preload for scrubbing ─
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    // Mark ready once we have enough data to seek
    const onCanPlay = () => {
      videoReadyRef.current = true;
      setVideoReady(true);
      // Immediately pause – scroll drives currentTime
      video.pause();
    };

    // If already ready (e.g. cached)
    if (video.readyState >= 3) {
      onCanPlay();
    } else {
      video.addEventListener("canplay", onCanPlay, { once: true });
    }

    video.load();

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  // ── 5. IntersectionObserver: fire entrance animation ──────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !hasEntered) {
            setHasEntered(true);
          }
        }
      },
      { threshold: 0.05 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [hasEntered]);

  return (
    /**
     * OUTER WRAPPER — 300vh tall
     * The sticky viewport sits at the top and the extra 200vh of scroll
     * is what drives the video scrubbing progress from 0 → 1.
     */
    <div
      ref={containerRef}
      id="tools"
      className="relative w-full"
      style={{ height: "220vh" }}
    >
      {/* ══ STICKY VIEWPORT ══════════════════════════════════════ */}
      <div
        className="sticky top-0 w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        {/* ── VIDEO (scrubbed by scroll) ────────────────────────── */}
        <video
          ref={videoRef}
          src={TOOLS_VIDEO}
          poster={TOOLS_POSTER}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          // Never let the browser autoplay or loop; we own currentTime
          autoPlay={false}
          loop={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "50% 50%",
            filter: "contrast(1.1) brightness(1.02) saturate(1.12)",
            // Cinematic scale-in entrance
            transform: hasEntered ? "scale(1)" : "scale(1.05)",
            opacity: hasEntered && videoReady ? 1 : 0,
            transition:
              "transform 2s cubic-bezier(0.16,1,0.3,1), opacity 1s ease-out",
          }}
        />

        {/* ── SCROLL PROGRESS BAR (bottom centre) ──────────────── */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2"
          style={{
            opacity: hasEntered ? 0.72 : 0,
            transition: "opacity 0.8s ease-out 1.2s",
          }}
        >
          {/* thin track */}
          <div className="relative w-32 h-[1.5px] bg-white/12 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: "0%",
                background: "linear-gradient(90deg, #e11d48, #fb923c)",
                transition: "width 60ms linear",
              }}
            />
          </div>
          <p
            className="font-mono uppercase text-zinc-500"
            style={{ fontSize: "7.5px", letterSpacing: "0.32em" }}
          >
            Scroll to explore
          </p>
        </div>

        {/* ── RADIAL VIGNETTE ──────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 5,
            background:
              "radial-gradient(ellipse 95% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 82%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        {/* ── LOADING STATE: visible until video is seekable ────── */}
        {!videoReady && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 pointer-events-none"
            style={{ transition: "opacity 0.5s" }}
          >
            {/* Show poster image while loading */}
            <img
              src={TOOLS_POSTER}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.4)" }}
            />
            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* Spinner */}
              <div
                className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#e11d48] animate-spin"
              />
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/30">
                Loading
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
