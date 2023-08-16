import Room from "../models/room.model";
import { ICrudInterface } from "./crud.interface";

class RoomDao implements ICrudInterface {
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