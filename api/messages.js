const { MongoClient } = require("mongodb");

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("museum");
    const collection = db.collection("messages");

    await collection.insertOne({ name, email, message, date: new Date() });

    return res.status(200).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
