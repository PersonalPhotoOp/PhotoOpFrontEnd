const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'collections',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Upload an image to a collection
router.post('/images/upload', upload.single('image'), (req, res) => {
  const { collectionId, title, description } = req.body;

  if (!req.file || !collectionId) {
    return res.status(400).json({ message: 'Image and collection ID are required' });
  }

  const cloudinaryUrl = req.file.path;

  Image.create(collectionId, cloudinaryUrl, title || '', description || '', (err, result) => {
    if (err) {
      if (err.message === 'Collection ID does not exist') {
        return res.status(404).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Error saving image to database', error: err });
    }
    res.status(201).json({ message: 'Image uploaded successfully', imageId: result.insertId });
  });
});

module.exports = router;
