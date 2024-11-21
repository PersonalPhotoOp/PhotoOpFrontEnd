import React, {useState} from "react"
import axios from "axios"
import "../cssFiles/UploadForm.css"

const UploadForm = () => {
    const [file, setFile] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("photo", file)

        try {
            await axios.post("https://localhost:5173/upload", formData)
            alert("Photo uploaded successfully!")
        } catch (error) {
            alert("Error uploading photo")
        }
    }

    return (
        <form classNmae="upload-form" onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    )
}

export default UploadForm