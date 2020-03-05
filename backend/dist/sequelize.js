"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_CLOUD_HOST,
    database: process.env.DB_CLOUD_NAME,
    operatorsAliases: sequelize_1.Op,
    username: process.env.DB_CLOUD_USERNAME,
    password: process.env.DB_CLOUD_PASSWORD,
    port: 3306,
    modelPaths: [__dirname + '/models'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    }
});
//# sourceMappingURL=sequelize.js.map