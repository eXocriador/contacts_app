import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Freelance Designer",
    quote:
      "Finally, a contacts app that's both beautiful and functional. The dark mode is a lifesaver for my eyes!",
    avatar: "SJ"
  },
  {
    name: "Mark C.",
    role: "Tech Lead",
    quote:
      "I use this to keep my team's contacts in sync. It's reliable, fast, and the cross-platform access is seamless. Highly recommended.",
    avatar: "MC"
  },
  {
    name: "Emily R.",
    role: "Student",
    quote:
      "Super easy to get started. I imported all my contacts in minutes. The favorite and contact type features help me stay organized.",
    avatar: "ER"
  }
];

const TestimonialCard = ({ name, role, quote, avatar, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-surface border border-border rounded-xl shadow-lg p-8 flex flex-col h-full"
  >
    <div className="flex-grow mb-4">
      <div className="flex text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill="currentColor" className="w-5 h-5" />
        ))}
      </div>
      <p className="text-text-secondary italic">"{quote}"</p>
    </div>
    <div className="flex items-center">
      <img
        src={`https://ui-avatars.com/api/?name=${avatar}&background=22c55e&color=ffffff&bold=true`}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
        crossOrigin="anonymous"
      />
      <div className="ml-4">
        <h4 className="font-bold text-text-default">{name}</h4>
        <p className="text-sm text-text-secondary">{role}</p>
      </div>
    </div>
  </motion.div>
);

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 text-text-default"
        >
          Loved by Professionals Worldwide
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
