import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from "./axiosconfig"; 

import Navbar from './components/Navbar';
import SeasonSelector from './components/Season';
import RouteCard from './components/Route';
import Login from './components/Login';
import AdminPanel from './components/Admin';
import socket from './socket';
import bgImage from './assets/bg.png';

function StudentView({ season, setSeason, routes }) {
  return (
    <>
      <SeasonSelector season={season} setSeason={setSeason} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {routes.map((route) => (
          <RouteCard key={route._id} route={route} season={season} />
        ))}
      </div>
    </>
  );
}

function App() {
  const [season, setSeason] = useState('regular');
  const [routes, setRoutes] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAdminLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/routes?season=${season}`)
      .then((res) => setRoutes(res.data))
      .catch((err) => console.error('Error fetching routes:', err));

    socket.on('newRoute', (newRoute) => {
      if (newRoute && newRoute.name && newRoute.stops) {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
      }
    });

    return () => {
      socket.off('newRoute');
    };
  }, [season]);

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{
  backgroundImage: `
    linear-gradient(to bottom right, #99c3ea, #3b82f6),
    url(${bgImage})
  `,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundBlendMode: 'screen',
}}
    >
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={<StudentView season={season} setSeason={setSeason} routes={routes} />}
          />
          <Route
            path="/admin/login"
            element={<Login setAdminLoggedIn={setAdminLoggedIn} />}
          />
          <Route
            path="/admin"
            element={
              adminLoggedIn ? (
                <AdminPanel setAdminLoggedIn={setAdminLoggedIn} />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
