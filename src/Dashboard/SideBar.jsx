import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckToSlot } from "react-icons/fa6";
import { MdOutlinePostAdd } from "react-icons/md";
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
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const AdminMenus = [
  { label: "Home", icon: <FaHome />, path: "/" },
  {
    label: "All Subscribers",
    icon: <FaUsers />,
    path: "/dashboard/newsletter",
  },
  {
    label: "All Users",
    icon: <FaUsers />,
    path: "/dashboard/all-users",
  },
  {
    label: "All Trainers",
    icon: <FaUserTie />,
    path: "/dashboard/all-trainers",
  },
  {
    label: "Applied Trainers",
    icon: <FaUserCheck />,
    path: "/dashboard/applied-trainers",
  },
  {
    label: "Balance Overview",
    icon: <FaMoneyBill />,
    path: "/dashboard/balance",
  },
  { label: "Add New Class", icon: <FaPlus />, path: "/dashboard/add-class" },
  { label: "All Classes", icon: <FaBookOpen />, path: "/dashboard/classes" },
     { label: "Add new Forum", icon: <MdOutlinePostAdd />, path: "/dashboard/add-forum" },

];

const UserMenus = [
  { label: "Home", icon: <FaHome />, path: "/" },
  { label: "All Classes", icon: <FaBookOpen />, path: "/dashboard/classes" },
];

const TrainerMenus = [
  { label: "Home", icon: <FaHome />, path: "/" },
  {
    label: "Manage Slots",
    icon: <FaCheckToSlot />,
    path: "/dashboard/manage-slots",
  },
  { label: "Add New slot", icon: <Plus />, path: "/dashboard/add-slot" },
  { label: "Add new Forum", icon: <MdOutlinePostAdd />, path: "/dashboard/add-forum" },
];

const SideBar = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");
  const [isOpen, setIsOpen] = useState(false);

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/allusers");
        return res.data?.users || [];
      } catch (err) {
        toast.error("Failed to fetch users.");
        throw new Error("Error fetching users");
      }
    },
  });

  useEffect(() => {
    const matchedUser = users.find((u) => u.email === user?.email);
    if (matchedUser?.role) {
      setRole(matchedUser.role);
    }
  }, [user?.email, users]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuToRender =
    role === "admin"
      ? AdminMenus
      : role === "trainer"
      ? TrainerMenus
      : UserMenus;

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-white text-gray-800 p-6 flex flex-col gap-4 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-400"
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {menuToRender.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.label}
              className="relative"
            >
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
                    className={`absolute top-3 left-0 h-6 w-1 bg-blue-400 rounded-r-full transition-opacity duration-200 ${
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
        ></div>
      )}
    </>
  );
};

export default SideBar;
