const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, default: 'Addis Ababa' },
    deadline: { type: Date, required: true },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vacancy', vacancySchema);
