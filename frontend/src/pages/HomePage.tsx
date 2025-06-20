import React, { useEffect, useRef, useState } from "react";
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  SuccessStoriesSection,
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
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      setFooterVisible(bottom);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
