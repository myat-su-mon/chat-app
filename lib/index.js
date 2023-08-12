let bcrypt = require("bcrypt");

let encode = (plainPass) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(plainPass, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

let compare = (plainPass, hashedPass) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, hashedPass, function (err, boolean) {
      if (err) reject(err);
      resolve(boolean);
    });
  });
};

module.exports = {
  encode,
  compare,
};
