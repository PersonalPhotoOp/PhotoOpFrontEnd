import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "../cssFiles/Login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('userToken', response.data.token);
        setUsername('');
        setPassword('');
        setTimeout(() => {
          navigate('/home');
        }, 800);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'An error occurred during login.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
