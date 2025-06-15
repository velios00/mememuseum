import express from 'express';
import { UserController } from '../controllers/userController.js';
import multer from 'multer';
import path from 'path'
import { enforceAuthentication, userModifyOwnAvatar } from '../middleware/authorization.js';

export const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  }
})

const upload = multer({ storage });

userRouter.get('/user/:id', (req, res, next) => {
    UserController.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

userRouter.put('/users/:userId', enforceAuthentication, upload.single('profileImage'), (req, res, next) => {
    const body = JSON.parse(JSON.stringify(req.body));
    UserController.saveAvatar(body, req.file, req.params.userId)
        .then((meme) => {
            res.status(201).json(meme);
        })
        .catch((err) => {
            next(err);
        });
});
