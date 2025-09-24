import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets_frontend/assets";
const MyProfile = () => {
  const [details, setDetails] = useState([]);
  // yaha per saving all the details in the state
  const [userData, setUserData] = useState({
    image: assets.profile_pic,
    fullName: "Edward Vincent",
    email: "richardsjameswap@gmail.com",
    phone: "+1 1234567890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    gender: "male",
    dob: "20 july 2000",
  });

  // state for edit info
  const [editInfo, setEditInfo] = useState(true);
  // state for save info
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <>
      <div>MyProfile</div>

      <h1 className="text-2xl font-medium mb-6 text-center mt-6">
        display information of the profile
      </h1>

      <section className="max-w-lg flex flex-col gap-2 text-sm mx-auto p-6 mt-8 bg-white shadow-sm rounded-lg">
        {/* Profile Images */}
        <div className="flex flex-row items-center gap-6 ">
          <img
            src={userData.image}
            alt="profile"
            className="w-36  object-cover rounded-lg"
          />
          <img
            src={assets.uploadImage}
            className="w-36 h-36 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-3xl"
          ></img>
        </div>

        {/* Name */}
        {editInfo ? (
          <input
            type="text"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            className="mt-6 text-sm font-medium focus:outline"
            placeholder={`${userData.fullName}`}
          />
        ) : (
          <p className=" mt-6 text-sm font-medium">{userData.fullName}</p>
        )}

        {/* Contact Info */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Contact Information
          </h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-medium">Email id:</span>{" "}
              {editInfo ? (
                <input
                  type="text"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="mt-6 text-sm font-medium focus:outline"
                  placeholder={`${userData.email}`}
                />
              ) : (
                <p className="mt-6 text-sm font-medium">{userData.email}</p>
              )}
            </p>

            <p>
              <span className="font-medium">Phone:</span>{" "}
              {editInfo ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  className="mt-6 text-sm font-medium focus:outline"
                  placeholder={`${userData.phone}`}
                />
              ) : (
                <p className="mt-6 text-sm font-medium">{userData.phone}</p>
              )}
            </p>

            <p>
              <span className="font-medium">Address:</span>
              {editInfo ? (
                <>
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: { ...userData.address, line1: e.target.value },
                      })
                    }
                    className="mt-6 text-sm font-medium focus:outline"
                    placeholder={`${userData.address.line1}`}
                  />

                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: { ...userData.address, line2: e.target.value },
                      })
                    }
                    className="mt-6 text-sm font-medium focus:outline"
                    placeholder={`${userData.address.line2}`}
                  />
                </>
              ) : (
                <>
                  <p className="mt-6 text-sm font-medium">
                    {userData.address.line1}
                  </p>
                  <p className="mt-6 text-sm font-medium">
                    {userData.address.line2}
                  </p>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Basic Information
          </h3>

          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-medium">Date of Birth:</span>{" "}
              {editInfo ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                  className="mt-6 text-sm font-medium focus:outline"
                  placeholder={`${userData.dob}`}
                />
              ) : (
                <p className="mt-6 text-sm font-medium">{userData.dob}</p>
              )}
            </p>
            <p>
              <span className="font-medium">Gender:</span>

              {editInfo ? (
                <input
                  type="text"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  className="mt-6 text-sm font-medium focus:outline"
                  placeholder={`${userData.gender}`}
                />
              ) : (
                <p className="mt-6 text-sm font-medium">{userData.gender}</p>
              )}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => setEditInfo(!editInfo)}
            className="px-6 py-2 border border-indigo-500 text-indigo-600 rounded-full hover:bg-indigo-50"
          >
            Edit
          </button>
          <button className="px-6 py-2 border border-indigo-500 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            Save information
          </button>
        </div>
      </section>
    </>
  );
};

export default MyProfile;
