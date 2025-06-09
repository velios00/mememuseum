import { Sequelize } from 'sequelize';
import { createModel as createUserModel } from './User.js';
import { createModel as createMemeModel } from './Meme.js';
import { createModel as createTagModel } from './Tag.js';
import { createModel as createVoteModel } from './Vote.js';
import { createModel as createCommentModel } from './Comment.js';
import { createModel as createDailyMemeModel } from './DailyMeme.js'

import dotenv from 'dotenv/config.js';

export const database = new Sequelize({
    storage: process.env.DB_CONNECTION_URI,
    dialect: process.env.DIALECT,
});

createUserModel(database);
createMemeModel(database);
createTagModel(database);
createVoteModel(database);
createCommentModel(database);
createDailyMemeModel(database);

export const { User, Meme, Tag, Vote, Comment, DailyMeme } = database.models;

// Definizione delle relazioni tra i modelli
User.Memes = User.hasMany(Meme, {
    as: 'memes', foreignKey: {name: "userId", allowNull: false},
});

Meme.User = Meme.belongsTo(User, {
    foreignKey: {name: "userId", allowNull: false},
});

User.Comments = User.hasMany(Comment, {
    foreignKey: {name: "userId", allowNull: false},
});

Comment.User = Comment.belongsTo(User, {
    foreignKey: {name: "userId", allowNull: false},
});

Comment.Meme = Comment.belongsTo(Meme, {
    foreignKey: {name: "memeId", allowNull: false},
});

User.Votes = User.hasMany(Vote, {
    foreignKey: {name: "userId", allowNull: false},
});

Vote.User = Vote.belongsTo(User, {
    foreignKey: {name: "userId", allowNull: false},
});

Vote.Meme = Vote.belongsTo(Meme, {
    foreignKey: {name: "memeId", allowNull: false},
})

Meme.Votes = Meme.hasMany(Vote, {
    foreignKey: {name: "memeId", allowNull: false},
});

Meme.User = Meme.belongsTo(User, {
    foreignKey: {name: "userId", allowNull: false},
});

Meme.Tags = Meme.belongsToMany(Tag, {
    through: "MemeTags",
    foreignKey: "memeId",
});

Tag.Memes = Tag.belongsToMany(Meme, {
    through: "MemeTags",
    foreignKey: "tagId",
});

DailyMeme.Meme = DailyMeme.belongsTo(Meme, {
  foreignKey: { name: 'memeId', allowNull: false },
});


Meme.Comments = Meme.hasMany(Comment, {
    foreignKey: {name: "memeId", allowNull: false},
});

database
  .sync()
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((err) => {
    console.log("Errore nella sincronizzazione: " + err.message);
  });