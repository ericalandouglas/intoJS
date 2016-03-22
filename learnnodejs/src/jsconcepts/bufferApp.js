
// node makes Buffer available natively
var buffer = new Buffer('Hello', 'utf8') // default encoding is urf8 if not specified
console.log(buffer);
console.log(buffer.toString());
console.log(buffer.toJSON()); // data in JSON object is an array of the characters' unicodes
console.log(buffer[2]);

buffer.write('wo'); // over-writes he with wo
console.log(buffer.toString());

var buffArray = new ArrayBuffer(8); // stores 8 bytes, 64 bits of data
var view = new Int32Array(buffArray); // can stores 2 32 bit numbers in this view
view[0] = 5;
view[1] = 15;

console.log(view);

