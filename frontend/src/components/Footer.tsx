import React, { forwardRef } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Users,
  Star,
  Zap,
  Building2,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Mail,
  Info,
  Briefcase
} from "lucide-react";

interface FooterProps {
  mode?: "mini" | "full";
  chatSlot?: boolean;
  children?: React.ReactNode;
  isFixed?: boolean;
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ mode = "full", chatSlot = false, children, isFixed = true }, ref) => {
    return (
      <footer
        ref={ref}
        className={`${
          isFixed ? "fixed bottom-0 left-0 right-0" : "relative mt-auto"
        } z-50 glass backdrop-blur-md px-0 py-2 md:py-3 border-t border-border/50 flex flex-col items-center justify-center`}
        style={{ background: "rgba(16,21,28,0.92)" }}
      >
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-4">
          {/* Left: Slogan & Copyright (always visible) */}
          <div className="flex flex-col items-center md:items-start text-xs text-text-secondary min-w-[180px]">
            <span className="font-semibold text-sm text-text-default mb-1">
              Effortless contact management for teams & freelancers.
            </span>
            <span>© {new Date().getFullYear()} ContactsApp</span>
          </div>
          {/* Center: Socials (always visible) */}
          <div className="flex gap-4 my-2 md:my-0">
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
          {/* Right: Navigation, Extra Links, Chat Slot (only in full mode) */}
          <div className="flex items-center gap-4 md:gap-8 min-w-[180px] justify-end">
            {mode === "full" && (
              <nav className="flex gap-6 text-xs md:text-sm text-text-secondary">
                <a href="/" className="hover:text-primary-400 transition">
                  Home
                </a>
                <a
                  href="/contacts"
                  className="hover:text-primary-400 transition"
                >
                  Contacts
                </a>
                <a
                  href="/profile"
                  className="hover:text-primary-400 transition"
                >
                  Profile
                </a>
                <a href="/about" className="hover:text-primary-400 transition">
                  About
                </a>
              </nav>
            )}
            {chatSlot && (
              <div className="relative flex items-center justify-center ml-2">
                <div
                  className="absolute inset-0 rounded-full bg-primary-500/10 blur-[6px] animate-pulse"
                  style={{ zIndex: 0 }}
                />
                <div className="relative z-10">{children}</div>
              </div>
            )}
          </div>
        </div>
        {/* Extra links row (only in full mode, visually blended) */}
        {mode === "full" && (
          <div className="w-full max-w-7xl flex flex-wrap items-center justify-center gap-6 mt-2 px-4 text-xs text-text-secondary opacity-80">
            <a
              href="#features"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Star className="w-4 h-4" /> Features
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Zap className="w-4 h-4" /> How It Works
            </a>
            <a
              href="#testimonials"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Building2 className="w-4 h-4" /> Testimonials
            </a>
            <a
              href="#call-to-action"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <ArrowRight className="w-4 h-4" /> Get Started
            </a>
            <a
              href="/blog"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <BookOpen className="w-4 h-4" /> Blog
            </a>
            <a
              href="/help"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <HelpCircle className="w-4 h-4" /> Help Center
            </a>
            <a
              href="/api-docs"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Mail className="w-4 h-4" /> API Docs
            </a>
            <a
              href="/about"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Info className="w-4 h-4" /> About Us
            </a>
            <a
              href="/careers"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Briefcase className="w-4 h-4" /> Careers
            </a>
            <a
              href="/contact"
              className="flex items-center gap-1 hover:text-primary-400 transition"
            >
              <Users className="w-4 h-4" /> Contact Us
            </a>
          </div>
        )}
      </footer>
    );
  }
);

export default Footer;
