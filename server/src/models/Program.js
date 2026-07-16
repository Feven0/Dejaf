const mongoose = require('mongoose');

const CATEGORIES = [
  'Leadership',
  'Banking, Insurance & Microfinance',
  'HR Management',
  'Marketing & Customer Service',
  'Tech & Innovation',
];

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    description: { type: String, required: true },
    duration: { type: String, default: '' },
    format: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

programSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model('Program', programSchema);
