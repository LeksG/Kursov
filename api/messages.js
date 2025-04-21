import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не дозволений' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Заповніть усі поля форми' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('museum'); 
    const collection = db.collection('messages');

    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(200).json({ message: 'Повідомлення надіслано!' });
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ message: 'Помилка при збереженні повідомлення.' });
  }
}
