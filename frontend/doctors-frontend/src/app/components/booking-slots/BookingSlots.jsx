import React, { useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
const days = [
  "Mon 10",
  "Tue 11",
  "Wed 12",
  "Thu 13",
  "Fri 14",
  "Sat 15",
  "Sun 16",
];
const times = [
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
];

const BookingSlots = () => {
  const [selectedDay, setSelectedDay] = useState("Mon 10");
  const [selectedTime, setSelectedTime] = useState("9:00 am");
  // yaha dates k aur time k liye alag alag states declare kaery
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [SlotTime, setSlotTime] = useState("");
  //   yaha  per handleBoooked k naam se function banrey
  const handleBooked = () => {
    toast.success("appointment Booked successfully");
  };
  // yaha per getAvaliableSlots bol k function likhre
  // yaha per iski functionality samjho
  // yaha per iski functionality samjho
  // yaha per iski functionality samjho
  // yaha per iski functionality samjho
  const getAvaliableSlots = async () => {
    setDocSlots([]);
    // getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting the date with index
      let currentDate = new Date(today);
      // if i = next day date hai
      currentDate.setDate(today.getDate() + i);
      // yaha per setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + 1);
      // setting the hours 3  zeros for minute and seconds and milliseconds
      // here  time  is set for 9 pm
      endTime.setHours(21, 0, 0, 0);
      //  setting hours
      if (today.getDate() === currentDate.getDate()) {
        // displaying the slots for next hours
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );

        // setting the minutes for slot duration
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // if the date is not today than start hours from 10 clock
        currentDate.setHours(10, 0, 0, 0);
        currentDate.setMinutes(0);
      }

      // yaha per "timeSlots" naam se varibale banare

      let timeSlots = [];

      while (currentDate < endTime) {
        // creating 30 mins slots
        // with 9:00am to 21:00am
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // adding the slots to timeSlots array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        // incrementing the current date by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
    }
  };
  return (
    <section className="max-w-5xl mr-4 mx-auto mt-6 p-6 bg-white ">
      <h3 className="font-semibold pb-4 text-xl">Booking slots</h3>

      {/* Days */}
      <div className="flex  flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg ${
              selectedDay === day
                ? "bg-[#5F6FFF] text-white"
                : "bg-gray-100 text-gray-700 cursor-pointer"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Times */}
      <div className="flex flex-wrap gap-2 mt-4">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded-full border ${
              selectedTime === time
                ? "bg-[#5F6FFF] text-white border-[#5F6FFF]"
                : "border-gray-300 text-gray-700 cursor-pointer"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      <button
        onClick={handleBooked}
        className="mt-6  bg-[#5F6FFF] text-white px-6 py-3 rounded-full hover:bg-[#5F6FFF] cursor-pointer"
      >
        Book an appointment
      </button>
    </section>
  );
};
export default BookingSlots;
