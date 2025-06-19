import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * DynamicBackground creates a "Liquid Aurora" animated background with:
 * - Multiple blurred, colored gradients that move with scroll (parallax)
 * - A mouse-following glow effect
 * - Fully responsive and performant
 */
const auroraColors = ["#60a5fa44", "#34d39944", "#f472b644", "#fbbf2444"];

const isHome =
  typeof window !== "undefined" && window.location.pathname === "/";

const DynamicBackground: React.FC = () => {
  // Parallax effect with scroll
  const { scrollY } = useScroll();
  // Each layer moves at a different rate
  const y1 = useTransform(scrollY, [0, 600], [0, 60]);
  const y2 = useTransform(scrollY, [0, 600], [0, 100]);
  const y3 = useTransform(scrollY, [0, 600], [0, -80]);
  const y4 = useTransform(scrollY, [0, 600], [0, -120]);

  // Mouse-following glow
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      frame && cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setMouse({ x, y });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      frame && cancelAnimationFrame(frame);
    };
  }, []);

  // Calculate glow position and style
  const glowStyle = {
    left: `calc(${mouse.x * 100}% - 200px)`,
    top: `calc(${mouse.y * 100}% - 200px)`,
    background: `radial-gradient(circle 200px at center, #34d39955 0%, #60a5fa33 60%, transparent 100%)`,
    pointerEvents: "none"
  } as React.CSSProperties;

  return (
    <div
      className="pointer-events-none w-full h-full overflow-hidden fixed inset-0 z-0"
      style={{ background: "#10151c" }}
    >
      {/* Parallax Aurora Gradients */}
      <motion.div
        style={{
          y: y1,
          background: `radial-gradient(ellipse 60% 40% at 20% 30%, ${auroraColors[0]} 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] top-0 left-0 blur-[40px]"
      />
      <motion.div
        style={{
          y: y2,
          background: `radial-gradient(ellipse 50% 60% at 80% 20%, ${auroraColors[1]} 60%, transparent 100%)`
        }}
        className="absolute w-[50vw] h-[50vh] top-0 right-0 blur-[40px]"
      />
      <motion.div
        style={{
          y: y3,
          background: `radial-gradient(ellipse 60% 40% at 70% 80%, ${auroraColors[2]} 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] bottom-0 right-0 blur-[40px]"
      />
      <motion.div
        style={{
          y: y4,
          background: `radial-gradient(ellipse 60% 80% at 10% 90%, ${auroraColors[3]} 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[80vh] bottom-[-30vh] left-0 blur-[40px]"
      />
      {/* Mouse-following Glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          ...glowStyle,
          zIndex: 1,
          transition:
            "left 0.12s cubic-bezier(.4,0,.2,1), top 0.12s cubic-bezier(.4,0,.2,1)"
        }}
      />
    </div>
  );
};

export default DynamicBackground;
