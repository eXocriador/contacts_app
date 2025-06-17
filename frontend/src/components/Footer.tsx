import React from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/eXocriador"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-default"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-default"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://t.me/eXocriador"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-default"
            >
              <FaTelegram className="w-6 h-6" />
            </a>
          </div>
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Contacts App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
