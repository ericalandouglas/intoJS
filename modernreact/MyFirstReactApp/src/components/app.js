
import React, { Component } from 'react';
import BookList from '../containers/bookList.js';
import BookDetail from '../containers/bookDetail.js';

export default class App extends Component {

  render() {
    return (
      <div>
        <BookList />
        <BookDetail />
      </div>
    );
  }

}

