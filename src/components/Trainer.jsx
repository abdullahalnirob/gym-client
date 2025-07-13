import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaClock,
  FaExclamationTriangle,
  FaSpinner,
  FaArrowRight,
  FaCheckCircle,
  FaEnvelope,
  FaDumbbell,
  FaCalendarAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const fetchUser = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/user?_id=${id}`);
  return data;
};

const Trainer = () => {
  const { id } = useParams();
  const [Skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.skills?.length > 0) {
      const lowerSkills = data.skills.map((skill) => skill.toLowerCase());
      setSkills(lowerSkills);
    }
  }, [data]);

  const handleSlotClick = (slot, name) => {
    localStorage.setItem("selectedSlot", slot);
    localStorage.setItem("trainerName", name);
    localStorage.setItem("skills", JSON.stringify(Skills));
    navigate(`/trainer-booked-page/${id}`);
  };

  const handleBecomeTrainer = () => {
    navigate("/become-trainer");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-5">
        <div className="flex flex-col items-center justify-center min-h-96 gap-5">
          <FaSpinner className="w-10 h-10 text-blue-400 animate-spin" />
          <p className="text-lg text-slate-600">Loading trainer details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 p-5">
        <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center">
          <FaExclamationTriangle className="w-12 h-12 text-red-600" />
          <h3 className="text-2xl font-semibold text-red-600">Something went wrong</h3>
          <p className="text-base text-slate-600 max-w-96">{error.message}</p>
        </div>
      </div>
    );
  }

  const trainerData = data;

  return (
    <div className="min-h-screen lexend bg-slate-50">
      <div className="max-w-6xl mx-auto p-5">
        <div className="bg-blue-400 text-white p-6 rounded-xl mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Share Your Expertise?</h2>
          <p className="text-blue-100 mb-4">
            Join our community of professional trainers and help others achieve their fitness goals
          </p>
          <button
            onClick={handleBecomeTrainer}
            className="bg-white text-blue-400 px-8 py-3 rounded-lg cursor-pointer hover:bg-gray-100 duration-200 text-lg flex items-center gap-2 mx-auto"
          >
            Become a Trainer <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={trainerData.photo || "/placeholder.svg?height=200&width=200"}
                      alt={trainerData.name}
                      className="w-48 h-48 rounded-xl object-cover border-4 border-blue-400"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">
                          Name: {trainerData.name}
                        </h1>
                        <p className="text-xl text-blue-400 font-semibold mb-2">
                          {trainerData.role}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaEnvelope className="text-blue-400" />
                        <span>{trainerData.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaDumbbell className="text-blue-400" />
                        <span>{trainerData.experience} years experience</span>
                      </div>
                    </div>
                    {Skills.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">Skills</h3>
                        <ul className="flex flex-wrap gap-2">
                          {Skills.map((skill, i) => (
                            <li key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-xl text-slate-800 mb-4">Connect with {trainerData.name}</h3>
              <div className="flex gap-4 flex-wrap">
                <a
                  href={trainerData.socials?.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200/80 hover:bg-slate-200 duration-200 text-blue-400 rounded-lg font-medium"
                >
                  <FaFacebook />
                  <span>Facebook</span>
                </a>
                <a
                  href={trainerData.socials?.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200/80 hover:bg-slate-200 duration-200 text-blue-400 rounded-lg font-medium"
                >
                  <FaInstagram />
                  <span>Instagram</span>
                </a>
                <a
                  href={trainerData.socials?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-200/80 hover:bg-slate-200 duration-200 text-blue-400 rounded-lg font-medium"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-5">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-400" />
                Available Time Slots
              </h3>
              <p className="text-slate-600 mb-6">Click on any available slot to book your session</p>
              <div className="space-y-3">
                {(trainerData.availableSlots || []).map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSlotClick(slot, trainerData.name)}
                    className="w-full cursor-pointer flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg text-left hover:bg-blue-50 hover:border-blue-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FaClock className="text-blue-400" />
                      <span className="font-medium text-slate-700">{slot}</span>
                    </div>
                    <FaArrowRight className="text-blue-400 w-4 h-4" />
                  </button>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center text-sm text-blue-700">
                <FaCheckCircle className="inline w-4 h-4 mr-1" />
                Instant booking confirmation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;
