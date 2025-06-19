import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const MiniFooter: React.FC = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 backdrop-blur-md px-4 py-2 md:px-8 md:py-3 flex flex-col md:flex-row items-center justify-between gap-4 h-auto md:h-20">
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold text-gradient">ContactsApp</span>
      <span className="hidden md:inline text-xs text-text-secondary">
        Effortless contact management for teams & freelancers.
      </span>
    </div>
    <div className="flex gap-4 text-text-secondary text-xs md:text-sm">
      <a href="/contacts" className="hover:text-primary-400 transition">
        Contacts
      </a>
      <a href="/profile" className="hover:text-primary-400 transition">
        Profile
      </a>
      <a href="/" className="hover:text-primary-400 transition">
        Home
      </a>
    </div>
    <div className="flex gap-3">
      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="hover:text-primary-400 transition"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://linkedin.com/in/your-profile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="hover:text-primary-400 transition"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="https://twitter.com/your-profile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="hover:text-primary-400 transition"
      >
        <Twitter className="w-5 h-5" />
      </a>
    </div>
    <span className="text-[10px] md:text-xs text-text-secondary text-center md:text-right w-full md:w-auto">
      © {new Date().getFullYear()} ContactsApp
    </span>
  </footer>
);

export default MiniFooter;
