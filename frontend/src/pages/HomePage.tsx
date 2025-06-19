import React, { useEffect, useRef } from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  SuccessStoriesSection,
  CallToActionSection
} from "../components/home";
import SectionDivider from "../components/home/SectionDivider";
import DynamicBackground from "../components/home/DynamicBackground";

const sectionIds = [
  "hero-section",
  "how-it-works",
  "features",
  "testimonials",
  "call-to-action"
];

const HomePage = () => {
  // Pure static page, no useEffect, no refs, no event listeners
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div id="hero-section" className="relative z-10">
        <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      </div>
      <SectionDivider />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <SectionDivider />
      <div id="features">
        <FeaturesSection />
      </div>
      <SectionDivider />
      <div id="testimonials">
        <SuccessStoriesSection />
      </div>
      <SectionDivider />
      <div id="call-to-action">
        <CallToActionSection />
      </div>
    </>
  );
};

export default HomePage;
