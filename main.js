// Task 1: Time Object Basics
const newDate = new Date();

const hours = newDate.getHours();
const minutes = newDate.getMinutes();
const seconds = newDate.getSeconds();

// Task 2: Object-Oriented Clock
const clockObj = {
  hours: new Date().getHours(),
  minutes: new Date().getMinutes,
  seconds: new Date().getSeconds,
};

console.log(clockObj.hours);
