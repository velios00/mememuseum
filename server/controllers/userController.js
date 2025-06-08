import { User, Meme, Tag } from '../models/MemeMuseumDB.js';
import path from "path";
import fs from "fs";
export class UserController {
    static async findById(userId){
        const user = await User.findByPk(userId);

        if(!user){
            throw new Error("Utente non trovato");
        }

        return {
            id: user.id,
            userName: user.userName,
            profileImage:  user.profileImage ? user.profileImage.replace(/\\/g, "/") : null,
        };
    }

    // static async saveAvatar(userId, avatar) {
    //     const user = await User.findByPk(userId);
    //     user.profileImage = avatar;
    //     await user.save();

    //     return {
    //         id: user.id,
    //         userName: user.userName,
    //         profileImage: user.profileImage ? user.profileImage.replace(/\\/g, "/") : null
    //     }
    // }

    static async saveAvatar(body, file, userId) {
            const extension = path.extname(file.originalname);
            const newFilename = file.filename + extension;
            const newPath = path.join(file.destination, newFilename);
    
            fs.renameSync(file.path, newPath);
    
            const imagePath = `uploads/${newFilename}`;

            const user = await User.findByPk(userId)
            console.log("user trovato : ", user)
            user.profileImage = imagePath
            await user.save();

            return {
                id: user.id,
                userName: user.userName,
                profileImage: user.profileImage
            }
    

        }
}