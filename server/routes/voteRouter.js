import express from 'express';
import { VoteController } from '../controllers/voteController.js';
import { memeExists } from '../middleware/memeExists.js';
import { enforceAuthentication } from '../middleware/authorization.js';

export const voteRouter = express.Router();

voteRouter.post("/memes/:memeId/votes", enforceAuthentication, memeExists, (req, res, next) => {
    VoteController.createVote(req.params.memeId, req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
});

voteRouter.put("/memes/votes/:voteId", enforceAuthentication, (req, res, next) => {
    VoteController.updateVote(req.body, req.params.voteId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
})

voteRouter.get("/memes/:memeId/votes", (req, res, next) => {
    VoteController.getAllVotes(req.params.memeId, req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
})

voteRouter.delete("/memes/:memeId/votes/:voteId", enforceAuthentication, (req, res, next) => {
    VoteController.deleteVote(req.params.memeId, req.params.voteId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
})

voteRouter.get("/memes/:memeId/votes/users/:userId", (req, res, next) => {
    VoteController.getVoteByUser(req.params.memeId, req.params.userId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        next(err);
    })
})