import React from "react";
// import team1 from "team1.webp"
// import team2 from "team2.webp"
// import team3 from "team3.jpg"
const trainers = [
  {
    name: "Alex Carter",
    bio: "Certified personal trainer with 8+ years of experience in helping clients achieve their fitness goals through customized programs.",
    expertise: ["Strength Training", "Weight Loss", "Muscle Building"],
    image: "team1.webp",
  },
  {
    name: "Jasmine Lee",
    bio: "Passionate yoga and mobility coach who focuses on holistic well-being and mindfulness through movement.",
    expertise: ["Yoga", "Mobility", "Flexibility"],
    image: "team2.webp",
  },
  {
    name: "Carlos Vega",
    bio: "Group fitness instructor and former athlete, dedicated to pushing members beyond limits in high-intensity training environments.",
    expertise: ["HIIT", "CrossFit", "Endurance"],
    image: "team3.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">Meet Our Trainers</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {trainer.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{trainer.bio}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trainer.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
