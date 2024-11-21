import React from "react"
import PhotoCard from "./PhotoCard"
import "../cssFiles/PhotoGrid.css"

const PhotoGrid = ({photos}) => {
    return (
        <div className="photo-grid">
            {photos.map((photo, index) => (
                <PhotoCard key={photo.id || index} photo={photo} />
            ))}
        </div>
    )
}

export default PhotoGrid