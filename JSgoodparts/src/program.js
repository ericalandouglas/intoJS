
Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) { // defensively add methods to objects
        this.prototype[name] = func;
    }
    return this;
};

var MYAPP = {}; // module's object for global linkage

MYAPP.demo = function () {
    var input = [1, 2, 3];
    var output = R.map(function (item) {return item * 4;})(input);
    alert(input + " - " + output + " ... " +  R.isArrayLike(output));
};

MYAPP.methodInvocation = function () {

    var myObject = {
        incValue: 0,
        increment: function (inc) {
            this.incValue += typeof(inc) === 'number' ? inc : 1;
        }
    };

    myObject.increment();
    myObject.increment(3);
    
    // below is function invocation work around example
    myObject.doubleVal = function () {
        var that = this; // work around for inner scope
        var doubleHelper = function () {
            that.incValue = (function (x, y) {return x + y;}(that.incValue, that.incValue));
        };
        doubleHelper();
    };

    myObject.doubleVal();
    alert(myObject.incValue);
};

MYAPP.constructorExample = function () {

    var Quo = function (statusValue) {
        this.status = statusValue;
    };
    var myQuo = new Quo("hola");

    Quo.prototype.getStatus = function () {
        return this.status;
    };

    var myObject = {
        status: "beans"
    };
    alert(myQuo.getStatus() + " " + Quo.prototype.getStatus.apply(myObject)); // myObject is bound to this
};

MYAPP.applyInvocation = function () {

    var myObject = {
        incValue: 3,
        doubleVal: function () {
            var doubleHelper = function () {
                this.incValue = (function (x, y) {return x + y;}(this.incValue, this.incValue));
            };
            doubleHelper.apply(this); // pass this along to doubleHelper to get proper this reference
        }
    };

    myObject.doubleVal();
    alert(function (x, y) {return x + y;}.apply(null, [2, 7]) + " " + myObject.incValue); // null is bound to this, result is 9, incValue is 6
};

MYAPP.variableParamsExample = function () {
    var sum = function () {
        var sumReduce = R.reduce(R.add)(0);
        return sumReduce(arguments);
    };
    alert(sum(1, 2, 3, 4) + " " + sum(-1, 2, -3));
};

MYAPP.exceptionExample = function () {
    var add = function (a, b) {
        if (typeof(a) !== 'number' || typeof(b) !== 'number') {
            throw {
                name: 'TypeError',
                message: 'add only accepts 2 numbers'
            };
        }
        return a + b;
    };

    try {
        var badAdd = add("apples", "oranges");
    } catch (err) {
        alert(err.name + ": " + err.message);
    }
};

MYAPP.recursiveExample = function () {
    var fib = function innerFib (n) { // fib and innerFib both refer to the recursive function and each can be used to call recursively
        return n < 2 ? n : fib(n - 1) + innerFib(n - 2); // both recursive calls can be fib or both can be innerFib
    };

    var hanoiOutputter = function (x) {
        var hanoi = function (disc, src, aux, dst, accum) {
            if (disc > 0) {
                accum = hanoi(disc - 1, src, dst, aux, accum);
                accum += "Move disk " + disc + " from " + src + " to " + dst +"\n";
                return hanoi(disc - 1, aux, src, dst, accum);
            }
            return accum;
        };
        return hanoi(x, "src", "aux", "dst", "");
    };

    var fact = function (n) { // can't be tail recursion optimized
        var factHelper = function (x, z) {
            return x < 2 ? z : factHelper(x - 1, z * x);
        };
        return factHelper(n, 1);
    };

    alert(fib(6) + "\n" + hanoiOutputter(3) + fact(4));
};

MYAPP.typeAugmentation = function () {
    Number.method('myinteger', function () {
        return Math[this < 0 ? 'ceil' : 'floor'](this);
    });

    String.method('mytrim', function () {
        return this.replace(/^\s+|\s+$/g, '*'); // replace trailing white spaces with *
    });
    String.method('mytrim', function () { // mytrim won't be overwritten
        return this.replace(/^\s+|\s+$/g, '--');
    });

    alert((-10 / 3).myinteger() + " " + "   Trimmed    ".mytrim());
};

