
import { combineReducers } from 'redux';
import BooksReducer from './reducerBooks.js'
import ActiveBookReducer from './reducerActiveBook.js'

const rootReducer = combineReducers({
  books: BooksReducer,
  activeBook: ActiveBookReducer
});

export default rootReducer;

