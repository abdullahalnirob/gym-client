import React from "react";
import Lottie from "lottie-react";
import loginJsonData from "../assets/login.json";
import { Link } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex items-center justify-evenly px-10 pt-5 pb-10 bg-gray-100 min-h-screen">
      <div>
        <Lottie
          animationData={loginJsonData}
          loop={true}
          style={{ width: 500 }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white lexend px-10 py-10 rounded-md shadow-xl w-[500px]">
          <h2 className="text-4xl font-semibold mb-4">Create Account</h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign up to get started with your account
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Full Name</label>
            <div
              className={`${
                errors.name ? "ring-1 ring-red-400" : "ring-1 ring-gray-300"
              } flex items-center rounded-md focus-within:ring-blue-400 px-3`}
            >
              <User className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="outline-none px-3 py-3 flex-1"
                {...register("name", { required: "Full name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="email">Email</label>
            <div
              className={`${
                errors.email ? "ring-1 ring-red-400" : "ring-1 ring-gray-300"
              } flex items-center rounded-md focus-within:ring-blue-400 px-3`}
            >
              <Mail className="text-gray-500 w-5 h-5" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="outline-none px-3 py-3 flex-1"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="photo">Profile Photo</label>
            <input
              {...register("photo", { required: "Profile photo is required" })}
              type="file"
              id="photo"
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.photo && (
              <span className="text-red-500 text-sm">
                {errors.photo.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="password">Password</label>
            <div
              className={`${
                errors.password ? "ring-1 ring-red-400" : "ring-1 ring-gray-300"
              } flex items-center rounded-md focus-within:ring-blue-400 px-3`}
            >
              <Lock className="text-gray-500 w-5 h-5" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                id="password"
                placeholder="Create a password"
                className="outline-none px-3 py-3 flex-1"
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-lg font-semibold w-full text-lg cursor-pointer mt-6"
          >
            Sign up
          </button>
          <button className="py-2 px-4 flex items-center bg-gray-100 hover:bg-blue-200 duration-200 text-gray-600 ring-1 ring-gray-400 shadow-md justify-center rounded-lg font-semibold w-full text-lg cursor-pointer mt-3">
            <img src="google.png" className="w-10 mr-2" alt="Google logo" />
            <div>Continue with Google</div>
          </button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
