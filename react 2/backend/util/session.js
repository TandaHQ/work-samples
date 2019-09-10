const DB = require("../db");

const sessionMiddleware = (req, res, next) => {
  const sessionId = req.headers.authorization;

  if (!sessionId) {
    return res.status(401).json({ error: "No session ID provided" });
  }

  DB.get(
    "SELECT users.* FROM users INNER JOIN sessions ON sessions.user_id = users.id WHERE sessions.session_id = ?",
    sessionId
  ).then(user => {
    if (!user) {
      return res
        .status(401)
        .json({ error: "Session ID does not match any valid sessions" });
    }

    req.user = user;
    next();
  });
};

module.exports = { sessionMiddleware };
