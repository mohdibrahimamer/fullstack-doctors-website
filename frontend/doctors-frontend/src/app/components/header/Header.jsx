import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div>Header component</div>
      {/* main div container */}
      <section className="pt-20 ml-15 mr-15 bg-[#5F6FFF] rounded-2xl">
        <div className="container ml-15 mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          {/* Text */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              book appointment <br /> with trusted doctors
            </h1>
            <div className="flex  space-x-4">
              <img
                src={assets.group_profiles}
                alt="group profiles"
                className="w-full h-full"
              />
              <p className="text-white text-lg md:text-xl">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
              </p>
            </div>

            <div className="flex ">
              <a
                href="#speciality"
                className="px-8 text-center py-1.5  bg-[#FFFFFF] text-gray-800 rounded hover:bg-[#FFFFFF] items-center cursor-pointer"
              >
                book appointments
                <FaLongArrowAltRight className="relative left-35 top-0" />
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src={assets.header_img}
              alt="Hero"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
