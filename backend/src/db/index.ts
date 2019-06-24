import {Sequelize} from 'sequelize-typescript';
import path from 'path';
import { Test } from './test.model';
 
export default new Sequelize({
        dialect: 'mysql',
        database: 'perssonified',
        username: 'root',
        password: 'admin',
        port: 3306,
        modelPaths: [path.join(__dirname + '/*.model.ts')],
        modelMatch: (filename, member) => {
                return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
              },
});
