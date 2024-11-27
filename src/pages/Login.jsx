import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('All fields required');
      return; // Prevent further execution
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });

      if (response.status === 200) { // Check for a successful response
        toast.success('Logged in successfully');
        setUsername('');
        setPassword('');
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'An error occurred during login.';
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Ensure the ToastContainer is rendered */}
      <div className="header-div">
        <h2>Login</h2>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter username"
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
