import { User, Meme, Tag } from '../models/MemeMuseumDB.js';
import path from "path";
import fs from "fs";
export class UserController {
    static async findById(userId){
        const user = await User.findByPk(userId);

        if (!user) {
        const err = new Error("Utente non trovato");
        err.status = 404;
        throw err;
        }

        return {
            id: user.id,
            userName: user.userName,
            profileImage:  user.profileImage ? user.profileImage.replace(/\\/g, "/") : null,
        };
    }

    static async saveAvatar(body, file, userId) {
            const extension = path.extname(file.originalname);
            const newFilename = file.filename + extension;
            const newPath = path.join(file.destination, newFilename);
    
            fs.renameSync(file.path, newPath);
    
            const imagePath = `uploads/${newFilename}`;

            const user = await User.findByPk(userId)
            user.profileImage = imagePath
            await user.save();

            return {
                id: user.id,
                userName: user.userName,
                profileImage: user.profileImage
            }
    

        }
}