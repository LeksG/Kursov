const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb+srv://LeksG:1234@museumsite.9iu4p9f.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Message = mongoose.model('Message', {
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// POST-запит із форми
app.post('/api/messages', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = serverless(app);
