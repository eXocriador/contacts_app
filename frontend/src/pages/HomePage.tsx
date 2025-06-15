import React from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
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

      {/* Цей div потрібен для правильного відображення фону секцій */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturesSection />
        <CallToActionSection />
      </div>
    </div>
  );
};

export default HomePage;
