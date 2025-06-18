import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
  },
  {
    name: "Liam Smith",
    role: "Product Designer",
    quote:
      "The UI is so clean and modern. I love the smooth transitions and the attention to detail!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    name: "Olivia Brown",
    role: "HR Specialist",
    quote:
      "Managing contacts for our team has never been easier. The cloud sync is a game changer!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    name: "Noah Wilson",
    role: "Freelancer",
    quote:
      "I use this app daily to keep track of my clients. The mobile experience is just as good as desktop!",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5
  },
  {
    name: "Sophia Lee",
    role: "Startup Founder",
    quote:
      "The best part is the security and privacy. I trust this app with my most important contacts.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  },
  {
    name: "James Miller",
    role: "Sales Lead",
    quote:
      "Our sales team boosted productivity by 30% after switching to this app. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5
  }
];

const CARD_WIDTH = 340;
const CARD_GAP = 24; // Tailwind gap-6

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const [visibleCount, setVisibleCount] = useState(1);

  // Responsive visible count
  const updateVisibleCount = useCallback(() => {
    if (window.innerWidth >= 1024) setVisibleCount(3);
    else if (window.innerWidth >= 768) setVisibleCount(2);
    else setVisibleCount(1);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  // Keyboard navigation for slider
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Вибираємо 3 (або 2/1) картки для показу
  const visibleTestimonials = Array.from(
    { length: visibleCount },
    (_, i) => testimonials[(index + i) % total]
  );

  // Для однакової висоти карток
  const CARD_HEIGHT = 420;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 bg-gradient-to-br from-[#181f29] via-background to-[#181f29] overflow-hidden">
      {/* Subtle pattern/gradient for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary-900/10 via-primary-700/5 to-transparent" />
      </div>
      <div className="container-custom relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            What our users say
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who trust our platform
          </p>
        </div>
        <div className="relative w-full flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-[-64px] md:left-[-80px] top-1/2 -translate-y-1/2 bg-gradient-to-br from-background/80 via-surface/80 to-background/90 p-3 rounded-full shadow-md border-2 border-primary-500/10 hover:bg-primary-500/10 transition-colors z-20"
            aria-label="Previous testimonial"
            tabIndex={0}
          >
            <ChevronLeft className="w-7 h-7 text-primary-400" />
          </button>
          {/* Cards */}
          <div
            className="flex gap-6 justify-center items-center w-full max-w-5xl overflow-x-hidden"
            style={{
              minWidth:
                visibleCount * CARD_WIDTH + (visibleCount - 1) * CARD_GAP
            }}
          >
            <AnimatePresence initial={false}>
              {visibleTestimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-between h-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-primary-500/10 p-8 text-center"
                  style={{
                    minWidth: CARD_WIDTH,
                    maxWidth: CARD_WIDTH,
                    minHeight: CARD_HEIGHT,
                    maxHeight: CARD_HEIGHT
                  }}
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
            </AnimatePresence>
          </div>
          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute right-[-64px] md:right-[-80px] top-1/2 -translate-y-1/2 bg-gradient-to-br from-background/80 via-surface/80 to-background/90 p-3 rounded-full shadow-md border-2 border-primary-500/10 hover:bg-primary-500/10 transition-colors z-20"
            aria-label="Next testimonial"
            tabIndex={0}
          >
            <ChevronRight className="w-7 h-7 text-primary-400" />
          </button>
        </div>
        {/* Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-200 border border-primary-500/30 ${
                i === index ? "bg-primary-500" : "bg-white/10"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
