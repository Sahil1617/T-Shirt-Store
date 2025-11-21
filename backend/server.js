const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import database connection
const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://t-shirt-store-tau.vercel.app',  // Add your actual frontend URL
    '*'
  ],
  credentials: true
}));

app.use(express.json({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', require('./routes/userProfile'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/auth', require('./routes/adminAuth')); 
app.use('/api/admin', require('./routes/admin')); 
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Error handling middleware
app.use(require('./middleware/errorHandler'));

// ❗ DO NOT LISTEN — Serverless function will handle the request
module.exports = app;