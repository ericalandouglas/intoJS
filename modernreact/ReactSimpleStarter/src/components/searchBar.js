
import React, { Component } from 'react';

class SearchBar extends Component { // inherit via [[Prototype]] from React.Component

  constructor (props) {
    super(props); // call Component constructor (inheriting via [[Prototype]])
    this.state = { term: '' }; // only assign state manually in constructor, nowhere else
  }

  render () {
    // create new input element with onChange handler, always update state with setState outside constructor
    // the input with a value field assignment is a controlled field element reacting to updates made to state
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
        <br/>
        Value of the input: {this.state.term}
      </div>
    );
  }

  onInputChange (term) {
    this.setState({term});
    this.props.onSearchTermChange(term); // fire callback provided from App component
  }

}

export default SearchBar;

