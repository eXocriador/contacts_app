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
    accentColor: "#3b82f6",
    color: "from-blue-500/20 to-blue-600/20",
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
    accentColor: "#8b5cf6",
    color: "from-purple-500/20 to-purple-600/20",
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
    accentColor: "#10b981",
    color: "from-emerald-500/20 to-emerald-600/20",
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

/**
 * SuccessStoriesSection displays customer stories with brand-cohesive accent colors.
 * - Each story uses its accentColor for the active card's border, glow, and icons.
 * - The active tab underline/glow uses the brand's primary-500 color.
 */
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
              style={
                activeStory.id === story.id
                  ? {
                      boxShadow: `0 2px 16px 0 ${story.accentColor}33`,
                      borderColor: story.accentColor
                    }
                  : undefined
              }
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
                  className="absolute left-0 right-0 bottom-0 h-1 rounded-b-xl"
                  style={{
                    background: `linear-gradient(90deg, var(--tw-gradient-stops), ${story.accentColor} 60%, #6366f1 100%)`,
                    boxShadow: `0 0 12px 2px ${story.accentColor}66`
                  }}
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
                    <div className="text-sm text-text-secondary">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Features */}
              <ul className="space-y-4 mt-8">
                {activeStory.features.map((feature, idx) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2
                      className="w-5 h-5"
                      style={{ color: activeStory.accentColor }}
                    />
                    <span className="text-white/90 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right column - Quote */}
            <div
              className="relative rounded-2xl p-8 bg-gradient-to-br h-full flex flex-col"
              style={{
                boxShadow: `0 0 25px -5px ${activeStory.accentColor}99`,
                border: `2px solid ${activeStory.accentColor}`,
                background: `linear-gradient(135deg, ${activeStory.accentColor}11 0%, #1a2531 100%)`
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={activeStory.quote.avatar}
                  alt={activeStory.quote.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <div className="text-lg font-semibold text-white">
                    {activeStory.quote.author}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {activeStory.quote.role}
                  </div>
                </div>
              </div>
              <blockquote className="text-xl text-white/90 italic mb-6 flex-1">
                “{activeStory.quote.text}”
              </blockquote>
              <div className="flex items-center gap-2 mt-auto">
                <Star className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-semibold">
                  Verified Success
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
