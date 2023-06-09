import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
	timestamps: false,
	tableName: "items",
})
export class Items extends Model {
	@Column({
		type: DataType.UUID,
	})
	itemId!: string;

	@Column({
		type: DataType.STRING,
	})
	itemNo!: string;

	@Column({
		type: DataType.STRING,
	})
	description!: string;

	@Column({
		type: DataType.STRING,
	})
	unit!: string;

	@Column({
		type: DataType.FLOAT,
	})
	quantity!: string;

	@Column({
		type: DataType.FLOAT,
	})
	rate!: string;

	@Column({
		type: DataType.FLOAT,
	})
	amount!: string;
}
