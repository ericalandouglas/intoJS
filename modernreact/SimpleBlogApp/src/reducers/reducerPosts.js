
import { FETCH_POSTS, FETCH_POST } from '../actions/index.js'

const INITIAL_STATE = { all: [], post: null }; // all is the list of blog posts, post is the active blog post

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_POSTS:
    return { ...state, all: action.payload.data }; // ES6 syntax for object destructuring
  case FETCH_POST:
    return { ...state, post: action.payload.data };
  default:
    return state;
  }
}


