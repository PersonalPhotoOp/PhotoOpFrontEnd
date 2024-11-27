const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');

  // Initialize database schema
  // const sql = fs.readFileSync('CloudLensPhotographyApp.sql', 'utf8');
  // db.query(sql, (err, results) => {
  //   if (err) {
  //     console.error('Failed to initialize database schema: ' + err.stack);
  //     return;
  //   }
  //   console.log('Database schema initialized.');
  // });
});

module.exports = db;
