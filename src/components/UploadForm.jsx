import React, { useState } from 'react';
import axios from 'axios';
import '../cssFiles/UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [collectionId, setCollectionId] = useState(''); // Track selected collection

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCollectionChange = (e) => {
    setCollectionId(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !collectionId) {
      alert('Please select a collection and file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('collectionId', collectionId);

    try {
      const response = await axios.post('http://localhost:5000/images/upload', formData);
      alert('Photo uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo.');
    }
  };

  return (
    <form className="upload-form" onSubmit={handleUpload}>
      <select value={collectionId} onChange={handleCollectionChange}>
        <option value="">Select Collection</option>
        <option value="1">Collection 1</option>
        <option value="2">Collection 2</option>
        {/* Replace with dynamic collection options */}
      </select>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
