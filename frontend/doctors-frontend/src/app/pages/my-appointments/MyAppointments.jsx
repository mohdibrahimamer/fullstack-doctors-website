import { assets, doctors } from "../../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const MyAppointments = () => {
  const [myAppointmentsData, setmyAppointmentsData] = useState(doctors);
  const status = "unpaid";
  return (
    <>
      <div className="space-y-4 sm:space-y-5">
        {myAppointmentsData.slice(0, 3).map((appt) => {
          const {
            _id,
            image,
            name,
            degree,
            experience,
            about,
            fees,
            specialty,
            address,
          } = appt;
          return (
            <div className="w-full border rounded-lg p-4 sm:p-5 bg-card">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                {/* Doctor image */}
                <div className="relative h-24 w-24 sm:h-24 sm:w-24 mx-auto sm:mx-0 overflow-hidden rounded-md bg-muted">
                  <img
                    src={image}
                    alt={name}
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      {name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{specialty}</p>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-medium">Address:</p>
                    <p className="text-muted-foreground">{address.line1}</p>
                    <p className="text-muted-foreground">{address.line2}</p>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Date &amp; Time:</span>{" "}
                    11:00 AM - 12:00 PM
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:items-end">
                  {status === "paid" ? (
                    <button
                      className="bg-indigo-600 hover:bg-indigo-600/90"
                      disabled
                    >
                      Paid
                    </button>
                  ) : (
                    <button className="bg-indigo-600 mr-20 w-20 h-7.5 cursor-pointer rounded-2xl text-white hover:bg-indigo-600/90">
                      Pay here
                    </button>
                  )}
                  <button
                    className="px-6 py-2 rounded-2xl text-white cursor-pointer mt-5 mr-15 bg-gray-400"
                    variant="outline"
                  >
                    Cancel appointment
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyAppointments;
