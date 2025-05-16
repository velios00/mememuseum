import { User, Meme } from '../models/MemeMuseumDB.js';

export class UserController {
    static async findById(userId){
        return User.findByPk(userId);
    }

    static async findMemesByUserId(userId) {
        const user = await User.findByPk(userId, {
            include: {
                model: Meme,
                as: 'memes',
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user.memes;
    }
}