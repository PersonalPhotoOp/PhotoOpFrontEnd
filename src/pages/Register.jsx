import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "../cssFiles/Register.css"

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:5000/register', { username, password });

      if (response.status === 201) {
        toast.success('Registration successful!');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during registration.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            placeholder="Enter username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
