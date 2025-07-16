import {
  FaUser,
  FaClock,
  FaDumbbell,
  FaArrowRight,
  FaCrown,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const TrainerBookedPage = () => {
  const navigate = useNavigate();

  const selectedSlot = localStorage.getItem("selectedSlot");
  const Name = localStorage.getItem("trainerName");
  const skills = JSON.parse(localStorage.getItem("skills") || "[]");

  const bookingInfo = {
    trainerName: Name,
    packages: [
      {
        id: "basic",
        name: "Basic Membership",
        icon: <FaShieldAlt className="text-2xl" />,
        benefits: [
          "Access to gym facilities during regular operating hours.",
          "Use of cardio and strength training equipment.",
        ],
        price: "10",
        popular: false,
        gradient: "from-gray-400 to-gray-600",
      },
      {
        id: "standard",
        name: "Standard Membership",
        icon: <FaStar className="text-2xl" />,
        benefits: [
          "All benefits of the basic membership.",
          "Access to group fitness classes such as yoga, spinning, and Zumba.",
          "Access to locker rooms and showers.",
        ],
        price: "50",
        popular: true,
        gradient: "from-blue-500 to-purple-600",
      },
      {
        id: "premium",
        name: "Premium Membership",
        icon: <FaCrown className="text-2xl" />,
        benefits: [
          "All benefits of the standard membership.",
          "Access to personal training sessions with certified trainers.",
          "Use of additional amenities like a sauna or steam room.",
          "Discounts on massage therapy or nutrition counseling.",
        ],
        price: "100",
        popular: false,
        gradient: "from-yellow-400 to-orange-500",
      },
    ],
  };

  const handleBecomeTrainer = () => {
    navigate("/become-trainer");
  };

  const handlepay = (price, id) => {
    localStorage.setItem("price", price);
    navigate(`/payment/${id}`);
  };

  return (
    <div className="min-h-screen lexend bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg ring-1 ring-blue-200 border border-gray-100 p-6 mb-8 w-full">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2.5">
              <FaUser className="w-6 h-6 text-blue-600" aria-hidden="true" />
              Booking Details
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-md bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-white transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Trainer
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {bookingInfo.trainerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-gradient-to-r from-green-50 to-white hover:from-green-100 hover:to-white transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaClock
                  className="w-5 h-5 text-green-600"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Time Slot
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {selectedSlot}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-gradient-to-r from-orange-50 to-white hover:from-orange-100 hover:to-white transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaDumbbell
                  className="w-5 h-5 text-orange-600"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Classes
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm font-medium bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center text-gray-900 mb-3">
            Choose Your Membership
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Find the plan that fits your fitness journey
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {bookingInfo.packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 ${
                  pkg.popular ? "border-blue-400 shadow-md" : ""
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="flex flex-col h-full p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto">
                    {pkg.icon}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-left flex-grow">
                    {pkg.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-green-500 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <Link to={`/payment/${pkg.id}`}> */}
                  <button
                    onClick={() => handlepay(pkg.price, pkg.id)}
                    className={`w-full py-3.5 cursor-pointer rounded-lg font-medium text-sm transition-colors ${
                      pkg.popular
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300  text-gray-900 hover:bg-gray-400"
                    }`}
                    aria-label={`Choose ${pkg.name} plan`}
                  >
                    Choose Plan
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-blue-400 text-white p-6 rounded-xl mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">
              Ready to Share Your Expertise?
            </h2>
            <p className="text-blue-100 mb-4">
              Join our community of professional trainers and help others
              achieve their fitness goals
            </p>
            <button
              onClick={handleBecomeTrainer}
              className="bg-white text-blue-400 px-8 py-3 rounded-lg cursor-pointer hover:bg-gray-100 duration-200 text-lg flex items-center gap-2 mx-auto"
            >
              Become a Trainer <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerBookedPage;
