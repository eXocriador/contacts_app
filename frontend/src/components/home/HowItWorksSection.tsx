import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UserPlus, Search, Share } from "lucide-react";

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
  }
];

export const HowItWorksSection = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="how-it-works" className="section-alt relative overflow-hidden">
      {/* Subtle background pattern/gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-background/80 via-surface/80 to-background/90" />
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-default mb-6">
            How it works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Get started in minutes with our simple three-step process
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-primary-500/10 p-8 flex flex-col items-center min-h-[320px]"
            >
              {/* Step number badge in top-left */}
              <div className="absolute left-5 top-5">
                <div className="bg-primary-500 text-white text-xs font-bold rounded-full px-3 py-1 shadow-md border-2 border-background/80">
                  {index + 1}
                </div>
              </div>
              {/* Stepper line (vertical, except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-12 h-0.5 bg-primary-500/10 translate-y-1/2" />
              )}
              {/* Icon */}
              <div className="glass bg-gradient-to-br from-primary-500/80 to-primary-600/80 w-16 h-16 rounded-xl flex items-center justify-center shadow-xl mb-6 mt-2">
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
