// Get Current Time and Update Every Second
setInterval(function () {
  let date = new Date();

  let hours = date.getHours();
  let amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let finalTime = `${hours}:${minutes} ${amOrPm}`;

  document.querySelector("#time").innerHTML = finalTime;
}, 1000);

//Get Current Day of the Week, Month, and Date
function formatDate(timestamp) {
  let date = new Date(timestamp);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];

  let monthNumber = date.getMonth();
  let monthName = monthNames[monthNumber];

  let day = date.getDate();

  let currentDate = `${dayName}, ${monthName} ${day}`;

  return currentDate;
}

let now = new Date();
document.querySelector("#date").innerHTML = formatDate(now);

// Update City Name on Search
function search(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-input");
  document.querySelector("#city").innerHTML = userInput.value;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Get Forecast
function getTodaysForecast(response) {
  let temperature = document.querySelector("#degree");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let icon = document.querySelector("#icon");
  let code = response.data.weather[0].icon;
  if (code === "11d") {
    icon.setAttribute("src", "Images/Thunderstorm.png");
  } else if (code === "09d") {
    icon.setAttribute("src", "Images/Rain.png");
  } else if (code === "10d") {
    icon.setAttribute("src", "Images/DayRain.png");
  } else if (code === "09d") {
    icon.setAttribute("src", "Images/NightRain.png");
  } else if (code === "13d") {
    icon.setAttribute("src", "Images/Snow.png");
  } else if (code === "50d") {
    icon.setAttribute("src", "Images/Mist.png");
  } else if (code === "01d") {
    icon.setAttribute("src", "Images/Sun.png");
  } else if (code === "01n") {
    icon.setAttribute("src", "Images/Moon.png");
  } else if (code === "02d") {
    icon.setAttribute("src", "Images/DayCloud.png");
  } else if (code === "02n") {
    icon.setAttribute("src", "Images/NightCloud.png");
  } else if (code === "03d" || code === "03n") {
    icon.setAttribute("src", "Images/OneCloud.png");
  } else if (code === "04d" || code === "04n") {
    icon.setAttribute("src", "Images/Clouds.png");
  }

  fiveDayForecast(response);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "5ed4231e4848c446bb7ab760ec22172f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getTodaysForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Baltimore");

//Get User's Current Location
function locateUser() {
  function getPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "5ed4231e4848c446bb7ab760ec22172f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCurrentLocationTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);

  function showCurrentLocationTemp(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let degree = document.querySelector("#degree");
    degree.innerHTML = temperature;
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);

    fiveDayForecast(response);
  }
}

let button = document.querySelector("#locate");
button.addEventListener("click", locateUser);

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

//Change Background Gradient by Time
var today = new Date().getHours();
let searchBar = document.querySelector("#magnify");
if (today >= 0 && today <= 2) {
  document.body.style.backgroundImage =
    "linear-gradient(to top, #1b2c47 0%, #000000 100%)";
  searchBar.setAttribute("src", "Images/magnify000.png");
} else if (today === 3 || today === 4) {
  document.body.style.backgroundImage =
    "linear-gradient(to top, #225a85 0%, #1b2c47 100%)";
  searchBar.setAttribute("src", "Images/magnify1b2c47.png");
} else if (today === 5 || today === 6) {
  document.body.style.backgroundImage =
    "linear-gradient(to top, #9598f0 0%, #225a85 100%)";
  searchBar.setAttribute("src", "Images/magnify225a85.png");
} else if (today === 7) {
  document.body.style.backgroundImage =
    "linear-gradient(to bottom, #9598f0 0%, #a1c4fd 100%)";
  searchBar.setAttribute("src", "Images/magnify9598f0.png");
} else if (today >= 8 && today <= 11) {
  document.body.style.backgroundImage =
    "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
  searchBar.setAttribute("src", "Images/magnifyc2e9fb.png");
} else if (today >= 12 && today <= 14) {
  document.body.style.backgroundImage =
    "linear-gradient(to top, #7aadff 0%, #c2e9fb 100%)";
  searchBar.setAttribute("src", "Images/magnifyc2e9fb.png");
} else if (today === 15 || today === 16) {
  document.body.style.backgroundImage =
    "linear-gradient(to top, #a1c4fd 0%, #7aadff 100%)";
  searchBar.setAttribute("src", "Images/magnify7aadff.png");
} else if (today === 17 || today === 18) {
  document.body.style.backgroundImage =
    "linear-gradient(to bottom, #a1c4fd 0%, #5d4ba1 100%)";
  searchBar.setAttribute("src", "Images/magnifya1c4fd.png");
} else if (today === 19) {
  document.body.style.backgroundImage =
    "linear-gradient(to bottom, #5d4ba1 0%, #032845 100%)";
  searchBar.setAttribute("src", "Images/magnify5d4ba1.png");
} else if (today === 20 || today === 21) {
  document.body.style.backgroundImage =
    "linear-gradient(to bottom, #394475 0%, #000000 100%)";
  searchBar.setAttribute("src", "Images/magnify394475.png");
} else if (today === 22 || today === 23) {
  document.body.style.backgroundImage =
    "linear-gradient(to bottom, #000000 0%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)";
  searchBar.setAttribute("src", "Images/magnify000.png");
}

