// frontend/src/components/Navbar.tsx

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, User as UserIcon, BookUser } from "lucide-react";

const Navbar = React.memo(() => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold text-gradient hover:scale-105 transition-transform"
            type="button"
          >
            ContactsApp
          </button>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Link
                  to="/contacts"
                  className={`nav-link group ${
                    location.pathname.startsWith("/contacts")
                      ? "text-primary-500 bg-primary-100/30"
                      : ""
                  }`}
                >
                  <BookUser className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Contacts</span>
                </Link>
                <Link
                  to="/profile"
                  className={`nav-link group ${
                    location.pathname.startsWith("/profile")
                      ? "text-primary-500 bg-primary-100/30"
                      : ""
                  }`}
                >
                  <UserIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="nav-link group text-danger-500 hover:text-danger-400"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default Navbar;
