import React, { useEffect, useRef } from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  CallToActionSection
} from "../components/home";
import DynamicBackground from "../components/home/DynamicBackground";

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
      <DynamicBackground />
      <div
        id="hero-section"
        className="relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      </div>
      <div
        id="how-it-works"
        className="relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <HowItWorksSection />
      </div>
      <div
        id="features"
        className="relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <FeaturesSection />
      </div>
      <div
        id="testimonials"
        className="relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <TestimonialsSection />
      </div>
      <div id="call-to-action" className="relative">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default HomePage;
