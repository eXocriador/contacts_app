// frontend/src/components/home/FeaturesSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Zap, Users, Lock, Cloud } from "lucide-react";

const FeaturesSection = () => {
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
    <section id="features" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-default mb-4">
            Everything you need to manage contacts
          </h2>
          <p className="text-text-secondary text-xl max-w-3xl mx-auto">
            Powerful features designed to make contact management simple,
            secure, and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-6 rounded-xl border border-border hover:border-primary-500 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-text-default mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
