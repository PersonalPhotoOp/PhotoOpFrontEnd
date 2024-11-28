import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PhotoGrid from "../components/PhotoGrid"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Home = () => {
    const [photos, setPhotos] = useState([])
    const [userData, setUserData]= useState(null)
    const navigate = useNavigate();
    

    

    useEffect(() => {
        const fetchPhotos = async () => {
            // const response = await axios.get("https://localhost:5173/photos")
            const response = await axios.get("https://jsonplaceholder.typicode.com/photos")
            setPhotos(response.data)
            
        }

        const checkUser = async () => {
            const token = localStorage.getItem('userToken');
            if (!token) {
              navigate("/login");
            } else {
              try {
                await axios.post("http://localhost:5000/get-user", { token }).
                then(res=>{
                    setUserData(res.data)
                })
                toast.success('User is logged in');
              } catch (error) {
                console.error(error);
                toast.error('Failed to verify user');
              }
            }
          };
          
    

        checkUser()
        fetchPhotos()
    }, [navigate])
    

    return (
        <div>
            <ToastContainer />
            <h1>Photo Gallery</h1>
            <PhotoGrid photos={photos}/>
        </div>
    )
}

export default Home