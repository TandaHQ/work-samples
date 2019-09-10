const bcrypt = require("bcrypt");

const hashPassword = plaintext =>
  new Promise((resolve, reject) => {
    bcrypt.hash(plaintext, 10, function(err, hash) {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

const comparePassword = (plaintext, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plaintext, hash, function(err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });

module.exports = { comparePassword, hashPassword };
