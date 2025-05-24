import express from 'express';
import { UserController } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.get('/user/:id', (req, res, next) => {
    UserController.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

