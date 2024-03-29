import React,{useState} from "react";

const api = {
  key : "....",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  /* https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=edea7c93a2db086b67d5904d68129e60 */

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      })
      
    }
  }

  const dateBuilder = (d) => {
    let months = ["January" , "February", "March", "April","May","June","July","August","September","October", "Novemver","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="app">
      <main>
        <div className = "search-box">
          <input type = "text" className="search-bar" placeholder="search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
{(typeof weather.main != "undefined") ? (
  <div>
<div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}&deg;c
          </div>
          <div className="weather"></div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
  </div>
         ) : ('')}
      </main>
    </div>
  );
}

export default App;
