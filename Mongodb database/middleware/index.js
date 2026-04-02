const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ Connection failed:', err.message));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.listen(5000, () => console.log('Server running on port 5000'));