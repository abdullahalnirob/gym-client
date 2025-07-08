import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 0) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white shadow-md fixed w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="flex items-center justify-between px-5 md:px-20 py-4">
        <div className="py-2 px-4 rounded-md bg-gray-800">
          <img src="logo-new.png" alt="Logo" className="w-16 md:w-28" />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
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
                className="lucide lucide-x"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
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
                className="lucide lucide-menu"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <ul
          className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-6 lexend absolute md:static left-0 top-full w-full md:w-auto bg-white md:bg-transparent px-5 md:px-0 py-3 md:py-0 transition-all duration-300 ease-in-out ${menuOpen ? "block" : "hidden md:flex"
            }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/trainers"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition duration-300"
            >
              All Trainer
            </Link>
          </li>
          <li>
            <Link
              to="/classes"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition duration-300"
            >
              All Classes
            </Link>
          </li>
          <li>
            <Link
              to="/community"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition duration-300"
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div>
          <Link to="/login" className="px-6 flex items-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white rounded-lg font-semibold text-lg cursor-pointer">
            Login
           <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in-icon lucide-log-in"><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
