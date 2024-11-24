import React from "react";
import { Link } from "react-router-dom";
import "../cssFiles/CloudLens.css";

const CloudLens = () => {
  return (
    <div className="front-page">
      <header className="header">
        <h1>CloudLens</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/preferences" className="nav-link">Preferences</Link>
          <Link to="/gallery" className="nav-link">Gallery</Link>
          <Link to="/upload" className="nav-link">Upload</Link>
        </nav>
      </header>
      <main className="hero-section">
        <h2>Your Photography Portfolio in the Cloud</h2>
        <p>
          Organize, upload, and showcase your personal photography collection with ease. 
          CloudLens offers seamless management and a visually stunning interface for 
          your photos.
        </p>
        <Link to="/login" className="cta-button">Get Started</Link>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CloudLens. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CloudLens;
