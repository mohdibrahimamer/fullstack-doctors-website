import React, { useState, useEffect } from "react";
import { doctors, assets } from "../../assets/assets_frontend/assets";
import { useNavigate, useParams } from "react-router-dom";
import BookingSlots from "../../components/booking-slots/BookingSlots";

import { MdOutlineVerified } from "react-icons/md";
const Appoinment = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  // Make sure your route is like: <Route path="/appointment/:id" ... />
  // and your link is: <Link to={`/appointment/${doc._id}`}>...</Link>
  const { id } = useParams();

  const getDoctor = (idFromUrl) => {
    // Compare as strings so it works whether ids are numbers or strings
    const foundInfo = doctors.find(
      (doc) => String(doc._id ?? doc.id) === String(idFromUrl)
    );
    console.log("foundInfo", foundInfo);
    setDoctor(foundInfo || null);
  };

  useEffect(() => {
    if (id) getDoctor(id);
  }, [id]); // no need to include `doctors` since it's a static import

  if (!id) return <div>Missing doctor id in the URL.</div>;

  return (
    <>
      <div>Appoinment page</div>

      {doctor ? (
        <section className="flex flex-col md:flex-row items-center md:items-start p-6 bg-white rounded-lg shadow-md mt-6 max-w-5xl mx-auto">
          {/* Doctor Image */}
          <img
            src={doctor.image}
            alt="Doctor"
            className="w-40 h-40 rounded-lg object-cover mb-4 md:mb-0 bg-[#5F6FFF]"
          />

          {/* Doctor Info */}
          <div className="md:ml-6 flex-1 border-gray-400 rounded-lg">
            <h2 className="text-xl font-bold flex items-center">
              {doctor.name}
              <img src={assets.verified_icon} className="ml-2 text-blue-500" />
            </h2>
            <p className="text-gray-600">
              {doctor.degree} – {doctor.speciality}{" "}
              <span className="ml-2 bg-gray-200 px-2 py-1 rounded text-sm">
                {doctor.experience}
              </span>
            </p>

            {/* About */}
            <div className="mt-3 text-gray-700">
              <h3 className="font-semibold">About</h3>
              <p className="text-sm">{doctor.about}</p>
            </div>

            {/* Appointment Fee */}
            <p className="mt-2">
              <span className="font-bold">Appointment fee:</span> ${doctor.fees}
            </p>
          </div>
        </section>
      ) : (
        <p>No doctor found for id {id}</p>
      )}
      <BookingSlots />
    </>
  );
};

export default Appoinment;
