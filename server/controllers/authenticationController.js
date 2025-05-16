import { User } from "../models/MemeMuseumDB.js";
import Jwt from "jsonwebtoken";

export class AuthenticationController {
    static async register(body) {
        const { userName, password } = body;
        //console.log("request body:", req.body);
        const foundUser = await User.findOne({ where: {userName: userName}});
        // console.log("Found user: ", foundUser);
        if(foundUser){
            throw new Error("User already exists"); // L'utente esiste già
        }
        // Creazione del nuovo utente
        return await User.create({
            userName: userName,
            password: password,
        })
    }
    
    static async login(body) {
        const user = new User({ userName: body.userName, password: body.password });
    
        const foundUser = await User.findOne({ where: { userName: user.userName, password: user.password } });
        console.log("user in check: ", foundUser);
    
        if (!foundUser) {
            throw new Error("Invalid username or password"); // L'utente non esiste o la password è errata
        }
        // Risposta per login riuscito
        return foundUser; // Restituisci l'utente trovato
    }
    
    static issueToken(user) {
        console.log("User in issueToken: ", user);
        const createdToken = Jwt.sign(
            {
                user: {
                    id: user.id,
                    userName: user.userName,
                },
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return { 
            token: createdToken,
            user: {
                id: user.id,
                userName: user.userName,
            },
         };
    }

    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback)
    }
} 