
// state argument is not app state, only the state this reducer is responsible for
export default function (state = null, action) { // defaulting state param to null (for initial app boot, etc.)

  switch (action.type) {
  case 'BOOK_SELECTED':
    return action.payload;
  }

  return state; // all other action types fall through to here
}

