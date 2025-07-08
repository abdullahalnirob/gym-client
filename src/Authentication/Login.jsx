import React from "react";
import Lottie from "lottie-react";
import loginJsonData from "../assets/login.json";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex items-center justify-evenly px-10 pt-5 pb-10">
      <div>
        <Lottie
          animationData={loginJsonData}
          loop={true}
          style={{ width: 500 }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white lexend px-10 py-10 rounded-md shadow-xl w-[500px]">
          <h2 className="text-4xl font-semibold mb-4">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-6">
            Login to your account to continue
          </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <div
              className={`${
                errors.email ? "ring-1 ring-red-400" : "ring-1 ring-gray-300"
              } flex items-center rounded-md ${
                errors.password
                  ? "focus-within:ring-red-400"
                  : "focus-within:ring-blue-400"
              } px-3`}
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
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="password">Password</label>
            <div
              className={`${
                errors.password ? "ring-1 ring-red-400" : "ring-1 ring-gray-300"
              } flex items-center rounded-md ${
                errors.password
                  ? "focus-within:ring-red-400"
                  : "focus-within:ring-blue-400"
              } px-3`}
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
                placeholder="Enter your password"
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
            Login
          </button>
          <button className="py-2 px-4 flex items-center bg-gray-100 hover:bg-blue-200 duration-200 text-gray-600 ring-1 ring-gray-400 shadow-md justify-center rounded-lg font-semibold w-full text-lg cursor-pointer mt-3">
            <img src="google.png" className="w-10 mr-2" alt="Google logo" />
            <div>Continue with Google</div>
          </button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?
            <Link to="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
