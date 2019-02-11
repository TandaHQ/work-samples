const express = require("express");
const router = express.Router();
const DB = require("../db");
const { comparePassword, hashPassword } = require("../util/password");
const { sessionMiddleware } = require("../util/session");

router.use(sessionMiddleware);

router.get("/", (req, res) => {
  if (!req.user.organisation_id) {
    return res.status(401).json({ error: "You're not in an organisation" });
  }

  DB.all(
    "SELECT * FROM users WHERE organisation_id = ?",
    req.user.organisation_id
  ).then(users =>
    res.json(
      users.map(user => ({
        id: user.id,
        organisationId: user.organisation_id,
        name: user.name,
        email: user.email
      }))
    )
  );
});

router.get("/me", (req, res) =>
  res.json({
    id: req.user.id,
    organisationId: req.user.organisation_id,
    name: req.user.name,
    email: req.user.email
  })
);

router.put("/me", (req, res) => {
  const { name, email } = req.body;

  DB.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    name || req.user.name,
    email || req.user.email,
    req.user.id
  )
    .then(() => DB.get("SELECT * FROM users WHERE id = ?", req.user.id))
    .then(user =>
      res.json({
        id: user.id,
        organisationId: user.organisation_id,
        name: user.name,
        email: user.email
      })
    );
});

router.put("/me/change_password", (req, res) => {
  const {
    oldPassword: oldPlainTextPassword,
    newPassword: newplaintextPassword,
    newPasswordConfirmation: newplaintextPasswordConfirmation
  } = req.body;

  if (newplaintextPassword !== newplaintextPasswordConfirmation) {
    return res
      .status(400)
      .json({ error: "Password does not match password confirmation" });
  }

  comparePassword(oldPlainTextPassword, req.user.password)
    .then(ok => {
      if (!ok) {
        throw {
          statusCode: 400,
          error: "Old password does not match your password"
        };
      }

      return req.user;
    })
    .then(() => hashPassword(newplaintextPassword))
    .then(password => {
      DB.run(
        "UPDATE users SET password = ? WHERE id = ?",
        password,
        req.user.id
      );
    })
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err && err.statusCode) {
        return res.status(err.statusCode).json({ error: err.error });
      }
      throw err;
    });
});

module.exports = router;
