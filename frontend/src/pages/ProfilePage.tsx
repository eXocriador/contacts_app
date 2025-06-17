// exocriador/contacts_app/contacts_app-main/frontend/src/pages/ProfilePage.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { authApi } from "../api/auth";
import { motion } from "framer-motion";

// Combined schema for profile information and photo
const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  photo: z.any().optional()
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required")
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const ProfilePage = () => {
  const { user, updateUserInStore } = useAuthStore((state) => ({
    user: state.user,
    updateUserInStore: state.updateUser
  }));
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user?.photo || null
  );
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfileForm
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors }
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  React.useEffect(() => {
    if (user) {
      resetProfileForm({ name: user.name, email: user.email });
      setPhotoPreview(user.photo || null);
    }
  }, [user, resetProfileForm]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo size cannot exceed 5MB.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload only image files.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);

      const photoFile = fileInputRef.current?.files?.[0];
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      if (formData.entries().next().done) {
        toast.error("No changes to submit.");
        return;
      }

      const response = await authApi.updateProfile(formData);
      updateUserInStore(response.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsUpdatingPassword(true);
    try {
      await authApi.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success("Password updated successfully");
      resetPasswordForm();
    } catch (error) {
      toast.error("Failed to update password.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Profile Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
          <form
            onSubmit={handleProfileSubmit(onProfileSubmit)}
            className="space-y-6"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-32 h-32">
                <img
                  src={photoPreview || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <label
                  htmlFor="photo"
                  className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
                >
                  <input
                    type="file"
                    id="photo"
                    {...registerProfile("photo")}
                    className="hidden"
                    onChange={handlePhotoChange}
                    ref={fileInputRef}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                {...registerProfile("name")}
                className="input"
              />
              {profileErrors.name && (
                <p className="error">{profileErrors.name.message}</p>
              )}
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                {...registerProfile("email")}
                className="input"
              />
              {profileErrors.email && (
                <p className="error">{profileErrors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="btn-primary w-full"
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </motion.div>

        {/* Security Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">Security</h2>
          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="space-y-6"
          >
            {/* All password fields go here, no changes needed to them */}
            <div>
              <label className="label">Current Password</label>
              <input
                type="password"
                {...registerPassword("currentPassword")}
                className="input"
              />
              {passwordErrors.currentPassword && (
                <p className="error">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                {...registerPassword("newPassword")}
                className="input"
              />
              {passwordErrors.newPassword && (
                <p className="error">{passwordErrors.newPassword.message}</p>
              )}
            </div>
            <div>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                {...registerPassword("confirmPassword")}
                className="input"
              />
              {passwordErrors.confirmPassword && (
                <p className="error">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="btn-primary w-full"
            >
              {isUpdatingPassword ? "Saving..." : "Update Password"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
