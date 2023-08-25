import { Equipment } from "../models/equipment.model";
import { RoomEquipment } from "../models/room-equipment.model";
import Room from "../models/room.model";
import { ICrudInterface } from "./crud.interface";

class RoomEquipmentDao implements ICrudInterface {
  async findById(id: number) {}

  async findAll(): Promise<RoomEquipment[]> {return []}

  async delete(roomEquipment: RoomEquipment) {
    try {
      return await RoomEquipment.destroy({where : {room_id: roomEquipment.room_id, EquipmentId: roomEquipment.EquipmentId}});
    } catch(err) {
      console.log(err);
      throw new Error("Failed to delete RoomEquipment");
    }
  }

  async deleteByRoomId(roomId: number) {
    try {
      return await RoomEquipment.destroy({where : {room_id: roomId}});
    } catch(err) {
      console.log(err);
      throw new Error("Failed to delete RoomEquipment");
    }
  }

  async update(roomEquipment: RoomEquipment) {
    try {
      return await RoomEquipment.update(
        roomEquipment,
        {where : { id: roomEquipment.id }}
      );
    } catch (err) {
      console.log(err);
      throw new Error("Failed to update RoomEquipment with id : "+roomEquipment.id);
    }   
  }

  async save(roomEquipment: RoomEquipment): Promise<RoomEquipment> {
    try {
      console.log('save dao roomEquipment = '+JSON.stringify(roomEquipment));
      return await RoomEquipment.create({EquipmentId:roomEquipment.EquipmentId, room_id:roomEquipment.room_id});
    } catch (err) {
      console.log(err);
      throw new Error("Failed to create RoomEquipment !");
    }
  }
  
}

export default new RoomEquipmentDao();