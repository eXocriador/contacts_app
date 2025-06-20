// frontend/src/components/home/CallToActionSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Mail,
  ChevronUp,
  HelpCircle
} from "lucide-react";

const trustedBy = [
  {
    name: "Google",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  }
];

const faqs = [
  {
    q: "Is my data secure?",
    a: "Absolutely! We use industry-standard encryption and never share your data."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time, no questions asked."
  },
  {
    q: "Is there a free trial?",
    a: "Of course! You get 14 days free, no credit card required."
  }
];

const CallToActionSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-8 relative overflow-hidden bg-gradient-to-br from-primary-900/80 via-primary-700/60 to-background/90">
      {/* Decorative abstract SVG background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="900"
          height="600"
          viewBox="0 0 900 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-5xl opacity-40 blur-2xl"
        >
          <ellipse
            cx="450"
            cy="300"
            rx="400"
            ry="180"
            fill="#22d3ee"
            fillOpacity="0.12"
          />
          <ellipse
            cx="600"
            cy="400"
            rx="200"
            ry="80"
            fill="#16a34a"
            fillOpacity="0.10"
          />
          <ellipse
            cx="300"
            cy="200"
            rx="180"
            ry="60"
            fill="#f472b6"
            fillOpacity="0.10"
          />
        </svg>
      </motion.div>
      <div className="container-custom relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-xl mx-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-primary-500/10 shadow-inner shadow-black/10 flex flex-col items-center text-center relative p-12 md:p-16"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(34, 197, 94, 0.1), transparent 70%), radial-gradient(ellipse at bottom, rgba(96, 165, 250, 0.1), transparent 70%)",
            backgroundColor: "rgba(16, 21, 28, 0.7)"
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg"
          >
            Unleash Your Network's Potential
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/80 leading-relaxed"
          >
            Stop losing contacts and opportunities. Join thousands of
            professionals who organize their network with precision and ease.
            It's simple, secure, and powerful.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <Link
              to="/register"
              className="btn-primary px-12 py-5 text-xl w-full sm:w-auto shadow-xl mb-2"
            >
              Get Started for Free
            </Link>
            <span className="text-xs text-text-secondary mt-1">
              14-day free trial. No credit card required. Cancel anytime.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
