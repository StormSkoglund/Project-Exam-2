import React from "react";
import { NavLink } from "react-router-dom";

function Header(): React.ReactElement {
  return (
    <nav className="bg-theme-blue p-4 rounded-lg flex justify-between items-center fixed top-0 w-full z-50 opacity-95">
      <div className="flex items-center">
        <NavLink
          to="/"
          end
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </NavLink>
        <NavLink
          to="/venues"
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Places To Stay
        </NavLink>
        <NavLink
          to="/booking"
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Booking
        </NavLink>
        <NavLink
          to="/contact"
          className="text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Contact
        </NavLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <NavLink to="/" end>
          <img
            className="w-24 p-5"
            src="/assets/holistayLogo.svg"
            alt="The company logo, depicting a globe."
          />
        </NavLink>
      </div>
      <div>
        <NavLink
          to="#"
          className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm font-medium mr-4"
        >
          Login
        </NavLink>
        <NavLink
          to="#"
          className="bg-white text-blue-500 px-4 py-2 rounded-md text-sm font-medium"
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
}

export default Header;
