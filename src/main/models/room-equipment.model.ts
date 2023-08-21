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
        field: "equipmentId",
        allowNull: false
    })
    equipmentId?: number;

    @Column({
        type: DataType.NUMBER,
        field: "roomId",
        allowNull: false
    })
    roomId?: number;
}

Equipment.belongsToMany(Room, {through:RoomEquipment});
Room.belongsToMany(Equipment, {through:RoomEquipment});
