let http = require("http");
let fs = require("fs");

let myReadStr = fs.createReadStream("test.txt", "utf-8");

let server = http.createServer(function (req, res) {
  res.write(200, { "Content-Type": "text/plain" });
  myReadStr.pipe(res);
});

server.listen(3000, function () {
  console.log("server is running at port 3000");
});
