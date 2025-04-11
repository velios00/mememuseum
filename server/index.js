

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authenticationRouter } from './routes/authenticationRouter.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(authenticationRouter);




app.listen(PORT);