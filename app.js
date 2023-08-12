let dotenv = require("dotenv").config();
let express = require("express");
let hogan = require("hogan-express");
let path = require("path");
let io = require("socket.io");
let app = express();
let server = require("http").createServer(app);

app.engine("html", hogan);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(process.env.PORT, () =>
  console.log("server is running at " + process.env.PORT)
);
