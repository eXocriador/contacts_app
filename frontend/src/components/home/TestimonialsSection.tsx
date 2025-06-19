import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building2,
  Briefcase,
  Star,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Zap
} from "lucide-react";

const successStories = [
  {
    id: "enterprise",
    title: "Enterprise",
    icon: Building2,
    color: "from-blue-500/20 to-blue-600/20",
    activeColor: "from-blue-500/20 to-blue-600/20",
    stats: [
      { label: "Team members", value: "5,000+" },
      { label: "Contacts managed", value: "1M+" },
      { label: "Time saved", value: "30%" }
    ],
    features: [
      "Centralized contact management",
      "Advanced team collaboration",
      "Custom integrations",
      "Enterprise-grade security"
    ],
    quote: {
      text: "ContactsApp has transformed how our global teams manage relationships. The ROI has been incredible.",
      author: "Sarah Chen",
      role: "VP of Operations at TechCorp",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "startup",
    title: "Startup",
    icon: Zap,
    color: "from-purple-500/20 to-purple-600/20",
    activeColor: "from-purple-500/20 to-purple-600/20",
    stats: [
      { label: "Growth rate", value: "200%" },
      { label: "Response time", value: "-65%" },
      { label: "New leads", value: "+85%" }
    ],
    features: [
      "Quick setup & onboarding",
      "Automated lead management",
      "Smart categorization",
      "Growth analytics"
    ],
    quote: {
      text: "As a fast-growing startup, we needed a solution that could scale with us. ContactsApp delivered beyond expectations.",
      author: "Mike Ross",
      role: "CEO at GrowthMate",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  },
  {
    id: "freelance",
    title: "Freelance",
    icon: Briefcase,
    color: "from-emerald-500/20 to-emerald-600/20",
    activeColor: "from-emerald-500/20 to-emerald-600/20",
    stats: [
      { label: "Client retention", value: "+45%" },
      { label: "Hours saved", value: "10h/week" },
      { label: "Revenue increase", value: "25%" }
    ],
    features: [
      "Client relationship tracking",
      "Project-based organization",
      "Invoice & payment tracking",
      "Automated follow-ups"
    ],
    quote: {
      text: "The perfect tool for managing my freelance business. It's like having a personal assistant for client relationships.",
      author: "Emma Wilson",
      role: "Independent Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  }
];

export const SuccessStoriesSection = () => {
  const [activeStory, setActiveStory] = useState(successStories[0]);

  const handleKeyNavigation = (e: KeyboardEvent) => {
    const currentIndex = successStories.findIndex(
      (story) => story.id === activeStory.id
    );

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        currentIndex > 0 ? currentIndex - 1 : successStories.length - 1;
      setActiveStory(successStories[prevIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex =
        currentIndex < successStories.length - 1 ? currentIndex + 1 : 0;
      setActiveStory(successStories[nextIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [activeStory]); // Dependency on activeStory to ensure we always have the current state

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24">
      <div className="container-custom max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Success Stories
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            See how different teams achieve more with ContactsApp
          </p>
        </div>
        {/* Story selector tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {successStories.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className={`
                relative group flex items-center gap-3 px-6 py-4 rounded-xl
                transition-all duration-300
                ${
                  activeStory.id === story.id
                    ? "bg-[#1a2531] shadow-lg border border-primary-500/20"
                    : "hover:bg-[#1a2531]/50"
                }
              `}
            >
              <story.icon
                className={`
                w-5 h-5 transition-colors duration-300
                ${
                  activeStory.id === story.id
                    ? "text-primary-400"
                    : "text-primary-500/60 group-hover:text-primary-400"
                }
              `}
              />
              <span
                className={`
                font-semibold transition-colors duration-300
                ${
                  activeStory.id === story.id
                    ? "text-white"
                    : "text-white/60 group-hover:text-white/90"
                }
              `}
              >
                {story.title}
              </span>
              {activeStory.id === story.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border border-primary-500/20 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
        {/* Active story content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          >
            {/* Left column - Stats & Features */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {activeStory.stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      p-4 rounded-xl bg-gradient-to-br ${activeStory.color}
                      border border-white/5 backdrop-blur-sm
                    `}
                  >
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeStory.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <button className="btn-primary text-base px-6 py-3 flex items-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <button className="btn-ghost text-base px-6 py-3">
                  Learn More
                </button>
              </motion.div>
            </div>

            {/* Right column - Quote card */}
            <div className="lg:pl-8 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`
                  relative rounded-2xl p-8
                  bg-gradient-to-br ${activeStory.activeColor}
                  shadow-2xl h-full flex flex-col
                `}
              >
                <div className="mb-8">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex-grow mb-6">
                  <p className="text-xl text-white leading-relaxed italic">
                    "{activeStory.quote.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={activeStory.quote.avatar}
                    alt={activeStory.quote.author}
                    className="w-14 h-14 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {activeStory.quote.author}
                    </div>
                    <div className="text-white/80 text-sm">
                      {activeStory.quote.role}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
