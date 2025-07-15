import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchClasses = async () => {
  const res = await axios.get("http://localhost:3000/api/classes");
  return res.data;
};

const AllClasses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });

  if (isLoading) return <p>Loading classes...</p>;
  if (isError) return <p>Error loading classes</p>;

  return (
    <div className="my-3">
      <h2 className="text-2xl font-bold text-center">All Classes</h2>
      <p className="text-center text-gray-600 mt-2">
        Browse through our full list of available classes below. Whether
        you're a beginner or looking to advance your skills, there's something
        for everyone.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {data.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No classes found</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.className}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.className}</h3>
                <p className="text-gray-600">{item.details}</p>
                <p className="text-sm text-gray-500 mt-2">{item.additionalInfo}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllClasses;
