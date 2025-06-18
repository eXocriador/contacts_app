import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Share } from "lucide-react";

const HowItWorksSection = () => {
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

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-default mb-4">
            How it works
          </h2>
          <p className="text-text-secondary text-xl max-w-3xl mx-auto">
            Get started in minutes with our simple three-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-default mb-4">
                {step.title}
              </h3>
              <p className="text-text-secondary max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
