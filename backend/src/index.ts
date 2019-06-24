import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
const cors = require('cors');

const app: Application = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Express works...')
});

app.listen(port, () => console.log(`Server started on port ${port}...`));