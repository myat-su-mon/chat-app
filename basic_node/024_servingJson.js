let http = require("http");
let fs = require("fs");

let server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  let obj = {
    name: "Mg Mg",
    age: 30,
    family: {
      father: "U Mg",
      mother: "Daw Mya",
    },
  };

  res.end(JSON.stringify(obj));
});

server.listen(3000, function () {
  console.log("server is running at port 3000");
});
