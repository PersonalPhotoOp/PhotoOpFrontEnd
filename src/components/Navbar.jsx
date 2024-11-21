import React from "react";
import '../cssFiles/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link to="/" style={{ marginRight: "20px", color: "white" }}>Home</Link>
      <Link to="/collections" style={{ marginRight: "20px", color: "white" }}>Collections</Link>
      <Link to="/Upload" style={{ marginRight: "20px", color: "white" }}>Upload</Link>
    </nav>
  );
};

export default Navbar;