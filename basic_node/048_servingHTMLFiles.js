let express = require("express");
let app = express();
let dotenv = require("dotenv").config();
let path = require("path");

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.listen(process.env.PORT, () =>
  console.log("server is running at " + process.env.PORT)
);
