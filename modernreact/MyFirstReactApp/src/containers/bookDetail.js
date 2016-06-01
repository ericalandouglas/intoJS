
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {

  render() {
    if (!this.props.book) { // when book is initially null like on start up return something resonable
      return <div>Select a book to get started.</div>
    }

    return (
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  // whatever is returned will show up as props in our BookDetail component
  return {
    book: state.activeBook
  };
};

export default connect(mapStateToProps)(BookDetail);

