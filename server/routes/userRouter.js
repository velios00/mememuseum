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
          console.log("result", result)
            res.json(result);
        })
        .catch((err) => {
            next(err);
        });
});

// userRouter.put(
//   `/users/:userId`,
//   enforceAuthentication,
//   userModifyOwnAvatar,
//   upload.single("profileImage"), // ← importante: deve corrispondere al nome del campo nel frontend
//   (req, res, next) => {
//     const filePath = req.file?.path; // o req.file.buffer se usi memoryStorage
//     if (!filePath) {
//       return res.status(400).json({ error: "File non fornito" });
//     }

//     UserController.saveAvatar(req.params.userId, filePath)
//       .then((result) => res.json(result))
//       .catch((err) => next(err));
//   }
// );

userRouter.put('/users/:userId', upload.single('profileImage'), (req, res, next) => {
    //console.log("Request body: ", req);
    const body = JSON.parse(JSON.stringify(req.body));
    //console.log("Parsed body: ", body);
    UserController.saveAvatar(body, req.file, req.params.userId)
        .then((meme) => {
            res.status(201).json(meme);
        })
        .catch((err) => {
            next(err);
        });
});
