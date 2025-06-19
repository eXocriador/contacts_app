import React, { useEffect, useRef } from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  CallToActionSection
} from "../components/home";
import SectionDivider from "../components/home/SectionDivider";

const sectionIds = [
  "hero-section",
  "how-it-works",
  "features",
  "testimonials",
  "call-to-action"
];

const HomePage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionIds.map((id) => document.getElementById(id));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow navigation with ArrowUp/ArrowDown and W/S (on any layout)
      const keysDown = ["ArrowDown", "s", "S", "ы", "Ы"];
      const keysUp = ["ArrowUp", "w", "W", "ц", "Ц"];
      const activeElement = document.activeElement;
      // Don't trigger if user is typing in an input/textarea/select
      if (
        activeElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName)
      ) {
        return;
      }
      // Find the currently visible section
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const currentIdx = sectionRefs.current.findIndex((ref) => {
        if (!ref) return false;
        const rect = ref.getBoundingClientRect();
        return (
          rect.top <= viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.3
        );
      });
      if (keysDown.includes(e.key)) {
        e.preventDefault();
        const nextIdx = Math.min(
          currentIdx + 1,
          sectionRefs.current.length - 1
        );
        sectionRefs.current[nextIdx]?.scrollIntoView({ behavior: "smooth" });
      } else if (keysUp.includes(e.key)) {
        e.preventDefault();
        const prevIdx = Math.max(currentIdx - 1, 0);
        sectionRefs.current[prevIdx]?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Modern, luxury global background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Deep radial + linear gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(22,33,28,0.95)_0%,rgba(26,37,49,0.92)_60%,rgba(16,21,28,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#14291e]/80 via-[#10151c]/90 to-[#1a2531]/95" />
        {/* Subtle blurred blobs */}
        <div className="absolute left-[20vw] top-[10vh] w-[30vw] h-[30vw] bg-green-800/10 rounded-full blur-[120px]" />
        <div className="absolute right-[10vw] bottom-[10vh] w-[25vw] h-[25vw] bg-primary-800/10 rounded-full blur-[100px]" />
        {/* Subtle SVG noise pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        {/* Subtle grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#1a2531"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div id="hero-section" className="relative">
        <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent my-8" />
      <div id="how-it-works" className="relative">
        <HowItWorksSection />
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent my-8" />
      <div id="features" className="relative">
        <FeaturesSection />
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent my-8" />
      <div id="testimonials" className="relative">
        <TestimonialsSection />
      </div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent my-8" />
      <div id="call-to-action" className="relative">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default HomePage;
