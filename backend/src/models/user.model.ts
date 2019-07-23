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
export default class User extends Model<User> {

	@PrimaryKey
	@AutoIncrement
	@Column({
		type: DataType.BIGINT
	})
	id!: number;

	@Column({
		type: DataType.TEXT
	})
	username!: string;

	@Column({
		type: DataType.TEXT
	})
	email!: string;

	@Column({
		type: DataType.TEXT
	})
	password!: string;

	@Column({
		type: DataType.TINYINT
	})
	tfaEnabled!: boolean;

	@Column({
		type: DataType.TEXT
	})
	twoFactorSecret!: string;

	@Column({
		type: DataType.TEXT
	})
	twoFactorTempSecret!: string;

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