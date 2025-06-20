import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import api from "../api";

interface ForgotPasswordModalProps {
  onClose: () => void;
}

interface ForgotForm {
  email: string;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ForgotForm>();
  const [sent, setSent] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableSelectors = [
      "button",
      "input",
      "select",
      "textarea",
      '[tabindex]:not([tabindex="-1"])'
    ];
    const modal = modalRef.current;
    if (!modal) return;
    const focusableEls = modal.querySelectorAll<HTMLElement>(
      focusableSelectors.join(",")
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        if (focusableEls.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    firstEl?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const onSubmit = async (data: ForgotForm) => {
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setSent(true);
      toast.success("If this email exists, a reset link has been sent.");
      reset();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send reset email. Try again later."
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label="Forgot Password Modal"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-surface border border-border rounded-xl shadow-lg p-8 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-text-secondary hover:text-text-default text-xl"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          <h3 className="text-2xl font-bold text-center mb-4">
            Forgot Password
          </h3>
          {sent ? (
            <div className="text-center text-text-secondary py-8">
              If this email exists, a reset link has been sent.
              <br />
              Please check your inbox.
            </div>
          ) : (
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
