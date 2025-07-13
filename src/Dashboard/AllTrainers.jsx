import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

  const handleDeleteTrainer = async (id) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3000/api/users/role-to-user/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allUsers"]);
      } else {
        toast.error(data.message || "Operation failed");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to update trainer role"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-blue-600 mb-6">All Trainers</h1>

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : trainers.length === 0 ? (
        <p className="text-gray-500">No trainers found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white ring-1 ring-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={trainer.photo || "/avatar.png"}
                alt={trainer.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold">{trainer.name}</h2>
              <p className="text-sm text-gray-500">{trainer.email}</p>
              <button
                onClick={() => handleDeleteTrainer(trainer._id)}
                className="mt-3 text-xs bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded duration-200 cursor-pointer"
              >
                Remove Trainer Role
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrainers;
