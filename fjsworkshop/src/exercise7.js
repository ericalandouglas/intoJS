
function reduce(arr, fn, initial) {
    return function reduceHelper (index, accum) {
        if (index > arr.length - 1) {
            return accum;
        } else {
            return reduceHelper(index + 1, fn(accum, arr[index], index, arr));
        }
    }(0, initial);
}

module.exports = reduce
