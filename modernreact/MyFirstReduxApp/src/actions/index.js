
// an action creator function
// function needs to return an action object, an object with a type property
export const selectBook = (book) => {
  console.log(`book ${book.title} selected`); // ES6 template literal

  return {
    type: 'BOOK_SELECTED', // can also use constants instead of string literals
    payload: book // actions always contain a type and can optionally contain a payload/other data
  };
};

