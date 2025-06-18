import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    quote:
      "This contacts app has completely transformed how I manage my professional network. The interface is intuitive and the search is lightning fast!",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    quote:
      "Finally, a contacts app that's both beautiful and functional. The dark mode is a lifesaver for my eyes!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "Business Owner",
    quote:
      "I've tried many contact managers, but this one stands out. It's secure, fast, and the organization features are exactly what I needed.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialCard = ({ name, role, quote, avatar, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-background p-6 rounded-xl border border-border"
  >
    <div className="flex items-center mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h4 className="font-semibold text-text-default">{name}</h4>
        <p className="text-sm text-text-secondary">{role}</p>
      </div>
    </div>
    <p className="text-text-secondary italic">"{quote}"</p>
  </motion.div>
);

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-default mb-4">
            What our users say
          </h2>
          <p className="text-text-secondary text-xl max-w-3xl mx-auto">
            Join thousands of satisfied users who trust our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
