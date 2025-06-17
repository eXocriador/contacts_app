import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../../types/api";
import { typeList } from "../../constants/contacts";
import { toast } from "react-hot-toast";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  contact?: Contact | null;
  isSubmitting: boolean;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  contact,
  isSubmitting
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateContactRequest>();

  useEffect(() => {
    if (isOpen) {
      if (contact) {
        reset(contact);
        setPreviewUrl(contact.photo || null);
      } else {
        reset({
          name: "",
          email: "",
          phoneNumber: "",
          isFavourite: false,
          contactType: "personal"
        });
        setPreviewUrl(null);
      }
    }
  }, [contact, isOpen, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo size cannot exceed 5MB.");
        event.target.value = "";
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only image files.");
        event.target.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFormSubmit = async (data: CreateContactRequest) => {
    const formData = new FormData();

    // ================= КЛЮЧОВЕ ВИПРАВЛЕННЯ =================
    // Створюємо об'єкт payload лише з тими полями, які дозволено редагувати.
    // Це запобігає відправці 'id', 'owner' та інших системних полів.
    const editableData: UpdateContactRequest = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isFavourite: data.isFavourite,
      contactType: data.contactType
    };

    // Додаємо до FormData лише дозволені поля.
    Object.entries(editableData).forEach(([key, value]) => {
      // Додаємо поле, лише якщо воно існує (не undefined або null)
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    // =======================================================

    const photoFile = fileInputRef.current?.files?.[0];
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    await onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-surface rounded-2xl shadow-xl w-full max-w-md border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-text-default">
                {contact ? "Edit Contact" : "Add New Contact"}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-text-secondary hover:bg-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              key={contact?.id || "new-contact-form"}
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-6 space-y-4"
            >
              {/* ... решта форми без змін ... */}
              <div className="flex flex-col items-center">
                <div
                  className="relative w-24 h-24 rounded-full bg-background cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={
                      previewUrl ||
                      `https://ui-avatars.com/api/?name=?&background=30363d&color=e6edf3`
                    }
                    alt="Contact Preview"
                    className="w-full h-full rounded-full object-cover border-2 border-border"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">Change</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div>
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input"
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="input"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required"
                  })}
                  className="input"
                />
                {errors.phoneNumber && (
                  <p className="error">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <label className="label">Contact Type</label>
                <select
                  {...register("contactType", {
                    required: "Contact type is required"
                  })}
                  className="input"
                >
                  {typeList.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-surface text-text-default"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="isFavourite"
                  type="checkbox"
                  {...register("isFavourite")}
                  className="h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 bg-background"
                />
                <label
                  htmlFor="isFavourite"
                  className="ml-2 text-sm text-text-secondary"
                >
                  Mark as favourite
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting
                    ? "Saving..."
                    : contact
                    ? "Save Changes"
                    : "Create Contact"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;
