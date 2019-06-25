import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

import {sequelize} from '../src/sequelize';
sequelize.models;

import router from './routes/index';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api', router);

// async () => {
//     await sequelize.sync({force: true})
//         .then(() => {console.log("Database running...")});   
// }

app.listen(port, () => console.log(`Server started on port ${port}...`));