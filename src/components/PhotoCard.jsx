import React from "react"
import "../cssFiles/PhotoCard.css"

const PhotoCard = ({photo}) => {
    return (
        <div className="photo-grid">
            <img src={photo.url} alt={photo.title} className="photo-img" />
            <p>{photo.title}</p>
        </div>
    )
}

export default PhotoCard