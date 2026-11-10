"use client";

import React, { useEffect, useRef } from "react";

interface EnergyRayCanvasProps {
  tilt: { x: number; y: number };
}

export function EnergyRayCanvas({ tilt }: EnergyRayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1));
    let height = (canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      height = canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    window.addEventListener("resize", handleResize);

    // ── 3D PARAMETRIC SPLINE FOR THE FLOWING ENERGY RAY ──
    // Points define the sweeping 3D arc through the section:
    // From bottom-left, curving across foreground, looping around character waist,
    // and sweeping into the top-right cosmos
    const keypoints = [
      { x: -0.15, y: 0.95, z: 1.4 },
      { x: 0.12,  y: 0.82, z: 1.2 },
      { x: 0.32,  y: 0.68, z: 0.8 },
      { x: 0.46,  y: 0.58, z: 0.3 }, // passing in front of character
      { x: 0.54,  y: 0.56, z: -0.2 }, // curving around waist
      { x: 0.68,  y: 0.48, z: -0.6 },
      { x: 0.84,  y: 0.36, z: -1.0 },
      { x: 1.15,  y: 0.15, z: -1.4 },
    ];

    // Catmull-Rom interpolation for ultra-smooth spline curve
    function getSplinePoint(t: number) {
      const p = (keypoints.length - 1) * t;
      const i0 = Math.max(0, Math.floor(p) - 1);
      const i1 = Math.floor(p);
      const i2 = Math.min(keypoints.length - 1, i1 + 1);
      const i3 = Math.min(keypoints.length - 1, i1 + 2);
      const f = p - i1;

      // Catmull-Rom formula
      const f2 = f * f;
      const f3 = f2 * f;

      const interpolate = (p0: number, p1: number, p2: number, p3: number) => {
        return (
          0.5 *
          (2 * p1 +
            (-p0 + p2) * f +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * f2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * f3)
        );
      };

      return {
        x: interpolate(keypoints[i0].x, keypoints[i1].x, keypoints[i2].x, keypoints[i3].x),
        y: interpolate(keypoints[i0].y, keypoints[i1].y, keypoints[i2].y, keypoints[i3].y),
        z: interpolate(keypoints[i0].z, keypoints[i1].z, keypoints[i2].z, keypoints[i3].z),
      };
    }

    // Spark particles travelling along the ray
    const sparkCount = 45;
    const sparks = Array.from({ length: sparkCount }, () => ({
      t: Math.random(),
      speed: 0.0025 + Math.random() * 0.0035,
      offset: (Math.random() - 0.5) * 16,
      size: 1.5 + Math.random() * 2.5,
      color: Math.random() > 0.4 ? "#ffeedd" : "#ffaa44",
    }));

    // Floating embers in background
    const emberCount = 65;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.2,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: 0.2 + Math.random() * 0.6,
      color: Math.random() > 0.4 ? "rgba(255, 50, 20," : "rgba(255, 120, 30,",
    }));

    let progress = 0;

    const render = () => {
      progress = (progress + 0.003) % 1.0;
      ctx.clearRect(0, 0, width, height);

      // Parallax offsets
      const px = tilt.x * 2.5;
      const py = tilt.y * 2.0;

      // ── 1. DRAW AMBIENT DRIFTING EMBERS ──
      embers.forEach((emb) => {
        emb.y -= emb.speedY;
        emb.x += emb.speedX;
        if (emb.y < -10) {
          emb.y = height + 10;
          emb.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(emb.x + px * 0.3, emb.y + py * 0.3, emb.size, 0, Math.PI * 2);
        ctx.fillStyle = `${emb.color}${emb.opacity})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = emb.color + "1)";
        ctx.fill();
      });

      // ── 2. DRAW FLOWING ENERGY RAY (BEAM / RIBBON) ──
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // The ray is rendered as a moving segment along the 3D spline
      // We draw 3 parallel ribbons with varying thickness and glow
      const ribbonLayers = [
        { width: 14, blur: 28, color: "rgba(255, 30, 20, 0.45)" },   // outer red volumetric aura
        { width: 6,  blur: 16, color: "rgba(255, 110, 20, 0.75)" },  // fiery orange mid-glow
        { width: 2.2, blur: 6, color: "rgba(255, 240, 210, 0.95)" }, // white-hot filament core
      ];

      const segments = 120;
      // Ray covers a length of 0.65 of the full spline, cycling continuously
      const rayLength = 0.75;
      const startT = progress;

      ribbonLayers.forEach((layer) => {
        ctx.beginPath();
        ctx.lineWidth = layer.width * (width / 1440);
        ctx.strokeStyle = layer.color;
        ctx.shadowBlur = layer.blur;
        ctx.shadowColor = layer.color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        let first = true;
        for (let i = 0; i <= segments; i++) {
          const segFrac = i / segments;
          // Wrap along path
          const t = (startT + segFrac * rayLength) % 1.0;
          const pt = getSplinePoint(t);

          // 3D perspective projection onto canvas
          const screenX = pt.x * width + px * pt.z * 10;
          const screenY = pt.y * height + py * pt.z * 8;

          if (first) {
            ctx.moveTo(screenX, screenY);
            first = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.stroke();
      });

      // ── 3. DRAW TRAVELING ENERGY SPARKS ALONG THE RAY ──
      sparks.forEach((sp) => {
        sp.t = (sp.t + sp.speed) % 1.0;
        const pt = getSplinePoint(sp.t);
        const sx = pt.x * width + px * pt.z * 10 + Math.sin(progress * 10 + sp.t * 20) * sp.offset;
        const sy = pt.y * height + py * pt.z * 8 + Math.cos(progress * 10 + sp.t * 20) * (sp.offset * 0.5);

        ctx.beginPath();
        ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = sp.color;
        ctx.fill();
      });

      // ── 4. SECONDARY COUNTER-ORBITING PULSE RING BEHIND CHARACTER ──
      // Dynamic pulsing halo ring echoing the purple circle
      const haloCenterX = width * 0.502 + px * 0.2;
      const haloCenterY = height * 0.405 + py * 0.2;
      const haloRadius = height * 0.22 + Math.sin(progress * Math.PI * 4) * 3;

      ctx.beginPath();
      ctx.arc(haloCenterX, haloCenterY, haloRadius, 0, Math.PI * 2);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "rgba(180, 50, 255, 0.45)";
      ctx.shadowBlur = 24;
      ctx.shadowColor = "rgba(190, 60, 255, 0.85)";
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [tilt]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15 select-none"
    />
  );
}
