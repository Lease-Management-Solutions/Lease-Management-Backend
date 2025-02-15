import express from 'express'
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv'
import mainRouter from './routes/main.router'
import {mongoConnect} from './database/connectMongo'
import { errorHandler, notFoundRequest } from './routes/errorHandler.router';

dotenv.config();
mongoConnect();

const server = express();                                       // instance of a server

server.use(helmet());                                           // adding helmet for server protection
server.use(express.json());                                     // configures the response header to be json 
server.use(express.urlencoded({extended: true}));               // extends express functions, we can get data for any type of request
                                                                
server.use(express.static(path.join(__dirname, '../public')));  // configures the contents of the public folder as static

server.use('/', mainRouter);                                    // accesses the main route 
server.use(notFoundRequest);                                    // route for not found
server.use(errorHandler);                                       // route for api request errors


const PORT_SERVER = process.env.PORT
server.listen (PORT_SERVER || 3000, () => {                     // starts the server on port 3000
    console.log(`Servidor rodando em localhost:${PORT_SERVER}/`);
});