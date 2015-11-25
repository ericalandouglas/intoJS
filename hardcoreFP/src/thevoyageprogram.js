
var VOYAGEAPP = {}; // module object

VOYAGEAPP.compositionReview = function () {
    var toUpper = function (s) {return s.toUpperCase();};
    var firstUpper = R.compose(toUpper, R.head);
    var splitByDash = R.split("-");
    var firstUppers = R.compose(R.join("**"), R.map(firstUpper), splitByDash); // firstUpper is also a composition

    alert(firstUppers("people-order-our-patties"));
};

VOYAGEAPP.categoryTheoryExample = function () {
    var myAdd = function (x, y) {return x + y;}; // polymorphic (ints, strings, arrays) but laws still hold for all types
    var myMultiply = function (x, y) {return x * y;};

    // Function Category
    var funcId = function (f) {return f;}; // id, required piece 1
    var funcCompose = function (g, f) {return function (x) {g(f(x))}}; // composition, required piece 2

    alert(
        "Add is associative = " + (myAdd(1, myAdd(2, 4)) === myAdd(myAdd(1, 2), 4)) + "\n" + // add is associative
        "Add is commutative = " + (myAdd(1, 4) === myAdd(4, 1)) + "\n" + // add is commutative
        "Add is distributive = " + (myMultiply(2, myAdd(3, 4)) === myAdd(myMultiply(2, 3), myMultiply(2, 4))) + "\n" + // add is distributive
        "Add identity is 0 = " + (myAdd(5, 0) === 5) + "\n" + // add identity is 0
        "Left and right identities exist for function category = " + (funcCompose(funcId, R.add(1))(2) === funcCompose(R.add(1), funcId)(2)) + "\n" + // left and right identites for function category
        "Function category has associativity = " + (funcCompose(funcCompose(R.add(1), R.add(2)), R.add(3))(0) === funcCompose(R.add(1), funcCompose(R.add(2), R.add(3)))(0)) // associativity for function category
    );
};

VOYAGEAPP.objectMapExample = function () {
    var _Container = function (val) {this.val = val;};
    var Container = function (x) {return new _Container(x);}; // constructor to literally create a wrapper (object) around a value

    _Container.prototype.repr = function (f) {
        return ["val", this["val"]].join(": ");
    };
    _Container.prototype.map = function (f) {
        return Container(f(this.val)); // open up container and pass contained value along to mapping function
    };

    var myCapitalize = function (s) {return s[0].toUpperCase() + s.slice(1)};
    var flameWrapper = Container("flame");
    alert(
        flameWrapper.repr() + "\n" +
        flameWrapper.map(myCapitalize).repr() + "\n" +
        Container([1,2,3]).map(R.reverse).map(R.head).repr() // Container can take strings, lists, ints, etc. // map chain is like a composition of maps i.e. map(compose(head, reverse))
    );
};
