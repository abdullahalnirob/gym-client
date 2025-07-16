import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchFeaturedClasses = async () => {
  const res = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/classes");
  return res.data;
};

const FeaturedClasses = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredClasses"],
    queryFn: fetchFeaturedClasses,
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
          Featured Classes
        </h2>

        {isLoading && <p className="text-center">Loading classes...</p>}
        {isError && (
          <p className="text-center text-red-500">Error: {error.message}</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.map((cls) => (
              <div
                key={cls._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <img
                  src={cls.image}
                  alt={cls.className}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {cls.className}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {cls.details || "No description provided."}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {cls.additionalInfo || ""}
                  </p>
                  {cls.bookingCount !== undefined && (
                    <p className="mt-4 text-sm text-blue-600 font-semibold">
                      Total Bookings: {cls.bookingCount}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
