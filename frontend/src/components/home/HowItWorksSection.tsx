import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UserPlus, Search, Share, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Add Contacts",
    description:
      "Easily add new contacts with their name, email, phone number, and photo. Organize them by type."
  },
  {
    icon: Search,
    title: "Find & Manage",
    description:
      "Search through your contacts instantly. Mark favorites and keep everything organized."
  },
  {
    icon: Share,
    title: "Stay Connected",
    description:
      "Access your contacts from any device. Your data is always in sync and secure."
  },
  {
    icon: Sparkles,
    title: "Enjoy Productivity",
    description:
      "Experience a modern, distraction-free interface that helps you focus on what matters most."
  }
];

export const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section
      id="how-it-works"
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      <div className="container-custom relative z-10 flex flex-col justify-center items-center w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-default mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Get started in minutes with our simple four-step process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-primary-500/10 p-10 flex flex-col items-center min-h-[340px] group hover:scale-105 transition-transform duration-300"
            >
              {/* Step number badge in top-left */}
              <div className="absolute left-5 top-5">
                <div className="bg-primary-500 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md border-2 border-background/80">
                  {index + 1}
                </div>
              </div>
              {/* Decorative vertical line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-12 h-0.5 bg-primary-500/10 translate-y-1/2" />
              )}
              {/* Icon */}
              <div className="glass bg-gradient-to-br from-primary-500/80 to-primary-600/80 w-16 h-16 rounded-xl flex items-center justify-center shadow-xl mb-6 mt-2 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-text-default mb-4 mt-2">
                {step.title}
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
