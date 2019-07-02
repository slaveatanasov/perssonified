import {
    Model,
    AutoIncrement,
    Column,
    DataType,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
    HasOne
} from 'sequelize-typescript';

import User from './user.model';
import TfaSecret from './tfaSecret.model';

@Table
export default class TFA extends Model<TFA> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id!: number;

    @HasOne(() => TfaSecret)
    secret!: TfaSecret;

    @Column({
        type: DataType.TEXT
    })
    tempSecret!: string;

    @Column({
        type: DataType.TEXT
    })
    dataURL!: string;

    @Column({
        type: DataType.TEXT
    })
    tfaURL!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

}