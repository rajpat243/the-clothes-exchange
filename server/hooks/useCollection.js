import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const dbName = 'clothing_store';

const connectToClient = async () => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return db
}

export const getUserCollection = async () => {
    const collectionName = 'user';
    const db = await connectToClient();
    return db.collection(collectionName);
}

export const getProductCollection = async () => {
    const collectionName = 'product';
    const db = await connectToClient();
    return db.collection(collectionName);
}