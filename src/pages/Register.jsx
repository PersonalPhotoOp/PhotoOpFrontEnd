import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!username || !password) {
      return toast.error('All fields are required');
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords don't match");
    }

    try {
      // Replace with your backend URL
      const response = await axios.post("http://localhost:5000/api/users/register", { 
        username, 
        password 
      });

      if (response.status === 201) {
        toast.success("Registration successful!");
        // Reset form after successful registration
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        navigate("/api/users/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle specific backend errors if available
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast notification container */}
      <div className='header-div'>
        <h2>Register</h2>
      </div>
      <div className='form-div'>
        <form onSubmit={handleSubmit}>
          <label>Username </label>
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            type="email" 
            placeholder='Enter username' 
          />

          <label>Password </label>
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            placeholder='Enter password' 
          />

          <label>Confirm Password </label>
          <input 
            value={confirmPassword} 
            onChange={e => setConfirmPassword(e.target.value)} 
            type="password" 
            placeholder='Confirm password' 
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
