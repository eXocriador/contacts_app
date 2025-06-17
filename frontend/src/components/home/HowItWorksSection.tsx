import React from "react";
import { motion } from "framer-motion";
import { UserPlus, PlusCircle, Settings } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16"
        >
          How It Works in 3 Easy Steps
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: <UserPlus className="w-12 h-12" />,
              title: "1. Create Your Account",
              description:
                "Quickly sign up with your email or Google account to get started in seconds."
            },
            {
              icon: <PlusCircle className="w-12 h-12" />,
              title: "2. Add Your Contacts",
              description:
                "Easily add new contacts with names, emails, and phone numbers. Upload photos to personalize."
            },
            {
              icon: <Settings className="w-12 h-12" />,
              title: "3. Manage & Access",
              description:
                "Edit, delete, and mark contacts as favorites. Access your list from any device, anytime."
            }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="text-primary-500 mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
