import React from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  TestimonialsSection,
  CallToActionSection
} from "../components/home";

const HomePage = () => {
  const scrollToHowItWorks = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative">
      <div id="hero-section" className="relative">
        <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      </div>
      <div id="how-it-works" className="relative">
        <HowItWorksSection />
      </div>
      <div id="features" className="relative">
        <FeaturesSection />
      </div>
      <div id="testimonials" className="relative">
        <TestimonialsSection />
      </div>
      <div id="call-to-action" className="relative">
        <CallToActionSection />
      </div>
    </div>
  );
};

export default HomePage;
