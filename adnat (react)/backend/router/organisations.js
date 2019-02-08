const express = require("express");
const router = express.Router();
const DB = require("../db");
const { sessionMiddleware } = require("../util/session");

router.use(sessionMiddleware);

router.get("/", (req, res) =>
  DB.all("SELECT * FROM organisations")
    .then(orgs =>
      orgs.map(({ id, name, hourly_rate: hourlyRate }) => ({
        id,
        name,
        hourlyRate
      }))
    )
    .then(orgs => res.json(orgs))
);

router.post("/join", (req, res) => {
  const { organisationId } = req.body;

  DB.get("SELECT * FROM organisations WHERE id = ?", organisationId).then(
    org => {
      if (!org) {
        throw { statusCode: 400 };
      }

      return DB.run(
        "UPDATE users SET organisation_id = ? WHERE id = ?",
        req.body.organisationId,
        req.user.id
      ).then(() => res.json({ id: org.id, name: org.name, hourlyRate: org.hourly_rate }));
    }
  );
});

router.post("/create_join", (req, res) => {
  const { name, hourlyRate } = req.body;

  DB.get("SELECT * FROM organisations WHERE name = ?", name)
    .then(org => {
      if (org) {
        throw { statusCode: 400 };
      }
    })
    .then(() =>
      DB.run(
        "INSERT INTO organisations (name, hourly_rate) VALUES (?, ?)",
        name,
        hourlyRate
      )
    )
    .then(() => DB.get("SELECT * FROM organisations WHERE name = ?", name))
    .then(org =>
      DB.run(
        "UPDATE users SET organisation_id = ? WHERE id = ?",
        org.id,
        req.user.id
      ).then(() =>
        res.json({ id: org.id, name: org.name, hourlyRate: org.hourly_rate })
      )
    )
    .catch(err => {
      if (err && err.statusCode) {
        return res.sendStatus(err.statusCode);
      }
      throw err;
    });
});

module.exports = router;
