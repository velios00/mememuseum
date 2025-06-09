import { DataTypes } from "sequelize";


export function createModel(database) {
    database.define("DailyMeme", {
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
            unique: true,
        },
        memeId: {
            type: DataTypes.INTEGER,
            allowNull: false,

        }
    })
}