const express = require("express");
const router = express.Router();
const DB = require("../db");
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

module.exports = router;
