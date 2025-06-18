import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type { RegisterRequest } from "../types/api";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { authApi } from "../api/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerAuth = useAuthStore((state) => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await registerAuth(data);
      toast.success("Successfully registered!");
      navigate("/contacts");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to register. This email might already be in use.";
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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-surface border border-border rounded-xl shadow-lg p-8">
          <h2 className="text-center text-3xl font-extrabold text-text-default mb-6">
            Create your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="label">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  },
                  maxLength: {
                    value: 50,
                    message: "Name must not exceed 50 characters"
                  }
                })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

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
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Password must not exceed 100 characters"
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                  }
                })}
                className="input"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
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
                Sign up with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-500 hover:text-primary-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
