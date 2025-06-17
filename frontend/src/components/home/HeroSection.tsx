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
    <section className="relative min-h-[calc(80vh)] flex items-center justify-center p-4 text-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-background.jpg" // 👈 Add your image to the /public folder
          alt="Abstract background"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-background/70"></div>{" "}
        {/* Dark overlay */}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-20 max-w-4xl w-full"
      >
        {/* ... rest of the component is unchanged ... */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-text-default">The Future of </span>
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Contact Management
          </span>
        </h1>

        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
          Seamlessly organize, access, and manage your contacts from anywhere.
          Secure, intuitive, and built for modern connections.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary px-8 py-3 text-lg">
            Get Started for Free
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className="btn-secondary px-8 py-3 text-lg"
          >
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
};
