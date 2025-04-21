// api/add-item.js
import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).json({ error: 'Missing name or value' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('museum');
    const result = await db.collection('items').insertOne({ name, value });
    return res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to insert item' });
  }
}
