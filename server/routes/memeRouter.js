import express from 'express';
import { MemeController } from '../controllers/memeController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const memeRouter = express.Router();

memeRouter.post('/memes', upload.single('image'), (req, res, next) => {
    console.log("Request body: ", req);
    const body = JSON.parse(JSON.stringify(req.body));
    console.log("Parsed body: ", body);
    MemeController.createMeme(body, req.file)
        .then((meme) => {
            res.status(201).json(meme);
        })
        .catch((err) => {
            next(err);
        });
});

memeRouter.get('/memes/:id', (req, res, next) => {
    MemeController.findById(req.params.id)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(err);
        });
});



