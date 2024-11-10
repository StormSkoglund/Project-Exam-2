import React from "react";
import { FaBookOpen, FaHouse, FaPhone } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Header(): React.ReactElement {
  return (
    <nav className="bg-theme-blue p-10 rounded-lg flex justify-between items-center fixed top-0 w-full z-50 opacity-95">
      <div className="flex items-center">
        <NavLink
          to="/"
          end
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <FaHouse />
          Home
        </NavLink>
        <NavLink
          to="/venues"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <IoBed />
          Places To Stay
        </NavLink>
        <NavLink
          to="/booking"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <FaBookOpen />
          Booking
        </NavLink>
        <NavLink
          to="/contact"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <FaPhone />
          Contact
        </NavLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
        <NavLink to="/" end>
          <img
            className="w-fit p-5 mt-5 mb-5"
            src="/assets/holistayLogo.png"
            alt="The company logo, depicting a globe."
          />
        </NavLink>
      </div>
      <div>
        <NavLink
          to="#"
          className="text-white px-4 py-2 text-lg rounded-md font-medium mr-4"
        >
          Login
        </NavLink>
        <NavLink
          to="#"
          className="bg-white text-slate-900 px-6 py-3 rounded-md text-lg font-medium"
        >
          Sign up
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
