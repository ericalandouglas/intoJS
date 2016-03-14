
function Greetr(spec) {
    this.greeting = spec.greeting;
};

Greetr.prototype.greet = function () {
    console.log(this.greeting);
};

module.exports = function (spec) {
    return new Greetr(spec);
};

