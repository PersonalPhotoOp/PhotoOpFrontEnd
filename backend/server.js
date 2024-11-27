const express = require('express');
const db = require('./config/db');
const cors = require('cors')
const userRoutes= require('./routes/userRoutes');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())


// Use user routes
app.use('/api/users', userRoutes); // Set the base path for user routes

// Simple route
app.get('/', (req, res) => {
  res.send('Personal Photography Web Application Backend');
});

// app.post("/register", (req,res)=>{
//   console.log(req.body);
// })

// Start server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
