// frontend/src/App.tsx

import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ChatWidget from "./components/ChatWidget";
import DynamicBackground from "./components/home/DynamicBackground";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const ContactsPage = React.lazy(() => import("./pages/ContactsPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));

const App = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname
  );

  return (
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
      <Footer mode={isAuthPage ? "mini" : "full"} chatSlot={!isAuthPage}>
        {!isAuthPage && (
          <ChatWidget offsetY={location.pathname === "/" ? 24 : 112} />
        )}
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
  );
};

export default App;
