import React from 'react';
import { BusFront } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    

    <header className="bg-blue-800 text-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <BusFront className="h-8 w-8" />
        <h1 className="text-2xl font-bold">IBA Transport Tracker</h1>
      </div>
      <Link to="/admin/login" className="text-sm underline hover:text-gray-300">
        Admin Login
      </Link>
    </header>
  );
}