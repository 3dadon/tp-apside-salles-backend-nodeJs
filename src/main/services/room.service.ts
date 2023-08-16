import { ICrudInterface } from "../dao/crud.interface";
import roomDao from "../dao/room.dao";
import Room from "../models/room.model";

class RoomService implements ICrudInterface{

    async findById(roomId: number) {
      try {
        return await roomDao.findById(roomId);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get Room with id : "+roomId);
      }
    }

    async update(room: Room) {
      try {
        const updatedRows = await roomDao.update(room);
        return updatedRows[0]; //le premier élément du tableau de résultats renvoyé par Sequelize représente le nombre de lignes updatés
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get Room with id : "+room.id);
      }   
    }


    async delete(any: any) {
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