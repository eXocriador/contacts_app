import React from "react";

interface SectionDividerProps {
  direction?: "down" | "up";
  color?: string;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  direction = "down",
  color = "#10151c",
  className = ""
}) => {
  return direction === "down" ? (
    <svg
      className={"w-full h-16 md:h-24 lg:h-32 " + className}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C480,120 960,0 1440,120 L1440,120 L0,120 Z"
        fill={color}
        fillOpacity="1"
      />
    </svg>
  ) : (
    <svg
      className={"w-full h-16 md:h-24 lg:h-32 " + className}
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0,120 C480,0 960,120 1440,0 L1440,0 L0,0 Z"
        fill={color}
        fillOpacity="1"
      />
    </svg>
  );
};

export default SectionDivider;
