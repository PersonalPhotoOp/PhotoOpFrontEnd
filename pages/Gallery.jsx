import React, { useState, useEffect } from "react"
import PhotoGrid from "../components/PhotoGrid"
import axios from "axios"

const Gallery = () => {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const fetchPhotos = async () => {
            const response = await axios.get("https://localhost:5173/photos")
            setPhotos(response.data)
        }

        fetchPhotos()
    }, [])

    return (
        <div>
            <hi>Photo Gallery</hi>
            <PhotoGrid photos={photos} />
        </div>
    )
}

export default Gallery