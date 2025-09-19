import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const MyProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  const [details, setDetails] = useState([]);

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
    </>
  );
};

export default MyProfile;
