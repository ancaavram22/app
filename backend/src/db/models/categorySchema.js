const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  notes: { type: Array, default: [] },

}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
