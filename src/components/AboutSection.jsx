import React from "react";
// import gymImage from "../assets/about-gym.jpg"; // Replace with your actual image path

const AboutSection = () => {
    const gymImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAY0NAUm6CT9fdEXiQwXPqH6462NDzsORllQ&s"
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="md:w-1/3">
          <img
            src={gymImage}
            alt="Gym workout"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            About <span className="text-blue-600">Gimox</span>
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At <strong>Gimox</strong>, we believe fitness is more than just a routine—it's a
            lifestyle. Established in 2022, our mission is to empower people of all levels
            to reach their fitness goals through personalized training, advanced facilities,
            and a supportive community.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a beginner or a seasoned athlete, our certified trainers,
            cutting-edge equipment, and flexible programs are designed to keep you motivated
            and progressing every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
