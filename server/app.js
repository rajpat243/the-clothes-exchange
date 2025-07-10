
//RESTful API's
//refernce individual endpoints to 
//need to install dependencies: mongoClient, .env, 

import express from 'express';
import cors from 'cors';

//Import Routes
import productRouter from './routes/Product.js';

const app = express();
app.use(cors());
const PORT = 3002;

app.use(express.json());

//Configuring Routes
app.use(productRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});