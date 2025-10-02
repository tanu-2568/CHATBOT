const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  role: { type: String, enum: ['user','assistant','system'], default: 'user' },
  message: { type: String, required: true },
  meta: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
