import React, { useState } from 'react';
import axios from '../axiosconfig';

export default function AdminPanel({ setAdminLoggedIn }) {
  const [routeName, setRouteName] = useState('');
  const [stops, setStops] = useState([{ stopName: '', arrival: '', departure: '' }]);
  const [busLocation, setBusLocation] = useState({ label: '', lat: '', lng: '' });

  const handleAddStop = () => {
    setStops([...stops, { stopName: '', arrival: '', departure: '' }]);
  };

  const handleStopChange = (index, field, value) => {
    const newStops = [...stops];
    newStops[index][field] = value;
    setStops(newStops);
  };

  const submitNewRoute = async () => {
    try {
      const res = await axios.post('/routes', {
        name: routeName,
        stops: stops.filter((s) => s.stopName),
      });
      alert('✅ Route added successfully');
      setRouteName('');
      setStops([{ stopName: '', arrival: '', departure: '' }]);
    } catch (err) {
      alert('❌ Failed to add route');
      console.error(err);
    }
  };

  const updateBusLocation = async () => {
    try {
      const { label, lat, lng } = busLocation;
      const res = await axios.post('/buses', {
        label,
        currentLocation: { lat: parseFloat(lat), lng: parseFloat(lng) },
        status: 'On Route',
      });
      alert('🛰️ Bus location updated');
    } catch (err) {
      alert('❌ Failed to update bus');
    }
  };

  return (
    <div className="relative min-h-screen p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">Admin Dashboard</h2>

      {/* ROUTE FORM */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add New Route</h3>
        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        {stops.map((stop, idx) => (
          <div key={idx} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Stop Name"
              value={stop.stopName}
              onChange={(e) => handleStopChange(idx, 'stopName', e.target.value)}
              className="border p-2 w-1/3 rounded"
            />
            <input
              type="text"
              placeholder="Arrival"
              value={stop.arrival}
              onChange={(e) => handleStopChange(idx, 'arrival', e.target.value)}
              className="border p-2 w-1/3 rounded"
            />
            <input
              type="text"
              placeholder="Departure"
              value={stop.departure}
              onChange={(e) => handleStopChange(idx, 'departure', e.target.value)}
              className="border p-2 w-1/3 rounded"
            />
          </div>
        ))}
        <button
          onClick={handleAddStop}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          + Add Stop
        </button>
        <button
          onClick={submitNewRoute}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Route
        </button>
      </div>

      {/* BUS LOCATION */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Update Bus Location</h3>
        <div className="flex space-x-4 mb-2">
          <input
            type="text"
            placeholder="Bus Label (e.g. A)"
            value={busLocation.label}
            onChange={(e) => setBusLocation({ ...busLocation, label: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Latitude"
            value={busLocation.lat}
            onChange={(e) => setBusLocation({ ...busLocation, lat: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={busLocation.lng}
            onChange={(e) => setBusLocation({ ...busLocation, lng: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={updateBusLocation}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Location
        </button>
      </div>

      {/* FIXED LOGOUT BUTTON */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            setAdminLoggedIn(false);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
