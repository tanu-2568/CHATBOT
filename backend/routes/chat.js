const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// GET /api/chats?userId=...
router.get('/', async (req,res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const chats = await Chat.find(filter).sort({ createdAt: 1 }).limit(1000);
    res.json(chats);
  } catch(e){ res.status(500).json({error: e.message}); }
});

// POST /api/chats
router.post('/', async (req,res) => {
  try {
    const { userId, role, message, meta } = req.body;
    if(!message) return res.status(400).json({ error: 'message required' });
    const chat = await Chat.create({ userId, role, message, meta });
    res.status(201).json(chat);
  } catch(e){ res.status(500).json({error: e.message}); }
});

// DELETE /api/chats/:id
router.delete('/:id', async (req,res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch(e){ res.status(500).json({error: e.message}); }
});

module.exports = router;
