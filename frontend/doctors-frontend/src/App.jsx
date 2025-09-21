import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "../src/app/components/navbar/Navbar.jsx";
import Home from "./app/pages/home/Home.jsx";
import Footer from "./app/components/footer/Footer.jsx";
import Login from "./app/pages/login/Login.jsx";
import CreateAccount from "./app/pages/create-account/CreateAccount.jsx";
import MyProfile from "./app/pages/profile/MyProfile.jsx";
import About from "../src/app/pages/about/About.jsx";
import AllDoctors from "../src/app/pages/all-doctors/AllDoctors.jsx";
import Contact from "../src/app/pages/contact/Contact.jsx";
import MyAppointments from "./app/pages/my-appointments/MyAppointments.jsx";
import Appoinment from "./app/pages/appointment/appoinment.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        {/* yaha per pages ki route banarey */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/doctors/:speciality" element={<AllDoctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:doctorId" element={<Appoinment />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
