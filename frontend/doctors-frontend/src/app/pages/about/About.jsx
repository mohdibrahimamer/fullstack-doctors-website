import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
const About = () => {
  return (
    <>
      <div>About page</div>
      <div className="w-full">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            ABOUT <span className="text-blue-600">US</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={assets.about_image}
                alt="Doctors"
                className="rounded-xl shadow-md w-full max-w-md"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Welcome To Prescripto, Your Trusted Partner In Managing Your
                Healthcare Needs Conveniently And Efficiently. At Prescripto, We
                Understand The Challenges Individuals Face When It Comes To
                Scheduling Doctor Appointments And Managing Their Health
                Records.
              </p>
              <p>
                Prescripto Is Committed To Excellence In Healthcare Technology.
                We Continuously Strive To Enhance Our Platform, Integrating The
                Latest Advancements To Improve User Experience And Deliver
                Superb Service. Whether You’re Booking Your First Appointment Or
                Managing Ongoing Care, Prescripto Is Here To Support You Every
                Step Of The Way.
              </p>
              <h3 className="font-semibold text-lg">Our Vision</h3>
              <p>
                Our Vision At Prescripto Is To Create A Seamless Healthcare
                Experience For Every User. We Aim To Bridge The Gap Between
                Patients And Healthcare Providers, Making It Easier For You To
                Access The Care You Need, When You Need It.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
              WHY <span className="text-blue-600">CHOOSE US</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 ">
              {/* Card 1 */}
              <div className="border rounded-lg p-6 text-center shadow-sm bg-white ">
                <h4 className="font-semibold text-lg mb-2">EFFICIENCY</h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Streamlined Appointment Scheduling That Fits Into Your Busy
                  Lifestyle.
                </p>
              </div>

              {/* Card 2 */}
              <div className="border rounded-lg p-6 text-center shadow-sm bg-white">
                <h4 className="font-semibold text-lg mb-2">CONVENIENCE</h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Access To A Network Of Trusted Healthcare Professionals In
                  Your Area.
                </p>
              </div>

              {/* Card 3 */}
              <div className="border rounded-lg p-6 text-center shadow-sm bg-white ">
                <h4 className="font-semibold text-lg mb-2">PERSONALIZATION</h4>
                <p className="text-gray-600 text-sm md:text-base">
                  Tailored Recommendations And Reminders To Help You Stay On Top
                  Of Your Health.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
