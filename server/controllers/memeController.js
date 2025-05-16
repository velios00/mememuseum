import { Meme } from "../models/MemeMuseumDB.js";
import path from "path";
import fs from "fs";

export class MemeController {
    static async createMeme(body, file) {
        const extension = path.extname(file.originalname);
        const newFilename = file.filename + extension;
        const newPath = path.join(file.destination, newFilename);

        fs.renameSync(file.path, newPath);

        const imagePath = `uploads/${newFilename}`;
        console.log("pippo", body)
        let meme = Meme.build({
            title: body.title,
            image: imagePath,
            tag: body.tag ? body.tag.split(',') : [],
            userId: body.userId,
        });
        return meme.save();
    }

    static async findById(memeId){
        return Meme.findByPk(memeId);
    }

    static async deleteMeme(memeId) {
        console.log("memeid: ", memeId);
        const meme = await Meme.findByPk(memeId);
        if(!meme)
            throw new Error("Meme not found");
        const imagePath = meme.image;
        await Meme.destroy({ where: { id: memeId } });
        return meme;
    }
}