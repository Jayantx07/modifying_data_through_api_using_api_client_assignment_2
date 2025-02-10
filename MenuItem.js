const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Dummy data
const dummyMenuItems = [
  { name: 'Burger', description: 'Juicy grilled beef patty with cheese', price: 5.99 },
  { name: 'Pasta', description: 'Creamy Alfredo sauce with chicken', price: 8.99 },
  { name: 'Salad', description: 'Fresh greens with vinaigrette dressing', price: 4.99 }
];

MenuItem.insertMany(dummyMenuItems)
  .then(() => console.log('Data fetched successfully!'))
  .catch(err => console.error('Error inserting dummy data:', err));

module.exports = MenuItem;
