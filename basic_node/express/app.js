const express = require("express");
// const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const local = require("passport-local");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const store = session.MemoryStore();
const app = express();
const mysql = require("./database");

app.get("/", (req, res) => {
  mysql.query("SELECT * FROM USERS", (err, data) => {
    if (err) throw err;
    res.json({ message: data });
  });
});

// app.use(cookieParser());
app.use(
  session({
    secret: "some secret",
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    store,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(store);
  console.log(req.method, req.url);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/auth", authRoute);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

// const users = [
//   { name: "myat", age: 22 },
//   { name: "kelvin", age: 27 },
//   { name: "michael", age: 43 },
// ];

// const posts = [
//   { title: "my favorite food" },
//   { title: "my favorite game" }
// ];

// app.get("/", (req, res) => {
//   res.send({
//     msg: "hello",
//   });
// });

// app.post("/", (req, res) => {
//   const user = req.body;
//   users.push(user);
//   res.status(201).send("created a user");
// });

// app.get("/users", (req, res) => {
//   res.status(200).send(users);
// });

// app.get("/users/:name", (req, res) => {
//   const { name } = req.params;
//   const user = users.find((user) => user.name === name);
//   if (user) {
//     res.status(200).send(user);
//   } else {
//     res.status(400).send("Not Found");
//   }
// });

// app.get("/posts", (req, res) => {
//   console.log("posts get method", req.query);
//   const { title } = req.query;
//   if (title) {
//     const post = posts.find((post) => post.title === title);
//     if (post) {
//       res.status(200).send(post);
//     } else {
//       res.status(404).send("Posts not found");
//     }
//   }
//   res.status(200).send(posts);
// });

// function validateAuthToken(req, res, next) {
//     console.log('Inside Validate Auth Token')
//   const { authorization } = req.headers;
//   if (authorization && authorization === "123") {
//     next();
//   } else {
//     res.status(403).send({ msg: "Forbidden. Incorrect Credentials" });
//   }
// }
// app.post("/posts", validateAuthToken, (req, res) => {
//   const post = req.body;
//   posts.push(post);
//   res.status(201).send(post);
// });

// function validateCookie(req, res, next) {
//     const { cookies } =req;
//     if ("session_id" in cookies) {
//       console.log("Session ID Exists.");
//       if (cookies.session_id === "123456") {
//         next();
//       } else {
//         res.status(403).send({ msg: "Not Authenticated" });
//       }
//     } else {
//       res.status(403).send({ msg: "Not Authenticated" });
//     }
//     next();
// }

// app.get('/signin', (req, res) => {
//     res.cookie('session_id', '123456');
//     res.status(200).json({msg: 'logged in.'});
// });

// app.get('/protected', validateCookie, (req, res) => {
//     res.status(200).json({msg: 'You are authorized. '});
// });

// app.post('/login', (req, res) => {
//   console.log(res.session_id);
//     const {username, password} = req.body;
//     if (username && password) {
//       if (req.session.authenticated) {
//         res.json(req.session);
//       } else {
//         if (password === '123') {
//           req.session.authenticated = true;
//           req.session.user = {
//             username, password
//           };
//           res.json(req.session);
//         } else {
//           res.status(403).json({msg: 'Bad Credentials'});
//         }
//       }
//     }
//     else res.status(403).json({ msg: "Bad Credentials" });
//     res.status(200);
// });

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });
