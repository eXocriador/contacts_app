import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";

/**
 * DynamicBackground creates a "Liquid Aurora" animated background with:
 * - Multiple blurred, colored gradients that move with scroll (parallax)
 * - A mouse-following glow effect
 * - Fully responsive and performant
 */
const auroraColors = [
  "#60a5fa", // blue-400 (now first)
  "#34d399", // emerald-400 (now second)
  "#f472b6", // pink-400
  "#fbbf24" // yellow-400
];

const DynamicBackground: React.FC = () => {
  // Track scroll position for parallax
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax transforms for each aurora shape
  const y1 = scrollY * 0.08;
  const y2 = scrollY * -0.12;
  const y3 = scrollY * 0.06;
  const y4 = scrollY * -0.09;

  return (
    <div
      className="pointer-events-none w-full h-full overflow-hidden"
      style={{ background: "#10151c", position: "fixed", inset: 0, zIndex: 0 }}
    >
      {/* Aurora gradients */}
      <motion.div
        style={{
          y: y1,
          background: `radial-gradient(ellipse 60% 40% at 20% 30%, ${auroraColors[0]}99 60%, transparent 100%)`,
          willChange: "transform, opacity"
        }}
        className="absolute w-[60vw] h-[40vh] top-0 left-0 blur-[100px] opacity-60"
      />
      <motion.div
        style={{
          y: y2,
          background: `radial-gradient(ellipse 50% 60% at 80% 20%, ${auroraColors[1]}99 60%, transparent 100%)`,
          willChange: "transform, opacity"
        }}
        className="absolute w-[50vw] h-[50vh] top-0 right-0 blur-[100px] opacity-50"
      />
      <motion.div
        style={{
          y: y3,
          background: `radial-gradient(ellipse 60% 40% at 70% 80%, ${auroraColors[2]}99 60%, transparent 100%)`,
          willChange: "transform, opacity"
        }}
        className="absolute w-[60vw] h-[40vh] bottom-0 right-0 blur-[100px] opacity-50"
      />
      <motion.div
        style={{
          y: y4,
          background: `radial-gradient(ellipse 40% 60% at 10% 90%, ${auroraColors[3]}99 60%, transparent 100%)`,
          willChange: "transform, opacity"
        }}
        className="absolute w-[40vw] h-[60vh] bottom-[-20vh] left-0 blur-[100px] opacity-40"
      />
    </div>
  );
};

export default DynamicBackground;
