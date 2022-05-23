const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notes', noteSchema);
