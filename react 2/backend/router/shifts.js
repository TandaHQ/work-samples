const express = require("express");
const router = express.Router();
const DB = require("../db");
const { sessionMiddleware } = require("../util/session");

router.use(sessionMiddleware);
router.use((req, res, next) => {
  if (!req.user.organisation_id) {
    return res.sendStatus(400);
  }
  next();
});

router.get("/", (req, res) => {
  if (!req.user.organisation_id) {
    return res.status(401).json({ error: "You're not in an organisation" });
  }

  DB.all(
    "SELECT shifts.* FROM shifts INNER JOIN users ON shifts.user_id = users.id WHERE users.organisation_id = ?",
    req.user.organisation_id
  )
    .then(shifts =>
      shifts.map(
        ({
          id,
          start,
          finish,
          user_id: userId,
          break_length: breakLength
        }) => ({
          id,
          userId,
          start,
          finish,
          breakLength
        })
      )
    )
    .then(shifts => res.json(shifts))
    .catch(err => {
      if (err && err.statusCode) {
        return res.status(err.statusCode).json({ error: err.error });
      }
      throw err;
    });
});

router.post("/", (req, res) => {
  if (!req.user.organisation_id) {
    return res.status(401).json({ error: "You're not in an organisation" });
  }

  const { userId, start, finish, breakLength } = req.body;

  DB.get(
    "SELECT * FROM users WHERE id = ? AND organisation_id = ?",
    userId,
    req.user.organisation_id
  )
    .then(user => {
      if (!user) {
        throw { statusCode: 404, error: "No known user with that ID" };
      }
    })
    .then(() =>
      DB.run(
        "INSERT INTO shifts (user_id, start, finish, break_length) VALUES (?, ?, ?, ?)",
        userId,
        start,
        finish,
        breakLength
      )
    )
    .then(() =>
      // Don't do this, this is bad
      DB.get("SELECT * FROM shifts ORDER BY id DESC LIMIT 1")
    )
    .then(shift =>
      res.json({
        id: shift.id,
        userId: shift.user_id,
        start: shift.start,
        finish: shift.finish,
        breakLength: shift.break_length
      })
    )
    .catch(err => {
      if (err && err.statusCode) {
        return res.status(err.statusCode).json({ error: err.error });
      }
      throw err;
    });
});

router.put("/:id", (req, res) => {
  if (!req.user.organisation_id) {
    return res.status(401).json({ error: "You're not in an organisation" });
  }

  DB.get(
    "SELECT shifts.* FROM shifts INNER JOIN users ON shifts.user_id = users.id WHERE users.organisation_id = ? AND shifts.id = ?",
    req.user.organisation_id,
    req.params.id
  )
    .then(shift => {
      if (!shift) {
        throw { statusCode: 404, error: "No known shift with that ID" };
      }

      return DB.run(
        "UPDATE shifts SET start = ?, finish = ?, break_length = ? WHERE id = ?",
        req.body.start || shift.start,
        req.body.finish || shift.finish,
        req.body.breakLength || shift.break_length,
        shift.id
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

router.delete("/:id", (req, res) => {
  if (!req.user.organisation_id) {
    return res.status(401).json({ error: "You're not in an organisation" });
  }

  DB.get(
    "SELECT shifts.* FROM shifts INNER JOIN users ON shifts.user_id = users.id WHERE users.organisation_id = ? AND shifts.id = ?",
    req.user.organisation_id,
    req.params.id
  )
    .then(shift => {
      if (!shift) {
        throw { statusCode: 404, error: "No known shift with that ID" };
      }

      return DB.run("DELETE FROM shifts WHERE id = ?", shift.id);
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
