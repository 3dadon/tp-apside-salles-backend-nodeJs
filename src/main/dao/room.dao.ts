import Room from "../models/room.model";
import { ICrudInterface } from "./crud.interface";

class RoomDao implements ICrudInterface {
    async findById(id: number) {
      try {
        return await Room.findByPk(id);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get Room with id : "+id);
      }
    }

    async update(room: Room) {
      try {
        return await Room.update(
          room,
          {where : { id: room.id }}
        );
      } catch (err) {
        console.log(err);
        throw new Error("Failed to update Room with id : "+room.id);
      }   
    }

    async delete(roomId: number) {
      try {
        return await Room.destroy({where: {id:roomId}});
      } catch (err) {
        console.log(err);
        throw new Error("Failed to delete Room with id : "+roomId);
      }  
    }

    async save(room: Room): Promise<Room> {
      try {
        return await Room.create({
          capacity: room.capacity,
          accessibility: room.accessibility,
          address: room.address,
          telephone: room.telephone
        });
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create Room !");
      }
    }

    async findAll(): Promise<Room[]> {
        try {
          console.log('RoomDao find all');
          return await Room.findAll();
        } catch (error) {
          console.log('problème retrait données dao : '+error);
          throw new Error("Failed to retrieve rooms!");
        }
    }
}

export default new RoomDao();