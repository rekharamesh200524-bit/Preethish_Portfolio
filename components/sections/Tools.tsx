"use client";

import React, { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   ALL TOOLS WITH AUTHENTIC JAPANESE KANJI SEALS
──────────────────────────────────────────────────────────────── */
const TOOLS = [
  { name: "Photoshop",        category: "Design",    color: "#31A8FF", emoji: "🎨", kanji: "画" },
  { name: "Illustrator",      category: "Design",    color: "#FF9A00", emoji: "✏️", kanji: "線" },
  { name: "Premiere Pro",     category: "Video",     color: "#9999FF", emoji: "🎬", kanji: "映" },
  { name: "After Effects",    category: "Motion",    color: "#D291FF", emoji: "✨", kanji: "幻" },
  { name: "DaVinci Resolve",  category: "Video",     color: "#D4A017", emoji: "🎞️", kanji: "色" },
  { name: "Final Cut Pro",    category: "Video",     color: "#E2E2E2", emoji: "🎥", kanji: "剪" },
  { name: "Canva",            category: "Design",    color: "#00C4CC", emoji: "🖼️", kanji: "版" },
  { name: "InDesign",         category: "Design",    color: "#FF3366", emoji: "📄", kanji: "組" },
  { name: "Google Ads",       category: "Marketing", color: "#4285F4", emoji: "📊", kanji: "拡" },
  { name: "Meta Ads",         category: "Marketing", color: "#1877F2", emoji: "📱", kanji: "網" },
  { name: "SEMrush",          category: "SEO",       color: "#FF6B35", emoji: "🔍", kanji: "索" },
  { name: "Google Analytics", category: "Analytics", color: "#E8710A", emoji: "📈", kanji: "測" },
  { name: "Lightroom",        category: "Photo",     color: "#31A8FF", emoji: "📷", kanji: "光" },
  { name: "CapCut",           category: "Video",     color: "#FFFFFF", emoji: "✂️", kanji: "切" },
  { name: "MS Office",        category: "Office",    color: "#D83B01", emoji: "💼", kanji: "書" },
  { name: "PowerPoint",       category: "Office",    color: "#B7472A", emoji: "📋", kanji: "演" },
];

const NINJA_VIDEO = "/videos/Ninja_performing_light_explosion_1080p_20260930151901.mp4";

/* ────────────────────────────────────────────────────────────────
   AUTHENTIC 3D JAPANESE PARCHMENT SCROLL (MAKIMONO)
──────────────────────────────────────────────────────────────── */
interface ScrollProps {
  tool: typeof TOOLS[0];
  angle: number;
  radius: number;
  rotation: number;
  visible: boolean;
  isFrontLayer: boolean;
  onHover: (hovered: boolean) => void;
}

function Authentic3DScroll({
  tool,
  angle,
  radius,
  rotation,
  visible,
  isFrontLayer,
  onHover,
}: ScrollProps) {
  // Current angle in degrees (0 = front closest, 180 = back farthest)
  const currentAngle = ((angle + rotation) % 360 + 360) % 360;
  const rad = (currentAngle * Math.PI) / 180;
  const cosVal = Math.cos(rad); // 1 = front, -1 = back

  // Smooth cross-fade between front and back layers at the edges (-0.15 to +0.15)
  const frontWeight = Math.max(0, Math.min(1, (cosVal + 0.15) / 0.3));
  const layerOpacity = isFrontLayer ? frontWeight : 1 - frontWeight;

  // If this scroll is not meant to show in this layer, hide it completely
  if (layerOpacity <= 0.01) return null;

  // Lighting depth: front is brighter, back is subtly dimmed
  const depthBrightness = 0.72 + (cosVal + 1) * 0.14; // 0.72 to 1.0

  return (
    <div
      className="absolute top-1/2 left-1/2 select-none group"
      style={{
        transformStyle: "preserve-3d",
        transform: `
          translate(-50%, -50%)
          rotateY(${angle}deg)
          translateZ(${visible ? radius : 0}px)
        `,
        opacity: visible ? layerOpacity : 0,
        filter: `brightness(${depthBrightness})`,
        pointerEvents: visible && isFrontLayer ? "auto" : "none",
        transition: visible
          ? "transform 650ms cubic-bezier(0.18, 0.9, 0.32, 1), opacity 350ms ease"
          : "transform 350ms ease-in, opacity 250ms ease",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* ── 3D PHYSICAL SCROLL BODY (Compact width = generous spacing between scrolls) ── */}
      <div
        className="relative flex items-center transition-all duration-300 ease-out cursor-pointer group-hover:scale-110"
        style={{
          width: "155px",
          height: "54px",
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.95)) drop-shadow(0 2px 6px rgba(0,0,0,0.75))",
        }}
      >
        {/* ── LEFT WOODEN ROLLER SPINDLE (JIKUGI) ── */}
        <div className="relative z-30 flex flex-col items-center -mr-[2px] shrink-0">
          {/* Top Turned Brass Finial */}
          <div
            className="w-3 h-2.5 rounded-t-full shadow-md"
            style={{
              background: "linear-gradient(180deg, #fff3b0 0%, #d4af37 40%, #7d5910 100%)",
              borderTop: "1px solid #fffdf0",
              borderLeft: "1px solid #fffdf0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }}
          />

          {/* Wooden Roller Body */}
          <div
            className="w-2.5 h-[58px] rounded-[1px] relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #120601 0%, #3a1908 30%, #632d10 55%, #291004 85%, #0e0401 100%)",
              borderLeft: "1px solid rgba(255,245,215,0.3)",
              borderRight: "1px solid rgba(0,0,0,0.85)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.9)",
            }}
          >
            <div className="absolute inset-y-0 left-[35%] w-[1px] bg-gradient-to-b from-white/35 via-white/20 to-white/35" />
          </div>

          {/* Bottom Turned Brass Finial */}
          <div
            className="w-3 h-2.5 rounded-b-full shadow-md"
            style={{
              background: "linear-gradient(0deg, #fff3b0 0%, #d4af37 40%, #7d5910 100%)",
              borderBottom: "1px solid #fffdf0",
              borderLeft: "1px solid #fffdf0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }}
          />

          {/* Hanging Red Silk Tassel */}
          <div className="flex flex-col items-center -mt-0.5">
            <div className="w-[1.5px] h-2.5 bg-gradient-to-b from-[#b81d1d] to-[#6e0c0c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#f5d77f] to-[#9e7619] shadow-sm -mt-0.5" />
          </div>
        </div>

        {/* ── PARCHMENT PAPER SHEET (HONSHI) ── */}
        <div
          className="relative flex-1 h-[48px] flex flex-col justify-between overflow-hidden z-10 rounded-[1px]"
          style={{
            background: `
              radial-gradient(ellipse at 50% 20%, #fdf5e2 0%, #f4e1ba 40%, #e0bd7b 85%, #c89e57 100%)
            `,
            boxShadow: `
              inset 12px 0 10px -3px rgba(45, 17, 4, 0.75),
              inset -12px 0 10px -3px rgba(45, 17, 4, 0.75),
              inset 0 2px 4px rgba(55, 22, 5, 0.35),
              inset 0 -2px 4px rgba(55, 22, 5, 0.35)
            `,
            borderTop: "1px solid #633612",
            borderBottom: "1px solid #633612",
          }}
        >
          {/* Top Silk Brocade Trim (Kinran Fabric) */}
          <div
            className="w-full h-[2.5px] shrink-0 border-b border-[#c99a2c]/60"
            style={{
              background: "repeating-linear-gradient(45deg, #7a1f14, #7a1f14 2px, #942b1d 2px, #942b1d 4px)",
            }}
          />

          {/* Parchment Content */}
          <div className="relative flex-1 flex items-center justify-between px-2 py-0.5">
            {/* Paper fiber texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(80,38,10,0.2) 3px, rgba(80,38,10,0.2) 4px)",
              }}
            />

            {/* Left: Traditional Red Cinnabar Hanko Seal */}
            <div
              className="relative w-6 h-6 rounded-[2px] bg-[#9e1c1c] border border-[#690e0e] shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] flex items-center justify-center shrink-0 transform -rotate-2 group-hover:rotate-0 transition-transform"
              title={`${tool.name} - Shinobi Seal`}
            >
              <div className="absolute inset-[1px] border border-[#ffdb80]/40 rounded-[1px] pointer-events-none" />
              <span className="font-serif font-black text-[#ffeaad] text-[11px] leading-none drop-shadow-sm select-none">
                {tool.kanji}
              </span>
            </div>

            {/* Middle: Tool Emoji, Name & Category */}
            <div className="min-w-0 flex-1 flex items-center gap-1.5 pl-1.5 pr-0.5">
              <span className="text-base leading-none filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] shrink-0 select-none">
                {tool.emoji}
              </span>

              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span className="font-heading font-black text-[11px] text-[#1c0a02] truncate leading-tight group-hover:text-[#9e1c1c] transition-colors">
                  {tool.name}
                </span>
                <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#633512] font-semibold truncate leading-tight">
                  {tool.category}
                </span>
              </div>
            </div>

            {/* Right: Color Silk Thread Marker */}
            <div
              className="w-1 h-4 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: tool.color }}
            />
          </div>

          {/* Bottom Silk Brocade Trim (Kinran Fabric) */}
          <div
            className="w-full h-[2.5px] shrink-0 border-t border-[#c99a2c]/60"
            style={{
              background: "repeating-linear-gradient(45deg, #7a1f14, #7a1f14 2px, #942b1d 2px, #942b1d 4px)",
            }}
          />
        </div>

        {/* ── RIGHT WOODEN ROLLER SPINDLE WITH COILED PARCHMENT ── */}
        <div className="relative z-30 flex flex-col items-center -ml-[2px] shrink-0">
          {/* Top Turned Brass Finial */}
          <div
            className="w-3 h-2.5 rounded-t-full shadow-md"
            style={{
              background: "linear-gradient(180deg, #fff3b0 0%, #d4af37 40%, #7d5910 100%)",
              borderTop: "1px solid #fffdf0",
              borderRight: "1px solid #fffdf0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }}
          />

          {/* Roller Rod with coiled paper roll layers */}
          <div
            className="w-3 h-[58px] rounded-[1px] relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #d8b472 0%, #ecd499 22%, #291004 46%, #52260c 78%, #140501 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.35)",
              borderRight: "1px solid rgba(0,0,0,0.85)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.9)",
            }}
          >
            <div className="absolute inset-y-0 left-0 w-[1.5px] bg-[#fff8e7]/90" />
            <div className="absolute inset-y-0 left-[1.5px] w-[1px] bg-[#75441b]" />
            <div className="absolute inset-y-0 left-[35%] w-[1px] bg-white/20" />
          </div>

          {/* Bottom Turned Brass Finial */}
          <div
            className="w-3 h-2.5 rounded-b-full shadow-md"
            style={{
              background: "linear-gradient(0deg, #fff3b0 0%, #d4af37 40%, #7d5910 100%)",
              borderBottom: "1px solid #fffdf0",
              borderRight: "1px solid #fffdf0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.8)",
            }}
          />

          {/* Hanging Red Silk Tassel */}
          <div className="flex flex-col items-center -mt-0.5">
            <div className="w-[1.5px] h-2.5 bg-gradient-to-b from-[#b81d1d] to-[#6e0c0c]" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-b from-[#f5d77f] to-[#9e7619] shadow-sm -mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────────────────────── */
export default function Tools() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [toolsVisible, setToolsVisible]     = useState(false);
  const [flashActive, setFlashActive]       = useState(false);

  // Video explosion threshold
  const FLASH_THRESHOLD = 0.45;
  const flashFired      = useRef(false);

  /* ── 3D Carousel Cylinder State ── */
  const [rotation, setRotation] = useState(0);
  const rotationRef             = useRef(0);
  const isHoveredRef            = useRef(false);
  const isDraggingRef           = useRef(false);
  const startXRef               = useRef(0);
  const startRotRef             = useRef(0);

  // Responsive radius: larger radius + compact 155px scrolls = generous spacing between scrolls!
  const [radius, setRadius] = useState(580);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(320);
      else if (w < 1024) setRadius(450);
      else setRadius(580);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── 3D Auto-Rotation Loop ── */
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (toolsVisible && !isHoveredRef.current && !isDraggingRef.current) {
        rotationRef.current = (rotationRef.current + 0.25) % 360;
        setRotation(rotationRef.current);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [toolsVisible]);

  /* ── Interactive Drag to Spin Carousel ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startRotRef.current = rotationRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    rotationRef.current = (startRotRef.current + dx * 0.35) % 360;
    setRotation(rotationRef.current);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  /* ── Scroll driver ── */
  useEffect(() => {
    const tick = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect     = section.getBoundingClientRect();
      const total    = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / total));

      setScrollProgress(progress);

      // Scrub video
      const vid = videoRef.current;
      if (vid && vid.readyState >= 2 && vid.duration) {
        vid.currentTime = progress * vid.duration;

        // Detect crossing flash threshold
        const frac = vid.currentTime / vid.duration;
        if (!flashFired.current && frac >= FLASH_THRESHOLD) {
          flashFired.current = true;
          setFlashActive(true);
          setTimeout(() => setFlashActive(false), 550);
          setTimeout(() => setToolsVisible(true), 120);
        }

        if (flashFired.current && frac < FLASH_THRESHOLD - 0.05) {
          flashFired.current = false;
          setToolsVisible(false);
        }
      } else {
        // Fallback
        if (!flashFired.current && progress >= 0.38) {
          flashFired.current = true;
          setFlashActive(true);
          setTimeout(() => setFlashActive(false), 550);
          setTimeout(() => setToolsVisible(true), 120);
        }
        if (flashFired.current && progress < 0.3) {
          flashFired.current = false;
          setToolsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", tick, { passive: true });
    tick();
    return () => window.removeEventListener("scroll", tick);
  }, []);

  /* ── Prevent video audio / ensure playsInline ── */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.pause();
    vid.muted = true;
    vid.playsInline = true;
    vid.preload = "auto";
  }, []);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative bg-[#07080a] text-white"
      style={{ height: "300vh" }}
    >
      {/* ── Sticky Viewport ── */}
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#07080a]"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* ── Ambient deep aura glow ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] transition-all duration-700"
            style={{
              width: toolsVisible ? "950px" : "400px",
              height: toolsVisible ? "950px" : "400px",
              background: toolsVisible
                ? "radial-gradient(circle, rgba(225,29,72,0.2) 0%, rgba(212,160,23,0.15) 45%, rgba(7,8,10,0) 70%)"
                : "radial-gradient(circle, rgba(225,29,72,0.06) 0%, rgba(7,8,10,0) 70%)",
            }}
          />
        </div>

        {/* ── White explosion flash overlay ── */}
        <div
          className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, #ffffff 40%, #ffeedd 100%)",
            opacity: flashActive ? 0.95 : 0,
          }}
        />

        {/* ── Section label (top left, comfortably below fixed navbar) ── */}
        <div className="absolute top-24 sm:top-28 left-6 sm:left-12 z-30 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e11d48]">
              04 // Arsenal
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase text-white leading-tight">
            TOOLS &amp; <br />
            <span className="text-zinc-600 font-light">WEAPONS</span>
          </h2>
        </div>

        {/* ── Scroll progress hint (top right, comfortably below fixed navbar) ── */}
        <div className="absolute top-24 sm:top-28 right-6 sm:right-12 z-30 pointer-events-none text-right">
          <div
            className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase transition-opacity duration-500"
            style={{ opacity: toolsVisible ? 0.4 : 0.85 }}
          >
            {scrollProgress < 0.1 ? "SCROLL TO CHARGE" : scrollProgress < FLASH_THRESHOLD ? "CHARGING POWER..." : "3D ORBIT ACTIVE"}
          </div>

          <div
            className="mt-2 ml-auto h-[2px] bg-white/10 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: "110px" }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#e11d48] to-[#f59e0b] rounded-full transition-all duration-75"
              style={{ width: `${Math.min(100, (scrollProgress / FLASH_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            LAYER 1: BACK SCROLLS (zIndex: 5)
            These scrolls pass BEHIND the Ninja!
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            zIndex: 5,
          }}
        >
          <div
            className="relative"
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `rotateX(18deg) translateY(75px) rotateY(${rotation}deg)`,
              willChange: "transform",
            }}
          >
            {TOOLS.map((tool, index) => {
              const angle = (index / TOOLS.length) * 360;
              return (
                <Authentic3DScroll
                  key={`back-${tool.name}`}
                  tool={tool}
                  angle={angle}
                  radius={radius}
                  rotation={rotation}
                  visible={toolsVisible}
                  isFrontLayer={false}
                  onHover={(h) => {
                    isHoveredRef.current = h;
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            LAYER 2: NINJA VIDEO (zIndex: 10)
            Pushed down 75px so navbar NEVER covers the ninja's head!
            The ninja is physically IN FRONT of the Back Scrolls!
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden"
          style={{
            top: "75px", // Clears the fixed navbar completely!
            zIndex: 10,
          }}
        >
          <video
            ref={videoRef}
            src={NINJA_VIDEO}
            className="w-full h-full object-cover"
            style={{
              objectPosition: "center 22%", // Frames ninja's head and power stance cleanly in view
              mixBlendMode: "screen",        // Transparent black allows back scrolls to be seen around ninja!
              filter: "contrast(1.08) brightness(0.98)",
            }}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          />

          {/* Vignette to smoothly soften video boundaries */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 75% 60% at 50% 35%, transparent 35%, rgba(7,8,10,0.5) 70%, rgba(7,8,10,0.95) 100%)",
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════════════
            LAYER 3: FRONT SCROLLS (zIndex: 20)
            These scrolls pass IN FRONT of the Ninja!
        ════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            zIndex: 20,
          }}
        >
          <div
            className="relative pointer-events-auto cursor-grab active:cursor-grabbing"
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transform: `rotateX(18deg) translateY(75px) rotateY(${rotation}deg)`,
              willChange: "transform",
            }}
          >
            {TOOLS.map((tool, index) => {
              const angle = (index / TOOLS.length) * 360;
              return (
                <Authentic3DScroll
                  key={`front-${tool.name}`}
                  tool={tool}
                  angle={angle}
                  radius={radius}
                  rotation={rotation}
                  visible={toolsVisible}
                  isFrontLayer={true}
                  onHover={(h) => {
                    isHoveredRef.current = h;
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── HUD INSTRUCTION BANNER (Bottom Center) ── */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center transition-all duration-700"
          style={{
            opacity: toolsVisible ? 1 : 0,
            transform: toolsVisible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07080a]/85 border border-[#d4af37]/35 backdrop-blur-md shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#f5d282] font-bold">
              3D SHINOBI ARSENAL // DRAG TO SPIN • HOVER TO INSPECT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
