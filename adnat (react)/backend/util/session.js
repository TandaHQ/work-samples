const DB = require("../db");

const sessionMiddleware = (req, res, next) => {
  const sessionId = req.headers.authorization;

  if (!sessionId) {
    return res.sendStatus(401);
  }

  DB.get(
    "SELECT users.* FROM users INNER JOIN sessions ON sessions.user_id = users.id WHERE sessions.session_id = ?",
    sessionId
  ).then(user => {
    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
};

module.exports = { sessionMiddleware };
