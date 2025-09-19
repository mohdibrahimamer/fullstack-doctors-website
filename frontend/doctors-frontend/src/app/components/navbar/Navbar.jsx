import React, { useState } from "react";
import Logo from "../../assets/assets_frontend/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets.js";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <>
      <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-5xl rounded-full mx-auto w-full bg-white">
        <Link to="/">
          <img src={Logo} />
        </Link>
        <nav
          id="menu"
          className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width] bg-white/50 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-900 text-sm font-normal"
        >
          <Link className="hover:text-indigo-600" to="/">
            HOME
          </Link>
          <Link className="hover:text-indigo-600" to="/doctors">
            ALL DOCTORS
          </Link>
          <Link className="hover:text-indigo-600" to="/about">
            ABOUT
          </Link>
          <Link className="hover:text-indigo-600" to="/contact">
            CONTACT
          </Link>
          <button id="closeMenu" className="md:hidden text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {token ? (
            <div className="">
              <img src={assets.profile_pic} alt="profile" />
              <img src={assets.dropdown_icon} alt="drop-down" />
            </div>
          ) : (
            <button>
              <Link
                className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                to="/create-account"
              >
                Create account
              </Link>
            </button>
          )}

          <button id="openMenu" className="md:hidden text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
