import { MemeController } from "../controllers/memeController.js";


export async function memeExists(req, res, next){
    const memeId = req.params.memeId;
    const meme = await MemeController.findById(memeId);
    if(meme)
        next();
    else
        next(new Error("Idea not found"));
}