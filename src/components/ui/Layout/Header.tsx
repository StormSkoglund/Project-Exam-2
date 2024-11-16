import React, { useState } from "react";
import { FaBookOpen, FaHouse, FaPhone, FaBars } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useMyStore from "../../../store";
import LoginModal from "../forms/modals/LoginModal";
import RegisterModal from "../forms/modals/RegisterModal";

function Header(): React.ReactElement {
  const { handleOpenRegister } = useMyStore();
  const { handleOpenLogin } = useMyStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-theme-blue p-4 custom:p-10 rounded-lg flex justify-between items-center fixed top-0 w-full z-50 opacity-95">
      <div className="flex items-center custom:hidden">
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-theme-blue p-4 rounded-lg shadow-lg`}
        >
          <NavLink
            to="/"
            end
            className="block text-white px-3 py-2 rounded-md text-lg font-medium"
            onClick={toggleMenu}
          >
            <FaHouse className="inline mr-2" />
            Home
          </NavLink>
          <NavLink
            to="/venues"
            className="block text-white px-3 py-2 rounded-md text-lg font-medium"
            onClick={toggleMenu}
          >
            <IoBed className="inline mr-2" />
            Places To Stay
          </NavLink>
          <NavLink
            to="/booking"
            className="block text-white px-3 py-2 rounded-md text-lg font-medium"
            onClick={toggleMenu}
          >
            <FaBookOpen className="inline mr-2" />
            Booking
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-white px-3 py-2 rounded-md text-lg font-medium"
            onClick={toggleMenu}
          >
            <FaPhone className="inline mr-2" />
            Contact
          </NavLink>
          <button
            onClick={handleOpenLogin}
            className="block text-white px-3 py-2 rounded-md text-lg font-medium"
          >
            Login
          </button>
          <button
            className="block bg-white text-slate-900 px-3 py-2 rounded-md text-lg font-medium mt-2"
            onClick={handleOpenRegister}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="hidden custom:flex items-center">
        <NavLink
          to="/"
          end
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <div className="mx-2">
            <FaHouse />
          </div>
          Home
        </NavLink>
        <NavLink
          to="/venues"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <div className="mx-2">
            <IoBed />
          </div>
          Places To Stay
        </NavLink>
        <NavLink
          to="/booking"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <div className="mx-2">
            <FaBookOpen />
          </div>
          Booking
        </NavLink>
        <NavLink
          to="/contact"
          className="text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium"
        >
          <div className="mx-2">
            <FaPhone />
          </div>
          Contact
        </NavLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 cursor-pointer">
        <NavLink to="/" end>
          <img
            className="w-28 custom:w-fit p-5 mt-5 mb-5"
            src="/assets/holistayLogo.png"
            alt="The company logo, depicting a globe."
          />
        </NavLink>
      </div>
      <div className="hidden custom:flex">
        <button
          onClick={handleOpenLogin}
          className="text-white px-4 py-2 text-lg rounded-md font-medium mr-4"
        >
          Login
        </button>
        <button
          onClick={handleOpenRegister}
          className="bg-white text-slate-900 px-6 py-3 rounded-md text-lg font-medium"
        >
          Sign up
        </button>
      </div>
      <LoginModal />
      <RegisterModal />
    </nav>
  );
}

export default Header;
