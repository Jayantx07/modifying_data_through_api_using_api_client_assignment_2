require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MenuItem = require('./MenuItem'); // Adjust path as necessary

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// MongoDB Atlas Connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', error: err });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
