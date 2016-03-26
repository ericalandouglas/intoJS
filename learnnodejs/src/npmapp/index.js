
var http = require('http');
var fs = require('fs');
var moment = require('moment'); // available through npm and node_modules

var processHtmlRequestAsync = function (res) {

  fs.readFile(__dirname + '/index.htm', 'utf8', function (err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error occurred while reading index html file, ' + err);
    }

    else {
      var message = 'Hello world...';
      data = data.replace('{Message}', message); // template processing

      res.writeHead(200, { 'Content-Type': 'text/html' }); // use quotes for http header property names
      res.end(data);
    }
  });

};

var processHtmlRequestStream = function (res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream(__dirname + '/index.htm').pipe(res); // pipe readable file stream to writable response stream
};

var processJsonRequest = function (res) {
  var obj = {
    firstname: 'John',
    lastname: 'Doe'
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj)); // converts object to JSON formatted string to send as response
};

http.createServer(function (req, res) {

  if (req.url === '/html') { // special html example
    processHtmlRequestAsync(res);
  } else if (req.url === '/') { // default index route
    processHtmlRequestStream(res);
  } else if (req.url === '/api') { // JSON example
    processJsonRequest(res);
  } else if (req.url === '/moment') { // default index route
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(moment().format('ddd hA')); // use the moment npm package
  } else { // all other requests funnel into here
    res.writeHead(404); // default all other requests to 404 not found
    res.end();
  }

}).listen(1337, '127.0.0.1'); // node server socket address becomes localhost:1337

