import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets_frontend/assets";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Banner component</div>
      <section className="pt-20 ml-15 mt-15 mr-15 bg-[#5F6FFF] rounded-2xl">
        <div className="container ml-15 mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
          {/* Text */}
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-4xl md:text-4xl  font-semibold text-white">
              book appointment <br />
            </h1>
            <span className="text-4xl md:text-4xl font-semibold text-white">
              with 100+ trusted doctors
            </span>

            <div className="flex ">
              <button
                onClick={() =>
                  navigate("/login", scrollTo({ top: 0, behavior: "smooth" }))
                }
                className="px-8 text-center py-1.5 mt-8 bg-[#FFFFFF] text-gray-800 rounded-2xl hover:bg-[#FFFFFF] items-center cursor-pointer"
              >
                create account
              </button>
            </div>
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src={assets.appointment_img}
              alt="Hero"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
