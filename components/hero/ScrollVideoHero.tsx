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
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAlterEgoActive, setIsAlterEgoActive] = useState(false);
  const [alterEgoChar, setAlterEgoChar] = useState<"batman" | "noir">("batman");
  const [isFaceVisible, setIsFaceVisible] = useState(false);

  // Performance refs — zero React re-render overhead on high-frequency loops
  const stageRef = useRef<HTMLDivElement>(null);
  const frameNumRef = useRef<HTMLSpanElement>(null);
  const lastDrawnFrameRef = useRef(-1);
  const needsRedrawRef = useRef(true);
  const isHeroVisibleRef = useRef(true);
  const isRafRunningRef = useRef(false);
  const isAlterEgoActiveRef = useRef(false);
  const lastFrameNumRef = useRef(-1);
  const currentFrameIndexRef = useRef(0);
  const triggerRedrawRef = useRef<() => void>(() => {});

  // References to keep 60/120fps physics loop out of React state
  const imagesRef = useRef<Map<string, HTMLImageElement[]>>(new Map());
  const batmanImgRef = useRef<HTMLImageElement | null>(null);
  const noirImgRef = useRef<HTMLImageElement | null>(null);
  const alterEgoCharRef = useRef<"batman" | "noir">("batman");
  const isFaceVisibleRef = useRef(false);

  useEffect(() => {
    alterEgoCharRef.current = alterEgoChar;
  }, [alterEgoChar]);

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

  useEffect(() => {
    activeSeqRef.current = activeSequence;
  }, [activeSequence]);

  // Preload frames progressively for hero sequence without triggering 192 React re-renders
  const preloadSequence = useCallback((seq: "hero" | "raising" = "hero") => {
    if (imagesRef.current.has(seq)) return;

    const frameList: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    const loadFrame = (i: number) => {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/frames/${seq}/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        loaded++;
        needsRedrawRef.current = true;
        // Immediate trigger if this is the target initial frame or current frame
        if (i === 0 || i === currentFrameIndexRef.current) {
          triggerRedrawRef.current();
        }
      };
      frameList[i] = img;
    };

    // Phase 1: Immediately load first 24 frames for instant initial render
    const INITIAL_BURST = 24;
    for (let i = 0; i < Math.min(INITIAL_BURST, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }
    imagesRef.current.set(seq, frameList);

    // Phase 2: Load remaining frames in background idle batches to keep scroll & network responsive
    let nextIndex = INITIAL_BURST;
    const BATCH_SIZE = 16;
    const queueNextBatch = () => {
      if (nextIndex >= TOTAL_FRAMES) return;
      const limit = Math.min(nextIndex + BATCH_SIZE, TOTAL_FRAMES);
      for (let i = nextIndex; i < limit; i++) {
        loadFrame(i);
      }
      nextIndex = limit;
      if (nextIndex < TOTAL_FRAMES) {
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void }).requestIdleCallback(queueNextBatch, { timeout: 120 });
        } else {
          setTimeout(queueNextBatch, 40);
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (fn: () => void, opts: { timeout: number }) => void }).requestIdleCallback(queueNextBatch, { timeout: 150 });
    } else {
      setTimeout(queueNextBatch, 50);
    }
  }, []);

  // Preload initial hero sequence, Batman & Spider-Man Noir alter-ego costumes
  useEffect(() => {
    preloadSequence("hero");

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

    let rafId = 0;

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

    // 60/120fps Animation Loop with Spring Lerp & Hardware Accelerated CSS Variables
    // Declared before startTick/updateCanvasSize/handleScroll so initial setup never hits TDZ.
    const tick = () => {
      const isAtTop = window.scrollY < (containerRef.current?.offsetHeight || 1200);
      if (!isHeroVisibleRef.current && !isAtTop) {
        isRafRunningRef.current = false;
        return;
      }
      isHeroVisibleRef.current = true;

      // Smooth progress lerp
      const pDiff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += pDiff * 0.16;
      const progress = currentProgressRef.current;

      // Smooth mouse lerp
      const mDiffX = mouseTargetRef.current.x - mouseCurrentRef.current.x;
      const mDiffY = mouseTargetRef.current.y - mouseCurrentRef.current.y;
      mouseCurrentRef.current.x += mDiffX * 0.08;
      mouseCurrentRef.current.y += mDiffY * 0.08;

      // Update CSS variables for 3D parallax on the stage container directly
      if (stageRef.current) {
        stageRef.current.style.setProperty("--hud-x", mouseCurrentRef.current.x.toFixed(3));
        stageRef.current.style.setProperty("--hud-y", mouseCurrentRef.current.y.toFixed(3));
      }

      // Smooth dynamic pacing: Eager head-raise in first 16% of scroll travel
      // so the face makes immediate eye contact right away when user scrolls!
      let targetFrame: number;
      const HEAD_UP_FRAME = 58;
      const FIRST_PHASE_SCROLL = 0.16; // Head raise completes in first 16% of hero scroll

      if (progress <= FIRST_PHASE_SCROLL) {
        const t = progress / FIRST_PHASE_SCROLL;
        const easedT = Math.sin((t * Math.PI) / 2); // Ease-out curve
        targetFrame = Math.round(easedT * HEAD_UP_FRAME);
      } else {
        const t = (progress - FIRST_PHASE_SCROLL) / (1 - FIRST_PHASE_SCROLL);
        targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          HEAD_UP_FRAME + Math.round(t * (TOTAL_FRAMES - 1 - HEAD_UP_FRAME))
        );
      }
      currentFrameIndexRef.current = targetFrame;

      // Update frame number text directly on DOM ref without React re-render
      if (frameNumRef.current && lastFrameNumRef.current !== targetFrame + 1) {
        lastFrameNumRef.current = targetFrame + 1;
        frameNumRef.current.textContent = `FRM: ${String(targetFrame + 1).padStart(3, "0")}/${TOTAL_FRAMES}`;
      }

      // Logical requirement: Face is shown as soon as the head lifts up (frame >= 40)
      const faceShown = targetFrame >= 40;
      isFaceVisibleRef.current = faceShown;

      // Toggle alter ego active alert only when value actually changes
      const points = revealPointsRef.current;
      const shouldAlterEgoBeActive = faceShown && points.length > 6;
      if (shouldAlterEgoBeActive !== isAlterEgoActiveRef.current) {
        isAlterEgoActiveRef.current = shouldAlterEgoBeActive;
        setIsAlterEgoActive(shouldAlterEgoBeActive);
      }

      // If user scrolls back up where head is bowed down, instantly wipe any alter-ego points
      if (!faceShown && points.length > 0) {
        revealPointsRef.current = [];
      }

      // Smart canvas redraw: only redraw when frame changed, brush active, or flag set
      const needsDraw =
        lastDrawnFrameRef.current !== targetFrame ||
        points.length > 0 ||
        needsRedrawRef.current;

      if (needsDraw) {
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
            lastDrawnFrameRef.current = targetFrame;
            needsRedrawRef.current = false;
          }
        }
      }

      // Rapid fade: reveal only shows at the second of hover, and vanishes immediately after hover
      if (points.length > 0) {
        const timeSinceMove = performance.now() - lastHoverTimeRef.current;
        const decayRate = timeSinceMove > 120 ? 0.14 : 0.045;
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].life -= decayRate;
          if (points[i].life <= 0) {
            points.splice(i, 1);
          }
        }
      }

      // Idle sleep check: sleep loop when progress settled, mouse settled, and no brush points remain
      const isProgressSettled = Math.abs(pDiff) < 0.0005;
      const isMouseSettled = Math.abs(mDiffX) < 0.001 && Math.abs(mDiffY) < 0.001;
      const isRedrawSettled = !needsRedrawRef.current && lastDrawnFrameRef.current === targetFrame;

      if (isProgressSettled && isMouseSettled && points.length === 0 && isRedrawSettled) {
        isRafRunningRef.current = false;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const startTick = () => {
      if (window.scrollY < (containerRef.current?.offsetHeight || 1200)) {
        isHeroVisibleRef.current = true;
      }
      if (isRafRunningRef.current || !isHeroVisibleRef.current) return;
      isRafRunningRef.current = true;
      rafId = requestAnimationFrame(tick);
    };

    // Immediate direct synchronous frame draw
    const renderDirect = () => {
      const seqList = imagesRef.current.get(activeSeqRef.current);
      if (!seqList || seqList.length === 0) return;

      const targetFrame = currentFrameIndexRef.current;
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
        const faceShown = targetFrame >= 40;
        if (faceShown) {
          drawAlterEgoReveal();
        }
        lastDrawnFrameRef.current = targetFrame;
        needsRedrawRef.current = false;
      }
    };

    const triggerRedraw = () => {
      needsRedrawRef.current = true;
      if (window.scrollY < (containerRef.current?.offsetHeight || 1200)) {
        isHeroVisibleRef.current = true;
      }
      renderDirect();
      startTick();
    };

    triggerRedrawRef.current = triggerRedraw;

    // Handle high-DPI canvas resizing
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      const targetW = Math.floor(w * dpr);
      const targetH = Math.floor(h * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastDrawnFrameRef.current = -1;
        needsRedrawRef.current = true;
        triggerRedraw();
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
      needsRedrawRef.current = true;
      startTick();

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
      startTick();
    };

    const handleMouseLeave = () => {
      lastMousePosRef.current = null;
      revealPointsRef.current = [];
      needsRedrawRef.current = true;
      startTick();
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
        startTick();
      }
    };

    const handleTouchEnd = () => {
      lastMousePosRef.current = null;
      revealPointsRef.current = [];
      needsRedrawRef.current = true;
      startTick();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    triggerRedraw();

    // IntersectionObserver pauses canvas rendering loop completely when scrolled past Hero
    const heroEl = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (heroEl) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const isAtTop = window.scrollY < (heroEl.offsetHeight || 1200);
            const isVisible = entry.isIntersecting || isAtTop;
            isHeroVisibleRef.current = isVisible;
            if (isVisible) {
              handleScroll();
              triggerRedraw();
            } else {
              isRafRunningRef.current = false;
              if (rafId) cancelAnimationFrame(rafId);
            }
          }
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(heroEl);
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseLeave={() => {
        revealPointsRef.current = [];
        lastMousePosRef.current = null;
      }}
      className="relative w-full h-[220vh] bg-[#07080a] select-none"
      aria-label="Interactive Video Scroll Hero"
    >
      {/* Pinned Sticky Viewport Window */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#07080a] flex items-center justify-center will-change-transform z-10"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        {/* Layer 1: Scroll-driven Canvas Video Player with 3D tilt */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) translate3d(calc(var(--hud-x, 0) * 22px), calc(var(--hud-y, 0) * 15px), 0) rotateX(calc(var(--hud-y, 0) * -3.5deg)) rotateY(calc(var(--hud-x, 0) * 4.5deg)) scale(1.04)`,
          }}
        >
          {/* Instant Poster Image — Guarantees immediate visual frame on refresh */}
          <img
            src="/frames/hero/frame_000.jpg"
            alt="Preethish D P"
            className="absolute inset-0 w-full h-full object-cover block"
            style={{
              zIndex: 0,
            }}
            suppressHydrationWarning
          />

          <canvas
            ref={canvasRef}
            className="relative z-[1] w-full h-full object-cover block"
            aria-label="Preethish D P — Cinematic Video Sequence"
            suppressHydrationWarning
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
              transform: `translate3d(calc(-50% + var(--hud-x, 0) * 12px), calc(-50% + var(--hud-y, 0) * 8px), 0)`,
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
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md text-[11px] font-mono tracking-widest animate-pulse shadow-2xl transition-all duration-300 ${alterEgoChar === "noir"
                ? "border-zinc-300/70 bg-black/90 text-white shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                : "border-red-500/60 bg-black/85 text-red-400 shadow-[0_0_25px_rgba(225,29,72,0.45)]"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-ping ${alterEgoChar === "noir" ? "bg-white" : "bg-[#e11d48]"
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
              <span ref={frameNumRef} className="text-zinc-400">FRM: 001/{TOTAL_FRAMES}</span>
            </div>
          )}
        </div>

        {/* Layer 4: Editorial Content Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16">
          {/* Upper Left Monogram */}
          <div
            className={`transition-all duration-1000 ease-out pointer-events-auto ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
            style={{
              transform: `translate3d(calc(var(--hud-x, 0) * 6px), calc(var(--hud-y, 0) * 4px), 0)`,
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
              className={`lg:col-span-8 transition-all duration-1000 delay-300 ease-out pointer-events-auto ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{
                transform: `translate3d(calc(var(--hud-x, 0) * 8px), calc(var(--hud-y, 0) * 6px), 0)`,
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
