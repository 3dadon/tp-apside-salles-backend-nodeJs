import roomDao from "../dao/room.dao";
import Room from "../models/room.model";

class RoomService {

    constructor(){
        
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
}

export default new RoomService();