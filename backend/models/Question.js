const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theme',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  // Add other fields as needed
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
