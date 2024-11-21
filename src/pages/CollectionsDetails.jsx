import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoGrid from "../components/PhotoGrid";

const CollectionDetails = () => {
  const { id } = useParams(); // Get collection ID (album ID) from the URL
  const [collection, setCollection] = useState(null); // Stores collection info
  const [photos, setPhotos] = useState([]); // Stores all photos for the collection
  const [visiblePhotos, setVisiblePhotos] = useState([]); // Controls the number of photos displayed
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [hasMore, setHasMore] = useState(true); // Indicates if more photos can be displayed

  const ALBUMS_API_URL = "https://jsonplaceholder.typicode.com/albums";
  const PHOTOS_API_URL = "https://jsonplaceholder.typicode.com/photos";

  const PHOTOS_INCREMENT = 10; // Number of photos to show per "Load More"

  // Fetch collection details based on the `id`
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await fetch(`${ALBUMS_API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch collection");
        const data = await response.json();
        setCollection(data);
      } catch (error) {
        console.error("Error fetching collection details:", error);
        setCollection(null); // Collection not found
      }
    };

    fetchCollection();
  }, [id]);

  // Fetch all photos for the specific album (collection)
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${PHOTOS_API_URL}?albumId=${id}`);
        if (!response.ok) throw new Error("Failed to fetch photos");
        const data = await response.json();
        setPhotos(data);
        setVisiblePhotos(data.slice(0, PHOTOS_INCREMENT)); // Show initial batch
        setHasMore(data.length > PHOTOS_INCREMENT); // Determine if more photos are available
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
      setLoading(false);
    };

    if (collection) {
      fetchPhotos();
    }
  }, [id, collection]);

  // Show more photos when "Load More" button is clicked
  const loadMorePhotos = () => {
    const nextBatch = visiblePhotos.length + PHOTOS_INCREMENT;
    setVisiblePhotos(photos.slice(0, nextBatch)); // Append the next batch of photos
    setHasMore(nextBatch < photos.length); // Check if more photos remain
  };

  if (!collection) {
    return <p>Collection not found.</p>;
  }

  return (
    <div>
      <h1>{collection.title}</h1> {/* Display collection name */}
      <PhotoGrid photos={visiblePhotos} /> {/* Render the visible photos */}

      {loading && <p>Loading photos...</p>}
      {!hasMore && !loading && <p>No more photos to display.</p>}

      {!loading && hasMore && (
        <button onClick={loadMorePhotos} style={{ marginTop: "20px" }}>
          Load More Photos
        </button>
      )}
    </div>
  );
};

export default CollectionDetails;
