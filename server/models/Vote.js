import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define("Vote", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[-1, 1]], // -1 for downvote, 1 for upvote
                    msg: "Value must be either -1 or 1",
                },
            }
        },
    })
}