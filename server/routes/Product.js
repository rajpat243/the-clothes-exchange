//refactor later

import express from 'express';
import { ObjectId } from 'mongodb';
const productRouter = new express.Router();
import { getProductCollection } from '../hooks/useCollection.js';


/*
Method: GET
urlEndpoint: /api/product
returns: an array of objects (to map), objects should contain id, title, price, description *favoriting (False by default)
*/
productRouter.get('/api/product', async (req, res) => {
    try {
        const productCollection = await getProductCollection();
        const products = await productCollection.find({ }).toArray();
        
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting product failed!");
    }
});

/*

Method: GET (Product)
urlEndpoint: /api/product/user/:userid
returns: an array of objects with id, price, title, description, *favoriting

*/

productRouter.get('/api/product/user/:userid', async (req, res) => {
    const userId = req.params.userid;

    try {
        const productCollection = await getProductCollection();
        const product = await productCollection.find({ userId: ObjectId.createFromHexString(userId) }).toArray();

        // if (product.length === 0) {
        //     return res.status(404).send("Product not found!");
        // }
        res.send(product);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting product failed!");
    }
});

/*
Method: GET
urlEndpoint: /api/product/:page/:limit
returns: an array of objects (to map), objects should contain id, title, price, *favoriting (False by default)
- Create functionalities for queries:
    - Categories
    - *Price
*/

productRouter.get('/api/product/:page/:limit', async (req, res) => {
    try {
        let { page, limit } = req.params;
        const { categories } = req.query;
        limit = +limit;

        const match = {};

        if (categories) {
            const categoryArray = categories.split(',');
            match.category = { $in: categoryArray };
        }

        const productCollection = await getProductCollection();
        const products = await productCollection.find(match).skip((page - 1) * limit).limit(limit).toArray();
        
        res.json(products);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting product failed!");
    }
});

/*

Method: GET (Product)
urlEndpoint: /api/product/:id
returns: an object with id, price, title, description, *favoriting

*/

productRouter.get('/api/product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const productCollection = await getProductCollection();
        const product = await productCollection.find({ _id: ObjectId.createFromHexString(productId) }).toArray();

        if (product.length === 0) {
            return res.status(404).send("Product not found!");
        }
        res.json(product);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Getting product failed!");
    }
});

/*

Method: POST
urlEndpoint: /api/product
inputBody: Price, title, category, description
authBody: userId
returns: Product object (id, price, title, description)

*/
productRouter.post('/api/product', async (req, res) => {
    try {
        const { price, title, category, description, userId } = req.body;

        const productCollection = await getProductCollection()
        const product = await productCollection.insertOne({
            price,
            title,
            category,
            description,
            userId: ObjectId.createFromHexString(userId)
        })
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err)
    }
})
/*

Method: PATCH
urlEndpoint: /api/product/:id
allowed-inputBody: Price, title, category, description, *favoriting
returns: Product object (id, price, title, description, *favoriting) 

*/

productRouter.patch('/api/product/:id', async (req, res) => {
    const productId = req.params.id;

    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'category', 'price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const productCollection = await getProductCollection();

        const updateData = {};
        updates.forEach((update) => {
            updateData[update] = req.body[update];
        });

        const product = await productCollection.updateOne({ _id: ObjectId.createFromHexString(productId) }, { $set: updateData });
        
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err)
    }
})

/*

Method: DELETE
urlEndpoint: /api/product/:id
returns: Product object 
*(set the bool deleted to false, for receipts)

*/

productRouter.delete('/api/product/:id', async(req, res) => {
    const productId = req.params.id;

    try {
        const productCollection = await getProductCollection();

        const product = await productCollection.deleteOne({ _id: ObjectId.createFromHexString(productId) });
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send(err)
    }
})

export default productRouter;