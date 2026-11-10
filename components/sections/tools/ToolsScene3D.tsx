"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ToolsScene3DProps {
  rotation: number;
  mousePos: { x: number; y: number };
  isDragging: boolean;
  activeCategory: string;
}

export default function ToolsScene3D({
  rotation,
  mousePos,
  isDragging,
  activeCategory,
}: ToolsScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  // References to animate without re-triggering React state
  const rotationRef = useRef(rotation);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    rotationRef.current = rotation;
    mousePosRef.current = mousePos;
  }, [rotation, mousePos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── SCENE & CAMERA ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 9.2);

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Attach canvas
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // ── ENERGY RINGS GROUP (ORBITS WITH GALAXY) ──
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    // Ring 1: Inner Fiery Crimson Torus (Tilted steep angle)
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.038, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff2200,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.38;
    ring1.rotation.y = Math.PI * 0.12;
    ringsGroup.add(ring1);

    // Ring 2: Middle Vibrant Amber Orange Torus (Counter-tilt)
    const ringGeo2 = new THREE.TorusGeometry(3.3, 0.03, 16, 140);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.32;
    ring2.rotation.z = Math.PI * 0.15;
    ringsGroup.add(ring2);

    // Ring 3: Outer Planetary Horizon Ring (Wide & elegant)
    const ringGeo3 = new THREE.TorusGeometry(4.4, 0.024, 16, 160);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xff9900,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = Math.PI * 0.22;
    ring3.rotation.y = -Math.PI * 0.28;
    ringsGroup.add(ring3);

    // Ring 4: Core Equator Pulse Ring
    const ringGeo4 = new THREE.TorusGeometry(1.65, 0.045, 16, 100);
    const ringMat4 = new THREE.MeshBasicMaterial({
      color: 0xff1133,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const ring4 = new THREE.Mesh(ringGeo4, ringMat4);
    ring4.rotation.x = Math.PI * 0.52;
    ringsGroup.add(ring4);

    // Orbiting Glowing Nodes on Rings
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });
    const node1 = new THREE.Mesh(nodeGeo, nodeMat);
    const node2 = new THREE.Mesh(nodeGeo, nodeMat);
    const node3 = new THREE.Mesh(nodeGeo, nodeMat);
    ring1.add(node1);
    ring2.add(node2);
    ring3.add(node3);

    // ── VORTEX PARTICLE SYSTEM (1000+ EMBERS) ──
    const particleCount = 1100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const angles = new Float32Array(particleCount);
    const radii = new Float32Array(particleCount);

    const emberColors = [
      new THREE.Color(0xff1a1a), // Vivid Crimson
      new THREE.Color(0xff5500), // Fiery Orange
      new THREE.Color(0xffaa00), // Amber Gold
      new THREE.Color(0xffe6b8), // White-Hot Flare
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 5.8;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8.0;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const chosenColor = emberColors[Math.floor(Math.random() * emberColors.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;

      scales[i] = 0.035 + Math.random() * 0.09;
      speeds[i] = 0.003 + Math.random() * 0.009;
      angles[i] = angle;
      radii[i] = radius;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas gradient
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(255,120,40,0.85)");
      grad.addColorStop(0.6, "rgba(255,30,10,0.4)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 3D CYBER REFLECTION FLOOR GRID ──
    const gridHelper = new THREE.GridHelper(18, 36, 0xff2200, 0x1f1f2e);
    gridHelper.position.y = -2.85;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    scene.add(gridHelper);

    // Concentric Neon Floor Rings
    for (let r = 2; r <= 8; r += 2) {
      const floorRingGeo = new THREE.RingGeometry(r - 0.02, r, 64);
      const floorRingMat = new THREE.MeshBasicMaterial({
        color: r % 4 === 0 ? 0xff2200 : 0xff7700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: Math.max(0.04, 0.22 - r * 0.02),
        blending: THREE.AdditiveBlending,
      });
      const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
      floorRing.rotation.x = Math.PI * 0.5;
      floorRing.position.y = -2.84;
      scene.add(floorRing);
    }

    // ── DYNAMIC LIGHTS ──
    const ambientLight = new THREE.AmbientLight(0x0f1118, 2.0);
    scene.add(ambientLight);

    const crimsonLight = new THREE.PointLight(0xff1a33, 4.5, 18);
    crimsonLight.position.set(-3, 1.5, 3);
    scene.add(crimsonLight);

    const orangeLight = new THREE.PointLight(0xff7700, 4.0, 18);
    orangeLight.position.set(3, -1, 3);
    scene.add(orangeLight);

    const coreLight = new THREE.PointLight(0xffffff, 2.5, 8);
    coreLight.position.set(0, 0, 0.5);
    scene.add(coreLight);

    // ── INTERSECTION OBSERVER FOR PERFORMANCE ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // ── RESIZE HANDLER ──
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ── ANIMATION TICK ──
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera mouse parallax
      const targetCamX = mousePosRef.current.x * 1.35;
      const targetCamY = 0.4 + mousePosRef.current.y * 0.85;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.lookAt(0, 0.1, 0);

      // Rings continuous orbital revolution
      const rotY = (rotationRef.current * Math.PI) / 180;
      ringsGroup.rotation.y = rotY;

      // Independent tumbling for inner rings
      ring1.rotation.z = elapsed * 0.65;
      ring2.rotation.y = -elapsed * 0.5;
      ring3.rotation.z = elapsed * 0.35;

      // Node movements on rings
      node1.position.set(Math.cos(elapsed * 2.2) * 2.4, Math.sin(elapsed * 2.2) * 2.4, 0);
      node2.position.set(Math.cos(-elapsed * 1.8) * 3.3, Math.sin(-elapsed * 1.8) * 3.3, 0);
      node3.position.set(Math.cos(elapsed * 1.4) * 4.4, Math.sin(elapsed * 1.4) * 4.4, 0);

      // Core ring breathing pulse
      const pulse = 1.0 + Math.sin(elapsed * 3.5) * 0.07;
      ring4.scale.set(pulse, pulse, pulse);

      // Lights dynamic orbit
      crimsonLight.position.x = Math.sin(elapsed * 0.8) * 4.5;
      crimsonLight.position.z = Math.cos(elapsed * 0.8) * 4.5;
      crimsonLight.intensity = 3.5 + Math.sin(elapsed * 4.0) * 0.8;

      orangeLight.position.x = Math.cos(-elapsed * 0.7) * 4.5;
      orangeLight.position.z = Math.sin(-elapsed * 0.7) * 4.5;

      // Particles swirl & rise
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        angles[i] += speeds[i] * 1.4;
        const currentR = radii[i];
        posArray[i * 3] = Math.cos(angles[i]) * currentR;
        posArray[i * 3 + 2] = Math.sin(angles[i]) * currentR;

        // Upward float
        posArray[i * 3 + 1] += speeds[i] * 0.8;
        if (posArray[i * 3 + 1] > 4.5) {
          posArray[i * 3 + 1] = -3.5;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      // Clean disposal of Three.js resources
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      ringGeo4.dispose();
      ringMat4.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();
      gridHelper.dispose();
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 1 }}
    />
  );
}
