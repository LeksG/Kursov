const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http'); // Додаємо

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect('mongodb+srv://LeksG:1234@museumsite.9iu4p9f.mongodb.net/', {
  dbName: 'museum', // опційно: вкажи назву БД
});

// Модель повідомлень
const Message = mongoose.model('Message', {
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
});

// Віддаємо головну сторінку
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'golovna.htm'));
});

// Приймаємо повідомлення з форми
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

// Експортуємо сервер як serverless function для Vercel
module.exports = app;
module.exports.handler = serverless(app);

