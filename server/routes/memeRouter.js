import express from 'express';
import { MemeController } from '../controllers/memeController.js';
import { memeExists } from '../middleware/memeExists.js';
import { enforceAuthentication } from '../middleware/authorization.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const memeRouter = express.Router();


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

memeRouter.post('/upload', enforceAuthentication, upload.single('image'), (req, res, next) => {
    const body = JSON.parse(JSON.stringify(req.body));
    MemeController.createMeme(body, req.file)
        .then((meme) => {
            res.status(201).json(meme);
        })
        .catch((err) => {
            next(err);
        });
});