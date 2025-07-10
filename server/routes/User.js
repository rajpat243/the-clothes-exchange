/*

Method: POST
urlEndpoint: /api/user
inputBody: Name, Email, Password
returns: Name, Email, *token
    *Error Handling: Make sure all fields are filled in

Method: GET
urlEndpoint: /api/user/:id
returns: Name, Email
    *Authentication Check







*/

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
const userRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'clothing_store';
const collectionName = 'product';


const getCollection = async () => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return db.collection(collectionName);
};

userRouter.get('/api/product', async (req, res) => {
    try {
        const productCollection = await getCollection();
        const products = await productCollection.find({}).toArray();
        
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting product failed!");
    }
});

export default userRouter;