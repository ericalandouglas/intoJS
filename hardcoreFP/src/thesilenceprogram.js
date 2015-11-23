
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

SILENCEAPP.curryExample = function () {
    var curry = function (fn) {
        return function () {
            if (fn.length > arguments.length) { // if the function received less arguments then expected
                var slice = Array.prototype.slice;
                var args = slice.apply(arguments); // store what args were given
                return function () {
                    return fn.apply(null, args.concat(slice.apply(arguments))); // new function that concats old stored args to any new argumetns passed
                };
            }
            return fn.apply(null, arguments); // otherwise apply function normally
        };
    };
    var get = curry(function(prop, obj) {
        return obj[prop];
    });

    var people = [
        {
            name: "Eric",
            age: 23
        },
        {
            name: "Andrew",
            age: 24
        }
    ];
    alert(people.map(get('name')).join(', '));
};

SILENCEAPP.curryExercise = function () {
    var words = R.split(/\s*[,.]?\s+/); // split is already curried
    var tripleList = R.map(R.multiply(3));
    var findMax = R.reduce(R.max, -Infinity);
    var myMap = R.curry(function (fn, xs) {
        var concatList = function (acc, x) {
            return acc.concat([fn(x)]);
        };
        return R.reduce(concatList, [], xs);
    });

    alert(words("rick  and,   morty. Dude").join('**||**') + "\n" +
          tripleList([1,2,3,4]).join("--") + "\n" +
          findMax([-33, -999, -72.33, -101]) + "\n" +
          myMap(R.add(1))([1,2,4]).join('..')); // myMap supports currying
};

SILENCEAPP.composeExample = function () {
    var compose = function (g, f) {
        return function (x) {
            return g(f(x)); // doesn't care what f or g is, just pushes along value
        };
    };
    var reverseTriple = compose(R.reverse, R.map(R.multiply(3))); // first triples list, then reverses

    alert(reverseTriple([1,2,3]).join('\\\/'));
};

SILENCEAPP.compositionExercise = function () {
    var get = R.curry(function(x, obj) {return obj[x];});
    var wordLengths = R.compose(R.map(R.length), R.split(/\s*[,.]?\s+/)); // split on white space, comma, period

    var articles = [
       {
            title: 'Everything Sucks',
            url: 'http://do.wn/sucks.html',
            author: {
                name: 'Debbie Downer',
                email: 'debbie@do.wn'
            }
        },
        {
            title: 'If You Please',
            url: 'http://www.geocities.com/milq',
            author: {
                name: 'Caspar Milquetoast',
                email: 'hello@me.com'
            }
        }
    ];
    var authorNames = R.map(R.compose(get('name'), get('author'))); // point free function
    var isAuthor = function (name, articles) { // pass in articles so calling is syntactically easy, not point free
        return R.compose(R.contains(name), authorNames)(articles);
        return R.contains(name, authorNames(articles)); // possibly better here and does not use compose
    };

    var fork = R.curry(function(lastly, f, g, x) { // fork is a functor/applicative functor, f and g are functors
        return lastly(f(x), g(x));
    });
    var avgNum = fork(R.divide, R.sum, R.length); // point free function

    var myLog = function (x) {
        console.log(x);
        return x;
    };
    var firstTitle = R.compose(get('title'), myLog, R.head); // very declarative, doesn't care about how things are implemented, just describes what to do
    var firstLetter = R.pipe(firstTitle, R.head); // really just a composition of 4 functions

    alert(
        wordLengths("Once upon a time").join('..') + "\n" +
        authorNames(articles).join(', ') + "\n" +
        isAuthor("Caspar Milquetoast", articles) + " " + isAuthor("Rick Sanchez", articles) + "\n" +
        avgNum([1,2,3,4,5]) + "\n" +
        firstTitle(articles) + ", " + firstLetter(articles)
    );
};
