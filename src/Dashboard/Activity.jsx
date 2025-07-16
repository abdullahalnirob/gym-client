import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import useAuth from "../hook/useAuth"; 

const fetchPendingTrainers = async () => {
  const response = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/activity");
  return response.data; // ✅ returns the array of trainers
};

const Activity = () => {
  const { user } = useAuth(); // ✅ logged-in user
  const {
    data: pending = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingTrainer"],
    queryFn: fetchPendingTrainers,
  });

  const matchedTrainers = pending.filter(
    (trainer) => trainer.email === user?.email
  );

  return (
    <Box className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <Box className="max-w-7xl mx-auto">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          My Pending Trainer Request
        </Typography>

        <Paper className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Current Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    <CircularProgress size={24} />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="4" className="text-center text-red-500 py-6">
                    Error: {error.message}
                  </td>
                </tr>
              ) : matchedTrainers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    You have no pending trainer request.
                  </td>
                </tr>
              ) : (
                matchedTrainers.map((trainer, index) => (
                  <tr key={trainer._id || index} className="hover:bg-blue-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{trainer.name}</td>
                    <td className="px-4 py-3">{trainer.email}</td>
                    <td className="px-4 py-3 capitalize">{trainer.role}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`py-1 px-2 ${trainer.status === "pending" ? "bg-yellow-500" : "bg-green-500"} text-white rounded capitalize`}>
                        {trainer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Paper>
      </Box>
    </Box>
  );
};

export default Activity;
