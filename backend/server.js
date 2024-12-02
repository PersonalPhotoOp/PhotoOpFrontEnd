const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Use modular routes with specific prefixes
app.use('/', userRoutes);
app.use('/images', imageRoutes);
app.use('/collections', collectionRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Personal Photography Web Application Backend');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
