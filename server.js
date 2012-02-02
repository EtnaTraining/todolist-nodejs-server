var http = require('http');
http.createServer(function (req, res) {
	console.log(req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World from nodester..');
}).listen(14236);

console.log("Server avviato\n");