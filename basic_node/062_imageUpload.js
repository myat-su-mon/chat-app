require("dotenv").config();
let express = require("express");
let app = express();
let multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, +Date.now() + "_" + file.originalname);
  },
});

let upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res, next) => {
  console.log(req.file.filename);
  res.send(req.file.filename);
});

app.post("/multiupload", upload.array("images", 10), (req, res, next) => {
  req.files.forEach((file) => {
    console.log(file.filename);
  });
  res.send(req.files);
});

app.listen(process.env.PORT, () =>
  console.log(`server is running at ${process.env.PORT}`)
);
