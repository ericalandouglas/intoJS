
import { FETCH_WEATHER } from '../actions/index.js';

export default (state = [], action) => {
  switch (action.type) {
  case FETCH_WEATHER:
    return [action.payload.data, ...state]; // ES6 spread operator for adding all of states elements to new array
  }

  return state;
}

