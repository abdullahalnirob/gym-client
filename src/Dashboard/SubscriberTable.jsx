import React, { useEffect, useState } from "react";
import axios from "axios";

const SubscriberTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/newsletter");
        setSubscribers(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch subscribers.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading)
    return <p className="text-center py-4">Loading subscribers...</p>;

  if (error)
    return <p className="text-center py-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Subscribers</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4">
                No subscribers found.
              </td>
            </tr>
          ) : (
            subscribers.map(({ _id, name, email }) => (
              <tr key={_id} className="hover:bg-blue-50">
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriberTable;
