require("dotenv").config();
let bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let passport = require("passport");
let opts = {};
let express = require("express");
let app = express();

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

let userMap = new Map();
userMap.set("aa@gmail.com", { email: "aa", password: "aa" });
userMap.set("bb@gmail.com", { email: "bb", password: "bb" });

let strategy = new JwtStrategy(opts, function (payload, done) {
  let user = userMap.get(payload.email);
  if (user != null || user != undefined) {
    return done(null, user);
  } else {
    return done("No user with that email", null);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(strategy);

app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = userMap.get(email);

  if (user != null || user != undefined) {
    if (user.password == password) {
      let payload = { email: email };
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      res.json({ token: token });
    } else {
      res.send({ data: "Password Error" });
    }
  } else {
    res.send({ data: "Email Error" });
  }
});

app.get("/free", (req, res) => {
  res.send({ data: "free route" });
});

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({ data: "secret route" });
  }
);

app.listen(process.env.PORT, () =>
  console.log(`server is running at ${process.env.PORT}`)
);
