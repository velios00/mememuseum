import { Comment, DailyMeme, Meme, Tag, User, Vote } from "../models/MemeMuseumDB.js";
import path from "path";
import fs from "fs";
import Sequelize from "sequelize";


export class MemeController {
    static async createMeme(body, file) {
        const extension = path.extname(file.originalname);
        const newFilename = file.filename + extension;
        const newPath = path.join(file.destination, newFilename);

        fs.renameSync(file.path, newPath);

        const imagePath = `uploads/${newFilename}`;

        const tagList = body.tag
        ? [...new Set(body.tag.split(',').map(tag => tag.trim().toLowerCase()))]
        : [];

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

    static async getFilteredMemes(query) {
    const filter = query.filter || "new";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
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
                // where: tagList.length > 0
                //     ? { tagName: { [Sequelize.Op.in]: tagList } }
                //     : undefined,
                required: tagList.length > 0,
            },
            {
                model: User,
                attributes: ["id", "userName", "profileImage"],
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
            id: meme.User.id,
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
    // 1 giorno in millisecondi (cambia a 1000 * 60 per test minuto)
    const msInADay = 1000 * 60 * 60 * 24;
    const dayIndex = Math.floor(Date.now() / msInADay);
    const today = new Date(dayIndex * msInADay);

    let dailyEntry = await DailyMeme.findOne({
      where: { date: today },
    });

    if (!dailyEntry) {
      const memes = await Meme.findAll({
        order: [["createdAt", "ASC"]], 
      });

      if (memes.length === 0) {
        throw new Error("No memes available");
      }

      // Generatore pseudo-random stabile basato su dayIndex
      function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      }

      const randomIndex = Math.floor(seededRandom(dayIndex) * memes.length);
      const selectedMeme = memes[randomIndex];

      dailyEntry = await DailyMeme.create({
        date: today,
        memeId: selectedMeme.id,
      });
    }

    // Recupera il meme associato alla entry di oggi
    const meme = await Meme.findByPk(dailyEntry.memeId, {
      include: [
        { model: Tag },
        {
          model: User,
          attributes: ["id", "userName", "profileImage"],
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

    if (!meme) {
      throw new Error("Meme not found");
    }

    return {
      id: meme.id,
      title: meme.title,
      image: meme.image,
      tags: meme.Tags.map((tag) => tag.tagName),
      User: {
        id: meme.User.id,
        userName: meme.User.userName,
        profileImage: meme.User.profileImage,
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
    };
  }
}