
function Spy(target, method) {
	var oldMethod = target[method];
	var result = {count: 0};
    target[method] = function () {
        result.count += 1;
        return oldMethod.apply(this, arguments);
    };
    return result;
}

module.exports = Spy
