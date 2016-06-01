
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index.js'; // action creator for weather ajax request

class SearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = { term: '' }; // component level state not related to the redux state object

    this.onInputChange = this.onInputChange.bind(this); // explicitilly bind the this context to the onInputChange event handler (NECESSARY)
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange (event) { // all vanilla JS event handlers get passed an event object, not just in React
    this.setState({ term: event.target.value }); // make sure the this context is bound since we reference it here in this event handler
  }

  onFormSubmit (event) {
    event.preventDefault();

    this.props.fetchWeather(this.state.term); // fetchWeather available on props thanks to the mapDispatchToProps
    this.setState({ term: '' }); // clear out the search bar input text
  }

  render () {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Get a five-day forecast in your favorite cities"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchWeather }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchBar);

