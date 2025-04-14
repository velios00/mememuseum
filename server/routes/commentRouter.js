import express from 'express';
import { CommentController } from '../controllers/commentController.js';
import { memeExists } from '../middleware/memeExists.js';

export const commentRouter = express.Router();

commentRouter.post('/memes/:memeId/comments', memeExists, (req, res, next) => {
    CommentController.createComment(req.params.memeId, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

commentRouter.delete('/memes/:memeId/comments/:commentId', memeExists, (req, res, next) => {
    CommentController.deleteComment(req.params.commentId)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});