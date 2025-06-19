import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  BookOpen,
  HelpCircle,
  Users,
  Briefcase,
  Star,
  ArrowRight,
  Building2,
  Zap,
  Info
} from "lucide-react";

/**
 * Modern, multi-column footer with brand gradient, glowing border, and social links.
 */
const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="relative z-20 bg-[#10151c] bg-gradient-to-br from-[#10151c] via-[#1a2531] to-[#14291e] pt-16 pb-8"
    >
      {/* Glowing top border */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: "0.5px",
          background:
            "linear-gradient(90deg, #3b82f6cc 0%, #8b5cf688 50%, #10b98166 100%)",
          boxShadow: "0 0 6px 0 #3b82f633",
          opacity: 0.7
        }}
      />
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 z-10 relative">
        {/* Column 1: Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-7 h-7 text-primary-500" />
            <span className="text-2xl font-bold text-white tracking-tight">
              ContactsApp
            </span>
          </div>
          <p className="text-text-secondary text-base max-w-xs">
            Effortless contact management for teams, startups, and freelancers.
            Connect. Organize. Grow.
          </p>
        </div>
        {/* Column 2: Product */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Star className="w-4 h-4" /> Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Zap className="w-4 h-4" /> How It Works
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Building2 className="w-4 h-4" /> Testimonials
              </a>
            </li>
            <li>
              <a
                href="#call-to-action"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <ArrowRight className="w-4 h-4" /> Get Started
              </a>
            </li>
          </ul>
        </div>
        {/* Column 3: Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/blog"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <BookOpen className="w-4 h-4" /> Blog
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <HelpCircle className="w-4 h-4" /> Help Center
              </a>
            </li>
            <li>
              <a
                href="/api-docs"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Mail className="w-4 h-4" /> API Docs
              </a>
            </li>
          </ul>
        </div>
        {/* Column 4: Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/about"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Info className="w-4 h-4" /> About Us
              </a>
            </li>
            <li>
              <a
                href="/careers"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Briefcase className="w-4 h-4" /> Careers
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="flex items-center gap-2 text-text-secondary hover:text-primary-400 transition"
              >
                <Users className="w-4 h-4" /> Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
        <div className="flex gap-6 mb-2">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-secondary hover:text-primary-400 transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-primary-400 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-text-secondary hover:text-primary-400 transition"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        <div className="text-text-secondary text-xs text-center">
          © {new Date().getFullYear()} ContactsApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
