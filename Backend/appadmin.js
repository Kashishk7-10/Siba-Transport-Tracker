const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const existing = await User.findOne({ email: 'admin@siba.edu.pk' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('ibaTransport123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@siba.edu.pk',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin created: admin@siba.edu.pk | password: ibaTransport123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
