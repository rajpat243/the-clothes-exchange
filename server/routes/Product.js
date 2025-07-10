/*


Method: GET
urlEndpoint: /api/product
returns: an array of objects (to map), objects should contain id, title, price, *favoriting (False by default)
- Create functionalities for queries:
    - Categories
    - *Price

Ex: 
    router.get('/api/tasks', auth, async (req,res) => {
    const match = {}
    const sort = {}
 
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.weeklyTasks) {
        match.createdAt = {
            $gte: moment().subtract(7, 'days').toDate(),
            $lt: moment().toDate()
        }
    }
 
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
 
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit) || null,
                skip: parseInt(req.query.skip) || null,
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }  
})


Method: GET (Product)
urlEndpoint: /api/product/:id
returns: an object with id, price, title, description, *favoriting


Method: POST
urlEndpoint: /api/product
inputBody: Price, title, category, description
returns: Product object (id, price, title, description)


Method: UPDATE
urlEndpoint: /api/product/:id
allowed-inputBody: Price, title, category, description, *favoriting
returns: Product object (id, price, title, description, *favoriting) 


Method: DELETE
urlEndpoint: /api/product/:id
returns: Product object 
*(set the bool deleted to false, for receipts)



*/

//refactor later


import express from 'express';
//import { MongoClient } from 'mongodb';
const productRouter = new express.Router()
const url = 'mongodb://localhost:27017';
const dbName = 'tce';
 
productRouter.get('/api/product', async (req, res) => {
    try {
        /*
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection('characters');
        const characters = await collection.find({}).toArray();
        res.json(characters);

        */
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting characters failed! ☹");
    }
});

export default charactersRouter;