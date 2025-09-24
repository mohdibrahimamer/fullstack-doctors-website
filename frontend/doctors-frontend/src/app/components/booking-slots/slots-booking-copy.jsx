// yeh mera code hai
// yeh mera code hai
// yeh mera code hai
// yeh mera code hai
// yeh mera code hai
// yeh mera code hai

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

<div className="">
  {docSlots.length &&
    docSlots.map((item, index) => {
      console.log(docSlots);
      return (
        <div key={index} className={`  ${slotIndex === index}`}>
          <button className="cursor-pointer ml-2" type="button">
            {item.time}
          </button>
        </div>
      );
    })}
</div>;
