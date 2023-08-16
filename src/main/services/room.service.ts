import { ICrudInterface } from "../dao/crud.interface";
import roomDao from "../dao/room.dao";
import Room from "../models/room.model";

class RoomService implements ICrudInterface{

    constructor(){
        
    }

    async findById(id: number) {
      try {
        return await roomDao.findById(id);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get Room with id : "+id);
      }
    }

    update(any: any) {
      throw new Error("Method not implemented.");
    }
    delete(any: any) {
      throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Room[]> {
        try {
          console.log('Service find all');
          return await roomDao.findAll();
        } catch (error) {
          console.log(error);
          throw new Error("Failed to retrieve rooms!");
        }
    }

    async save(room: Room): Promise<Room> {
      try {
        return await roomDao.save(room);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create room !");
      }
    }
}

export default new RoomService();