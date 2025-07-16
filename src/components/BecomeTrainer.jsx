import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaImage,
  FaClock,
  FaInfoCircle,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import useAuth from "../hook/useAuth";

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
  {
    value: "6:00 AM - 7:00 AM",
    label: "6:00 AM - 7:00 AM",
    category: "morning",
  },
  {
    value: "8:00 AM - 9:00 AM",
    label: "8:00 AM - 9:00 AM",
    category: "morning",
  },
  {
    value: "4:00 PM - 5:00 PM",
    label: "4:00 PM - 5:00 PM",
    category: "evening",
  },
  {
    value: "5:00 PM - 6:00 PM",
    label: "5:00 PM - 6:00 PM",
    category: "evening",
  },
  {
    value: "6:00 PM - 7:00 PM",
    label: "6:00 PM - 7:00 PM",
    category: "evening",
  },
  {
    value: "7:00 PM - 8:00 PM",
    label: "7:00 PM - 8:00 PM",
    category: "night",
  },
  {
    value: "8:00 PM - 9:00 PM",
    label: "8:00 PM - 9:00 PM",
    category: "night",
  },
  {
    value: "9:00 PM - 10:00 PM",
    label: "9:00 PM - 10:00 PM",
    category: "night",
  },
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
      email: user?.email,
      age: "",
      profileImage: user?.photoURL || "",
      skills: [],
      availableDays: [],
      availableSlots: [],
      otherInfo: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      experience: "",
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      role: "trainer",
      availableDays: data.availableDays.map((day) => day.value),
      availableSlots: data.availableSlots.map((time) => time.value),
      socials: {
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
      },
    };

    delete formattedData.facebook;
    delete formattedData.instagram;
    delete formattedData.linkedin;

    try {
      const res = await axios.post(
        "https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/pendingtrainer",
        formattedData
      );

      if (res.status === 200) {
        const activityData = {
          email: user?.email,
          role: "user",
          status: "pending",
        };
        await axios.post("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/activity", activityData);
        toast.success("Trainer Application Submitted Successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit trainer application");
    }
  };

  return (
    <>
      <Helmet>
        <title>Become a Trainer | Gimox Gym</title>
        <meta
          name="description"
          content="Apply to become a trainer at Gimox Gym. Submit your details and join our expert trainer team."
        />
      </Helmet>
      <div className="min-h-screen flex justify-center items-center bg-[#f4f7fa] px-4">
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md w-full max-w-xl lexend">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Become a Trainer</h2>
          <p className="text-gray-500 mb-6">
            Submit your information to apply as a trainer
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
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
                <span className="text-red-500 text-xs">Full Name is required</span>
              )}
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-3 bg-gray-100 cursor-not-allowed">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  {...register("email")}
                  readOnly
                  className="w-full outline-none text-sm bg-gray-100"
                />
              </div>
            </div>
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
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
            {/* Profile Image */}
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
            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                <FaClock className="text-gray-400 mr-2" />
                <input
                  {...register("experience")}
                  type="number"
                  placeholder="Enter years of experience"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-4 text-sm">
                {skillOptions.map((skill) => (
                  <label key={skill} className="flex items-center gap-2">
                    <input type="checkbox" value={skill} {...register("skills")} />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
            {/* Available Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
              <Controller
                name="availableDays"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={dayOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select available days"
                  />
                )}
              />
            </div>
            {/* Available Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
              <Controller
                name="availableSlots"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={timeOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    placeholder="Select available time"
                  />
                )}
              />
            </div>
            {/* Other Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Info</label>
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
            {/* Socials */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                <FaFacebook className="text-gray-400 mr-2" />
                <input
                  {...register("facebook")}
                  type="text"
                  placeholder="Enter your Facebook URL"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                <FaInstagram className="text-gray-400 mr-2" />
                <input
                  {...register("instagram")}
                  type="text"
                  placeholder="Enter your Instagram URL"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-3">
                <FaLinkedin className="text-gray-400 mr-2" />
                <input
                  {...register("linkedin")}
                  type="text"
                  placeholder="Enter your LinkedIn URL"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Submit button */}
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
    </>
  );
};

export default BecomeTrainer;
