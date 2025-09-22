import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, doctors } from "../../assets/assets_frontend/assets";
const AllDoctors = () => {
  const { speciality } = useParams();
  const [FilterDoctor, setFilterDoctor] = useState([]);
  const [doctorsData, setDoctorsData] = useState(doctors);
  const navigate = useNavigate();

  // yaha per "filterDoctors" k naam se function likhre
  const applyFilter = () => {
    if (speciality) {
      setFilterDoctor(
        doctorsData.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setFilterDoctor(doctorsData);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctorsData, speciality]);
  return (
    <>
      <div>AllDoctors page</div>
      <h1 className="ml-15 mr-15">Browse through the doctors specialist</h1>
      {/* side bar for speciality of doctors */}
      <div className="flex">
        <div className="flex flex-col text-lg mt-10 ml-15 gap-4">
          <p
            className={`w-[140px] cursor-pointer`}
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate(`/doctors/General physician`)
            }
          >
            General Physician
          </p>
          <p
            className={`w-[140px] cursor-pointer`}
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Gynecologist`)
            }
          >
            gynacologist
          </p>
          <p
            className={`w-[140px] cursor-pointer`}
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Dermatologist`)
            }
          >
            Dermatologist
          </p>

          <p
            className={`w-[140px] cursor-pointer`}
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate(`/doctors/Pediatricians`)
            }
          >
            Pediatrician
          </p>

          <p
            className={`w-[140px] cursor-pointer`}
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate(`/doctors/Neurologist`)
            }
          >
            Neurologist
          </p>
        </div>

        {/* displaying all the doctors of the speciality */}
        <div className="grid grid-cols-1 ml-38 mr-10  md:grid-cols-4 gap-4">
          {FilterDoctor.map((doctor, idx) => {
            const { _id, name, image, speciality } = doctor;
            return (
              <div
                key={_id}
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
      </div>
    </>
  );
};

export default AllDoctors;
