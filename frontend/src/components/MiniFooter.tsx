import React from "react";

const MiniFooter: React.FC = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 backdrop-blur-md h-16 flex items-center justify-between px-6">
    <span className="text-lg font-bold text-gradient">ContactsApp</span>
    <span className="text-xs text-text-secondary">
      © {new Date().getFullYear()} ContactsApp
    </span>
  </footer>
);

export default MiniFooter;
