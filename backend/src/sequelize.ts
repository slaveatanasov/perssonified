import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';

export const sequelize = new Sequelize({
	dialect: 'mysql',
	database: process.env.DB_NAME!,
	operatorsAliases: Op,
	username: process.env.DB_USERNAME!,
	password: process.env.DB_PASSWORD!,
	port: 3306,
	modelPaths: [__dirname + '/models'],
	modelMatch: (filename, member) => {
		return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
	}
});