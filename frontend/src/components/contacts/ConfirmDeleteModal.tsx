import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import Spinner from "../Spinner";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contactName: string;
  isDeleting: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  contactName,
  isDeleting
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-label="Delete Contact Confirmation Modal"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface rounded-2xl shadow-xl w-full max-w-md border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-danger/10 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle
                    className="h-6 w-6 text-danger"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-bold text-text-default"
                    id="modal-title"
                  >
                    Delete Contact
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-text-secondary">
                      Are you sure you want to delete "{contactName}"? This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-2xl">
              <button
                type="button"
                className="btn-danger w-full sm:w-auto sm:ml-3 flex items-center justify-center gap-2 min-w-[110px]"
                onClick={onConfirm}
                disabled={isDeleting}
              >
                {isDeleting && <Spinner size={18} />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                className="btn-secondary w-full mt-3 sm:mt-0 sm:w-auto"
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
