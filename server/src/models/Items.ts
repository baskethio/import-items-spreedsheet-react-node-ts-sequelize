import { UUIDV4 } from "sequelize";
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
	timestamps: false,
	tableName: "items",
})
export class Items extends Model {
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	itemId!: string;

	@Column({
		type: DataType.STRING,
	})
	ItemNo!: string;

	@Column({
		type: DataType.STRING(1000),
	})
	Description!: string;

	@Column({
		type: DataType.STRING,
	})
	Unit!: string;

	@Column({
		type: DataType.STRING,
	})
	Qty!: string;

	@Column({
		type: DataType.STRING,
	})
	Rate!: string;

	@Column({
		type: DataType.STRING,
	})
	Amount!: string;
}
