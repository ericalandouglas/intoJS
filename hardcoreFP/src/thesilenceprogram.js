
var SILENCEAPP = {}; // module object

SILENCEAPP.seperateInputs = function () {
    var daysThisMonth = function () { // hard to test, secret input environment, Date may vary by JS environment
        var date  = new Date(),
            y     = date.getFullYear(),
            m     = date.getMonth(),
            start = new Date(y, m, 1),
            end   = new Date(y, m + 1, 1);
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
    };
    var daysInMonth = function (y, m) { // function easier to test with time inputs explicit and serperated from environment
        var start = new Date(y, m - 1, 1),
            end   = new Date(y, m , 1);
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
    };

    alert(daysThisMonth() + " " + daysInMonth(1992, 3) + "\n" + 
         (daysInMonth(2015, 11) === daysThisMonth()) + " " + (daysInMonth(2000, 2) === 29)); // daysInMonth(2015, 11) === daysThisMonth() will change in value over time
};

SILENCEAPP.seperateMutations = function () {
    var teaser = function (size, elt) { // function is mutating and calculating, hard to test (DOM mock out etc.)
        setText(elt, R.slice(0, size, text(elt)));
    };
    R.map(R.curry(teaser)(50), all('p')); // teaser is doing the mutation itself

    var teaser = R.slice(0); // now teaser is merely a function that takes an ending index and array and calculates the new array slice
    R.map(R.pipe(text, teaser(50), setText), all('p')); // only mutation happens here when elements are piped, teaser can be tested seperately

};

SILENCEAPP.purityExample = function () {
    var random = function (x, y) { // pure function with well defined calculations and inputs
        y = 36969 * (y & 65535) + (y >> 16);
        x = 18000 * (x & 65535) + (x >> 16);
        return (y << 16) + x;
    };

    var impureAdd = function (x, y, console) { // passing an impure parameter can strip away purity as so happens to this function
        var z = x + y;
        console.log(x + " + " + y + " = " + z);
        return z;
    };
};
