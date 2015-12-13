 
 function repeat(operation, num) {
    // Modify this so it doesn't cause a stack overflow!
    return function () {
        if (num <= 0) return;
        operation();
        return repeat(operation, num - 1);
    };
}

function trampoline(fn) {
    // You probably want to implement a trampoline!
    while (fn && typeof(fn) === 'function') {
        fn = fn();
    }
}

module.exports = function(operation, num) {
    // You probably want to call your trampoline here!
    trampoline(function () {
        return repeat(operation, num);
    });
};
