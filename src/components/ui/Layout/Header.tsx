import React, { useState } from "react";
import { FaHouse, FaPhone, FaBars } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import useMyStore from "../../../store";
import LoginModal from "../forms/modals/LoginModal";
import RegisterModal from "../forms/modals/RegisterModal";
import { FaTimes } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";

/*Header active links styling Stack Overflow. (2023). Styling NavLink using Tailwind CSS. [online] Available at: <https://stackoverflow.com/questions/66796367/styling-navlink-using-tailwind-css#72723231> [Accessed 24 Nov. 2024].*/
function Header(): React.ReactElement {
  const { handleOpenRegister, handleOpenLogin, isLoggedIn, logout } =
    useMyStore();

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
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div
          className={`${
            isOpen ? "block opacity-90" : "hidden"
          } absolute top-16 left-0 w-full bg-theme-blue p-4 rounded-lg shadow-lg `}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "active-link block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
                : "block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
            }
            onClick={toggleMenu}
          >
            <FaHouse className="inline mr-2" /> Home
          </NavLink>
          <NavLink
            to="/venues"
            className={({ isActive }) =>
              isActive
                ? "active-link block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
                : "block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
            }
            onClick={toggleMenu}
          >
            <IoBed className="inline mr-2" /> Places To Stay
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "active-link block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
                : "block text-white px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
            }
            onClick={toggleMenu}
          >
            <FaPhone className="inline mr-2" /> Contact
          </NavLink>
        </div>
      </div>
      <div className="hidden custom:flex items-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "active-link text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
              : "text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
          }
        >
          <div className="mx-2">
            <FaHouse />
          </div>
          Home
        </NavLink>
        <NavLink
          to="/venues"
          className={({ isActive }) =>
            isActive
              ? "active-link text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
              : "text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
          }
        >
          <div className="mx-2">
            <IoBed />
          </div>
          Places To Stay
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "active-link text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
              : "text-white inline-flex justify-between items-center align-middle px-3 py-2 rounded-md text-lg font-medium hover:shadow-lg"
          }
        >
          <div className="mx-2">
            <FaPhone />
          </div>
          Contact
        </NavLink>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 cursor-pointer hover:animate-pulse">
        <NavLink to="/" end>
          <img
            className="w-28 sm:w-32 custom:w-fit p-5 mt-5 mb-5"
            src="/assets/holistayLogo.png"
            alt="The company logo, depicting a globe."
          />
        </NavLink>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/profilemanager"
              className={({ isActive }) => (isActive ? "active-link" : " ")}
            >
              <RxAvatar className="text-4xl font-bold text-white hover:text-theme-green duration-300 hover:font-extrabold" />
            </NavLink>
            <button
              onClick={logout}
              className="text-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-lg rounded-md font-medium hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleOpenLogin}
              className="text-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-lg rounded-md font-medium mr-1 sm:mr-4 hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={handleOpenRegister}
              className="bg-white text-slate-900 px-2 py-1 sm:px-6 sm:py-3 rounded-md text-xs sm:text-lg font-medium hover:shadow-2xl"
            >
              Sign up
            </button>
          </>
        )}
      </div>
      <LoginModal /> <RegisterModal />
    </nav>
  );
}

export default Header;
