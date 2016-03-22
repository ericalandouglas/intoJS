
var fs = require('fs');
var zlib = require('zlib');

var readable = fs.createReadStream(__dirname + '/lorum_ipsum.txt');

var writable = fs.createWriteStream(__dirname + '/lorum_ipsum_copy_2.txt');

var compressed = fs.createWriteStream(__dirname + '/lorum_ipsum.txt.gz'); // create a writable file stream for compressed files

var gzip = zlib.createGzip(); // creates compressed file (a file stream)

readable.pipe(writable); // syntactic sugar for writing to write stream on data received event
readable.pipe(gzip).pipe(compressed); // double pipe from the first readable file stream, to the compressed file stream object, and finally to the compressed writable file stream

