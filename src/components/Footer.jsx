import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Logo or Site name */}
        <div className="text-xl font-bold text-white">
          Gimox Gym
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/alltrainers" className="hover:text-white transition">
            Trainers
          </Link>
          <Link to="/classes" className="hover:text-white transition">
            Classes
          </Link>
          <Link to="/community" className="hover:text-white transition">
            Community
          </Link>
          <Link to="/login" className="hover:text-white transition">
            Login
          </Link>
          <Link to="/signup" className="hover:text-white transition">
            Register
          </Link>
        </nav>

        {/* Social Media or Contact (optional) */}
        <div className="text-sm">
          © {new Date().getFullYear()} Gimox Gym. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
