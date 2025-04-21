import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) throw new Error('❌ MONGODB_URI не знайдено в змінних середовища');

let client = global._mongoClient;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, options);
  global._mongoClient = client;
  clientPromise = client.connect();
} else {
  clientPromise = client.connect();
}

export default clientPromise;
