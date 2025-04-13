import { User } from '../models/MemeMuseumDB.js';

export class UserController {
    static async findById(userId){
        return User.findByPk(userId);
    }
}