

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authenticationRouter } from './routes/authenticationRouter.js';
import { memeRouter } from './routes/memeRouter.js';
import { userRouter } from './routes/userRouter.js';
import { voteRouter } from './routes/voteRouter.js';
import { commentRouter } from './routes/commentRouter.js';
import { enforceAuthentication } from './middleware/authorization.js';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // oppure "http://localhost:5173"
  next();
}, express.static('uploads'));

app.use('/avatars', express.static(path.join(__dirname, 'uploads/avatars')));
// app.use('/memes', express.static(path.join(__dirname, 'uploads/memes')));

app.use(authenticationRouter);
app.use(enforceAuthentication);
app.use(memeRouter);
app.use(userRouter);
app.use(voteRouter);
app.use("/memes", commentRouter);



app.use((err, req, res, next) => {
    console.log(err.stack); //se non è presente stack, stamperà undefined
    res.status(err.status || 500).json({
      code: err.status || 500,
      description: err.message || "An error occurred",
    });
  });


app.listen(PORT);