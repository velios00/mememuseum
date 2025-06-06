import express from 'express';
import { UserController } from '../controllers/userController.js';
import multer from 'multer';
import { userModifyOwnAvatar } from '../middleware/authorization.js';

export const userRouter = express.Router();
const upload = multer({ dest: 'uploads/' });

userRouter.get('/user/:id', (req, res, next) => {
    UserController.findById(req.params.id)
        .then((result) => {
          console.log("result", result)
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

userRouter.put(
  `/users/:userId`,
  userModifyOwnAvatar,
  upload.single("profileImage"), // ← importante: deve corrispondere al nome del campo nel frontend
  (req, res, next) => {
    const filePath = req.file?.path; // o req.file.buffer se usi memoryStorage
    if (!filePath) {
      return res.status(400).json({ error: "File non fornito" });
    }

    UserController.saveAvatar(req.params.userId, filePath)
      .then((result) => res.json(result))
      .catch((err) => next(err));
  }
);