const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, required: true },
  admins: { type: Array, default: [] },
  members: { type: Array, default: [] },
  categories: { type: Array, default: [] },
  notes: { type: Array, default: [] },

}, { timestamps: true });

module.exports = mongoose.model('Groups', groupSchema);
