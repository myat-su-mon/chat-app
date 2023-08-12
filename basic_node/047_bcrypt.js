let libby = require("./lib/index");

libby
  .encode("123")
  .then((encoded) => libby.compare("125", encoded))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
