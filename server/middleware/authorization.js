import { AuthenticationController } from '../controllers/authenticationController.js';

export function enforceAuthentication(req, res, next) {
    //Estrae l'header di autorizzazione della richiesta e ne estrae il token
    //Se il token non è presente, restituisce un errore 401
    //Se il token è presente, verifica la validità del token e passa al middleware successivo
    const authHeader = req.headers["authorization"];
    //il token e' la seconda parte dello split
    const token = authHeader?.split(" ")[1];
    if(!token) {
        //occchio qui
        return res.status(401).json({ message: "Unauthorized" });
    } 
    AuthenticationController.isTokenValid(token, (err, token) => {
        if(err) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            req.userName = token.user.userName;
            req.userId = token.user.id;
            next();
        }
    })
}

export async function userModifyOwnAvatar(req, res, next) {
    const userId = req.userId;
    const userPerm = await AuthenticationController.canUserModifyOwnAvatar(userId);
    if(userPerm){
        next();
    } else {
        return res.status(403).json({ error: "Non puoi modificare l'avatar" });
    }
}

