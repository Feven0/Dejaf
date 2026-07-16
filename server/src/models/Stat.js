const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '+' },
    icon: { type: String, default: 'academic-cap' },
    color: { type: String, enum: ['gold', 'leaf', 'accent', 'primary'], default: 'gold' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stat', statSchema);
