import { User } from "../models/MemeMuseumDB.js";
import crypto from "crypto";

export class AuthenticationController {
    static async register(req, res) {
        const { userName, password } = req.body;
        //console.log("request body:", req.body);
        try{
            const foundUser = await User.findOne({ where: {userName: userName}});
           // console.log("Found user: ", foundUser);
            if(foundUser){
                return res.status(409).json({ message: "Username already exists" }); // Risposta per utente già esistente
            }

            // Hash della password
            const hash = crypto.createHash("sha256");
            const hashedPassword = hash.update(password).digest("hex");
            //console.log("Hashed password: ", hashedPassword);

            // Creazione del nuovo utente
            const newUser = await User.create({
                userName: userName,
                password: hashedPassword,
            })
            console.log("New user created: ", newUser);

            // Risposta per registrazione riuscita
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    userName: newUser.username,
                },
            });
        } catch (error) {
            console.error("Error in registration:", error); // Log dettagliato dell'errore
            return res.status(500).json({ message: "Internal server error" }); // Risposta per errore interno
        }
    }
    
    static async login(req, res) {
        const { userName, password } = req.body; // Estrai i dati dal body della richiesta
        console.log("Login request body:", req.body); // Log della richiesta di login
        try {
            // Verifico che l'utente esista
            const hash = crypto.createHash("sha256");
            const hashedPassword = hash.update(password).digest("hex");
            console.log("Hashed Password: ", hashedPassword);
    
            const foundUser = await User.findOne({ where: { userName: userName, password: hashedPassword } });
            console.log("user in check: ", foundUser);
    
            if (!foundUser) {
                return res.status(401).json({ message: "Invalid credentials" }); // Risposta per credenziali non valide
            }
    
            // Risposta per login riuscito
            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: foundUser.id,
                    userName: foundUser.userName,
                    profileImage: foundUser.profileImage,
                },
                
            });
            
        } catch (error) {
            console.error("Error in login:", error); // Log dettagliato dell'errore
            return res.status(500).json({ message: "Internal server error" }); // Risposta per errore interno
        }
    }
} 