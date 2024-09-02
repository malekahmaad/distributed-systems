const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  thumb: { type: String, required: true },
  description: { type: String, required: true }
});

const memberSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  role: { type: String, required: true }
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true, minlength: 20, maxlength: 80 },
  start_date: { type: Date, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  team: [memberSchema],
  images: [imageSchema]
});

module.exports = mongoose.model('Project', projectSchema);
