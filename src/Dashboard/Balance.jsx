import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography, Box } from "@mui/material";

const fetchPaymentHistory = async () => {
  const response = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/paymenthistory");
  return response.data; // since the API returns an array directly
};

const Balance = () => {
  const {
    data: history = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: fetchPaymentHistory,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Payment History
        </h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-max sm:w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      <Box display="flex" justifyContent="center">
                        <CircularProgress size={24} />
                      </Box>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="5" className="text-center text-red-500 py-6">
                      Error: {error.message}
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      No payment history found.
                    </td>
                  </tr>
                ) : (
                  history.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.email}</td>
                      <td className="px-4 py-3 capitalize">{item.id}</td>
                      <td className="px-4 py-3">${item.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 capitalize">
                        <span className=" bg-green-400 py-1 px-2 rounded-md text-white">
                          {item.status}
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

export default Balance;
