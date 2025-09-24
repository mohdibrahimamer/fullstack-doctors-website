import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
const Contact = () => {
  return (
    <>
      <div>Contact page</div>
      <div className="w-full">
        {/* Contact Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            CONTACT <span className="text-blue-600">US</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={assets.contact_image}
                alt="Contact Doctors"
                className="rounded-xl shadow-md w-full max-w-md"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-6 text-gray-700">
              {/* Office Info */}
              <div>
                <h3 className="text-lg font-semibold mb-2">OUR OFFICE</h3>
                <p className="text-sm md:text-base leading-relaxed">
                  54709 Williams Station <br />
                  Suite 350, Washington, USA
                </p>
                <p className="mt-3 text-sm md:text-base">Tel: (405) 555-0132</p>
                <p className="text-sm md:text-base">
                  Email: greatstackdev@gmail.com
                </p>
              </div>

              {/* Careers */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  CAREERS AT PRESCRIPTO
                </h3>
                <p className="text-sm md:text-base mb-4">
                  Learn more about our teams and job openings.
                </p>
                <button className="px-5 py-2 border cursor-pointer border-gray-700 rounded-md hover:bg-[#5F6FFF] hover:text-white transition">
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
