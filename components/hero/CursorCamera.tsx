"use client";

import React, { useEffect, useRef, useState } from "react";
import HeroBackground from "./HeroBackground";
import HeroPortrait from "./HeroPortrait";
import CinematicOverlay from "./CinematicOverlay";
import FloatingElements from "./FloatingElements";

export default function CursorCamera() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalised coords for HUD readout
  const [hudCoords, setHudCoords] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);

  // References for transform elements to avoid React re-renders on 60fps
  const bgRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal sequence
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 200);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return () => clearTimeout(timer);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let velX = 0;
    let velY = 0;

    const stiffness = 0.08;
    const damping = 0.85;

    let rafId: number;
    let lastHudUpdate = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to [-1, 1] where center is 0, 0
      targetX = ((e.clientX / innerWidth) * 2 - 1);
      targetY = ((e.clientY / innerHeight) * 2 - 1);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        targetX = ((touch.clientX / innerWidth) * 2 - 1) * 0.4; // subtle on mobile
        targetY = ((touch.clientY / innerHeight) * 2 - 1) * 0.4;
      }
    };

    // Smooth physics loop with spring inertia
    const tick = (timestamp: number) => {
      const forceX = (targetX - currentX) * stiffness;
      const forceY = (targetY - currentY) * stiffness;

      velX = (velX + forceX) * damping;
      velY = (velY + forceY) * damping;

      currentX += velX;
      currentY += velY;

      // Update HUD values at 10Hz to prevent excessive React state updates
      if (timestamp - lastHudUpdate > 100) {
        setHudCoords({
          x: Math.round(currentX * 100) / 100,
          y: Math.round(currentY * 100) / 100,
        });
        lastHudUpdate = timestamp;
      }

      // Background parallax (subtle shift: -12px to +12px)
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${currentX * -15}px, ${currentY * -12}px, 0)`;
      }

      // Portrait 3D camera pan & tilt (stronger: -32px to +32px, rotate ±4deg)
      if (portraitRef.current) {
        const pX = currentX * 36;
        const pY = currentY * 24;
        const rY = currentX * 4.5;
        const rX = -currentY * 3.5;
        portraitRef.current.style.transform = `translate3d(${pX}px, ${pY}px, 0) rotateX(${rX}deg) rotateY(${rY}deg)`;
      }

      // Floating graphic elements (medium: 22px)
      if (floatingRef.current) {
        floatingRef.current.style.transform = `translate3d(${currentX * 22}px, ${currentY * 18}px, 0)`;
      }

      // Foreground Overlay (strongest: 45px)
      if (overlayRef.current) {
        overlayRef.current.style.transform = `translate3d(${currentX * 18}px, ${currentY * 14}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[720px] max-h-[1200px] overflow-hidden bg-[#07080a] select-none perspective-container"
      aria-label="Cinematic Portfolio Hero"
    >
      {/* Layer 1: Background Atmosphere, concentric rings & red slab */}
      <div ref={bgRef} className="absolute inset-0 preserve-3d will-change-transform">
        <HeroBackground
          offsetX={hudCoords.x * 20}
          offsetY={hudCoords.y * 15}
          lightX={hudCoords.x}
          lightY={hudCoords.y}
        />
      </div>

      {/* Layer 2: Floating HUD & Viewfinder Elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <FloatingElements coordX={hudCoords.x} coordY={hudCoords.y} />
      </div>

      {/* Layer 3: Main Cinematic Portrait with 3D Depth */}
      <div ref={portraitRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <HeroPortrait
          portraitX={0}
          portraitY={0}
          rotateX={0}
          rotateY={0}
          isRevealed={isRevealed}
        />
      </div>

      {/* Layer 4: Asymmetrical Editorial Typography Overlay */}
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <CinematicOverlay
          overlayX={0}
          overlayY={0}
          isRevealed={isRevealed}
        />
      </div>

      {/* Bottom Subtle Ambient Vignette Shadow to transition to next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-40" />
    </section>
  );
}
