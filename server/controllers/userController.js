import { User, Meme, Tag } from '../models/MemeMuseumDB.js';

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

    static async saveAvatar(userId, avatar) {
        const user = await User.findByPk(userId);
        user.profileImage = avatar;

        const savedUser = await user.save();

        return savedUser;
    }

    
}