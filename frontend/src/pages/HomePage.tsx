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
    <div className="min-h-screen">
      <HeroSection scrollToHowItWorks={scrollToHowItWorks} />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;
