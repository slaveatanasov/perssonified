import { 
    Sequelize, 
    Model,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    PrimaryKey,
    Table,
    UpdatedAt 
} from 'sequelize-typescript';

// export interface UserAddModel {
//     email: string,
//     password: string
// }

// export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
//     id: number,
//     email: string,
//     password: string,
//     createdAt: string,
//     updatedAt: string
// }

// export const User = sequelize.define<UserModel, UserAddModel>('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     email: Sequelize.STRING,
//     password: Sequelize.STRING
// })

@Table
export class User extends Model<User> {
    // @PrimaryKey
    // @AutoIncrement
    @Column({
        type: "INT"
    })
    public id: number | undefined;

    @Column({
        type: "VARCHAR(45)"
    })
    public email: string | undefined;

    @Column({
        type: "VARCHAR(45)"
    })
    public password: string | undefined;

    // @CreatedAt
    // @Column
    // createdAt: Date | undefined;

    // @UpdatedAt
    // @Column
    // updatedAt: Date | undefined;
}