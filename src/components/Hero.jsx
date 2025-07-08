import React from "react";

const Hero = () => {
  return (
    <section className="pb-16 px-6 md:px-20 bg-gray-50">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-[#1f2933] text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            🏋Track Your Workouts.{" "}
            <span className="relative inline-block font-extrabold text-gray-900">
              <span className="absolute inset-0 bg-[#b9c6fa] -skew-y-2 rounded-sm z-0"></span>
              <span className="relative z-10">Crush Your Goals.</span>
            </span>
          </h1>
          <p className="text-gray-600 lexend text-base md:text-lg mb-8">
            Achieve your health goals with powerful tools to monitor workouts,
            diet, and progress — all in one place.
          </p>
          <div className="">
            <button className="px-4 flex items-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-lg font-semibold text-lg cursor-pointer">
              Start Your Journey
              <div className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-move-right-icon lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full max-w-2/3 md:max-w-md relative">
          <img
            src="img-02.webp"
            alt="Fitness illustration"
            className="w-full h-auto rounded-lg"
          />
          <div className="hidden sm:flex absolute top-4 left-[-40px] bg-white shadow-md rounded-lg p-4 w-44 items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-blue-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 1.567-3 3.5S10.343 15 12 15s3-1.567 3-3.5S13.657 8 12 8z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20h-14a2 2 0 01-2-2v-1a7 7 0 0114 0v1a2 2 0 01-2 2z"
              />
            </svg>
            <div>
              <p className="text-gray-900 font-semibold text-sm md:text-base">
                Expert Trainers
              </p>
            </div>
          </div>
          <div className="hidden sm:flex absolute bottom-16 left-[-20px] bg-white shadow-2xl rounded-lg p-4 w-44 items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-green-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth={2}
                fill="none"
              />
            </svg>
            <div>
              <p className="text-gray-900 font-semibold text-sm md:text-base">
                24/7 Tracking
              </p>
            </div>
          </div>
          <div className="hidden sm:flex absolute top-1/2 right-[-20px] bg-white shadow-md rounded-lg p-4 w-44 items-center gap-3 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-red-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
              />
            </svg>
            <div>
              <p className="text-gray-900 font-semibold text-sm md:text-base">
                Goal Progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
