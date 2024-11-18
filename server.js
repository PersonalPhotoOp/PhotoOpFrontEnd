const express = require('express');
const db = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Personal Photography Web Application Backend');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
