// api/_lib/mongodb.js
import { MongoClient } from 'mongodb';

if (!global._mongoClientPromise) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  global._mongoClientPromise = client.connect();
}
export default global._mongoClientPromise;
