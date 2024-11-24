import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './cssFiles/App.css';
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import Preferences from "./pages/Preferences";
import Login from "./pages/Login";
import CloudLens from "./pages/CloudLens";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Show Navbar only if the path is not "/" or "/login" */}
      {location.pathname !== "/" && location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<CloudLens />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;


 
