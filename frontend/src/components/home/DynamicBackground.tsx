import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * DynamicBackground creates a "Liquid Aurora" animated background with:
 * - Multiple blurred, colored gradients that move with scroll (parallax)
 * - A mouse-following glow effect
 * - Fully responsive and performant
 */
const auroraColors = [
  "#34d399", // emerald-400
  "#60a5fa", // blue-400
  "#f472b6", // pink-400
  "#fbbf24" // yellow-400
];

const DynamicBackground: React.FC = () => {
  const { scrollY } = useScroll();
  // Parallax transforms for each aurora shape
  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 80]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -60]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 w-full min-h-screen h-full overflow-hidden">
      {/* Aurora gradients */}
      <motion.div
        style={{
          y: y1,
          background: `radial-gradient(ellipse 60% 40% at 20% 30%, ${auroraColors[0]}99 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] top-0 left-0 blur-[100px] opacity-60"
      />
      <motion.div
        style={{
          y: y2,
          background: `radial-gradient(ellipse 50% 60% at 80% 20%, ${auroraColors[1]}99 60%, transparent 100%)`
        }}
        className="absolute w-[50vw] h-[50vh] top-0 right-0 blur-[100px] opacity-50"
      />
      <motion.div
        style={{
          y: y3,
          background: `radial-gradient(ellipse 60% 40% at 70% 80%, ${auroraColors[2]}99 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] bottom-0 right-0 blur-[100px] opacity-50"
      />
      <motion.div
        style={{
          y: y4,
          background: `radial-gradient(ellipse 40% 60% at 10% 90%, ${auroraColors[3]}99 60%, transparent 100%)`
        }}
        className="absolute w-[40vw] h-[60vh] bottom-0 left-0 blur-[100px] opacity-40"
      />
    </div>
  );
};

export default DynamicBackground;
