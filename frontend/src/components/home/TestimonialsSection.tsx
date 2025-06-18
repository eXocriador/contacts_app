import React, { useState, useEffect, useCallback, useRef } from "react";
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

const CARD_WIDTH = 384;
const CARD_HEIGHT = 320;
const CARD_WIDTH_MD = 420;
const CARD_HEIGHT_MD = 340;
const AUTOPLAY_INTERVAL = 6000;

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const total = testimonials.length;
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      handleNext();
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [index]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || ""))
        return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToSection("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToSection("up");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollToSection = (dir: "up" | "down") => {
    const allSections = Array.from(
      document.querySelectorAll("section, main > section")
    );
    const current = sectionRef.current;
    if (!current) return;
    const idx = allSections.findIndex((el) => el === current);
    let target: Element | null = null;
    if (dir === "down" && idx < allSections.length - 1)
      target = allSections[idx + 1];
    if (dir === "up" && idx > 0) target = allSections[idx - 1];
    if (target) (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);
  const handleNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prevIdx = (index - 1 + total) % total;
  const nextIdx = (index + 1) % total;
  const active = testimonials[index];
  const prevT = testimonials[prevIdx];
  const nextT = testimonials[nextIdx];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-0 bg-gradient-to-br from-[#181f29] via-background to-[#181f29] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-primary-900/10 via-primary-700/5 to-transparent" />
      </div>
      <div className="container-custom max-w-screen-xl relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-16 mt-12 md:mt-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            What our users say
          </h2>
          <p className="text-2xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who trust our platform
          </p>
        </div>
        <div className="relative w-full flex items-center justify-center min-h-[420px]">
          {/* Стрілки по краях контейнера */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 p-4 md:p-6 rounded-full shadow-lg border-2 border-primary-500/20 hover:bg-primary-500/10 transition-colors z-20 ring-2 ring-primary-500/20"
            aria-label="Previous testimonial"
            tabIndex={0}
            style={{ boxShadow: "0 0 24px 4px #22d3ee33" }}
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-primary-400" />
          </button>
          <div className="flex flex-1 justify-center items-end gap-6 md:gap-10 w-full min-h-[420px] relative mx-0 md:mx-12">
            {/* Left preview */}
            {!isMobile && (
              <div className="bg-surface border border-primary-500/10 rounded-2xl shadow-lg w-96 h-80 md:w-[420px] md:h-[340px] flex flex-col justify-between items-end px-6 py-8 text-center select-none z-0 overflow-hidden">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(prevT.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="italic font-medium text-text-default text-base md:text-lg line-clamp-5 overflow-hidden">
                    {prevT.quote}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={prevT.avatar}
                    alt={prevT.name}
                    className="w-12 h-12 rounded-full border-2 border-primary-400 shadow object-cover"
                    loading="lazy"
                  />
                  <div className="font-bold text-text-default text-base mt-1">
                    {prevT.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {prevT.role}
                  </div>
                </div>
              </div>
            )}
            {/* Central motion card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="bg-surface border border-primary-500/20 rounded-2xl shadow-xl w-96 h-80 md:w-[420px] md:h-[340px] flex flex-col justify-between items-center px-8 py-10 text-center select-none z-10 overflow-hidden"
                style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.14)" }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="italic font-semibold text-text-default text-lg md:text-xl leading-relaxed line-clamp-5 overflow-hidden">
                    {active.quote}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="w-14 h-14 rounded-full border-2 border-primary-400 shadow object-cover"
                    loading="lazy"
                  />
                  <div className="font-bold text-text-default text-lg mt-2">
                    {active.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {active.role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Right preview */}
            {!isMobile && (
              <div className="bg-surface border border-primary-500/10 rounded-2xl shadow-lg w-96 h-80 md:w-[420px] md:h-[340px] flex flex-col justify-between items-start px-6 py-8 text-center select-none z-0 overflow-hidden">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(nextT.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="italic font-medium text-text-default text-base md:text-lg line-clamp-5 overflow-hidden">
                    {nextT.quote}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4">
                  <img
                    src={nextT.avatar}
                    alt={nextT.name}
                    className="w-12 h-12 rounded-full border-2 border-primary-400 shadow object-cover"
                    loading="lazy"
                  />
                  <div className="font-bold text-text-default text-base mt-1">
                    {nextT.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {nextT.role}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Стрілка справа */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 p-4 md:p-6 rounded-full shadow-lg border-2 border-primary-500/20 hover:bg-primary-500/10 transition-colors z-20 ring-2 ring-primary-500/20"
            aria-label="Next testimonial"
            tabIndex={0}
            style={{ boxShadow: "0 0 24px 4px #22d3ee33" }}
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-primary-400" />
          </button>
        </div>
        {/* Dots */}
        <div className="flex gap-3 mt-8 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 border-2 border-primary-500/30 ${
                i === index ? "bg-primary-500" : "bg-white/20"
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
