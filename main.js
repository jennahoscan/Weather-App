// Get Current Time and Update Every 2 Seconds
setInterval(function () {
  let date = new Date();

  let hours = date.getHours();
  let amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let finalTime = `${hours}:${minutes} ${amOrPm}`;

  document.querySelector("span").innerHTML = finalTime;
}, 2000);

//Get Current Day of the Week, Month, and Date
let date = new Date();

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayNumber = date.getDay();
let dayName = daysOfWeek[dayNumber];

const monthNames = [
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

let monthNumber = date.getMonth();
let monthName = monthNames[monthNumber];

let day = date.getDate();

let currentDate = `${dayName}, ${monthName} ${day}`;

document.querySelector("h2").innerHTML = currentDate;

// Update City Name on Search
function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-input");
  document.querySelector("h1").innerHTML = userInput.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Convert Between Celsius and Farenheit

function convertToFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  let temp = tempElement.innerHTML;
  tempElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//Update Background Gradient Based on Time
/*function colorChange (hour, amOrPm){
  let body = document.querySelector("body");
  if (hour >= 6 && amOrPm === "AM"){
    body.style.background =
  }
}*/
