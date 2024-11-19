import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link to="/Gallery" style={{ marginRight: "20px", color: "white" }}>Gallery</Link>
      <Link to="/Upload" style={{ marginRight: "20px", color: "white" }}>Upload</Link>
    </nav>
  );
};

export default Navbar;