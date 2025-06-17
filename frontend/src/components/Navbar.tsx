// frontend/src/components/Navbar.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, User as UserIcon, BookUser, Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Відновлюємо хук

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-text-default">
            ContactsApp
          </Link>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/contacts" className="nav-link">
                  <BookUser className="w-5 h-5" />
                  <span>Contacts</span>
                </Link>
                <Link to="/profile" className="nav-link">
                  <UserIcon className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="nav-link">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
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
            {/* Відновлюємо кнопку зміни теми */}
            <button
              onClick={toggleTheme}
              className="nav-link px-3"
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
    </header>
  );
};

export default Navbar;
