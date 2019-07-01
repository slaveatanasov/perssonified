import {     
    Model,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    PrimaryKey,
    Table,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasMany,
    HasOne} from "sequelize-typescript";

import TFA from './tfa.model'

@Table
export default class TfaSecret extends Model<TfaSecret> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT
    })
    id!: number;

    @Column({
        type: DataType.TEXT
    })
    ascii!: string;

    @Column({
        type: DataType.TEXT
    })
    hex!: string;

    @Column({
        type: DataType.TEXT
    })
    base32!: string;

    @Column({
        type: DataType.TEXT
    })
    otpauth_url!: string;

    @ForeignKey(() => TFA)
    @Column({
        type: DataType.BIGINT
    })
    tfaId!: number;

    @BelongsTo(() => TFA)
    TFA!: TFA;
}