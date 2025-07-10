import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPendingTrainers = async () => {
  const response = await axios.get("http://localhost:3000/api/pendingtrainer");
  return response.data.users;
};

const AppliedTrainers = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["pendingTrainers"],
    queryFn: fetchPendingTrainers,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600 mb-6">
          Applied Trainers
        </h1>

        <div className="bg-white ring-1 ring-blue-200 rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full w-max sm:w-full divide-y divide-gray-200">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[60px]">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[180px]">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                    Application Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[240px]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="5" className="text-center text-red-500 py-6">
                      Error: {error.message}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      No pending trainers found.
                    </td>
                  </tr>
                ) : (
                  data.map((trainer, index) => (
                    <tr
                      key={trainer._id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                        {trainer.name}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                        {trainer.email}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-900">
                        {new Date().toISOString().split("T")[0]}{" "}
                        {/* Fake date */}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm flex items-center gap-2">
                        <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                          View
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                          Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
                          Reject
                        </button>
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

export default AppliedTrainers;
