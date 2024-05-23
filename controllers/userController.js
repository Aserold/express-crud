const db = require('../db/database');

exports.createUser = (req, res) => {
  const { name, age } = req.body;
  const sql = 'INSERT INTO users (name, age) VALUES (?, ?)';
  const params = [name, age];

  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID });
    });
  })
    .then((result) => {
      res.status(201).send({ id: result.id, name, age });
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};

exports.listUsers = async (req, res) => {
  const sql = 'SELECT * FROM users';

  try {
    const rows = await db.all(sql);
    res.send(rows);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM users WHERE id = ?';

  try {
    const row = await db.get(sql, [id]);
    if (!row) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(row);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  const sql = 'UPDATE users SET name = ?, age = ? WHERE id = ?';
  const params = [name, age, id];

  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  })
    .then((result) => {
      if (result.changes === 0) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.send({ id: result.id, name, age });
      }
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';

  new Promise((resolve, reject) => {
    db.run(sql, [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes);
    });
  })
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};
