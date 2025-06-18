import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollDownArrowProps {
  targetId: string;
  className?: string;
}

const ScrollDownArrow: React.FC<ScrollDownArrowProps> = ({
  targetId,
  className = ""
}) => {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <motion.button
      onClick={handleClick}
      className={
        "absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex flex-col items-center group " +
        className
      }
      aria-label="Scroll down"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      style={{ filter: "drop-shadow(0 4px 24px rgba(34,211,238,0.15))" }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-3 shadow-xl group-hover:from-primary-600 group-hover:to-primary-700 transition-colors border-4 border-background/80 backdrop-blur"
      >
        <ChevronDown className="w-7 h-7 text-white drop-shadow" />
      </motion.div>
      <span className="text-xs text-primary-500 mt-2 font-semibold tracking-wide select-none group-hover:text-primary-400 transition-colors">
        Далі
      </span>
    </motion.button>
  );
};

export default ScrollDownArrow;
