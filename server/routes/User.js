import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
const userRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'clothing_store';
const collectionName = 'user';


const getCollection = async () => {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return db.collection(collectionName);
};

/*

Method: POST
urlEndpoint: /api/user
inputBody: Name, Email, Password
returns: Name, Email, *token
    *Error Handling: Make sure all fields are filled in

*/

userRouter.post('/api/user', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name)

    try {
        const userCollection = await getCollection();
        const user = await userCollection.insertOne({ name, email, password });
        
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err)
    }
});

/*

Method: GET
urlEndpoint: /api/user/:id
returns: Name, Email
    *Authentication Check

*/

userRouter.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userCollection = await getCollection();
        const user = await userCollection.findOne({ _id: ObjectId.createFromHexString(userId) });
        
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err)
    }
});

export default userRouter;