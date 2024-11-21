import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PhotoDetails from "./pages/PhotoDetails"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import Collections from "./pages/Collections"
import CollectionsDetails from "./pages/CollectionsDetails"

function App() {

  return (
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
  )
}

export default App
