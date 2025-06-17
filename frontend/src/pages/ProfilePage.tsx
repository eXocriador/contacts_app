import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { authApi } from "../api/auth";
import { motion } from "framer-motion";

const ProfilePage = () => {
  // ... (hooks and functions)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Profile Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center"
        >
          <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <div className="relative w-32 h-32 mb-4 mx-auto group">
              <img
                src={
                  photoPreview ||
                  user?.photo ||
                  "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-md"
              />
              <label
                htmlFor="photo"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Change
              </label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
                ref={fileInputRef}
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="btn btn-primary w-full mt-4"
            >
              {isUpdatingProfile ? "Saving..." : "Save Photo"}
            </button>
          </form>
        </motion.div>

        {/* Details and Security Cards */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <form
              onSubmit={handleProfileSubmit(onProfileSubmit)}
              className="space-y-6"
            >
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
                className="btn btn-primary w-full"
              >
                {isUpdatingProfile ? "Updating..." : "Update Details"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Security</h2>
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-6"
            >
              {/* Password fields remain the same */}
              {/* ... */}
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="btn btn-primary w-full"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
