import { User, Meme, Tag } from '../models/MemeMuseumDB.js';

export class UserController {
    static async findById(userId){
        return User.findByPk(userId);
    }

    static async findMemesByUserId(userId) {
                const memes = await Meme.findAll({
                    where: {
                        userId: userId
                    },
                    include: [
                        {
                            model: Tag,
                            attributes: ["tagName"],
                            through: {
                                attributes: []  //evita info extra dalla tabella ponte
                            }
                        },
                        {
                            model: User,
                            attributes: ["userName", "profileImage"],
                        }
                    ]
                })
                return memes.map(meme => ({
                    id: meme.id,
                    title: meme.title,
                    image: meme.image,
                    tags: meme.Tags.map(tag => tag.tagName),
                    User: {
                        userName: meme.User?.userName,
                        profileImage: meme.User?.profileImage,
                    }
                }));
    }
}