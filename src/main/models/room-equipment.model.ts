import { Table, Model, DataType, Column } from "sequelize-typescript";
import { Equipment } from "./equipment.model";
import Room from "./room.model";

@Table({
    tableName: "t_room_equipment",
    timestamps: false
  })
export class RoomEquipment extends Model {

    @Column({
        type: DataType.NUMBER,
        field: "EquipmentId"
    })
    EquipmentId!: number; //EquipmentId : appelation de variable très moche mais pas eu le choix car j'avais des erreurs Sequelize avec "equipmentId"

    @Column({
        type: DataType.NUMBER,
        field: "room_id"
    })
    room_id!: number;
}