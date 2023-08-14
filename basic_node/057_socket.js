const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});

io.on("connection", (socket) => {
  socket.on("login", (data) => {
    io.sockets.connected[socket.id].emit("login-success", true);
  });
  socket.on("msg", (data) => {
    io.emit("income-msg", data);
  });
});

app.listen(3000, () => console.log("server is running at 3000"));
