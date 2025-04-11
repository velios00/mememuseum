import express from 'express';
import { AuthenticationController } from '../controllers/authenticationController.js';

export const authenticationRouter = express.Router();

authenticationRouter.post('/register', AuthenticationController.register);

authenticationRouter.post('/login', AuthenticationController.login);