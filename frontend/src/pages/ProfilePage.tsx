// frontend/src/pages/ProfilePage.tsx

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { authApi } from "../api/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2 } from "lucide-react";

// Schemas for validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address")
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"]
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const ProfilePage = () => {
  const { user, updateUser, login } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
    reset: resetProfile
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema)
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  useEffect(() => {
    if (user) {
      resetProfile({ name: user.name, email: user.email });
      setPhotoPreview(
        user.photo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
      );
    }
  }, [user, resetProfile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Photo size should not exceed 5MB.");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!isProfileDirty && !photoFile) {
      toast.info("No changes to save.");
      return;
    }
    setIsUpdatingProfile(true);
    try {
      const formData = new FormData();
      if (data.name !== user?.name) formData.append("name", data.name);
      if (data.email !== user?.email) formData.append("email", data.email);
      if (photoFile) formData.append("photo", photoFile);

      // We need to use updateProfileWithPhoto from our api
      const response = await authApi.updateProfileWithPhoto(formData);
      updateUser(response.data.user);
      toast.success("Profile updated successfully!");
      setPhotoFile(null); // Reset file after upload
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
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
      toast.success(
        "Password updated! Please log in again with your new password."
      );
      resetPassword();
      // Force re-login after password change for security
      await authApi.logout();
      window.location.href = "/login";
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-text-default mb-8"
      >
        Account Settings
      </motion.h1>

      <div className="border-b border-border mb-8">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("profile")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === "profile"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-text-secondary hover:text-text-default hover:border-border"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === "security"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-text-secondary hover:text-text-default hover:border-border"
            }`}
          >
            Security
          </button>
        </nav>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "profile" && (
            <div className="bg-surface border border-border rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-text-default mb-6">
                Profile Information
              </h3>
              <form
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                <div className="flex flex-col items-center">
                  <div className="relative group w-32 h-32 mb-4">
                    <img
                      src={photoPreview || ""}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-2 border-border"
                      crossOrigin="anonymous" // 👈 ADD THIS ATTRIBUTE
                    />
                    <label
                      htmlFor="photo-upload"
                      className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      <Edit2 size={24} />
                    </label>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...registerProfile("name")}
                    className="input"
                  />
                  {profileErrors.name && (
                    <p className="error">{profileErrors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...registerProfile("email")}
                    className="input"
                  />
                  {profileErrors.email && (
                    <p className="error">{profileErrors.email.message}</p>
                  )}
                </div>
                <div className="text-right pt-4">
                  <button
                    type="submit"
                    disabled={
                      isUpdatingProfile || (!isProfileDirty && !photoFile)
                    }
                    className="btn-primary"
                  >
                    {isUpdatingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-surface border border-border rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-text-default mb-6">
                Change Password
              </h3>
              <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
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
                    <p className="error">
                      {passwordErrors.newPassword.message}
                    </p>
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
                <div className="text-right pt-4">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="btn-primary"
                  >
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
