

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authenticationRouter } from './routes/authenticationRouter.js';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(authenticationRouter);

app.use((err, req, res, next) => {
    console.log(err.stack); //se non è presente stack, stamperà undefined
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred",
    });
  });


app.listen(PORT);