//Use Arrows to Click Through Forecast
function fiveDayForecast(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "5ed4231e4848c446bb7ab760ec22172f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeeklyForecast);
}

let pageNumber = 6;
let pages = [];
function getWeeklyForecast(response) {
  pages = [
    {
      date: formatDate(response.data.daily[1].dt * 1000),
      degree: Math.round(response.data.daily[1].temp.day - 273.15),
      description: response.data.daily[1].weather[0].description,
      humidity: response.data.daily[1].humidity,
      wind: Math.round(response.data.daily[1].wind_speed),
      icon: response.data.daily[1].weather[0].icon
    },
    {
      date: formatDate(response.data.daily[2].dt * 1000),
      degree: Math.round(response.data.daily[2].temp.day - 273.15),
      description: response.data.daily[2].weather[0].description,
      humidity: response.data.daily[2].humidity,
      wind: Math.round(response.data.daily[2].wind_speed),
      icon: response.data.daily[2].weather[0].icon
    },
    {
      date: formatDate(response.data.daily[3].dt * 1000),
      degree: Math.round(response.data.daily[3].temp.day - 273.15),
      description: response.data.daily[3].weather[0].description,
      humidity: response.data.daily[3].humidity,
      wind: Math.round(response.data.daily[3].wind_speed),
      icon: response.data.daily[3].weather[0].icon
    },
    {
      date: formatDate(response.data.daily[4].dt * 1000),
      degree: Math.round(response.data.daily[4].temp.day - 273.15),
      description: response.data.daily[4].weather[0].description,
      humidity: response.data.daily[4].humidity,
      wind: Math.round(response.data.daily[4].wind_speed),
      icon: response.data.daily[4].weather[0].icon
    },
    {
      date: formatDate(response.data.daily[5].dt * 1000),
      degree: Math.round(response.data.daily[5].temp.day - 273.15),
      description: response.data.daily[5].weather[0].description,
      humidity: response.data.daily[5].humidity,
      wind: Math.round(response.data.daily[5].wind_speed),
      icon: response.data.daily[5].weather[0].icon
    },
    {
      date: formatDate(response.data.daily[6].dt * 1000),
      degree: Math.round(response.data.daily[6].temp.day - 273.15),
      description: response.data.daily[6].weather[0].description,
      humidity: response.data.daily[6].humidity,
      wind: Math.round(response.data.daily[6].wind_speed),
      icon: response.data.daily[6].weather[0].icon
    },
    {
      date: formatDate(response.data.current.dt * 1000),
      degree: Math.round(response.data.current.temp - 273.15),
      description: response.data.current.weather[0].description,
      humidity: response.data.current.humidity,
      wind: Math.round(response.data.current.wind_speed),
      icon: response.data.current.weather[0].icon
    }
  ];
}

function updateSection() {
  const degreeTag = document.querySelector("#degree");
  const descriptionTag = document.querySelector("#description");
  const humidityTag = document.querySelector("#humidity");
  const windTag = document.querySelector("#wind");
  const dateTag = document.querySelector("#date");
  dateTag.innerHTML = pages[pageNumber].date;
  degreeTag.innerHTML = pages[pageNumber].degree;
  descriptionTag.innerHTML = pages[pageNumber].description;
  humidityTag.innerHTML = pages[pageNumber].humidity;
  windTag.innerHTML = pages[pageNumber].wind;
  let icon = document.querySelector("#icon");
  let code = pages[pageNumber].icon;
  if (code === "11d") {
    icon.setAttribute("src", "Images/Thunderstorm.png");
  } else if (code === "09d") {
    icon.setAttribute("src", "Images/Rain.png");
  } else if (code === "10d") {
    icon.setAttribute("src", "Images/DayRain.png");
  } else if (code === "09d") {
    icon.setAttribute("src", "Images/NightRain.png");
  } else if (code === "13d") {
    icon.setAttribute("src", "Images/Snow.png");
  } else if (code === "50d") {
    icon.setAttribute("src", "Images/Mist.png");
  } else if (code === "01d") {
    icon.setAttribute("src", "Images/Sun.png");
  } else if (code === "01n") {
    icon.setAttribute("src", "Images/Moon.png");
  } else if (code === "02d") {
    icon.setAttribute("src", "Images/DayCloud.png");
  } else if (code === "02n") {
    icon.setAttribute("src", "Images/NightCloud.png");
  } else if (code === "03d" || code === "03n") {
    icon.setAttribute("src", "Images/OneCloud.png");
  } else if (code === "04d" || code === "04n") {
    icon.setAttribute("src", "Images/Clouds.png");
  }
}

const next = function () {
  pageNumber = pageNumber + 1;
  if (pageNumber > pages.length - 1) {
    pageNumber = 0;
  }
  updateSection();
};

const prev = function () {
  pageNumber = pageNumber - 1;
  if (pageNumber < 0) {
    pageNumber = pages.length - 1;
  }
  updateSection();
};

const nextTag = document.querySelector("#right-arrow");
nextTag.addEventListener("click", function () {
  next();
});

const prevTag = document.querySelector("#left-arrow");
prevTag.addEventListener("click", function () {
  prev();
});

document.addEventListener("keyup", function (event) {
  console.log(event);
  if (event.key === "ArrowRight") {
    next();
  }
  if (event.key === "ArrowLeft") {
    prev();
  }
});
