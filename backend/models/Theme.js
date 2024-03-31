const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add other fields as needed
}, { timestamps: true });

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
