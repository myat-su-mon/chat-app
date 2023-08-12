let http = require("http");
let port = 3000;
let server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("hello coca cola");
});

server.listen(port, function () {
  console.log("server is running at " + port);
});
