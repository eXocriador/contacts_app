import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  scrollToHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToHowItWorks
}) => {
  // Subtle animated gradient overlay
  const controls = useAnimation();
  React.useEffect(() => {
    controls.start({
      filter: [
        "blur(24px) hue-rotate(0deg)",
        "blur(24px) hue-rotate(60deg)",
        "blur(24px) hue-rotate(120deg)",
        "blur(24px) hue-rotate(180deg)",
        "blur(24px) hue-rotate(240deg)",
        "blur(24px) hue-rotate(300deg)",
        "blur(24px) hue-rotate(360deg)"
      ],
      transition: { duration: 36, repeat: Infinity, ease: "linear" }
    });
  }, [controls]);

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 text-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-[#10151c]">
        <img
          src="/images/hero-green.webp"
          alt="Abstract background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95"></div>
        {/* Animated color gradient overlay */}
        <motion.div
          animate={controls}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(120deg, rgba(34,197,94,0.10) 0%, rgba(251,191,36,0.10) 30%, rgba(56,189,248,0.10) 65%, rgba(168,85,247,0.10) 100%)",
            pointerEvents: "none"
          }}
          className="w-full h-full blur-[24px]"
        />
      </div>

      {/* Floating elements for modern look */}
      <div className="absolute inset-0 z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-primary-600/10 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 max-w-5xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-text-default">The Future of </span>
            <span className="text-gradient">Contact Management</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Seamlessly organize, access, and manage your contacts from anywhere.
          Secure, intuitive, and built for modern connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/register" className="btn-primary text-lg px-10 py-4">
            Get Started for Free
          </Link>
          <motion.button
            onClick={scrollToHowItWorks}
            className="relative flex items-center gap-2 btn-ghost text-lg px-10 py-4 group focus:outline-none overflow-hidden border border-cyan-400"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Animated glow using a pseudo-element for performance */}
            <motion.span
              aria-hidden
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.18) 0%, transparent 100%)",
                filter: "blur(8px)"
              }}
            />
            <span className="font-semibold relative z-10">Learn More</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="ml-2 flex items-center relative z-10"
            >
              <ChevronDown className="w-6 h-6 text-primary-500 group-hover:text-primary-600 transition-colors drop-shadow" />
            </motion.span>
            <span className="sr-only">Scroll to next section</span>
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-text-secondary"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm font-medium">10,000+ Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm font-medium">99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm font-medium">Bank-level Security</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
