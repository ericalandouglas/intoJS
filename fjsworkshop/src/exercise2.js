
function repeat(operation, num) {
    operation();
    if (num > 1) {
    	repeat(operation, num -1);
    }
}

module.exports = repeat
