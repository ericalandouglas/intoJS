
// Transudcers are composable and efficient data transformation functions which do not create intermediate collections

const R = require('ramda');

// parameterize mapping/predicate function and reducer
const mapping = (f) => (reducing) => (result, input) => reducing(result, f(input));
const filtering = (predicate) => (reducing) => (result, input) => predicate(input) ? reducing(result, input) : result;

// composable transformation
const xform = R.compose(
  mapping((x) => x + 1),
  filtering((x) => x % 2 === 0));

// helper
const transduce = (xform, reducing, initial, input) => input.reduce(xform(reducing), initial);

transduce(xform, (sum, x) => sum + x, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Ramda has its own helper
R.transduce(R.compose(R.map(R.add(1)), R.filter(x => x % 2 === 0)), R.flip(R.append), [], [1, 2, 3, 4]);
