import React, { Component } from 'react';
import CommentBox from './commentBox.js';
import CommentList from './commentList.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <CommentBox />
        <CommentList />
      </div>
    );
  }
}
