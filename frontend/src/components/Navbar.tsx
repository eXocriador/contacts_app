import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, User as UserIcon, BookUser } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-text">
            ContactsApp
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/contacts" className="nav-link">
                  <BookUser className="w-5 h-5" /> Contacts
                </Link>
                <Link to="/profile" className="nav-link">
                  <UserIcon className="w-5 h-5" /> Profile
                </Link>
                <button onClick={handleLogout} className="nav-link">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-text-secondary hover:text-text-default hover:bg-border transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Додамо кастомний клас для посилань у навігації
const NavLinkStyles = `
  .nav-link {
    @apply flex items-center gap-2 text-text-secondary hover:text-text-default font-medium transition-colors duration-200;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = NavLinkStyles;
document.head.appendChild(styleSheet);

export default Navbar;
