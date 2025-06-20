import React from "react";
import { motion, useAnimation, easeInOut } from "framer-motion";

/**
 * DynamicBackground creates a "Liquid Aurora" animated background with:
 * - Multiple blurred, colored gradients that move with scroll (parallax)
 * - A mouse-following glow effect
 * - Fully responsive and performant
 */
// Ultra-minimal, ultra-light aurora colors
const auroraColors = [
  "rgba(96,165,250,0.10)", // blue
  "rgba(52,211,153,0.10)", // green
  "rgba(168,85,247,0.10)" // purple
];

function isAuthPage() {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return ["/login", "/register", "/reset-password"].some((p) =>
    path.startsWith(p)
  );
}

const DynamicBackground: React.FC = () => {
  const authPage = isAuthPage();

  // Hue-rotate animation for main pages
  const controls = useAnimation();

  React.useEffect(() => {
    if (!authPage) {
      controls.start({
        filter: [
          "blur(32px) hue-rotate(0deg)",
          "blur(32px) hue-rotate(60deg)",
          "blur(32px) hue-rotate(120deg)",
          "blur(32px) hue-rotate(180deg)",
          "blur(32px) hue-rotate(240deg)",
          "blur(32px) hue-rotate(300deg)",
          "blur(32px) hue-rotate(360deg)"
        ],
        transition: { duration: 40, repeat: Infinity, ease: "linear" }
      });
    }
  }, [authPage, controls]);

  // For auth pages — only slow scale
  const scaleAnim = authPage
    ? {
        scale: [1, 1.03, 1],
        transition: { duration: 18, repeat: Infinity, ease: easeInOut }
      }
    : {};

  return (
    <div
      className="pointer-events-none w-full h-full overflow-hidden fixed inset-0 z-0"
      style={{ background: "#10151c" }}
    >
      <motion.div
        animate={authPage ? scaleAnim : controls}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          background:
            "linear-gradient(120deg, rgba(34,197,94,0.10) 0%, rgba(251,191,36,0.10) 30%, rgba(56,189,248,0.10) 65%, rgba(168,85,247,0.10) 100%)",
          zIndex: 0,
          pointerEvents: "none",
          filter: authPage ? "blur(32px)" : undefined
        }}
        className="blur-[32px]"
      />
    </div>
  );
};

export default DynamicBackground;
