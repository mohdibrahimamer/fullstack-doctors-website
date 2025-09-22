import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets_frontend/assets";
const MyProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [details, setDetails] = useState([]);

  // state for edit info
  const [editInfo, setEditInfo] = useState(false);
  // state for save info
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName && email && phone && address && gender && dob) {
      const newDetails = { fullName, email, phone, address, gender, dob };
      console.log("newDetails", newDetails);
      setDetails([...details, newDetails]);
      console.log("details", details);
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setGender("");
      setDob("");

      toast.success("details filled successfully");
    } else {
      toast.error("Please enter your full name, email and phone");
    }
  };

  return (
    <>
      <div>MyProfile</div>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Create Account
        </h2>
        <p>please sign up to book the appointment</p>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="fullName"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="enter your full name"
          />
        </div>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="email"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="phone"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="phone"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="address"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="address"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="gender"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="gender"
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="dob"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="dob"
            name="dob"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          Create Account
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>

      <h1 className="text-2xl font-semibold mb-6 text-center mt-6">
        display information of the profile
      </h1>

      {/* display information section of profile page */}
      <div className="w-full max-w-5xl mx-auto px-4 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Images */}
          <div className="flex gap-4">
            <img
              src={assets.profile_pic}
              alt="Doctor"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <img
              src={assets.uploadImage}
              alt="Placeholder"
              className="w-32 h-32 rounded-lg object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-6">Edward Vincent</h2>

            {/* Contact Info */}
            <div className="mb-6">
              <h3 className="uppercase text-sm font-semibold text-gray-600 border-b pb-2">
                Contact Information
              </h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Email id:</span>{" "}
                  <a
                    href="mailto:richardjameswap@gmail.com"
                    className="text-blue-600"
                  >
                    richardjameswap@gmail.com
                  </a>
                </li>
                <li>
                  <span className="font-medium">Phone:</span>{" "}
                  <a href="tel:+11234567890" className="text-blue-600">
                    +1 123 456 7890
                  </a>
                </li>
                <li>
                  <span className="font-medium">Address:</span> 57th Cross,
                  Richmond Circle, Church Road, London
                </li>
              </ul>
            </div>

            {/* Basic Info */}
            <div className="mb-6">
              <h3 className="uppercase text-sm font-semibold text-gray-600 border-b pb-2">
                Basic Information
              </h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Gender:</span> Male
                </li>
                <li>
                  <span className="font-medium">Birthday:</span> 20 July, 2024
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                Edit
              </button>
              <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                Save Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
