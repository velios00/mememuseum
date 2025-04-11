import { DataTypes } from "sequelize";

//Ho preferito implementare Tag come modello piuttosto che metterlo come attributo a Meme perche' si lavora piu' efficientemente in questo modo con sequelize

export function createModel(database) {
    database.define("Tag", {
        tagName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
}