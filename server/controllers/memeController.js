import { Comment, Meme, Tag, User, Vote } from "../models/MemeMuseumDB.js";
import path from "path";
import fs from "fs";
import Sequelize from "sequelize";

let currentDailyMeme = null;
let lastUpdate = null;

export class MemeController {
    static async createMeme(body, file) {
        const extension = path.extname(file.originalname);
        const newFilename = file.filename + extension;
        const newPath = path.join(file.destination, newFilename);

        fs.renameSync(file.path, newPath);

        const imagePath = `uploads/${newFilename}`;

        const tagList = body.tag ? body.tag.split(',').map(tag => tag.trim()) : [];

        //1. Crea meme
        let meme = Meme.build({
            title: body.title,
            image: imagePath,
            //tag: body.tag ? body.tag.split(',') : [],
            userId: body.userId,
        });
        //2/ Salva meme
        await meme.save();

        //3. Associa i tag(trova o crea)
        if(tagList.length > 0) {
            const tagInstances = [];
            for(const tagName of tagList) {
                const [tag] = await Tag.findOrCreate({ where: {tagName } })
                tagInstances.push(tag);
            }
                await meme.addTags(tagInstances);
            }
            return meme;
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

    static async getFilteredMemes(query) {
    const filter = query.filter || "new";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 7;
    const offset = (page - 1) * limit;
    const userId = query.userId ? parseInt(query.userId) : null;
    const whereClause = {};
    if (userId) {
        whereClause.userId = userId;
    }

    // Estrai tag dalla query
    const tagList = query.tags
        ? query.tags.split(",").map((tag) => tag.trim().toLowerCase())
        : [];

    let orderByVotes;

    if (filter === "top") {
        orderByVotes = Sequelize.literal(`
            (SELECT COUNT(*) FROM Votes AS v WHERE v.memeId = Meme.id AND v.value = 1) -
            (SELECT COUNT(*) FROM Votes AS v WHERE v.memeId = Meme.id AND v.value = -1) DESC
        `);
    } else if (filter === "down") {
        orderByVotes = Sequelize.literal(`
            (SELECT COUNT(*) FROM Votes AS v WHERE v.memeId = Meme.id AND v.value = 1) -
            (SELECT COUNT(*) FROM Votes AS v WHERE v.memeId = Meme.id AND v.value = -1) ASC
        `);
    } else if (filter === "new") {
        orderByVotes = [['createdAt', 'DESC']];
    } else if (filter === "old") {
        orderByVotes = [['createdAt', 'ASC']];
    }

    const memes = await Meme.findAll({
        where: whereClause,
        order: [orderByVotes],
        limit,
        offset,
        include: [
            {
                model: Tag,
                attributes: ["tagName"],
                through: { attributes: [] },
                where: tagList.length > 0
                    ? { tagName: { [Sequelize.Op.in]: tagList } }
                    : undefined,
                required: tagList.length > 0,
            },
            {
                model: User,
                attributes: ["userName", "profileImage"],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ["userName", "profileImage"],
                },
            },
            {
                model: Vote,
                attributes: ["id", "value", "userId", "createdAt"],
            },
        ],
    });

    // Filtra in JS per accertarti che abbia TUTTI i tag richiesti
    const filteredMemes = tagList.length > 0
        ? memes.filter((meme) => {
              const memeTags = meme.Tags.map((t) => t.tagName.toLowerCase());
              return tagList.every((tag) => memeTags.includes(tag));
          })
        : memes;

    return filteredMemes.map((meme) => ({
        id: meme.id,
        title: meme.title,
        image: meme.image,
        tags: meme.Tags.map((tag) => tag.tagName),
        User: {
            userName: meme.User?.userName,
            profileImage: meme.User?.profileImage,
        },
        comments:
            meme.Comments?.map((comment) => ({
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                createdAt: comment.createdAt,
                User: {
                    userName: comment.User?.userName,
                    profileImage: comment.User?.profileImage,
                },
            })) || [],
        votes:
            meme.Votes?.map((vote) => ({
                id: vote.id,
                value: vote.value,
                userId: vote.userId,
                createdAt: vote.createdAt,
            })) || [],
    }));
}



    static async getMemeOfTheDay() {
        const now = new Date();
        const shouldUpdate = !lastUpdate || now - lastUpdate > 24 * 60 * 60 * 1000;
        
        if(shouldUpdate) {
            const memes = await Meme.findAll();
            const randomIndex = Math.floor(Math.random() * memes.length);
            currentDailyMeme = memes[randomIndex];
            lastUpdate = now;
        }

        return {
            id: currentDailyMeme.id,
            title: currentDailyMeme.title,
            image: currentDailyMeme.image,
            tags: currentDailyMeme.tags?.map(tag => tag.tagName) || [],
        }
    }
}