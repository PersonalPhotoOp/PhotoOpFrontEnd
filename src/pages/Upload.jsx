import React, { useState } from "react"
import axios from "axios"
import "../cssFiles/Upload.css"

const Upload = () => {
  const [file, setFile] = useState(null) // For the selected file
  const [title, setTitle] = useState("") // Optional title
  const [description, setDescription] = useState("") // Optional description
  const [uploadStatus, setUploadStatus] = useState("") // To show success/error message

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update file state when user selects a file
  }

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setUploadStatus("Please select a file to upload.")
      return
    }

    const formData = new FormData()
    formData.append("photo", file)
    formData.append("title", title)
    formData.append("description", description)

    try {
      // Replace with backend API endpoint
      const response = await axios.post("http://localhost:5000/images/upload", formData)
      setUploadStatus("Photo uploaded successfully!")
      setFile(null)
      setTitle("")
      setDescription("")
      console.log("Server response:", response.data)
    } catch (error) {
      console.error("Error uploading photo:", error)
      setUploadStatus("Error uploading photo. Please try again.")
    }
  }

  return (
    <div className="upload-page">
      <h1>Upload Your Photo</h1>
      <form className="upload-form" onSubmit={handleUpload}>
        <div className="form-group">
          <label htmlFor="photo">Choose a photo:</label>
          <input
            type="file"
            id="photo"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Photo Title (Optional):</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your photo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Photo Description (Optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description of the photo"
          />
        </div>

        <button type="submit" className="upload-button">
          Upload Photo
        </button>
      </form>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  )
}

export default Upload
