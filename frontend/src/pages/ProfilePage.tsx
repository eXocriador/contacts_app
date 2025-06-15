import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type { UpdateProfileRequest } from "../types/api";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || ""
    }
  });

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-2">Current Password</label>
          <input
            type="password"
            {...register("currentPassword")}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
