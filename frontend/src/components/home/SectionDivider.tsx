import React from "react";

const SectionDivider: React.FC = React.memo(() => (
  <div className="relative w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent my-20">
    <div className="absolute inset-0 w-full h-full bg-primary-500/20 blur-md section-divider-glow"></div>
  </div>
));

export default SectionDivider;
