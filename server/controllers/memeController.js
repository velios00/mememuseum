import { User, Meme, Tag } from "../models/MemeMuseumDB.js";
import fs from "fs";
import path from "path";

export class MemeController {
    static async createMeme(body, file) {
        const imagePath = file ? file.path : null;
        console.log("pippo", body)
        let meme = Meme.build({
            title: null,
            image: imagePath + ".jpg",
            tags: body.tags ? body.tags.split(',') : [],
            userId: body.userId
        });
        return meme.save();
    }

    static async findById(memeId){
        return Meme.findByPk(memeId);
    }
}