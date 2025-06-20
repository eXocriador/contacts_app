import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

interface MiniFooterProps {
  blendWithFooter?: boolean;
}

const MiniFooter: React.FC<MiniFooterProps> = ({ blendWithFooter = false }) => {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 glass backdrop-blur-md px-0 py-2 md:py-3 flex flex-col items-center justify-center ${
        blendWithFooter
          ? "border-t-0 shadow-none rounded-none"
          : "border-t border-border/50"
      }`}
    >
      <div className="flex gap-4 mb-1">
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-primary-400 transition text-text-secondary"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-primary-400 transition text-text-secondary"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-primary-400 transition text-text-secondary"
        >
          <Twitter className="w-5 h-5" />
        </a>
      </div>
      <span className="text-xs text-text-secondary text-center block">
        Effortless contact management for teams & freelancers.
        <br />© {new Date().getFullYear()} ContactsApp
      </span>
    </footer>
  );
};

export default MiniFooter;
