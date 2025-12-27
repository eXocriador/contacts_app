import React, { Suspense, useRef, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ChatWidget from "./components/ChatWidget";
import DynamicBackground from "./components/home/DynamicBackground";
import ErrorBoundary from "./components/ErrorBoundary";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ContactsPage = React.lazy(() => import("./pages/ContactsPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  const footerRef = useRef<HTMLElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    if (!footerRef.current) return;
    const handleResize = () => {
      setFooterHeight(footerRef.current?.offsetHeight || 0);
    };
    handleResize();
    const observer = new window.ResizeObserver(handleResize);
    observer.observe(footerRef.current);
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [footerRef.current]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background text-text-default">
        <Navbar />
        <main className="flex-grow pt-16 relative z-10">
          <DynamicBackground />
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen text-xl">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <ContactsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer
          ref={footerRef}
          mode={isAuthPage ? "mini" : "full"}
          chatSlot={!isAuthPage}
          isFixed={!isHomePage}
        >
          {!isAuthPage && <ChatWidget offsetY={footerHeight + 24} />}
        </Footer>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#161B22",
              color: "#e6edf3",
              border: "1px solid #30363d"
            }
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
