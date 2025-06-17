import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HeroSectionProps {
  scrollToHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToHowItWorks
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/images/hero.jpg)` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl w-full bg-white/10 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Connect. Organize. <span className="text-primary-400">Thrive.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Transform how you manage relationships. One contact at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="btn btn-primary">
              Start Your Journey
            </Link>
            <button onClick={scrollToHowItWorks} className="btn btn-secondary">
              See How It Works
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
