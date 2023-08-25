import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: "t_equipment",
    timestamps: false
  })
export class Equipment extends Model {
    @Column({
        type: DataType.STRING,
        field: "name",
        allowNull: false
    })
    name?: string;

    @Column({
        type: DataType.STRING,
        field: "iconname",
        allowNull: false
    })
    iconName?: string;

    readonly isPresent!: boolean;
}