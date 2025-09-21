import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { FaLongArrowAltRight } from "react-icons/fa";
import Header from "../../components/header/Header";
import Speciality from "../../components/speciality/SpecialityMenu";
import TopDoctors from "../../components/top-doctors/TopDoctors";
import Banner from "../../components/banner/Banner";
const Home = () => {
  return (
    <>
      <Header />
      <Speciality />
      <TopDoctors />
      <Banner />
    </>
  );
};

export default Home;
