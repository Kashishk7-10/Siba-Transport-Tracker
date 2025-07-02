
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Route = require('../models/routeModel');
const Shift = require('../models/shiftModel');
const Bus = require('../models/busModel');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Route.deleteMany();
    await Shift.deleteMany();
    await Bus.deleteMany();

    const routes = [
      {
        name: 'Rohri',
        stops: [
          { stopName: 'Rohri', arrival: '07:50 AM', departure: '08:00 AM' },
          { stopName: 'Navy Park', arrival: '08:05 AM' },
          { stopName: 'Old Sukkur', arrival: '08:10 AM' },
          { stopName: 'Shalimar', arrival: '08:11 AM' },
          { stopName: 'Local Board', arrival: '08:12 AM' },
          { stopName: 'Dolphin', arrival: '08:13 AM' },
          { stopName: 'Ayub Gate', arrival: '08:15 AM' },
          { stopName: 'Gurdwara Chowk', arrival: '08:17 AM' },
          { stopName: 'Police Line', arrival: '08:18 AM' },
          { stopName: 'Officer Club', arrival: '08:19 AM' },
        ],
      },
      {
        name: 'Qasim Park',
        stops: [
          { stopName: 'Qasim Park', arrival: '08:00 AM', departure: '08:10 AM' },
          { stopName: 'Dua Chowk', arrival: '08:11 AM' },
          { stopName: 'Emmys Pizza', arrival: '08:12 AM' },
          { stopName: 'Allah Wali Masjid', arrival: '08:13 AM' },
          { stopName: 'Bhutta Road', arrival: '08:14 AM' },
          { stopName: 'Lanch Mor', arrival: '08:15 AM' },
          { stopName: 'Hira Hospital', arrival: '08:16 AM' },
          { stopName: 'Hockey Ground', arrival: '08:17 AM' },
          { stopName: 'High Court', arrival: '08:18 AM' },
          { stopName: 'Benazir Park', arrival: '08:19 AM' },
          { stopName: 'Military Road', arrival: '08:20 AM' },
        ],
      },
      {
        name: 'City Point',
        stops: [
          { stopName: 'City Point', arrival: '08:10 AM', departure: '08:20 AM' },
          { stopName: 'NICVD Hospital', arrival: '08:22 AM' },
          { stopName: 'Township', arrival: '08:23 AM' },
        ],
      },
    ];

    const shifts = [
      { season: 'regular', shift: '1st', routeName: 'Rohri', pickTime: '08:00 AM', dropTime: '02:00 PM', assignedBus: 'A' },
      { season: 'regular', shift: '1st', routeName: 'Qasim Park', pickTime: '08:10 AM', dropTime: '02:00 PM', assignedBus: 'B' },
      { season: 'regular', shift: '1st', routeName: 'City Point', pickTime: '08:20 AM', dropTime: '02:00 PM', assignedBus: 'C' },
      { season: 'summer', shift: '1st', routeName: 'Rohri', pickTime: '08:00 AM', dropTime: '02:15 PM', assignedBus: 'D' },
      { season: 'summer', shift: '1st', routeName: 'Qasim Park', pickTime: '08:10 AM', dropTime: '02:15 PM', assignedBus: 'E' },
      { season: 'summer', shift: '1st', routeName: 'City Point', pickTime: '08:20 AM', dropTime: '02:15 PM', assignedBus: 'F' },
      { season: 'exam', shift: '1st', routeName: 'Rohri', pickTime: '08:00 AM', dropTime: '12:50 PM', assignedBus: 'G' },
      { season: 'exam', shift: '1st', routeName: 'Qasim Park', pickTime: '08:10 AM', dropTime: '12:50 PM', assignedBus: 'H' },
      { season: 'exam', shift: '1st', routeName: 'City Point', pickTime: '08:20 AM', dropTime: '12:50 PM', assignedBus: 'I' },
    ];

    const buses = Array.from({ length: 11 }, (_, i) => ({
      label: String.fromCharCode(65 + i),
      status: 'On Route',
      currentLocation: { lat: 0, lng: 0 },
    }));

    await Route.insertMany(routes);
    await Shift.insertMany(shifts);
    await Bus.insertMany(buses);

    console.log(' Seed data inserted successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB().then(importData);
