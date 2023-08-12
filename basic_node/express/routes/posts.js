const { Router } = require("express");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /USERS ROUTE");
  next();
});

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/postTitle/:title", (req, res) => {
  res.json({ title: "Some Random Post" });
});

module.exports = router;
