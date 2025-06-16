import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../../types/api";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateContactRequest | UpdateContactRequest
  ) => Promise<void>;
  contact?: Contact;
  isSubmitting: boolean;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  contact,
  isSubmitting
}) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    contact?.photo || null
  );
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateContactRequest | UpdateContactRequest>({
    // Змінено тип для коректності
    defaultValues: contact || {
      name: "",
      email: "",
      phoneNumber: "", // Змінено з 'phone'
      isFavourite: false,
      contactType: "personal" // Додано дефолтне значення
    }
  });

  React.useEffect(() => {
    if (contact) {
      reset(contact);
      setPreviewUrl(contact.photo || null);
    }
  }, [contact, reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFormSubmit = async (
    data: CreateContactRequest | UpdateContactRequest
  ) => {
    const formData = new FormData();
    // Оскільки бекенд очікує multipart/form-data для всіх полів, включаючи JSON,
    // ми просто додаємо всі поля до FormData.
    // Якщо поле є boolean, перетворюємо його на string.
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as any)[key]; // Використовуємо 'any' для доступу до динамічних ключів
        if (value !== undefined && value !== null) {
          if (typeof value === "boolean") {
            formData.append(key, String(value));
          } else {
            formData.append(key, value);
          }
        }
      }
    }

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("photo", file);
    } else if (contact && !contact.photo && previewUrl === null) {
      // Якщо контакт був з фото, а тепер його видалили, то надіслати порожній рядок
      // або спеціальний прапорець, який бекенд інтерпретує як видалення фото.
      // За поточним бекендом, просто не надсилаємо 'photo' поле, якщо його немає.
    }

    await onSubmit(formData as any); // Типізація FormData як CreateContactRequest | UpdateContactRequest
    if (!contact) {
      reset({
        // Скидаємо форму для нового контакту
        name: "",
        email: "",
        phoneNumber: "",
        isFavourite: false,
        contactType: "personal"
      });
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {contact ? "Edit Contact" : "Add New Contact"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="p-6 space-y-6"
            >
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="relative w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Contact"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center text-gray-400">
                      <span className="text-4xl">+</span>
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm">Change Photo</span>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="input"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required"
                  })} // Змінено з 'phone'
                  className="input"
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && ( // Змінено з 'phone'
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Type
                </label>
                <select
                  {...register("contactType", {
                    required: "Contact type is required"
                  })}
                  className="input"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
                {errors.contactType && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contactType.message}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("isFavourite")}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Mark as favourite
                </label>
              </div>

              <div className="flex justify-end space-x-4">
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
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : contact ? (
                    "Save Changes"
                  ) : (
                    "Add Contact"
                  )}
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
