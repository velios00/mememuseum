import express from 'express';
import { CommentController } from '../controllers/commentController.js';
import { memeExists } from '../middleware/memeExists.js';

export const commentRouter = express.Router();


commentRouter.get(`/:memeId/comments`, memeExists, (req, res, next) => {
    CommentController.getAllComments(req.params.memeId)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

commentRouter.post('/:memeId/comments', memeExists, (req, res, next) => {
    CommentController.createComment(req.params.memeId, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

commentRouter.delete('/:memeId/comments/:commentId', memeExists, (req, res, next) => {
    CommentController.deleteComment(req.params.commentId)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});