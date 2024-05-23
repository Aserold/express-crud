const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite3');
const { promisify } = require('util')

db.get = promisify(db.get);
db.all = promisify(db.all);

db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER
  )
`);
});

module.exports = db;
