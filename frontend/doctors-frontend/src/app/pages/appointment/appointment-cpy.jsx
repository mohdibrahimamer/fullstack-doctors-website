import React, { useState, useEffect, use } from "react";
import { assets, doctors } from "../../assets/assets_frontend/assets";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "react-hook-form";
const Appoinment = () => {
  const [doctorsData, setDoctorsData] = useState(doctors);
  const navigate = useNavigate();
  const { Id } = useParams();

  useEffect(() => {
    getDoctors(Id);
  }, []);
  // yaha per getDoctors k naams se function likhre
  const getDoctors = (doctorId) => {
    const foundInfo = doctors.find((doc) => doc.doctorId === +doctorId);
    setDoctorsData(foundInfo);
  };

  return (
    <>
      <div>Appoinment page</div>
      <h1> doctor id is{doctorId}</h1>

      {/* page starts */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={doctorId[0]}
            alt="Doctors"
            className="rounded-xl shadow-md w-full max-w-md"
          />
        </div>
      </div>
    </>
  );
};

export default Appoinment;
