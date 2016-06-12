
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index.js';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit (props) { // callback will need to have its context bound correctly
    this.props.createPost(props) // props has the data from our form, createPost returns a promise we can use
      .then((res) => {
        // blog post created, nav user to index
        this.context.router.push('/');
      })
      .catch((e) => {
        console.log('error posting:', JSON.stringify(e));
      });
  }

  render () {
    const { fields: { title, categories, content }, handleSubmit } = this.props; // ES6 object destructuring assingment

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }

}

// form validation helper
const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
};

// in react-redux connect takes 2 args: mapStateToProps and mapDispatchToProps
// reduxForm takes 3 args: form config object, mapStateToProps, and finally mapDispatchToProps

export default reduxForm({ // config for form element goes in this object
  form: 'PostsNew',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);

