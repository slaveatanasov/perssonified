import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

// LOCAL DATABASE
// export const sequelize = new Sequelize({
// 	dialect: 'mysql',
// 	database: process.env.DB_NAME!,
// 	operatorsAliases: Op,
// 	username: process.env.DB_USERNAME!,
// 	password: process.env.DB_PASSWORD!,
// 	port: 3306,
// 	modelPaths: [__dirname + '/models'],
// 	modelMatch: (filename, member) => {
// 		return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
// 	}
// });

// CLOUD DATABASE
export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_CLOUD_HOST!,
	database: process.env.DB_CLOUD_NAME!,
	operatorsAliases: Op,
	username: process.env.DB_CLOUD_USERNAME!,
	password: process.env.DB_CLOUD_PASSWORD!,
	port: 3306,
	modelPaths: [__dirname + '/models'],
	modelMatch: (filename, member) => {
		return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
	}
});