const uuidv4 = require("uuid/v4");
const express = require("express");
const router = express.Router();
const DB = require("../db");
const { comparePassword, hashPassword } = require("../util/password");
const { sessionMiddleware } = require("../util/session");

router.post("/signup", (req, res) => {
  const {
    name,
    email,
    password: plaintextPassword,
    passwordConfirmation: plaintextPasswordConfirmation
  } = req.body;

  if (plaintextPassword !== plaintextPasswordConfirmation) {
    return res
      .status(400)
      .json({ error: "Password does not match password confirmation" });
  }

  const sessionId = uuidv4();

  DB.get("SELECT * FROM users WHERE email = ?", email)
    .then(user => {
      if (user) {
        throw {
          statusCode: 400,
          error: "A user with that email already exists"
        };
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
        return res.status(err.statusCode).json({ error: err.error });
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
        throw {
          statusCode: 404,
          error: "No user matches that email and password combination"
        };
      }

      return comparePassword(plaintextPassword, user.password).then(ok => {
        if (!ok) {
          throw {
            statusCode: 404,
            error: "No user matches that email and password combination"
          };
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
        return res.status(err.statusCode).json({ error: err.error });
      }
      throw err;
    });
});

router.delete("/logout", sessionMiddleware, (req, res) => {
  DB.get(
    "SELECT * FROM sessions WHERE user_id = ? AND session_id = ?",
    req.user.id,
    req.headers.authorization
  )
    .then(session => {
      if (!session) {
        throw { statusCode: 401, error: "You are not logged in" };
      }

      return session;
    })
    .then(session =>
      DB.run(
        "DELETE FROM sessions WHERE sessions.session_id = ?",
        session.session_id
      )
    )
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err && err.statusCode) {
        return res.status(err.statusCode).json({ error: err.error });
      }

      throw err;
    });
});

module.exports = router;
