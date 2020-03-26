import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import { passportHandler } from './passport';

import { sequelize } from './sequelize';
sequelize.models;

import router from './routes/index';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '5000', 10);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passportHandler);

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}.` ));