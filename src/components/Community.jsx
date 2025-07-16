import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchForums = async () => {
  const res = await axios.get("https://server-7skmkpztr-abdullah-al-nirobs-projects.vercel.app/api/forum");
  return res.data;
};

const Community = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["forums"],
    queryFn: fetchForums,
  });

  if (isLoading) return <div className="text-center mt-10">Loading forums...</div>;

  if (isError)
    return (
      <div className="text-center mt-10 text-red-600">
        Error fetching forums: {error.message}
      </div>
    );

  if (!data || data.length === 0)
    return <div className="text-center mt-10">No forums available.</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {data.map((forum) => (
        <div
          key={forum._id || forum.id}
          className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-3">{forum.title}</h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{forum.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Community;
