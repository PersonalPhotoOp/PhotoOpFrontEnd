const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');

// Create a new collection
router.post('/collections/create', (req, res) => {
  const { userId, collectionName } = req.body;

  if (!userId || !collectionName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  Collection.create(userId, collectionName, (err, result) => {
    if (err) {
      if (err.message === 'Collection with the same name already exists') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Error creating collection', error: err });
    }
    res.status(201).json({ message: 'Collection created successfully', collectionId: result.insertId });
  });
});

// Get all collections for a specific user
router.get('/collections', (req, res) => {
  const { userId } = req.query; // Assuming userId is passed as a query parameter

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  Collection.findByUserId(userId, (err, collections) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching collections', error: err });
    }

    res.status(200).json(collections);
  });
});

module.exports = router;
