// frontend/src/components/home/CallToActionSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-100">
            Join thousands of users who are already managing their contacts more
            efficiently. Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 bg-surface text-text-default font-semibold rounded-lg hover:bg-surface-hover transition-colors"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-surface hover:text-text-default transition-colors"
            >
              View Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
