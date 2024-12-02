import React, { useState } from 'react';
import { createCollection } from '../api/collection';
import UploadForm from "./UploadForm"

const CreateCollection = ({ userId }) => {
  const [collectionName, setCollectionName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [collectionId, setCollectionId] = useState(null);

  const handleCreateCollection = async () => {
    if (!collectionName) {
      return alert('Collection name is required');
    }

    try {
      const response = await createCollection(userId, collectionName);
      setCollectionId(response.data.collectionId);
      alert('Collection created successfully');
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage || !collectionId) {
      return alert('Please select an image and create a collection first');
    }

    try {
      await uploadImage(collectionId, selectedImage);
      alert('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="create-collection">
      <h3>Create Collection</h3>
      <input
        type="text"
        placeholder="Collection Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <button onClick={handleCreateCollection}>Create</button>

      {collectionId && (
        <div className="upload-section">
          <h4>Upload an Image</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <button onClick={handleUploadImage}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default CreateCollection;
