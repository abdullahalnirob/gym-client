import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Chip } from "@mui/material";
import toast from "react-hot-toast";
import useAuth from "../hook/useAuth"; // adjust path as needed

// Helper to safely parse classInfo
const getClassArray = (classInfo) => {
  try {
    if (Array.isArray(classInfo)) return classInfo;
    if (typeof classInfo === "string") return JSON.parse(classInfo);
    return [];
  } catch {
    return [];
  }
};

// Fetch bookings
const fetchPaymentHistory = async () => {
  const response = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/paymenthistory");
  return response.data;
};

const BookedTrainer = () => {
  const { user } = useAuth(); // get logged-in user
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: fetchPaymentHistory,
  });

  // Filter bookings for current user
  const userBookings = data?.filter(
    (booking) => booking.email === user?.email
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
          My Booked Trainers
        </h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Trainer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Slot
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Classes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="6" className="text-center text-red-500 py-6">
                      Error: {error.message}
                    </td>
                  </tr>
                ) : userBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      You have not booked any trainers yet.
                    </td>
                  </tr>
                ) : (
                  userBookings.map((booking, index) => (
                    <tr key={booking._id} className="hover:bg-blue-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {booking.trinerName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {booking.selectedSlot}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {getClassArray(booking.classInfo).map((cls, idx) => (
                          <Chip
                            key={idx}
                            label={cls}
                            size="small"
                            className="mr-1 mb-1"
                          />
                        ))}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${booking.status === "paid"
                              ? "bg-green-500"
                              : "bg-red-500"
                            }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTrainer;
