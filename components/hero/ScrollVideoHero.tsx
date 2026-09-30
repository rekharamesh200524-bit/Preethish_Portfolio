"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface ScrollVideoHeroProps {
  initialSequence?: "hero" | "raising";
}

const TOTAL_FRAMES = 192;

export default function ScrollVideoHero({ initialSequence = "hero" }: ScrollVideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active sequence mode: "hero" (Camera crane dolly) or "raising" (Silhouette head raise)
  const [activeSequence, setActiveSequence] = useState<"hero" | "raising">(initialSequence);
  const [framesLoadedCount, setFramesLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hudCoords, setHudCoords] = useState({ x: 0, y: 0 });
  const [isAlterEgoActive, setIsAlterEgoActive] = useState(false);
  const [alterEgoChar, setAlterEgoChar] = useState<"batman" | "noir">("batman");
  const [isFaceVisible, setIsFaceVisible] = useState(false);

  // References to keep 60/120fps physics loop out of React state
  const imagesRef = useRef<Map<string, HTMLImageElement[]>>(new Map());
  const batmanImgRef = useRef<HTMLImageElement | null>(null);
  const noirImgRef = useRef<HTMLImageElement | null>(null);
  const alterEgoCharRef = useRef<"batman" | "noir">("batman");
  alterEgoCharRef.current = alterEgoChar;
  const isFaceVisibleRef = useRef(false);

  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const batmanCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealPointsRef = useRef<{ x: number; y: number; radius: number; life: number }[]>([]);
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastHoverTimeRef = useRef(0);
  const currentLayoutRef = useRef<{ offX: number; offY: number; drawW: number; drawH: number }>({
    offX: 0,
    offY: 0,
    drawW: 0,
    drawH: 0,
  });

  const lastScrollYRef = useRef(0);
  const hasVisitedPortfolioRef = useRef(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const activeSeqRef = useRef<"hero" | "raising">(initialSequence);
  activeSeqRef.current = activeSequence;

  // Preload frames for a given sequence
  const preloadSequence = useCallback((seq: "hero" | "raising") => {
    if (imagesRef.current.has(seq)) return;

    const frameList: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/frames/${seq}/frame_${paddedIndex}.jpg`;

      img.onload = () => {
        loaded++;
        if (seq === activeSeqRef.current) {
          setFramesLoadedCount(loaded);
        }
      };
      frameList.push(img);
    }
    imagesRef.current.set(seq, frameList);
  }, []);

  // Preload initial sequences, Batman & Spider-Man Noir alter-ego costumes
  useEffect(() => {
    preloadSequence("hero");
    preloadSequence("raising");

    const bImg = new Image();
    bImg.src = "/images/batman_alter_ego.jpg";
    bImg.onload = () => {
      batmanImgRef.current = bImg;
    };

    const nImg = new Image();
    nImg.src = "/images/spiderman_noir_alter_ego.jpg";
    nImg.onload = () => {
      noirImgRef.current = nImg;
    };

    const timer = setTimeout(() => setIsRevealed(true), 150);
    return () => clearTimeout(timer);
  }, [preloadSequence]);

  // Main scroll and render engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId: number;
    let lastHudTime = 0;

    // Handle high-DPI canvas resizing
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize, { passive: true });

    // Scroll listener calculates normalized progress through sticky hero & tracks journey
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      targetProgressRef.current = progress;

      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollYRef.current - 4;
      const isScrollingDown = currentScrollY > lastScrollYRef.current + 4;
      lastScrollYRef.current = currentScrollY;

      // When the user scrolls down into the portfolio sections below hero
      if (currentScrollY > scrollableDist * 0.7) {
        hasVisitedPortfolioRef.current = true;
      }

      // Journey 2: If user visited portfolio and is now scrolling back UP into hero:
      // Switch reveal character to Spider-Man Noir!
      if (hasVisitedPortfolioRef.current && isScrollingUp && currentScrollY < scrollableDist * 0.95) {
        if (alterEgoCharRef.current !== "noir") {
          alterEgoCharRef.current = "noir";
          setAlterEgoChar("noir");
        }
      }

      // Journey 1: If user is at top of hero and scrolls downwards:
      // Reset back to Batman!
      if (currentScrollY < 150 && isScrollingDown) {
        hasVisitedPortfolioRef.current = false;
        if (alterEgoCharRef.current !== "batman") {
          alterEgoCharRef.current = "batman";
          setAlterEgoChar("batman");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Track cursor movement and interpolate zigzag brush strokes for Batman/Noir alter-ego reveal
    const addRevealPoint = (clientX: number, clientY: number) => {
      // Logical requirement: Only reveal alter-ego once the man's head is lifted and his face is visible on screen
      if (!isFaceVisibleRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * canvas.width;
      const y = ((clientY - rect.top) / rect.height) * canvas.height;

      // Soft brush radius (~80-120px in canvas space)
      const radius = Math.max(75, Math.min(125, canvas.width * 0.075));

      if (lastMousePosRef.current) {
        const dx = x - lastMousePosRef.current.x;
        const dy = y - lastMousePosRef.current.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(8, Math.floor(dist / (radius * 0.4)));
        for (let i = 1; i <= steps; i++) {
          const t = i / (steps + 1);
          revealPointsRef.current.push({
            x: lastMousePosRef.current.x + dx * t,
            y: lastMousePosRef.current.y + dy * t,
            radius,
            life: 1.0,
          });
        }
      }

      revealPointsRef.current.push({ x, y, radius, life: 1.0 });
      lastMousePosRef.current = { x, y };

      if (revealPointsRef.current.length > 220) {
        revealPointsRef.current = revealPointsRef.current.slice(-220);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastHoverTimeRef.current = performance.now();
      const { innerWidth, innerHeight } = window;
      mouseTargetRef.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: (e.clientY / innerHeight) * 2 - 1,
      };
      addRevealPoint(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      lastMousePosRef.current = null;
      // Instantly clear alter-ego reveal when cursor leaves so nothing lingers after hover
      revealPointsRef.current = [];
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        lastHoverTimeRef.current = performance.now();
        const t = e.touches[0];
        const { innerWidth, innerHeight } = window;
        mouseTargetRef.current = {
          x: ((t.clientX / innerWidth) * 2 - 1) * 0.3,
          y: ((t.clientY / innerHeight) * 2 - 1) * 0.3,
        };
        addRevealPoint(t.clientX, t.clientY);
      }
    };

    const handleTouchEnd = () => {
      lastMousePosRef.current = null;
      // Instantly clear alter-ego reveal when touch ends
      revealPointsRef.current = [];
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Helper: draw image with object-cover aspect fit, shifted to the right on desktop, with headroom below the nav
    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1280;
      const ih = img.naturalHeight || 720;

      const scaleX = cw / iw;
      const scaleY = ch / ih;
      const baseScale = Math.max(scaleX, scaleY);

      // 1.16x provides balanced scale and framing
      const scale = baseScale * 1.16;

      const drawW = iw * scale;
      const drawH = ih * scale;

      const isDesktop = cw > 768;

      // Horizontal: shift subject slightly more to the right (~63% of screen width)
      const centerOffX = (cw - drawW) / 2;
      const offX = isDesktop ? Math.round(cw * 0.055) : centerOffX;

      // Vertical position: lift the subject up so he is not too low down
      // while still keeping the top of his hair cleanly framed with the navbar
      const offY = isDesktop ? -15 : 0;

      currentLayoutRef.current = { offX, offY, drawW, drawH };

      ctx.fillStyle = "#07080a";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, offX, offY, drawW, drawH);
    };

    // Helper: Composite Batman or Spider-Man Noir Alter-Ego Costume through the hover zigzag brush mask
    const drawAlterEgoReveal = () => {
      // Must not draw alter-ego if the man's head is bowed down
      if (!isFaceVisibleRef.current) return;

      const activeChar = alterEgoCharRef.current;
      const targetImg = activeChar === "noir" ? noirImgRef.current : batmanImgRef.current;
      const points = revealPointsRef.current;
      if (!canvas || points.length === 0 || !targetImg || !targetImg.complete || targetImg.naturalWidth === 0) {
        return;
      }

      if (!maskCanvasRef.current) maskCanvasRef.current = document.createElement("canvas");
      if (!batmanCanvasRef.current) batmanCanvasRef.current = document.createElement("canvas");

      const maskCanvas = maskCanvasRef.current;
      const alterEgoCanvas = batmanCanvasRef.current;
      const cw = canvas.width;
      const ch = canvas.height;

      if (maskCanvas.width !== cw || maskCanvas.height !== ch) {
        maskCanvas.width = cw;
        maskCanvas.height = ch;
      }
      if (alterEgoCanvas.width !== cw || alterEgoCanvas.height !== ch) {
        alterEgoCanvas.width = cw;
        alterEgoCanvas.height = ch;
      }

      const maskCtx = maskCanvas.getContext("2d");
      const alterEgoCtx = alterEgoCanvas.getContext("2d");
      if (!maskCtx || !alterEgoCtx) return;

      // 1. Draw smooth feathered brush strokes onto mask canvas
      maskCtx.clearRect(0, 0, cw, ch);
      for (const pt of points) {
        const radGrad = maskCtx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.radius);
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, pt.life * 1.05)})`);
        radGrad.addColorStop(0.5, `rgba(255, 255, 255, ${pt.life * 0.75})`);
        radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        maskCtx.fillStyle = radGrad;
        maskCtx.beginPath();
        maskCtx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      // 2. Draw active hero image (Batman or Spider-Man Noir) with exact matching coordinates
      const { offX, offY, drawW, drawH } = currentLayoutRef.current;
      alterEgoCtx.clearRect(0, 0, cw, ch);
      alterEgoCtx.drawImage(targetImg, offX, offY, drawW, drawH);

      // 3. Mask image by the hover brush strokes
      alterEgoCtx.globalCompositeOperation = "destination-in";
      alterEgoCtx.drawImage(maskCanvas, 0, 0);
      alterEgoCtx.globalCompositeOperation = "source-over";

      // 4. Composite masked hero onto main hero canvas
      ctx.drawImage(alterEgoCanvas, 0, 0);
    };

    // 60/120fps Animation Loop with Spring Lerp
    const tick = (timestamp: number) => {
      // Calculate scroll progress directly in animation frame for continuous sub-pixel accuracy with Lenis
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollableDist = rect.height - window.innerHeight;
        if (scrollableDist > 0) {
          targetProgressRef.current = Math.max(0, Math.min(1, -rect.top / scrollableDist));
        }
      }

      // Smooth progress lerp
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.16;
      const progress = currentProgressRef.current;

      // Smooth mouse lerp
      mouseCurrentRef.current.x += (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.08;
      mouseCurrentRef.current.y += (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.08;

      // Determine target frame index
      const targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      // Logical requirement: Face is only shown once the man raises his head (frame >= 58)
      // When frame < 58, the man is looking down with only hair visible, so alter-ego hover is gated
      const faceShown = targetFrame >= 58;
      isFaceVisibleRef.current = faceShown;

      // If user scrolls back up where head is bowed down, instantly wipe any alter-ego points
      if (!faceShown && revealPointsRef.current.length > 0) {
        revealPointsRef.current = [];
      }

      // Update React state at 15Hz to keep UI in sync without performance penalty
      if (timestamp - lastHudTime > 66) {
        setScrollProgress(progress);
        setIsAlterEgoActive(faceShown && revealPointsRef.current.length > 6);
        setIsFaceVisible(faceShown);
        setHudCoords({
          x: Math.round(mouseCurrentRef.current.x * 100) / 100,
          y: Math.round(mouseCurrentRef.current.y * 100) / 100,
        });
        lastHudTime = timestamp;
      }

      const seqList = imagesRef.current.get(activeSeqRef.current);
      if (seqList && seqList.length > 0) {
        let frameImg = seqList[targetFrame];

        // If target frame not loaded yet, find nearest loaded frame
        if (!frameImg || !frameImg.complete || frameImg.naturalWidth === 0) {
          for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
            const before = seqList[targetFrame - offset];
            if (before && before.complete && before.naturalWidth > 0) {
              frameImg = before;
              break;
            }
            const after = seqList[targetFrame + offset];
            if (after && after.complete && after.naturalWidth > 0) {
              frameImg = after;
              break;
            }
          }
        }

        if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
          drawCover(frameImg);
          if (faceShown) {
            drawAlterEgoReveal();
          }
        }

        // Rapid fade: reveal only shows at the second of hover, and vanishes immediately after hover
        const points = revealPointsRef.current;
        const timeSinceMove = performance.now() - lastHoverTimeRef.current;
        // If cursor stopped moving for over 120ms, drop out instantly; while moving, decay in ~0.5s
        const decayRate = timeSinceMove > 120 ? 0.14 : 0.045;

        for (let i = points.length - 1; i >= 0; i--) {
          points[i].life -= decayRate;
          if (points[i].life <= 0) {
            points.splice(i, 1);
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const currentFrameNumber = Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.round(scrollProgress * (TOTAL_FRAMES - 1)) + 1)
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseLeave={() => {
        revealPointsRef.current = [];
        lastMousePosRef.current = null;
      }}
      className="relative w-full h-[400vh] bg-[#07080a] select-none"
      aria-label="Interactive Video Scroll Hero"
    >
      {/* Pinned Sticky Viewport Window */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#07080a] flex items-center justify-center will-change-transform z-10"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        {/* Layer 1: Scroll-driven Canvas Video Player with 3D tilt */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) translate3d(${hudCoords.x * 22}px, ${hudCoords.y * 15}px, 0) rotateX(${-hudCoords.y * 3.5}deg) rotateY(${hudCoords.x * 4.5}deg) scale(1.04)`,
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block"
            aria-label="Preethish D P — Cinematic Video Sequence"
          />

          {/* Deep Vignette & Studio Lighting Edge Blending */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#07080a]/30 to-[#07080a]/90 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] via-[#07080a]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07080a]/80 via-[#07080a]/25 to-transparent pointer-events-none" />

          {/* Left subtle vignette to guarantee text readability without touching the subject */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#07080a]/80 via-[#07080a]/25 to-transparent pointer-events-none" />

          {/* Film Grain Texture for Cinematic Depth */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/grain.png')",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Layer 2: Viewfinder HUD Corners (Clean outer frame, no marks over face) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-7xl h-[82vh] pointer-events-none opacity-25 transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(calc(-50% + ${hudCoords.x * 12}px), calc(-50% + ${hudCoords.y * 8}px), 0)`,
            }}
          >
            {/* Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-white/30" />
            <div className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-white/30" />
            <div className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-white/30" />
            <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-white/30" />
          </div>
        </div>

        {/* Layer 3: Top Camera Meta Bar & Video Mode Switcher */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
          {/* Top Left: Camera Status or Alter Ego Alert */}
          {isAlterEgoActive ? (
            <div
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-[11px] font-mono tracking-widest animate-pulse shadow-2xl transition-all duration-300 ${
                alterEgoChar === "noir"
                  ? "border-zinc-300/70 bg-black/90 text-white shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                  : "border-red-500/60 bg-black/85 text-red-400 shadow-[0_0_25px_rgba(225,29,72,0.45)]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-ping ${
                  alterEgoChar === "noir" ? "bg-white" : "bg-[#e11d48]"
                }`}
              />
              <span className="font-bold text-white tracking-widest">ALTER EGO:</span>
              <span className={`font-bold ${alterEgoChar === "noir" ? "text-white" : "text-[#e11d48]"}`}>
                {alterEgoChar === "noir" ? "SPIDER-MAN NOIR" : "THE DARK KNIGHT"}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[11px] font-mono tracking-widest text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-semibold text-white">REC</span>
              <span className="text-zinc-600">|</span>
              <span className="hidden sm:inline">24 FPS</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-400">FRM: {String(currentFrameNumber).padStart(3, "0")}/{TOTAL_FRAMES}</span>
            </div>
          )}
        </div>

        {/* Layer 4: Editorial Content Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
          {/* Upper Left Monogram */}
          <div
            className={`transition-all duration-1000 ease-out pointer-events-auto ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
            }`}
            style={{
              transform: `translate3d(${hudCoords.x * 6}px, ${hudCoords.y * 4}px, 0)`,
            }}
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-white leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-xl xl:max-w-2xl">
              PREETHISH <span className="text-[#e11d48]">D P</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-zinc-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              CHENNAI, INDIA
            </p>
          </div>

          {/* Lower Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
            {/* Lower Left: Titles & CTA */}
            <div
              className={`lg:col-span-8 transition-all duration-1000 delay-300 ease-out pointer-events-auto ${
                isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transform: `translate3d(${hudCoords.x * 8}px, ${hudCoords.y * 6}px, 0)`,
              }}
            >
              {/* Identity List */}
              <div className="space-y-1 sm:space-y-1.5 mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#e11d48]">01</span>
                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                    GRAPHIC DESIGNER
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">02</span>
                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white/80">
                    DIGITAL MARKETER
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#e11d48]">03</span>
                  <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                    VISUAL STORYTELLER
                  </h2>
                </div>
              </div>

              {/* Exact Bio text */}
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-zinc-200/90 font-normal leading-relaxed border-l-2 border-[#e11d48] pl-4 py-1 bg-black/40 backdrop-blur-sm">
                Creating visual identities, digital experiences, and stories that connect brands with people.
              </p>

              {/* Direct CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#projects"
                  data-cursor-expand
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-none bg-white text-black font-heading text-xs tracking-widest font-bold uppercase transition-all duration-300 hover:bg-[#e11d48] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <span>Explore Works</span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  data-cursor-expand
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-none border border-white/20 bg-black/60 backdrop-blur-md text-white font-heading text-xs tracking-widest font-semibold uppercase transition-all duration-300 hover:border-[#e11d48] hover:bg-[#e11d48]/15"
                >
                  <span>Initiate Dialogue</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
