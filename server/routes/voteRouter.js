import express from 'express';
import { VoteController } from '../controllers/voteController.js';

export const voteRouter = express.Router();

voteRouter.post("/memes/:memeId/vote", (req, res, next) => {
    VoteController.createVote(req.params.memeId, req.body.userId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
});
