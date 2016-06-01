
import { combineReducers } from 'redux';
import WeatherReducer from './reducerWeather.js';

const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;

