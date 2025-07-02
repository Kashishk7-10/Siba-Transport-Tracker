// ✅ TOP of the file
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// ✅ Load .env variables
dotenv.config();

// ✅ Initialize app FIRST
const app = express();

// ✅ Create HTTP server with app
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // ✅ Allow all for dev
  },
});

io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// ✅ Make io available in controllers
app.set('io', io);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Import routes
const routeRoutes = require('./routes/routeRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const busRoutes = require('./routes/busRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Use routes
app.use('/api/routes', routeRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ Start HTTP server (not app.listen)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
