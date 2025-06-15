import express from 'express';
import { AuthenticationController } from '../controllers/authenticationController.js';

export const authenticationRouter = express.Router();

authenticationRouter.post('/register', (req, res, next) => {
    AuthenticationController.register(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            next(err);
        });
});

authenticationRouter.post('/login', (req, res, next) => {
    AuthenticationController.login(req.body)
        .then((userFound) => {
            if(userFound){
                res.json(AuthenticationController.issueToken(userFound));
            }
        })
        .catch((err) => {
            next(err);
        });
});