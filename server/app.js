
//RESTful API's
//refernce individual endpoints to 
//need to install dependencies: mongoClient, .env, 

import express from 'express';
import cors from 'cors';
 
//Import Routes
import charactersRouter from './routers/characters.js';
import filmsRouter from './routers/films.js';
import planetsRouter from './routers/planets.js';
 
const app = express();
app.use(cors());
const PORT = 3001;
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
 
app.use(express.json());
 
//Configuring Routes
app.use(charactersRouter);
app.use(filmsRouter);
app.use(planetsRouter);
 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});