import './style.css'

let city = document.getElementById("city");
let link = "http://api.weatherapi.com/v1/current.json?key=";
let key = process.env.KEY;
let error = document.querySelector('.error_message');

function Day_Data(
  location,
  date,
  weather,
  temperature,
  sensation,
  humidity,
  wind_speed
) {
  return {
    location,
    date,
    weather,
    temperature,
    sensation,
    humidity,
    wind_speed,
  };
}

function parse_data(raw_data) {
  let parsed = Day_Data(
    raw_data.location.name,
    raw_data.current.last_updated,
    raw_data.current.condition.text,
    raw_data.current.temp_c,
    raw_data.current.feelslike_c,
    raw_data.current.humidity,
    raw_data.current.wind_kph
  );
  return parsed;
}

async function getInfo(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    var parsed = parse_data(data);
  } catch {
    console.log("Error finding the city");
  }
  return parsed;
}

function display_info(information){
  let title = document.querySelector('.location');
  let weather = document.querySelector('.weather');
  let degrees = document.querySelector('.degrees_number');
  let feels_like = document.querySelector('.feels_like');
  let wind_speed = document.querySelector('.wind_speed');
  let humidity = document.querySelector('.humidity');

  title.innerHTML = information.location;
  weather.innerHTML = information.weather;
  degrees.innerHTML = information.temperature + " °C";
  feels_like.innerHTML = "Feels like: "+ information.sensation + " °C";
  wind_speed.innerHTML = "Wind Speed: " + information.wind_speed + " kph";
  humidity.innerHTML = "Humidity: " + information.humidity + " %";
}

city.addEventListener("keydown", (event) => {
  if (event.key == 'Enter')
  {
    let url = link + key + "&q=" + city.value;
    getInfo(url)
    .then(object =>{
      display_info(object);
      city.value = "";
      error.style.visibility = "hidden";
    })
    .catch(() => {
      error.style.visibility = "visible";
      city.value = "";
    })
  }
});

let initial = link + key + "&q=Málaga";
getInfo(initial).then(object =>{
  display_info(object);
})