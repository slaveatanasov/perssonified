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

@Table
export class User extends Model<User> {
    
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id!: number;

    @Column
    email!: string;

    @Column
    password!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

}