import { combineReducers } from 'redux';
import PostsReducer from './reducerPosts.js'
import { reducer as formReducer } from 'redux-form'; // ES6 syntax to rename imported module property, helps avoid naming conflicts

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
