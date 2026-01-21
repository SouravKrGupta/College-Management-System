const express = require('express');

const router = express.Router();

const { chatWithAI } = require('../controllers/chatbot.controller');
const auth = require('../middlewares/auth.middleware');

// Route for chatbot interaction
router.post('/chat', auth, chatWithAI);

module.exports = router;