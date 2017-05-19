import { combineReducers } from 'redux';
import commentsReducer from './comments.js';

const rootReducer = combineReducers({
  comments: commentsReducer
});

export default rootReducer;
