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
    return `${this.hour}:${this.minute}:${this.second} ${this.get12HourTime()}`;
  },

  get12HourTime() {
    if (this.hour < 12) {
      return "AM";
    } else {
      return "PM";
    }
  },
};

console.log(clockObj.getFormattedTime());
