import React, { useState, useEffect } from "react";
import { assets, doctors } from "../../assets/assets_frontend/assets.js";
import { useNavigate } from "react-router-dom";
const RelatedDoctors = ({ id, speciality }) => {
  const [doctorsData, SetdoctorsData] = useState(doctors);
  // state for storing the related doctors
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const navigate = useNavigate();
  console.log(relatedDoctors);
  useEffect(() => {
    if (speciality) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== id
      );
      setRelatedDoctors(filteredDoctors);
    }
  }, [doctorsData, id, speciality]);
  return (
    <>
      <h1></h1>
      <section className="max-w-6xl mx-auto mt-12 px-6">
        <h3 className="text-lg font-bold text-center mb-2">Related Doctors</h3>
        <p className="text-gray-600 text-center mb-6">
          Simply browse through our list of trusted doctors.
        </p>

        <div className="grid grid-cols-1 relative left-15   md:grid-cols-5 gap-6">
          {relatedDoctors.map((doctor) => {
            const { _id, name, image, speciality } = doctor;
            return (
              <div
                onClick={() => {
                  navigate(`/appointment/${_id} `);
                  scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="bg-white shadow-lg py-8 rounded-lg "
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
      </section>
    </>
  );
};

export default RelatedDoctors;
