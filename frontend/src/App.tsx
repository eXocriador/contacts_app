// frontend/src/App.tsx

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ContactsPage from "./pages/ContactsPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import ChatWidget from "./components/ChatWidget";
import DynamicBackground from "./components/home/DynamicBackground";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-default">
      <Navbar />
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <DynamicBackground />
      </div>
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
        </AnimatePresence>
      </main>
      {location.pathname === "/" && <Footer />}
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
      <ChatWidget />
    </div>
  );
};

export default App;
