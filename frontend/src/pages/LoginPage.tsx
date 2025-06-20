import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type { LoginRequest } from "../types/api";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { authApi } from "../api/auth";
import DynamicBackground from "../components/home/DynamicBackground";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>();
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      (async () => {
        try {
          await authApi.loginWithGoogle(code);
          toast.success("Successfully logged in with Google!");
          navigate("/contacts");
        } catch (error) {
          toast.error("Failed to login with Google");
          navigate("/login", { replace: true });
        }
      })();
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      toast.success("Successfully logged in!");
      navigate("/contacts");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to login. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await authApi.getGoogleOAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Failed to initiate Google login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/hero-green.webp"
          alt="Abstract background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95" />
        <DynamicBackground />
      </div>
      <main
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-surface border border-border rounded-xl shadow-lg p-8">
            <h2 className="text-center text-3xl font-extrabold text-text-default mb-6">
              Sign in to your account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address"
                    }
                  })}
                  className="input"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                  className="input"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
                <div className="text-right mt-2">
                  <button
                    type="button"
                    className="text-primary-500 hover:underline text-sm font-medium"
                    onClick={() => setForgotOpen(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-text-secondary">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full btn-secondary"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Sign in with Google
                </button>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-text-secondary">
              Not a member?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-500 hover:text-primary-400"
              >
                Start a 14 day free trial
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
      {forgotOpen && (
        <ForgotPasswordModal onClose={() => setForgotOpen(false)} />
      )}
    </div>
  );
};

export default LoginPage;
