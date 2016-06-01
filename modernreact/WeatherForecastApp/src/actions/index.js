
import axios from 'axios'; // package to help make Ajax requests

const API_KEY = 'fa644f3cc5d5bd60877f072d4524e00c';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`; // ES6 template string

export const FETCH_WEATHER = 'FETCH_WEATHER';

export const fetchWeather = (city) => {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url); // returns a promise

  return {
    type: FETCH_WEATHER,
    payload: request // promise request returned as payload
  };
}

