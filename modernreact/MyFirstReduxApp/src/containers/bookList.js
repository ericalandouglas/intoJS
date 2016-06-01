
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index.js';
import { bindActionCreators } from 'redux'; // used to make actions we create flow through our reducers

class BookList extends Component {

  renderList () {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}>
          {book.title}
        </li>
      );
    });
  }

  render () {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }

}

const mapStateToProps = (state) => {
  // whatever is returned will show up as props in our BookList component
  return {
    books: state.books
  };
};

// anything returned from this function will end up as props on the BookList container
const mapDispacthToProps = (dispatch) => {
  // whenever selectBook is called, the result should be passed to all of our reducers
  // dispatch functions is responsible for receiving actions and funneling them to all our reducers
  return bindActionCreators({ selectBook }, dispatch); // selectBook will become a property on props
};

// export a new component that is connected to the Redux state via the connect and mapStateToProps functions
// promote BookList from a class component to a container, it needs to know about new dispatch method selectBook, make it available as prop
export default connect(mapStateToProps, mapDispacthToProps)(BookList);

