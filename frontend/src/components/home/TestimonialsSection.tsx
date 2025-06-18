import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    quote:
      "This contacts app has completely transformed how I manage my professional network. The interface is intuitive and the search is lightning fast!",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    quote:
      "Finally, a contacts app that's both beautiful and functional. The dark mode is a lifesaver for my eyes!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    quote:
      "I've tried many contact managers, but this one stands out. It's secure, fast, and the organization features are exactly what I needed.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 bg-gradient-to-br from-surface via-background to-surface overflow-hidden">
      {/* Subtle pattern/gradient for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary-900/10 via-primary-700/5 to-transparent" />
      </div>
      {/* Decorative quote icon */}
      <div className="absolute left-10 top-10 text-primary-900/5 text-[10rem] select-none pointer-events-none leading-none">
        “
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            What our users say
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who trust our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-between h-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-primary-500/10 p-8 text-center min-h-[420px] max-w-md mx-auto"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              {/* Quote icon */}
              <div className="text-5xl text-primary-500/40 mb-2 leading-none">
                “
              </div>
              {/* Quote */}
              <p
                className="italic font-medium text-text-secondary mb-8 flex-1"
                style={{
                  fontSize: "clamp(1.1rem,2vw,1.35rem)",
                  lineHeight: "1.6",
                  marginTop: "0.5rem"
                }}
              >
                {t.quote}
              </p>
              {/* Avatar + name/role */}
              <div className="flex flex-col items-center mt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-4 border-primary-500/20 shadow-md mb-2 object-cover"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
                <div className="font-bold text-text-default text-lg mt-1">
                  {t.name}
                </div>
                <div className="text-sm text-text-secondary">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
