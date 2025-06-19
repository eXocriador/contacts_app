import React from "react";
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
  return (
    <div
      className="pointer-events-none w-full h-full overflow-hidden"
      style={{ background: "#10151c" }}
    >
      {/* Static aurora background, no animation */}
      <div
        style={{
          background: `radial-gradient(ellipse 60% 40% at 20% 30%, #60a5fa44 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] top-0 left-0 blur-[40px]"
      />
      <div
        style={{
          background: `radial-gradient(ellipse 50% 60% at 80% 20%, #34d39944 60%, transparent 100%)`
        }}
        className="absolute w-[50vw] h-[50vh] top-0 right-0 blur-[40px]"
      />
      <div
        style={{
          background: `radial-gradient(ellipse 60% 40% at 70% 80%, #f472b644 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[40vh] bottom-0 right-0 blur-[40px]"
      />
      <div
        style={{
          background: `radial-gradient(ellipse 60% 80% at 10% 90%, #fbbf2444 60%, transparent 100%)`
        }}
        className="absolute w-[60vw] h-[80vh] bottom-[-30vh] left-0 blur-[40px]"
      />
    </div>
  );
};

export default DynamicBackground;
