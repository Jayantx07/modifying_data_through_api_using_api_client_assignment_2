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

app.put('/menu/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request URL
    const updateData = req.body; // Get the updated data from request body

    // Find and update the item in the database
    const updatedItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item updated successfully', updatedItem });
  } catch (err) {
    res.status(500).json({ message: 'Error updating menu item', error: err.message });
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
