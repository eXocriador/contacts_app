import React from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <motion.button
      onClick={handleClick}
      className="absolute left-1/2 -translate-x-1/2 bottom-8 z-30 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-4 rounded-full shadow-xl border-4 border-background/80 backdrop-blur flex items-center justify-center hover:from-primary-600 hover:to-primary-700 transition-colors focus:outline-none"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.97 }}
      style={{ filter: "drop-shadow(0 4px 24px rgba(34,211,238,0.18))" }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-7 h-7 text-white drop-shadow" />
    </motion.button>
  );
};

export default ScrollToTopButton;
