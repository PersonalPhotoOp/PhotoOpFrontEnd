import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">CloudLens</h1>
        <h3 className="text-4xl">Store & Showcase Your Best Shots</h3>

        {/* Navigation Links */}
        <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
          <Link to="/" style={{ marginRight: "20px", color: "white" }}>Home</Link>
          <Link to="/Gallery" style={{ marginRight: "20px", color: "white" }}>Gallery</Link>
          <Link to="/Upload" style={{ marginRight: "20px", color: "white" }}>Upload</Link>
          <Link to="/Preferences" style={{ marginRight: "20px", color: "white" }}>Preferences</Link>
          <Link to="/Login" style={{ marginRight: "20px", color: "white" }}>Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;