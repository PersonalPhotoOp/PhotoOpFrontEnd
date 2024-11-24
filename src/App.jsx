import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PhotoDetails from "./pages/PhotoDetails"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import Collections from "./pages/Collections"
import CollectionsDetails from "./pages/CollectionsDetails"

function App() {

  return (
    <div className="app-body">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionsDetails />} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
