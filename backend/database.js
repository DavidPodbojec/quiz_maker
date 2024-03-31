const mongoose = require('mongoose');

// Load environment variables from .env file
require('dotenv').config();

// MongoDB Atlas connection string from environment variables
const uri = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(error => console.error('Error connecting to MongoDB Atlas:', error));

// Export the Mongoose connection
module.exports = mongoose.connection;
