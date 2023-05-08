import React from "react";

export default function timer(){
    var targetDate = new Date(Date.now() + 60 * 60 * 1000);
  setInterval(function() {
    // Get the current date and time
    var currentDate = new Date();

    // Calculate the remaining time
    var timeDifference = targetDate - currentDate;
    // var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }, 1000);
    return(
        <>
        <section className="">
        <div id="countdown" className="flex p-3 bg-gray-200 w-fit rounded-lg">
        <br />
        <div class="countdown-item" className="px-3 bg-black rounded-lg text-white">
          <span class="countdown-value" id="hours"></span>
          <span class="countdown-label" > Hours </span>
        </div>
        <h1 className="font-bold px-2">:</h1>
        <br />
        <div class="countdown-item" className="px-3 bg-black rounded-lg text-white">
          <span class="countdown-value" id="minutes"></span>
          <span class="countdown-label" > Minutes </span>
        </div>
        <h1 className="font-bold px-2">:</h1>
        <br />
        <div class="countdown-item" className="px-3 bg-black rounded-lg text-white">
          <span class="countdown-value" id="seconds"></span>
          <span class="countdown-label" > Seconds</span>
        </div>
      </div>
        </section>
        </>
    )
}