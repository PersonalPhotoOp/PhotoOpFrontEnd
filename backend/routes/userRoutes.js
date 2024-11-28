const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Register User
router.post('/register', async (req, res) => {
  console.log(req.body)
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

//Login route
router.post("/login", async(req, res)=>{
  console.log(req.body)
  const{username, password}=req.body;

  if(!username || !password){
    return res.status(404).json({msg: 'Please provide both username and password'})
  }

  User.findByUsername(username, async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result[0];
    // console.log(user)

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Authentication successful
    const token =await  jwt.sign(user, 'userToken')
    console.log(user.user_id)
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username }, token: token });
  });


//Get user route
router.post("/get-user", async(req, res)=>{
  const {token}=req.body
  // console.log(token)
  const verifyToken = jwt.verify(token, 'userToken')
  res.send(verifyToken)
  })

});

module.exports = router;
