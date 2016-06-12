
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index.js';
import { Link } from 'react-router';

class PostShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount () {
    this.props.fetchPost(this.props.params.id);
  }

  componentWillUnmount () {
    this.props.fetchPost(); // fetch blank post to reset post data
  }

  onDeleteClick () {
    this.props.deletePost(this.props.post.id) // post will be defined when this event handler fires
      .then((res) => {
        this.context.router.push('/');
      })
      .catch((e) => {
        console.log('error deleting:', JSON.stringify(e));
      });
  }

  render () {
    const { post } = this.props;

    if (!post) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">Back</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return { post: state.posts.post };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);

