import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosconfig";  


export default function Login({ setAdminLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', { email, password });

      if (res.data.token) {
        alert('Login successful');

        
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('adminName', res.data.user.name);
        localStorage.setItem('adminEmail', res.data.user.email);

        setAdminLoggedIn(true);
        navigate('/admin');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 shadow rounded mt-8">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded w-full mb-2"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>
  );
}
