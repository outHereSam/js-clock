// Task 1: Time Object Basics
const newDate = new Date();

const hours = newDate.getHours();
const minutes = newDate.getMinutes();
const seconds = newDate.getSeconds();

let is12hr = true;

const switcherContainer = document.querySelector(".switcher");
const popupMessage = document.querySelector(".info");

// Timezone Selector
const timezoneSelector = document.getElementById("timezoneSelector");

if (popupMessage.textContent === "") {
  popupMessage.style.display = "none";
}

switcherContainer.addEventListener("click", function (e) {
  if (e.target.innerText === "12-Hour") {
    document.getElementById("twelveHour").style.backgroundColor = "#656870";
    document.getElementById("twentyFourHour").style.backgroundColor = "#3a3b40";
    is12hr = true;
  }
  if (e.target.innerText === "24-Hour") {
    document.getElementById("twelveHour").style.backgroundColor = "#3a3b40";
    document.getElementById("twentyFourHour").style.backgroundColor = "#656870";
    is12hr = false;
  }
});

// console.log(is12hr);

// Task 2: Object-Oriented Clock
const clockObj = {
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
  second: new Date().getSeconds(),
  day: new Date().getDay(),
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  date: new Date().getDate(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  timezoneDifference: 0,
  alarmSound: new Audio("./alarm.m4a"),

  getDayAndDate() {
    const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Monday 24 June 2024
    return `${days[this.day]}, ${this.date} ${months[this.month]} ${this.year} 
      ${this.timezone}`;
  },

  set24Hour() {
    if (!is12hr) {
      this.hour = this.hour + 12;
    }
  },

  getFormattedTime() {
    let adjustedHour = this.hour + this.timezoneDifference;
    if (adjustedHour < 0) adjustedHour += 24;
    if (adjustedHour >= 24) adjustedHour -= 24;

    if (this.second < 10) {
      return adjustedHour > 12
        ? `${is12hr ? adjustedHour - 12 : adjustedHour}:${this.minute}:0${
            this.second
          } ${is12hr ? this.get12HourTime() : ""}`
        : `${adjustedHour}:${this.minute}:0${this.second} ${
            is12hr ? this.get12HourTime() : ""
          }`;
    }
    if (this.minute < 10) {
      return adjustedHour > 12
        ? `${is12hr ? adjustedHour - 12 : adjustedHour}:0${this.minute}:${
            this.second
          } ${is12hr ? this.get12HourTime() : ""}`
        : `${adjustedHour}:0${this.minute}:${this.second} ${
            is12hr ? this.get12HourTime() : ""
          }`;
    }
    return adjustedHour > 12
      ? `${is12hr ? adjustedHour - 12 : adjustedHour}:${this.minute}:${
          this.second
        } ${is12hr ? this.get12HourTime() : ""}`
      : `${adjustedHour}:${this.minute}:${this.second} ${
          is12hr ? this.get12HourTime() : ""
        }`;
  },

  get12HourTime() {
    if (this.hour < 12) {
      return "AM";
    } else {
      return "PM";
    }
  },

  updateTime() {
    const now = new Date();

    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
    this.day = now.getDay();
    this.month = now.getMonth();
    this.year = now.getFullYear();
    this.date = now.getDate();
  },

  setTimezone(timezoneDifference) {
    this.timezoneDifference = timezoneDifference;
  },
};

// Task 4: Dynamic Display
const displayClock = () => {
  clockObj.updateTime();
  const time = document.getElementById("time");
  time.innerText = clockObj.getFormattedTime();

  const extraInfo = document.querySelector(".extra");
  extraInfo.innerText = clockObj.getDayAndDate();

  //   Set 12-hour as default selected
  if (is12hr) {
    document.getElementById("twelveHour").style.backgroundColor = "#656870";
    document.getElementById("twelveHour").style.color = "#ffffff";
    document.getElementById("twentyFourHour").style.color = "#afadb5";
    time.style.color = "#ffffff";
    document.querySelector(".extra").style.color = "#ffffff";
  } else {
    document.getElementById("twelveHour").style.backgroundColor = "#3a3b40";
    document.getElementById("twentyFourHour").style.color = "#ffffff";
    document.getElementById("twelveHour").style.color = "#afadb5";
    time.style.color = "#CCACFF";
    document.querySelector(".extra").style.color = "#CCACFF";
  }
};

// Add alarm
const alarmButton = document.getElementById("setAlarm");
const alarmInput = document.getElementById("alarm");

const setAlarm = (hour, minute) => {
  const now = new Date();

  let alarm = new Date();
  alarm.setHours(hour, minute, 0, 0); // Set the hours and minutes, seconds and milliseconds to 0

  // If the alarm time is earlier than the current time, set it for the next day
  if (alarm <= now) {
    alarm.setDate(alarm.getDate() + 1);
  }

  // Calculate the time difference in milliseconds
  const timeDifference = alarm - now;
  popupMessage.style.display = "block";
  popupMessage.textContent = `Alarm is set for ${alarm.toLocaleTimeString()}`;

  setTimeout(() => {
    // Clear the alert
    document.querySelector(".info").style.display = "none";
  }, 5000);

  //   console.log(`Alarm is set for ${alarm.toLocaleTimeString()}`);

  // Use setTimeout to trigger the alarm
  setTimeout(() => {
    clockObj.alarmSound.play();
    document.querySelector(".alert").style.display = "block";
    document.querySelector(".alert").innerText = "Alarm!!";
    // console.log("Alarm! Time to wake up!");
    // Here you can add any action you want to perform when the alarm goes off

    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 60000);
  }, timeDifference);
};

alarmButton.addEventListener("click", () => {
  if (alarmInput.value) {
    const [hour, minute] = alarmInput.value.split(":").map(Number);
    // console.log(alarmInput.value);
    setAlarm(hour, minute);
  }
});

// Set timezone
timezoneSelector.addEventListener("change", function () {
  //   update clock object's hour
  const timezoneValue = +this.value;
  const selectedOption = this.options[this.selectedIndex];
  clockObj.timezone = selectedOption.innerText;
  clockObj.setTimezone(timezoneValue);
});

// Display time every second

setInterval(() => {
  displayClock();
}, 500);
