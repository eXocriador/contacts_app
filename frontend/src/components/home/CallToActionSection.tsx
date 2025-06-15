import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg my-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
        >
          Ready to Get Started?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
        >
          Join thousands of users who trust our platform to manage their
          contacts efficiently.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/register"
            className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
          >
            Sign Up Now for Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
