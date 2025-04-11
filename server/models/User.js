import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database){
    database.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hash = createHash("sha256");
                this.setDataValue("password", hash.update(value).digest("hex"));
            }
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}