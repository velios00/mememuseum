import { User } from "../models/MemeMuseumDB.js";
import Jwt from "jsonwebtoken";

export class AuthenticationController {
    static async register(body) {
        let newUser = new User({ userName: body.usr, password: body.pwd });
        const foundUser = await User.findOne({ where: {userName: newUser.userName}});
        if(foundUser){
            throw new Error("User already exists"); 
        }
        return newUser.save()
    }
    
    static async login(body) {
        const user = new User({ userName: body.usr, password: body.pwd });
    
        const foundUser = await User.findOne({ where: { userName: user.userName, password: user.password } });
    
        if (!foundUser) {
            throw new Error("Invalid username or password"); 
        }
        return foundUser; 
    }
    
    static issueToken(user) {
        const createdToken = Jwt.sign(
            {
                user: {
                    id: user.id,
                    userName: user.userName,
                    profileImage: user.profileImage,
                },
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return { 
            token: createdToken,
         };
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback)
    }

    static async canUserModifyOwnAvatar(userId) {
        const user = await User.findByPk(userId);
        return user && user.id === userId;
    }
} 