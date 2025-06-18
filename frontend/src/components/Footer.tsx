import React from "react";
import { FaGithub, FaLinkedin, FaInfoCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0a0d12] pt-12 pb-8">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-text-secondary text-sm">
          © {new Date().getFullYear()} Contacts App. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-500 transition-colors text-xl"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-500 transition-colors text-xl"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="/about"
            className="text-text-secondary hover:text-primary-500 transition-colors text-xl"
            aria-label="About"
          >
            <FaInfoCircle />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
