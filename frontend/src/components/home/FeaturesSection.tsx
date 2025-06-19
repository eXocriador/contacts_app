// frontend/src/components/home/FeaturesSection.tsx

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Smartphone, Zap, Users, Lock, Cloud } from "lucide-react";

const FeaturesSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const features = [
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your contacts are encrypted and stored securely. We never share your data with third parties."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description:
        "Access your contacts from any device - desktop, tablet, or mobile. Always in sync."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with modern technology for instant search and seamless performance."
    },
    {
      icon: Users,
      title: "Smart Organization",
      description:
        "Organize contacts by type, add favorites, and find anyone instantly with smart search."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "Your data stays yours. We use industry-standard encryption to protect your information."
    },
    {
      icon: Cloud,
      title: "Always Available",
      description:
        "Cloud-based storage means your contacts are always backed up and accessible anywhere."
    }
  ];

  return (
    <section
      id="features"
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-default mb-6">
            Everything you need to manage contacts
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to make contact management simple,
            secure, and efficient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="card-hover p-8 group"
            >
              <div className="bg-gradient-to-br from-primary-500/10 to-primary-600/10 p-4 rounded-2xl w-fit mb-6 group-hover:from-primary-500/20 group-hover:to-primary-600/20 transition-all duration-300">
                <feature.icon className="w-10 h-10 text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold text-text-default mb-4">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
