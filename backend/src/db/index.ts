import {Sequelize} from 'sequelize-typescript';
 
export default new Sequelize({
        database: 'perssonified',
        dialect: 'mysql',
        username: 'root',
        password: 'admin',
        port: 3306,
        modelPaths: [__dirname + '../models']
});