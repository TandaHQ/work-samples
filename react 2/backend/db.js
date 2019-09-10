const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db.db");

const get = (query, ...params) =>
  new Promise((resolve, reject) => {
    db.get(query, ...params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });

const all = (query, ...params) =>
  new Promise((resolve, reject) => {
    db.all(query, ...params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });

const run = (query, ...params) =>
  new Promise((resolve, reject) => {
    db.run(query, ...params, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

run(
  "CREATE TABLE IF NOT EXISTS organisations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, hourly_rate REAL NOT NULL)"
);
run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, organisation_id INTEGER, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)"
);
run(
  "CREATE TABLE IF NOT EXISTS shifts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, start DATETIME NOT NULL, finish DATETIME NOT NULL, break_length INTEGER)"
);
run(
  "CREATE TABLE IF NOT EXISTS sessions (session_id TEXT PRIMARY KEY NOT NULL, user_id INTEGER NOT NULL)"
);

module.exports = { run, get, all };
