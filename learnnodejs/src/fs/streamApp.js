
var fs = require('fs');

var readable = fs.createReadStream(__dirname + '/lorum_ipsum.txt',
  {
    encoding: 'utf8',
    highWaterMark: 16 * 1024 // process 16KB of data at a time
  }
);

var writable = fs.createWriteStream(__dirname + '/lorum_ipsum_copy.txt');

readable.on('data', function (chunk) { // process chunks of the file from the readable stream
  console.log(chunk.length);
  writable.write(chunk); // asynchronously write to the writable file stream
});

