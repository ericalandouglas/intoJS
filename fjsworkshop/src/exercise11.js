
module.exports = function arrayMap(arr, fn) {
    return arr.reduce(function map (prev, curr, i, array) {
        return prev.concat([fn(curr)]);
    }, []);
}
