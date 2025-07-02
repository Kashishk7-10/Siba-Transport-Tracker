import React from 'react';
export default function RouteCard({ route, season }) {
  return (
    <div className="bg-white shadow rounded p-4 hover:shadow-md transition">
      <h2 className="text-lg font-bold text-blue-700">Route: {route.name}</h2>
      <ul className="mt-2 text-sm list-disc pl-5">
        {route.stops.map((stop, index) => (
          <li key={index}>
            {stop.stopName} - {stop.arrival} {stop.departure || ''}
          </li>
        ))}
      </ul>
      <div className="text-xs mt-2 text-gray-500">
        Season: {season.toUpperCase()}
      </div>
    </div>
  );
}
