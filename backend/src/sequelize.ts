import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { db } from './config';

export const sequelize = new Sequelize({
	dialect: 'mysql',
	database: 'perssonified',
	operatorsAliases: Op,
	username: 'root',
	password: db.password,
	port: 3306,
	modelPaths: [__dirname + '/models'],
	modelMatch: (filename, member) => {
		return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
	}
});