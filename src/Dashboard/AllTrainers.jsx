/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const fetchAllUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/allusers");
    return res.data?.users || [];
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

const AllTrainers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: fetchAllUsers,
  });

  const trainers = users.filter((user) => user.role === "trainer");

  // Use mutation for better control
  const removeTrainerMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.patch(
        `http://localhost:3000/api/users/role-to-user/${id}`
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message, {
          duration: 4000,
        });
        queryClient.invalidateQueries(["allUsers"]);
      } else {
        toast.error(data.message || "Operation failed");
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to update trainer role";
      toast.error(errorMessage);
    },
  });

  const handleDeleteTrainer = (id) => {
    removeTrainerMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-blue-600 mb-6">All Trainers</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading trainers...</p>
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      ) : trainers.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No trainers found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white ring-1 ring-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={trainer.photo || "/avatar.png"}
                alt={trainer.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
                onError={(e) => {
                  e.target.src = "/avatar.png";
                }}
              />
              <h2 className="text-lg font-semibold text-gray-800">{trainer.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{trainer.email}</p>
              
              {/* Additional trainer info */}
              {trainer.skills && (
                <p className="text-xs text-gray-600 mb-1">
                  Skills: {trainer.skills.join(", ")}
                </p>
              )}
              
              {trainer.experience && (
                <p className="text-xs text-gray-600 mb-3">
                  Experience: {trainer.experience} years
                </p>
              )}
              
              <button
                onClick={() => handleDeleteTrainer(trainer._id)}
                disabled={removeTrainerMutation.isPending}
                className={`mt-3 text-xs py-2 px-4 rounded duration-200 transition-colors ${
                  removeTrainerMutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                } text-white`}
              >
                {removeTrainerMutation.isPending ? 'Removing...' : 'Remove Trainer Role'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrainers;