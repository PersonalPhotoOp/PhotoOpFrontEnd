import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Gallery from "./pages/Gallery"
import PhotoDetails from "./pages/PhotoDetails"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/photo/:id" element={<PhotoDetails />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  )
}

export default App
