import React, { useState, useEffect } from "react"
import PhotoGrid from "../components/PhotoGrid"
import axios from "axios"

const Home = () => {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const fetchPhotos = async () => {
            // const response = await axios.get("https://localhost:5173/photos")
            const response = await axios.get("https://jsonplaceholder.typicode.com/photos")
            setPhotos(response.data)
            console.log(photos)
        }

        fetchPhotos()
    }, [])
    console.log('home');

    return (
        <div>
            <h1>Photo Gallery</h1>
            <PhotoGrid photos={photos} />
        </div>
    )
}

export default Home