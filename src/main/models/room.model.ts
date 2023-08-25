import { Model, Table, Column, DataType } from "sequelize-typescript";
import { Equipment } from "./equipment.model";
import { RoomEquipment } from "./room-equipment.model";
import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin } from "sequelize";

@Table({
    tableName: "t_room",
    timestamps: false
  })
export default class Room extends Model {

    @Column({
        type: DataType.NUMBER,
        field: "capacity"
    })
    capacity?: number;

    @Column({
        type: DataType.BOOLEAN,
        field: "accessibility"
    })
    accessibility?: boolean;

    @Column({
        type: DataType.STRING,
        field: "address"
    })
    address?: string;

    @Column({
        type: DataType.STRING,
        field: "telephone"
    })
    telephone?: string;

    readonly equipments!: Equipment[];

    declare addEquipments: BelongsToManyAddAssociationsMixin<Room, number>;

    // addEquipments(equipments: Equipment[]) {
        
    // }
}