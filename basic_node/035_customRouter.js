let http = require("http");
let url = require("url");
require("dotenv").config();

let routes = {
  GET: {
    "/": (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1>GET / route</h1>");
    },
    "/home": (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1>GET /home route</h1>");
    },
  },
  POST: {
    "/": (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1>POST / route</h1>");
    },
    "/about": (req, res) => {
      res.writeHead(200, { "Content-type": "text/html" });
      res.end("<h1>POST /about route</h1>");
    },
  },
  NA: (req, res) => {
    res.writeHead(404);
    res.end("<h1>no page</h1>");
  },
};

let start = (req, res) => {
  let reqMethod = req.method;
  let urlObj = url.parse(req.url, true);
  let resolveRoute = routes[reqMethod][urlObj.pathname];

  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res);
  } else {
    routes["NA"](req, res);
  }
};

let server = http.createServer(start);

server.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
