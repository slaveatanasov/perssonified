import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

import { passportHandler } from './passport';

import { sequelize } from './sequelize';
sequelize.models;

import router from './routes/index';

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passportHandler);

app.use('/api', router);

app.listen(port, () => console.log(`Server started on port ${port}.`));