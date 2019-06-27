import {
    Model,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    PrimaryKey,
    Table,
    UpdatedAt
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id!: number;

    @Column({
        type: DataType.TEXT
    })
    email!: string;

    @Column({
        type: DataType.TEXT
    })
    password!: string;

    @CreatedAt
    @Column({
        type: DataType.DATE
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE
    })
    updatedAt!: Date;

}