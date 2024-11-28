import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../cssFiles/Profile2.css"

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.post("http://localhost:5000/get-user", { token });
          setUserData(response.data); // Set user data from the backend
          toast.success("User information loaded!");
        } catch (error) {
          console.error("Failed to fetch user information:", error);
          toast.error("Failed to verify user. Please log in again.");
          navigate("/login");
        }
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove the token
    toast.info("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-box">
        <h1>User Profile</h1>
        {userData ? (
          <div>
            <p>
              <strong>User ID:</strong> {userData.user_id}
            </p>
            <p>
              <strong>Email:</strong> {userData.username}
            </p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
