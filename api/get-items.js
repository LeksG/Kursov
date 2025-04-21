// api/get-items.js
import clientPromise from './_lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const client = await clientPromise;
    const db = client.db('mydb');               // <— назва твоєї БД
    const items = await db.collection('items').find({}).toArray();
    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch items' });
  }
}
