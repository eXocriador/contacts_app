import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Contact, CreateContactRequest } from "../../types/api";
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
    reset,
    setValue
  } = useForm<CreateContactRequest>();

  useEffect(() => {
    // Цей useEffect тепер також працюватиме надійніше через зміну ключа форми
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

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "photo" && value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    const photoFile = fileInputRef.current?.files?.[0];
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    // Перевірка, чи є хоч якісь дані для відправки
    let hasData = false;
    for (const _ of formData.entries()) {
      hasData = true;
      break;
    }

    if (!hasData) {
      toast.info("No changes were made.");
      onClose();
      return;
    }

    await onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        // ... (код анімації)
        >
          <motion.div
          // ... (код анімації)
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

            {/* КЛЮЧОВЕ ВИПРАВЛЕННЯ: Додаємо ключ до форми.
              Це змусить форму повністю переініціалізуватися щоразу,
              коли ви відкриваєте модальне вікно для нового або іншого контакту.
            */}
            <form
              key={contact?.id || "new-contact-form"} // <--- ОСЬ ЦЕ ВИПРАВЛЕННЯ
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-6 space-y-4"
            >
              {/* ... (решта JSX форми залишається без змін) ... */}
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
