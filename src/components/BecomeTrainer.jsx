import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaImage,
  FaClock,
  FaInfoCircle,
  FaPaperPlane,
} from "react-icons/fa";
import useAuth from "../hook/useAuth";

// Constant Options
const dayOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const timeOptions = [
  { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
  { value: "1:00 PM - 2:00 PM", label: "1:00 PM - 2:00 PM" },
  { value: "5:00 PM - 6:00 PM", label: "5:00 PM - 6:00 PM" },
];

const skillOptions = ["Yoga", "CrossFit", "Cardio", "Strength", "Zumba"];

const BecomeTrainer = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: user.email,
      age: "",
      profileImage: user.photoURL,
      skills: [],
      availableDays: [],
      availableTime: null,
      otherInfo: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    axios.post("http://localhost:3000/api/pendingtrainer", data).then((res) => {
      if (res.status === 200) {
        toast.success("Trainer Application Submitted Successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f4f7fa] px-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md w-full max-w-xl lexend">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Become a Trainer
        </h2>
        <p className="text-gray-500 mb-6">
          Submit your information to apply as a trainer
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
              <FaUser className="text-gray-400 mr-2" />
              <input
                {...register("name", { required: true })}
                placeholder="Your full name"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-xs">
                Full Name is required
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 bg-gray-100 cursor-not-allowed">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                {...register("email")}
                readOnly
                className="w-full outline-none text-sm bg-gray-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
              <FaBirthdayCake className="text-gray-400 mr-2" />
              <input
                {...register("age", { required: true })}
                type="number"
                placeholder="Enter your age"
                className="w-full outline-none text-sm"
              />
            </div>
            {errors.age && (
              <span className="text-red-500 text-xs">Age is required</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
              <FaImage className="text-gray-400 mr-2" />
              <input
                {...register("profileImage")}
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-4 text-sm">
              {skillOptions.map((skill) => (
                <label key={skill} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={skill}
                    {...register("skills")}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Days
            </label>
            <Controller
              name="availableDays"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dayOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  isSearchable={false}
                  placeholder="Select available days"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Time
            </label>
            <Controller
              name="availableTime"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={timeOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  isSearchable={false}
                  placeholder="Select available days"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Info
            </label>
            <div className="flex items-start border border-gray-300 rounded-md px-3 py-3">
              <FaInfoCircle className="text-gray-400 mr-2 mt-1" />
              <textarea
                {...register("otherInfo")}
                rows={3}
                placeholder="Add any additional information..."
                className="w-full outline-none text-sm resize-none"
              />
            </div>
          </div>
          <div className="text-right pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white flex items-center gap-2 px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              <FaPaperPlane className="text-sm" />
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeTrainer;
