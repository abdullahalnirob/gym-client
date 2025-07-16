import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
