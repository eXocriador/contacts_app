import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useState } from 'react';

export const Header = () => {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="header-logo">
            Contacts App
          </Link>

          <nav className="header-nav">
            {isAuthenticated ? (
              <>
                <Link
                  to="/contacts"
                  className={`nav-link ${
                    isActive('/contacts') ? 'nav-link-active' : ''
                  }`}
                >
                  Contacts
                </Link>
                <Link
                  to="/profile"
                  className={`nav-link ${
                    isActive('/profile') ? 'nav-link-active' : ''
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={clearAuth}
                  className="nav-link text-red-600 hover:text-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`nav-link ${
                    isActive('/login') ? 'nav-link-active' : ''
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className={`nav-link ${
                    isActive('/register') ? 'nav-link-active' : ''
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          <div className="header-mobile-menu">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-container">
            <div className="mobile-menu-header">
              <Link to="/" className="header-logo" onClick={closeMobileMenu}>
                Contacts App
              </Link>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                onClick={closeMobileMenu}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/contacts"
                    className={`mobile-menu-link ${
                      isActive('/contacts') ? 'mobile-menu-link-active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Contacts
                  </Link>
                  <Link
                    to="/profile"
                    className={`mobile-menu-link ${
                      isActive('/profile') ? 'mobile-menu-link-active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      clearAuth();
                      closeMobileMenu();
                    }}
                    className="mobile-menu-link text-red-600 hover:text-red-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`mobile-menu-link ${
                      isActive('/login') ? 'mobile-menu-link-active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className={`mobile-menu-link ${
                      isActive('/register') ? 'mobile-menu-link-active' : ''
                    }`}
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
