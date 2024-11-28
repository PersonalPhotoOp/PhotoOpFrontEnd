import React from "react";
import '../cssFiles/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <div className="mid-menu">
      <Link to="/home" style={{ marginRight: "20px", color: "white" }}>Home</Link>
      <Link to="/collections" style={{ marginRight: "20px", color: "white" }}>Collections</Link>
      <Link to="/Upload" style={{ marginRight: "20px", color: "white" }}>Upload</Link>
      </div>
      <div className="right-menu">
      <Link to="/Profile" style={{ marginRight: "20px", color: "white" }}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;