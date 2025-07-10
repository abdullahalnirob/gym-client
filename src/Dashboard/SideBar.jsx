import React, { useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaUserCheck,
  FaMoneyBill,
  FaBookOpen,
  FaPlus,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/" },
  { label: "All Subscribers", icon: <FaUsers />, path: "/dashboard/newsletter" },
  { label: "All Trainers", icon: <FaUserTie />, path: "/dashboard/all-trainers" },
  { label: "Applied Trainers", icon: <FaUserCheck />, path: "/dashboard/applied-trainers" },
  { label: "Balance Overview", icon: <FaMoneyBill />, path: "/dashboard/balance" },
  { label: "Add New Class", icon: <FaPlus />, path: "/dashboard/add-class" },
  { label: "All Classes", icon: <FaBookOpen />, path: "/dashboard/classes" },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white text-gray-800 p-6 flex flex-col gap-4 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} title={item.label} className="relative">
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-400"
                    }`}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  <span
                    className={`absolute left-0 h-6 w-1 bg-blue-400 rounded-r-full transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default SideBar;
