// Task 1: Time Object Basics
const newDate = new Date();

const hours = newDate.getHours();
const minutes = newDate.getMinutes();
const seconds = newDate.getSeconds();

// Task 2: Object-Oriented Clock
const clockObj = {
  hour: new Date().getHours(),
  minute: new Date().getMinutes(),
  second: new Date().getSeconds(),

  getFormattedTime() {
    if (this.second < 10) {
      return `${this.hour}:${this.minute}:0${
        this.second
      } ${this.get12HourTime()}`;
    }
    return `${this.hour}:${this.minute}:${this.second} ${this.get12HourTime()}`;
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
  },
};

console.log(clockObj.getFormattedTime());

// Task 4: Dynamic Display
const displayClock = () => {
  clockObj.updateTime();
  const timeDiv = document.getElementById("time");
  timeDiv.innerText = clockObj.getFormattedTime();
};

// Display time every second
setInterval(() => {
  displayClock();
}, 1000);
