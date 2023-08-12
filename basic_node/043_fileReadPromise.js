let http = require("http");
let url = require("url");
let qs = require("querystring");
let fs = require("fs");
let path = require("path");
require("dotenv").config();

mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
};

let checkFileExist = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.access(filepath, fs.F_OK, (err) => {
      if (err) reject(err);
      resolve(filepath);
    });
  });
};
let readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
let router = (req, res) => {
  let params = url.parse(req.url, true);
  let oriPath = params.pathname === "/" ? "/in dex.html" : params.pathname;
  let filepath = __dirname + oriPath;
  let ext = path.extname(filepath);

  checkFileExist(filepath)
    .then(readFile)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

let server = http.createServer(router);

server.listen(process.env.PORT, function () {
  console.log(`server is running at port ${process.env.PORT}`);
});
