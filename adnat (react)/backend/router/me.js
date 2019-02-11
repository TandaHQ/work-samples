const express = require("express");
const router = express.Router();
const DB = require("../db");
const { comparePassword, hashPassword } = require("../util/password");
const { sessionMiddleware } = require("../util/session");

router.use(sessionMiddleware);

router.get("/", (req, res) => res.json(req.user));

router.put("/update", (req, res) => {
  const { name, email } = req.body;

  return DB.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    name || req.user.name,
    email || req.user.email,
    req.user.id
  )
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err && err.statusCode) {
        return res.sendStatus(err.statusCode);
      }

      throw err;
    });
});

router.put("/change_password", (req, res) => {
  const {
    oldPassword: oldPlainTextPassword,
    newPassword: newplaintextPassword,
    newPasswordConfirmation: newplaintextPasswordConfirmation
  } = req.body;

  return comparePassword(oldPlainTextPassword, req.user.password)
    .then(ok => {
      if (!ok) {
        throw { statusCode: 404 };
      }

      return req.user;
    })
    .then(() => {
      if (newplaintextPassword !== newplaintextPasswordConfirmation) {
        throw {statusCode: 400};
      }
    })
    .then(() => hashPassword(newplaintextPassword))
    .then(password => {
      DB.run("UPDATE users SET password = ? WHERE id = ?", password, req.user.id);
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err && err.statusCode) {
        return res.sendStatus(err.statusCode);
      }
      throw err;
    });
});

module.exports = router;
