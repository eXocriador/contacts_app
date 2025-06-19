import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const MiniFooter: React.FC = () => (
  <footer className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 backdrop-blur-md px-0 py-2 md:py-3">
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        height: "2px",
        background:
          "linear-gradient(90deg, #22c55e55 0%, #60a5fa55 50%, #f472b655 100%)",
        boxShadow: "0 0 8px 0 #22c55e44",
        opacity: 0.7
      }}
    />
    <div className="container-custom flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 md:gap-0 h-auto md:h-16 relative z-10">
      {/* Left: Description */}
      <div className="flex-1 flex items-center justify-start text-xs text-text-secondary md:pl-2 mb-1 md:mb-0">
        <span className="hidden md:inline">
          Effortless contact management for teams & freelancers.
        </span>
      </div>
      {/* Center: Links */}
      <nav className="flex-1 flex items-center justify-center gap-6 order-1 md:order-none text-text-secondary text-xs md:text-sm">
        <a href="/" className="hover:text-primary-400 transition">
          Home
        </a>
        <a href="/contacts" className="hover:text-primary-400 transition">
          Contacts
        </a>
        <a href="/profile" className="hover:text-primary-400 transition">
          Profile
        </a>
      </nav>
      {/* Right: Socials & Copyright */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-2 md:gap-4 text-xs text-text-secondary md:pr-2">
        <div className="flex gap-3 order-2 md:order-none">
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
        <span className="order-1 md:order-none text-[10px] md:text-xs text-text-secondary text-center md:text-right w-full md:w-auto">
          © {new Date().getFullYear()} ContactsApp
        </span>
      </div>
    </div>
  </footer>
);

export default MiniFooter;
