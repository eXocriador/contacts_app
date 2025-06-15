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
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        contain: "paint",
        isolation: "isolate"
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-black/80 dark:to-transparent" />
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto p-16 lg:p-24 bg-black/70 dark:bg-black/80 rounded-3xl shadow-2xl border border-gray-600/50 dark:border-gray-700/50">
        <div className="text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium mb-4">
              ✨ Your Digital Contact Hub
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Connect. Organize.
            <br />
            <span className="text-primary-400 relative">Thrive.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-700 dark:text-gray-200 mb-8"
          >
            Transform how you manage relationships.
            <br />
            <span className="text-primary-600 dark:text-primary-300">
              One contact at a time.
            </span>
          </motion.p>
        </div>
        <div className="text-center flex flex-col h-full justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Simplify Your Connections
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Effortlessly manage all your professional and personal contacts in
              one secure place.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-lg transition-colors duration-200 group"
              >
                Start Your Journey
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                See How It Works
                <span className="ml-2">↓</span>
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-8 text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center">
                <span className="text-primary-600 dark:text-primary-400 mr-2">
                  ✓
                </span>
                Secure & Private
              </div>
              <div className="flex items-center">
                <span className="text-primary-600 dark:text-primary-400 mr-2">
                  ✓
                </span>
                Easy to Use
              </div>
              <div className="flex items-center">
                <span className="text-primary-600 dark:text-primary-400 mr-2">
                  ✓
                </span>
                Always Available
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
