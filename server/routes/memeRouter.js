import express from 'express';
import { MemeController } from '../controllers/memeController.js';
import { memeExists } from '../middleware/memeExists.js';
import multer from 'multer';
import { enforceAuthentication } from "../middleware/authorization.js";


const upload = multer({ dest: 'uploads/' });
export const memeRouter = express.Router();

memeRouter.post('/upload', enforceAuthentication, upload.single('image'), (req, res, next) => {
    //console.log("Request body: ", req);
    const body = JSON.parse(JSON.stringify(req.body));
    //console.log("Parsed body: ", body);
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

memeRouter.delete('/memes/:id', memeExists, (req, res, next) => {
    MemeController.deleteMeme(req.params.id)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(err);
        });
});

memeRouter.get('/memes', (req, res, next) => {
    MemeController.getFilteredMemes(req.query)
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            next(err);
        });
});

memeRouter.get(`/meme-of-the-day`, (req, res, next) => {
    MemeController.getMemeOfTheDay()
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            next(err);
        });
});