import React, { useState } from "react";
import { FaCheckCircle, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { assets, specialityData } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  const [speciality, setSpeciality] = useState(specialityData);
  return (
    <>
      <section id="speciality" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-5 capitalize">
            find by speciality
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
          <div className="flex  justify-center">
            {speciality.map((f, idx) => (
              <Link
                onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
                to={`/doctors/${f.speciality}`}
              >
                <div key={idx} className="space-y-3 px-3">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="flex items-center justify-center mx-auto w-14 h-14"
                  />

                  <p className="text-sm font-semibold text-gray-600">
                    {f.speciality}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialityMenu;
