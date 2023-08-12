let express = require("express");
let app = express();
let dotenv = require("dotenv").config();
let path = require("path");
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/post/:id", (req, res) => {
  let id = req.params.id;
  res.send(`Param id is ${id}`);
});

app.get("/api/user", (req, res) => {
  let name = req.query.name;
  let password = req.query.password;
  res.send(`Name : ${name}, Password : ${password}`);
});

app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  res.send(`Email : ${email}, Password : ${password}`);
});

app.listen(process.env.PORT, () =>
  console.log("server is running at " + process.env.PORT)
);
