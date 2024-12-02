const db = require('../config/db');

const Collection = {
  create: (userId, collectionName, callback) => {
    const checkQuery = 'SELECT * FROM Collections WHERE user_id = ? AND collection_name = ?';
    const insertQuery = 'INSERT INTO Collections (user_id, collection_name) VALUES (?, ?)';

    db.query(checkQuery, [userId, collectionName], (checkErr, checkResult) => {
      if (checkErr) return callback(checkErr);
      if (checkResult.length > 0) {
        return callback(new Error('Collection with the same name already exists'));
      }

      db.query(insertQuery, [userId, collectionName], callback);
    });
  },

  findByUserId: (userId, callback) => {
    const query = 'SELECT * FROM Collections WHERE user_id = ?';
    db.query(query, [userId], callback);
  },
};

module.exports = Collection;
