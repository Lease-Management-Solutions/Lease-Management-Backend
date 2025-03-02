import express from 'express'
import helmet from 'helmet';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import mainRouter from './routes/main.router';
import {mongoConnect} from './database/connectMongo';
import { errorHandler, notFoundRequest } from './routes/errorHandler.router';
import {initializeAdminUser} from './database/initializeAdminUser'

dotenv.config();
mongoConnect();

const server = express();                                       // instance of a server
const swaggerDocument = YAML.load('./docs/swagger.yaml');       // loads the swagger file

server.use(helmet());                                           // adding helmet for server protection
server.use(cors());
server.use(express.json());                                     // configures the response header to be json 
server.use(express.urlencoded({extended: true}));               // extends express functions, we can get data for any type of request
                                                                
server.use(express.static(path.join(__dirname, '../public')));  // configures the contents of the public folder as static

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

server.use('/', mainRouter);                                    // accesses the main route 
server.use(notFoundRequest);                                    // route for not found
server.use(errorHandler);                                       // route for api request errors

  
initializeAdminUser();                                          // create user admin as SuperUsuario 

const PORT_SERVER = process.env.PORT
server.listen (PORT_SERVER || 2000, () => {                     // starts the server on port 3000
    console.log(`Servidor rodando em localhost:${PORT_SERVER}/`);
});