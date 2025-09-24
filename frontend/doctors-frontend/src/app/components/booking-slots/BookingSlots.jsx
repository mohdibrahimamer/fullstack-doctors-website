import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // yeh chatgpt ka code hai
  // yeh chatgpt ka code hai
  // yeh chatgpt ka code hai
  // yeh chatgpt ka code hai

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
      endTime.setDate(today.getDate() + i);
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

      // yaha per "timeSlots" naam se array banare

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

  useEffect(() => {
    getAvaliableSlots();
  }, []);
  return (
    <section className="max-w-5xl mr-4 mx-auto mt-6  bg-white ">
      <h3 className="font-semibold pb-4 text-xl">Booking slots</h3>

      {/* Times */}
      <div className="flex  gap-3 items-center overflow-x-scroll  w-full">
        {docSlots.map((item, index) => {
          //  const {}==
          return (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center cursor-pointer ml-2 px-4 py-3 rounded-full  ${
                slotIndex === index
                  ? "bg-indigo-600 text-white"
                  : "bg-blue-200 text-black"
              }`}
            >
              <button className="cursor-pointer ml-2" type="button">
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </button>
              {/* displaying date if item[0] is available */}
              <button className="cursor-pointer ml-2">
                {item[0] && item[0].datetime.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center overflow-x-scroll gap-3 mt-4">
        {docSlots.length > 0 &&
          docSlots[slotIndex].map((item, index) => (
            <div key={index} onClick={() => setSlotTime(item.time)}>
              <button
                className={` flex flex-shrink  gap-3 items-center cursor-pointer  px-4 py-3 rounded-xl  ${
                  SlotTime === item.time
                    ? "bg-indigo-600 text-white"
                    : "bg-blue-200 text-black"
                }`}
                type="button"
              >
                {item.time}
              </button>
            </div>
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
