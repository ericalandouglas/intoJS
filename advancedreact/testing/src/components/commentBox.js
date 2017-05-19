
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CommentBox extends Component {

  constructor (props) {
    super(props);

    this.state = { comment: '' };
    this.handleChange = this.handleChange.bind(this); // bind for proper context when using as callback/handler
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit (event) {
    event.preventDefault(); // stop the automatic page reload

    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="comment-box">
        <h4>Add a comment</h4>
        <textarea
          value={this.state.comment}
          onChange={this.handleChange} />
        <div>
          <button action="submit">Submit Comment</button>
        </div>
      </form>
    );
  }

}

export default connect(null, actions)(CommentBox); // we don't care about mapping state, only action creators

