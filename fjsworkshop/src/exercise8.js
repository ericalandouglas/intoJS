
function duckCount() {
    return Array.prototype.reduce.apply(arguments, [
        function (prev, curr, i, args) {
            return Object.prototype.hasOwnProperty.call(curr, "quack") ? prev + 1 : prev;
        }, 0
    ])
}
    
module.exports = duckCount

