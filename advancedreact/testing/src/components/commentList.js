
import React from 'react';
import { connect } from 'react-redux';

const CommentList = (props) => {
  const list = props.comments.map(comment => <li key={comment}>{comment}</li>);
  return (
    <ul className="comment-list">{list}</ul>
  );
};

const mapStateToProps = (state) => {
  return { comments: state.comments }; // place a comments property in our CommentList's props input
};

export default connect(mapStateToProps)(CommentList);

