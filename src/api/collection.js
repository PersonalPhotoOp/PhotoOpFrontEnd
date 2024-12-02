import axios from 'axios';

export const createCollection = async (userId, collectionName) => {
  return await axios.post('/collections/create', { userId, collectionName });
};

export const uploadImage = async (collectionId, image) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('collectionId', collectionId);

  return await axios.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
