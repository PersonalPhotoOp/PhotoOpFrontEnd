import React from "react"
import PhotoCard from "../components/PhotoCard"
import {useParams} from "react-router-dom"

const PhotoDetails = () => {
    const {id} = useParams()

    return (
        <div>
            <h2>Photo Details: {id}</h2>
            <PhotoCard/>
            {/* Fetch and display details based on ID */}
        </div>
    )
}

export default PhotoDetails