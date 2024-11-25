const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  User.create(username, hashedPassword, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

module.exports = router;
