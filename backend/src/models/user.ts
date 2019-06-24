import * as Sequelize from 'sequelize';
import s from '../db/index';

export interface UserAddModel {
    email: string,
    password: string
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
    id: number,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

export const User = sequelize.define<UserModel, UserAddModel>('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
})