import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null); // For handling errors during fetch

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/albums");
        if (!response.ok) {
          throw new Error("Error fetching collections");
        }
        const data = await response.json();
        // Update state with fetched collections
        setCollections(
          data.map((album) => ({
            id: album.id,
            name: album.title, // Using title from API as the collection name
            description: `Collection ID: ${album.id}`, // Placeholder description
          }))
        );
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCollections();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Collections</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {collections.map((collection) => (
          <li key={collection.id} style={{ marginBottom: "40px" }}>
            <Link to={`/collections/${collection.id}`} style={{ textDecoration: "none" }}>
              <h2>{collection.name}</h2>
              <p>{collection.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
