
import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import ChartColumn from '../components/chartColumn.js';
import GoogleMap from '../components/googleMap.js';

class WeatherList extends Component {

  renderWeather (cityData) {
    const name = cityData.city.name;
    const { lon, lat } = cityData.city.coord; // ES6 object destructuring syntax

    const allReadings = R.reduce((accum, weather) => [
      [...accum[0], weather.main.temp * 9/5 - 459.67], // K => F
      [...accum[1], weather.main.pressure],
      [...accum[2], weather.main.humidity]
    ], [[], [], []], cityData.list); // ==> [temps, pressures, humidities] structure

    const propsList = [
      { readings: allReadings[0], color: 'orange', units: 'F' }, // temps
      { readings: allReadings[1], color: 'blue', units: 'hPa' }, // pressures
      { readings: allReadings[2], color: 'green', units: '%' } // humidities
    ];
    const chartColumns = R.map(({ readings, color, units }) => // ES6 object destructuring syntax
      <ChartColumn data={readings} color={color} key={color} units={units} />
    )(propsList);

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
        {chartColumns}
      </tr>
    );
  }

  render () {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }

}

const mapStateToProps = ({ weather }) => { // ES6 syntax unpacking state object
  return { weather }; // ES6 syntax for { weather: weather }
};

export default connect(mapStateToProps)(WeatherList);

