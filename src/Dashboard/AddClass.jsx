import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBook,
  FaImage,
  FaInfo,
  FaPaperPlane,
  FaPlusCircle,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const AddClass = () => {
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imgbbApiKey = import.meta.env.VITE_IMGBB_API; // Your API key from env

  const onSubmit = async (data) => {
  if (!data.image || data.image.length === 0) {
    toast.error("Please select a class image.");
    return;
  }

  setUploading(true);
  try {
    const imageFile = data.image[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    const apiKey = import.meta.env.VITE_IMGBB_API;
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    const imageUrl = res.data.data.url;
    console.log("Uploaded Image URL:", imageUrl);

    const classData = {
      className: data.className,
      image: imageUrl,
      details: data.details,
      additionalInfo: data.additionalInfo || "",
    };

    await axios.post("http://localhost:3000/api/classes", classData);
    toast.success("Class added successfully!");
    reset();
  } catch (error) {
    console.error("Error uploading image or adding class:", error);
    toast.error("Failed to add class.");
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f4f7fa] px-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md w-full max-w-xl lexend">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          <FaPlusCircle className="inline mr-2 text-blue-600" />
          Add New Class
        </h2>
        <p className="text-gray-500 mb-6">
          Upload image and details to create a class
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
              <FaBook className="text-gray-400 mr-2" />
              <input
                {...register("className", { required: true })}
                placeholder="Enter class name"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.className && (
              <span className="text-red-500 text-xs">
                Class Name is required
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Class Image
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 bg-blue-100 hover:bg-blue-200 transition">
              <FaImage className="text-blue-600 mr-2" />
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full text-sm bg-blue-100 outline-none"
              />
            </div>
            {errors.image && (
              <span className="text-red-500 text-xs">Image is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <div className="flex items-start border border-gray-300 rounded-md px-3 py-3">
              <FaInfo className="text-gray-400 mr-2 mt-1" />
              <textarea
                {...register("details", { required: true })}
                rows={3}
                placeholder="Write class description..."
                className="w-full outline-none text-sm resize-none"
              />
            </div>
            {errors.details && (
              <span className="text-red-500 text-xs">Details are required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Info
            </label>
            <div className="flex items-start border border-gray-300 rounded-md px-3 py-3">
              <FaInfo className="text-gray-400 mr-2 mt-1" />
              <textarea
                {...register("additionalInfo")}
                rows={2}
                placeholder="Any additional notes..."
                className="w-full outline-none text-sm resize-none"
              />
            </div>
          </div>
          <div className="text-right pt-2">
            <button
              type="submit"
              disabled={uploading}
              className={`bg-blue-600 cursor-pointer text-white flex items-center gap-2 px-6 py-3 rounded-md transition ${
                uploading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              <FaPaperPlane className="text-sm" />
              {uploading ? "Uploading..." : "Add Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
