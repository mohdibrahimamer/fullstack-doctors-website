import React, { useState } from "react";
import Logo from "../../assets/assets_frontend/logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets.js";
import { set } from "react-hook-form";
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
            <div className="flex items-center cursor-pointer gap-2 group relative">
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="profile"
              />
              <img
                className="w-2.5 "
                src={assets.dropdown_icon}
                alt="drop-down"
              />

              <div className="absolute top-0 right-[-70px] pt-14 text-base text-gray-600   hidden group-hover:block">
                <div className="w-48 bg-stone-100 flex flex-col p-4 rounded-2xl gap-4">
                  <p className="hover:text-black cursor-pointer">
                    <Link to="/my-profile">my profile</Link>
                  </p>
                  <p className="hover:text-black cursor-pointer">
                    <Link to="/my-appointments">my appointments</Link>
                  </p>
                  <p
                    onClick={() => setToken(false)}
                    className="hover:text-black cursor-pointer"
                  >
                    <Link to="/logout">logout</Link>
                  </p>
                </div>
              </div>
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
