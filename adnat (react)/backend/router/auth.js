const uuidv4 = require("uuid/v4");
const express = require("express");
const router = express.Router();
const DB = require("../db");
const { comparePassword, hashPassword } = require("../util/password");

router.post("/signup", (req, res) => {
  const {
    name,
    email,
    password: plaintextPassword,
    passwordConfirmation: plaintextPasswordConfirmation
  } = req.body;

  if (plaintextPassword !== plaintextPasswordConfirmation) {
    return res.sendStatus(400);
  }

  const sessionId = uuidv4();

  DB.get("SELECT * FROM users WHERE email = ?", email)
    .then(user => {
      if (user) {
        throw { statusCode: 400 };
      }
    })
    .then(() => hashPassword(plaintextPassword))
    .then(password =>
      DB.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        name,
        email,
        password
      )
    )
    .then(() => DB.get("SELECT * FROM users WHERE email = ?", email))
    .then(user =>
      DB.run(
        "INSERT INTO sessions (user_id, session_id) VALUES (?, ?)",
        user.id,
        sessionId
      )
    )
    .then(() => res.json({ sessionId }))
    .catch(err => {
      if (err && err.statusCode) {
        return res.sendStatus(err.statusCode);
      }
      throw err;
    });
});

router.post("/login", (req, res) => {
  const { email, password: plaintextPassword } = req.body;
  const sessionId = uuidv4();

  DB.get("SELECT * FROM users WHERE email = ?", email)
    .then(user => {
      if (!user) {
        throw { statusCode: 404 };
      }

      return comparePassword(plaintextPassword, user.password).then(ok => {
        if (!ok) {
          throw { statusCode: 404 };
        }
        return user;
      });
    })
    .then(user =>
      DB.run(
        "INSERT INTO sessions (user_id, session_id) VALUES (?, ?)",
        user.id,
        sessionId
      )
    )
    .then(() => res.json({ sessionId }))
    .catch(err => {
      if (err && err.statusCode) {
        return res.sendStatus(err.statusCode);
      }
      throw err;
    });
});

module.exports = router;
