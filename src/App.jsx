import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PhotoDetails from "./pages/PhotoDetails"
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar"
import Collections from "./pages/Collections"
import CollectionsDetails from "./pages/CollectionsDetails"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {

  return (
    <div className="app-body">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/photo/:id" element={<PhotoDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionsDetails />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
