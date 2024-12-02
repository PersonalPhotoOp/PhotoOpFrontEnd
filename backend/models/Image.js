const db = require('../config/db');

const Image = {
  create: (collectionId, cloudinaryUrl, title, description, callback) => {
    const validateQuery = 'SELECT * FROM Collections WHERE collection_id = ?';
    const insertQuery = `
      INSERT INTO Images (collection_id, cloudinary_url, title, description)
      VALUES (?, ?, ?, ?)
    `;

    db.query(validateQuery, [collectionId], (validateErr, validateResult) => {
      if (validateErr) return callback(validateErr);
      if (validateResult.length === 0) {
        return callback(new Error('Collection ID does not exist'));
      }

      db.query(insertQuery, [collectionId, cloudinaryUrl, title, description], callback);
    });
  },
};

module.exports = Image;
