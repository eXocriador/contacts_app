// frontend/src/pages/ProfilePage.tsx

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { authApi } from "../api/auth";
import { motion } from "framer-motion";
import { Edit2 } from "lucide-react";

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
  const { user, updateUser } = useAuthStore();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
    reset: resetProfile
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "", email: user?.email || "" }
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
      const defaultValues = { name: user.name, email: user.email };
      resetProfile(defaultValues);
      setPhotoPreview(
        user.photo ||
          `https://ui-avatars.com/api/?name=${user.name.replace(
            " ",
            "+"
          )}&background=161B22&color=e6edf3&size=128`
      );
    }
  }, [user, resetProfile]);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

      const response = await authApi.updateProfileWithPhoto(formData);
      updateUser(response.data.user); // Corrected: pass the user object
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsUpdatingProfile(false);
      setPhotoFile(null);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsUpdatingPassword(true);
    try {
      await authApi.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success("Password updated successfully!");
      resetPassword();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-default mb-8">
        Profile Settings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-text-default mb-6">
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
                  className="w-full h-full rounded-full object-cover"
                />
                <label
                  htmlFor="photo-upload"
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <Edit2 size={24} />
                </label>
                <input
                  ref={photoInputRef}
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
            <div className="text-right">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="btn-primary"
              >
                {isUpdatingProfile ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-text-default mb-6">
            Security
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
            <div className="text-right">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="btn-primary"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
