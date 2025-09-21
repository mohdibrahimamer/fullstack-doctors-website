import React, { useState } from "react";
import { assets, doctors } from "../../assets/assets_frontend/assets";
import { Link, useNavigate } from "react-router-dom";
const TopDoctors = () => {
  const [doctorsData, setDoctorsData] = useState(doctors);
  const navigate = useNavigate();
  return (
    <>
      <div>TopDoctors component</div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-5 capitalize">
          Top Doctors to book
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Simply browse through our extensive list of trusted doctors,
        </p>
      </div>

      <div className="grid grid-cols-1 ml-15 mr-15  md:grid-cols-5 gap-6">
        {doctorsData.slice(0, 10).map((doctor, idx) => {
          const { _id, name, image, speciality } = doctor;
          return (
            <div
              onClick={() => navigate(`/appointment/${_id}`)}
              className="bg-white shadow-lg py-6 rounded-lg "
            >
              <div className=" flex items-center justify-center bg-[#C9D8FF] rounded-t-lg p-4 ">
                <img src={image} alt={name} className="" />
              </div>
              <p className="text-md mt-2 ml-5 text-green-600">. available</p>
              <p className="text-md mt-3 text-center font-bold text-gray-600">
                {name}
              </p>
              <p className="text-sm   text-center  text-gray-600">
                {speciality}
              </p>
            </div>
          );
        })}
      </div>
      <Link to={"/doctors"}>
        <button className="mt-15 ml-120 items-center shadow-lg bg-[#EAEFFF] hover:bg-[#EAEFFF] text-[#4B5563] font-bold py-3 px-12 rounded cursor-pointer">
          more
        </button>
      </Link>
    </>
  );
};

export default TopDoctors;
