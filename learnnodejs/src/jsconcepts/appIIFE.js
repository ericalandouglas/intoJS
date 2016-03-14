
var firstname = 'jane';

(function (lastname) {
    
    var firstname = 'john';
    console.log(firstname);
    console.log(lastname);

})('doe');

console.log(firstname);

