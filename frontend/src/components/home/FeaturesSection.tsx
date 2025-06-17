// frontend/src/components/home/FeaturesSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Cloud } from "lucide-react";

export const FeaturesSection = () => {
  return (
    // 👇 ЗМІНІТЬ ЦЕЙ РЯДОК
    // БУЛО: <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
    // СТАЛО:
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Why You'll Love It
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Smartphone className="w-12 h-12" />,
              title: "Intuitive Design",
              description:
                "A clean, modern interface that makes managing your contacts a breeze."
            },
            {
              icon: <Cloud className="w-12 h-12" />,
              title: "Secure Cloud Sync",
              description:
                "Your contacts are automatically synced and backed up in the cloud."
            },
            {
              icon: <Shield className="w-12 h-12" />,
              title: "Cross-Platform Access",
              description:
                "Access your contacts from any device, anywhere, anytime."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface border-t border-border  p-8 rounded-2xl shadow-lg" //bg-surface border-t border-border mt-auto
            >
              <div className="text-primary-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
