import { MongoClient } from 'mongodb';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000, // максимум 5 сек очікування
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('museum');
    const messages = db.collection('messages');

    await messages.insertOne({ name, email, message, date: new Date() });

    return res.status(200).json({ message: 'Message saved!' });
  } catch (error) {
    console.error("MongoDB error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
}

