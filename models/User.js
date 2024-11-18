const db = require('../config/db');

const User = {
  create: (username, passwordHash, callback) => {
    const query = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
    db.query(query, [username, passwordHash], callback);
  },
  findByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
  }
};

module.exports = User;
