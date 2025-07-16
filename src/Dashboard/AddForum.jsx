import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FaHeading, FaAlignLeft } from "react-icons/fa";

const AddForum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/forum", {
        title: data.title,
        description: data.description,
      });
      toast.success("Forum added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding forum:", error);
      const message =
        error.response?.data?.message || "Failed to add forum. Please try again.";
      toast.error(message);
    }
    console.log(data)
  };

  return (
    <div className="flex justify-center px-10 pt-5 pb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white lexend px-10 py-10 rounded-md shadow-xl w-full max-w-lg"
      >
        <h2 className="text-4xl font-semibold mb-6 text-center">Add New Forum</h2>

        {/* Title Input */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="title" className="font-medium text-gray-700">
            Title
          </label>
          <div
            className={`flex items-center rounded-md px-3 ring-1 ${errors.title ? "ring-red-400" : "ring-gray-300"
              } focus-within:ring-blue-400 transition`}
          >
            <FaHeading className="text-gray-500 w-5 h-5" />
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              id="title"
              placeholder="Enter forum title"
              className="outline-none px-3 py-3 flex-1 text-lg"
              disabled={isSubmitting}
            />
          </div>
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="description" className="font-medium text-gray-700">
            Description
          </label>
          <div
            className={`flex items-start rounded-md px-3 pt-2 ring-1 ${errors.description ? "ring-red-400" : "ring-gray-300"
              } focus-within:ring-blue-400 transition`}
          >
            <FaAlignLeft className="text-gray-500 w-5 h-5 mt-2" />
            <textarea
              {...register("description", { required: "Description is required" })}
              id="description"
              placeholder="Enter forum description"
              rows={4}
              className="outline-none px-3 py-2 flex-1 text-lg resize-y"
              disabled={isSubmitting}
            />
          </div>
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-lg font-semibold w-full text-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? "Adding..." : "Add Forum"}
        </button>
      </form>
    </div>
  );
};

export default AddForum;
