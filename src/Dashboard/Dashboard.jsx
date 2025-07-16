import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex lexend min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
