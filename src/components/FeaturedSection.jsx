import React from "react";
import { FaDumbbell, FaUserFriends, FaCalendarAlt, FaChalkboardTeacher } from "react-icons/fa";

const features = [
  {
    title: "Expert Trainers",
    description: "Certified professionals ready to guide you through personalized fitness plans.",
    icon: <FaChalkboardTeacher size={30} className="text-blue-500" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Book training sessions at your convenience with real-time calendar slots.",
    icon: <FaCalendarAlt size={30} className="text-green-500" />,
  },
  {
    title: "Modern Equipment",
    description: "Access top-notch gym equipment designed to maximize your workouts.",
    icon: <FaDumbbell size={30} className="text-red-500" />,
  },
  {
    title: "Community Support",
    description: "Join a vibrant community of fitness enthusiasts to stay motivated.",
    icon: <FaUserFriends size={30} className="text-yellow-500" />,
  },
];

const FeaturedSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          Why Choose <span className="text-blue-600">Gimox</span>?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
