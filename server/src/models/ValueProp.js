const mongoose = require('mongoose');

const valuePropSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: '' },
    color: { type: String, enum: ['gold', 'leaf', 'accent', 'primary'], default: 'gold' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ValueProp', valuePropSchema);
