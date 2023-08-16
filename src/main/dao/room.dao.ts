import room  from "../models/room.model";

class RoomDao {
    async findAll(): Promise<room[]> {
        try {
          console.log('RoomDao find all');
          return await room.findAll();
        } catch (error) {
          console.log('problème retrait données dao : '+error);
          throw new Error("Failed to retrieve rooms!");
        }
    }
}

export default new RoomDao();