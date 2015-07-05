/**
 * New node file
 */
var http = require("http");
var fs = require("fs");

http.createServer(function(request, response) {
	fs.readFile("app/index.html", function(err, data) {
		if(err) {
			throw err;
		}
		response.writeHead(200);
		response.end(data);
	});
}).listen(8000);
console.log("Started serveron  port 8000");