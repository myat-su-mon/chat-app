const { Router } = require("express");
const db = require("../database");

const { check, validationResult } = require("express-validator");

const router = Router();

router.use((req, res, next) => {
  console.log("Request made to /USERS ROUTE");
  next();
});

router.get("/", async (req, res) => {
  if (req.user) {
    console.log(req.user);
    const results = await db.promise().query(`SELECT * FROM USERS`);
    res.sendStatus(200).send(results[0]);
  } else {
    res.sendStatus(403).send({ msg: "Not Authenticated" });
  }
});

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.get("/posts", (req, res) => {
  res.json({ route: "Posts" });
});

router.post(
  "/",
  // [
  //   check(username)
  //     .notEmpty()
  //     .withMessage("Username cannot be empty.")
  //     .isLength({ min: 5 })
  //     .withMessage("Username must be at least 5 characters."),
  //   check(password)
  //     .notEmpty()
  //     .withMessage("Password cannot be empty.")
  //     .isLength({ min: 5 })
  //     .withMessage("Username must be at least 5 characters."),
  // ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.sendStatus(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    if (username && password) {
      try {
        db.promise().query(
          `INSERT INTO USERS VALUES ('${username}', '${password}')`
        );
        res.sendStatus(201).send({ msg: "Created User in DB" });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

module.exports = router;