MYAPP.pascalTri = function () {
    var calcPascalNum = function (rowNum, colNum) {
        if (rowNum < 2 || colNum == 0 || colNum == rowNum) {
            return 1;
        }
        return calcPascalNum(rowNum - 1, colNum) + calcPascalNum(rowNum - 1, colNum - 1);
    };
    var zeroRange = R.range(0);

    var buildPascalRow = function (rowNum, maxRowNum) {
        var getCoords = R.map(function (colNum) {
            return [rowNum, colNum];
        });
        var getPascalCoords = R.map(function (coord) {
            return [calcPascalNum(coord[0], coord[1]), coord[1]];
        });
        var getString = R.reduce(function (accumString, pcoord) {
            return accumString + pcoord[0] + (pcoord[1] == rowNum ? "" : "_");
        })("");
        return function (rowNum, maxRowNum) {
            spaces = new Array(maxRowNum - (rowNum - 1)).join('_');
            return spaces + R.pipe(zeroRange, getCoords, getPascalCoords, getString)(rowNum + 1) + spaces;
        }(rowNum, maxRowNum);
    };

    var getPascalTri = function (numRows) {
        return R.pipe(
            zeroRange,
            R.map(function (rowNum) {
                return [rowNum, numRows - 1];
            }),
            R.reduce(function (accumString, rowInput) {
                return accumString + buildPascalRow(rowInput[0], rowInput[1]) + (rowInput[0] == rowInput[1] ? "" : "\n");
            })("")
        )(numRows);
    };

    alert(getPascalTri(5));
};

MYAPP.scopeExample = function () {
    var foo = function () {
        var a = 3, b = 5;
        var bar = function () {
            var b = 7, c = 11;
            a += b + c; // a = 21, b = 7, c = 11
        };
        bar();
        alert(a);
    };
    foo();
};

MYAPP.closureProtectionExample = function () {
    var myObject = function () {
        var value = 0;
        return {
            increment: function (inc) {
                value += typeof(inc) === 'number' ? inc : 1;
            },
            getValue: function () {
                return value;
            }
        };
    }();

    var quo = function (status) { // lowercase q, so as not to be used with the new prefix
        return {
            getStatus: function () {
                return status;
            }
        };
    };

    myQuo = quo('amazed'); // no new prefix
    myObject.increment(3);
    myObject.increment('snoop');
    alert(myObject.getValue() + " " + myQuo.getStatus());
};

MYAPP.callbackExample = function () {
    req = prepare_the_request();
    res = send_async_request(req, function (res) { // use call backs to help handle asynchonicity
        display(res);
    });
};

MYAPP.stringAugment = function () {
    String.method('deentityify', function () {
        var entity = { // only visible to the deentityify method
            quo: '"',
            lt: '<',
            gt: '>'
        };

        return function () {
            return this.replace(/&([^&;]+);/g, function (a, b) {
                var r = entity[b];
                return typeof(r) === 'string' ? r : a;
            });
        }.apply(this);
    });

    alert("&lt;&quo;&gt;".deentityify());
};

MYAPP.modulePattern = function () {
    var serialMaker = function () {
        var prefix = ''; // only accessible inside this function scope (private to instantiated serial maker objects)
        var seq = 0; // only accessible inside this function scope (private to instantiated serial maker objects)
        return {
            setPrefix: function (p) {
                prefix = String(p);
            },
            setSeq: function (s) {
                seq = s;
            },
            gensym: function () {
                var result = prefix + seq;
                seq += 1;
                return result;
            }
        };
    };

    mySerialMaker = serialMaker();
    mySerialMaker.setPrefix('cat');
    mySerialMaker.setSeq(55);
    alert(mySerialMaker.gensym() + " " + mySerialMaker.gensym());
};
