"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";

type Alignment = "left" | "center" | "right";
type Tag = "h1" | "h2" | "h3" | "p";

type FontConfig = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
};

type AnimationConfig = {
  duration?: number;
  delay?: number;
};

type VaporizeTextCycleProps = {
  texts: string[];
  font?: FontConfig;
  color?: string;
  spread?: number;
  density?: number;
  animation?: AnimationConfig;
  alignment?: Alignment;
  tag?: Tag;
};

type Particle = {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  alpha: number;
};

const parseColor = (value: string): [number, number, number] => {
  const div = document.createElement("div");
  div.style.color = value;
  document.body.appendChild(div);
  const rgba = window.getComputedStyle(div).color;
  document.body.removeChild(div);
  const [r = 255, g = 255, b = 255] = (rgba.match(/\d+/g) || []).map(Number);
  return [r, g, b];
};

const VaporizeTextCycle = ({
  texts = ["Build Smarter.", "Build Faster."],
  font = { fontFamily: "Inter, sans-serif", fontSize: "80px", fontWeight: 700 },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = { duration: 1.5, delay: 0.5 },
  alignment = "center",
  tag = "h1",
}: VaporizeTextCycleProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [currentTextIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const [r, g, b] = useMemo(() => parseColor(color), [color]);

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || dimensions.width === 0) return;

    let startTime: number | null = null;
    let isAnimating = true;

    const render = (time: number) => {
      if (!isAnimating) return;
      const timeSinceStart = (time - (startTime || time)) / 1000;
      const delay = animation.delay ?? 0;
      const duration = animation.duration ?? 1.5;
      const progress = Math.max(0, Math.min(1, (timeSinceStart - delay) / duration));
      const ease = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      for (const p of particlesRef.current) {
        const currentX = p.x + (p.targetX - p.x) * ease;
        const currentY = p.y + (p.targetY - p.y) * ease;
        const currentAlpha = progress;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
        ctx.fillRect(currentX, currentY, 1.5, 1.5);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    const initParticles = async () => {
      await document.fonts.ready;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${dimensions.width}px`;
      canvas.style.height = `${dimensions.height}px`;

      const fontSizeVal = parseInt(font.fontSize?.replace("px", "") || "80", 10);
      ctx.font = `${font.fontWeight || 700} ${fontSizeVal}px ${font.fontFamily || "Inter, sans-serif"}`;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.textAlign = alignment;
      ctx.textBaseline = "middle";

      const text = texts[currentTextIndex];
      const x =
        alignment === "center"
          ? dimensions.width / 2
          : alignment === "left"
            ? 0
            : dimensions.width;
      const y = dimensions.height / 2;

      ctx.fillText(text, x, y);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const newParticles: Particle[] = [];
      const step = Math.max(1, Math.floor(10 - (density || 5)));

      for (let py = 0; py < canvas.height; py += step) {
        for (let px = 0; px < canvas.width; px += step) {
          const index = (py * canvas.width + px) * 4;
          const alpha = data[index + 3];
          if (alpha > 0) {
            const targetX = px / dpr;
            const targetY = py / dpr;
            const scatterX = (Math.random() - 0.5) * (spread * 50);
            const scatterY = (Math.random() - 0.5) * (spread * 50);
            newParticles.push({
              targetX,
              targetY,
              x: targetX + scatterX,
              y: targetY + scatterY,
              alpha: 0,
            });
          }
        }
      }

      particlesRef.current = newParticles;
      startTime = performance.now();
      requestAnimationFrame(render);
    };

    initParticles();

    return () => {
      isAnimating = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [alignment, animation.delay, animation.duration, currentTextIndex, density, dimensions, font.fontFamily, font.fontSize, font.fontWeight, r, g, b, spread, texts]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="block" style={{ width: "100%", height: "100%" }} />
      <div className="sr-only">{React.createElement(tag, {}, texts[currentTextIndex])}</div>
    </div>
  );
};

export default VaporizeTextCycle;
