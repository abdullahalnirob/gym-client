import { CircularProgress } from "@mui/material";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FaClock, FaAward, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchTrainers = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/api/allusers");
    return data.users;
  } catch {
    toast.error("Error loading trainers");
    throw new Error("Failed to load trainers");
  }
};

const AllTriners = () => {
  const navigate = useNavigate();

  const { data: trainers = [], isLoading, isError } = useQuery({
    queryKey: ["allTrainers"],
    queryFn: fetchTrainers,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <CircularProgress size={50} sx={{ color: "#60a5fa" }} />
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load trainers.
      </div>
    );

  return (
    <div className="pb-20 px-10 lexend">
      <h1 className="text-4xl mt-3 text-[#1f2933] font-bold text-center">
        All Trainers
      </h1>
      <p className="text-center text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
        Meet our certified trainers with years of experience in fitness and
        well-being. Choose the right coach for your journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 px-6">
        {trainers
          .filter((t) => t.role === "trainer")
          .map((trainer) => (
            <div
              key={trainer._id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center pt-8 pb-4 px-6 bg-gradient-to-br from-blue-50 to-white">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white">
                  <img
                    src={trainer.profileImage || "/placeholder.svg"}
                    alt={trainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {trainer.name}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <FaAward className="text-yellow-500" />
                  {trainer.experience} {trainer.experience > 1 ? "years" : "year"} experience
                </p>
              </div>

              <div className="px-6 pb-5 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2 mt-2">
                  <FaClock />
                  <span>Available Slots</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {trainer.availableSlots?.map((slot, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1 rounded-full font-medium"
                    >
                      {slot}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => navigate(`/trainers/${trainer._id}`)}
                  className="mt-5 w-full bg-blue-600 text-white text-sm font-semibold py-3.5 cursor-pointer rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  Know More <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTriners;
