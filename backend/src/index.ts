import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

import {sequelize} from '../src/sequelize';
sequelize.models;

import userRoutes from './routes/user';
import authRoutes from './routes/auth';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Express works...')
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// async () => {
//     await sequelize.sync({force: true})
//         .then(() => {console.log("Database running...")});   
// }

app.listen(port, () => console.log(`Server started on port ${port}...`));