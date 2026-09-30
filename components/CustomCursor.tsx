"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device is touch / mobile
    const checkTouch = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor-expand]'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp trailing for ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#e11d48] rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
        aria-hidden="true"
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out border ${isHovered
            ? "w-14 h-14 -ml-7 -mt-7 border-[#e11d48]/80 bg-[#e11d48]/10 scale-100 backdrop-blur-[0.5px]"
            : "w-8 h-8 -ml-4 -mt-4 border-white/30 bg-transparent scale-100"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
    </>
  );
}