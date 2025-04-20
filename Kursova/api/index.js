const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Вказуємо правильний шлях до папки public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Підключення до MongoDB
mongoose.connect('mongodb+srv://LeksG:1234@museumsite.9iu4p9f.mongodb.net/', {
});

const Message = mongoose.model('Message', {
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// Відправка файлу golovna.htm
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'golovna.htm'));
});

// Обробка POST-запиту з форми
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

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер працює на http://localhost:3000');
});
