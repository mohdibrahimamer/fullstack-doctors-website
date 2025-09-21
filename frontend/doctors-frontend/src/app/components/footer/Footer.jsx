import React from "react";
import Logo from "../../assets/assets_frontend/logo.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div>Footer</div>

      <footer class="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
        <div class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div class="md:max-w-96">
            <img src={Logo} alt="" className="w-[120px] h-[41px]" />

            <p class="mt-6 text-black text-sm">
              this is the best website for booking the doctors appointment for
              patients if the patients want to get the best treatment and has
              single or multiple diseases and this website has the doctors
              available in all kinds of departments
            </p>
          </div>
          <div class="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 class="font-semibold mb-5 text-gray-800">Company</h2>
              <ul class="text-sm space-y-2">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
                <li>
                  <Link to="#">Privacy policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="font-semibold mb-5 text-gray-800">Get in touch</h2>
              <div class="text-sm space-y-2">
                <p>+918106890844</p>
                <p>mohdibrahimamer9@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <p class="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2024 ©{" "}
          <Link to="https://github.com/mohdibrahimamer">MOHD IBRAHIM AMER</Link>
          . All Right Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
