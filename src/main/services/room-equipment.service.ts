import { ICrudInterface } from "../dao/crud.interface";
import roomEquipmentDao from "../dao/room-equipment.dao";
import roomDao from "../dao/room.dao";
import { Equipment } from "../models/equipment.model";
import {RoomEquipment} from "../models/room-equipment.model";
import Room from "../models/room.model";
import {Observable, of} from 'rxjs';
import equipmentService from "./equipment.service";

class RoomEquipmentService implements ICrudInterface{

    async findById(roomId: number) {}

    async update(roomEquipment: RoomEquipment) {
      try {
        const updatedRows = await roomEquipmentDao.update(roomEquipment);
        return updatedRows[0]; //le premier élément du tableau de résultats renvoyé par Sequelize représente le nombre de lignes updatés
      } catch (err) {
        console.log(err);
        throw new Error("Failed to get Room with id : "+roomEquipment.id);
      }   
    }


    async delete(roomEquipment: RoomEquipment) {
      try {
        return await roomEquipmentDao.delete(roomEquipment);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to delete Room Equipment");
      }  
    }

    async deleteByRoomId(roomId: number) {
      try {
        return await roomEquipmentDao.deleteByRoomId(roomId);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to delete Room Equipment");
      }  
    }

    async deleteLinksAndSaveNew(equipments: Equipment[], roomId: number) {
      try {
        this.deleteByRoomId(roomId)
            .then(() => {
              equipments.filter((allEq) => allEq.isPresent).forEach((eqPresent) => {
                equipmentService.findByName(eqPresent.name).then((_eqToSave) => {
                  console.log('_eqToSave :'+JSON.stringify(_eqToSave));
                  if(_eqToSave) {
                    let roomEquipment: RoomEquipment = new RoomEquipment();
                    roomEquipment.EquipmentId = _eqToSave.id;
                    roomEquipment.room_id = roomId;
                    this.save(roomEquipment);
                  }
                });
              });
            });
      } catch (err) {
        throw new Error("Unable to link update room equipments");
      }
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

    async save(roomEquipment: RoomEquipment): Promise<RoomEquipment> {
      try {
        return await roomEquipmentDao.save(roomEquipment);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create RoomEquipment !");
      }
    }

    saveAllEquipments(equipments: Equipment[], roomId: number): Promise<RoomEquipment[]> {
      return Promise.all(this.getSaveAllPromises(equipments, roomId));
    }

    getSaveAllPromises(equipments: Equipment[], roomId: number): Promise<RoomEquipment>[] {
        const promises: Promise<RoomEquipment>[] = [];
        (equipments).filter((_eq)=>_eq.isPresent).forEach((eq) => {
          equipmentService.findByName(eq.name).then((_eqLoaded) => {
            if(_eqLoaded) {
              let roomEquipment: RoomEquipment = new RoomEquipment();
              roomEquipment.EquipmentId = _eqLoaded.id;
              roomEquipment.room_id = roomId;
              const promise = this.save(roomEquipment)
              promises.push(promise);
            }
          });
        });
        return promises;
    }

    deleteAllEquipments(equipments: Equipment[], roomId: number): Promise<any> {
      return Promise.all(this.deleteSaveAllPromises(equipments, roomId));
    }

    deleteSaveAllPromises(equipments: Equipment[], roomId: number): Promise<any>[] {
        const promises: Promise<any>[] = [];
        (equipments).filter((_eq)=>!_eq.isPresent).forEach((eq) => {
          equipmentService.findByName(eq.name).then((_eqLoaded) => {
            if(_eqLoaded) {
              let roomEquipment: RoomEquipment = new RoomEquipment();
              roomEquipment.EquipmentId = _eqLoaded.id;
              roomEquipment.room_id = roomId;
              const promise = this.delete(roomEquipment)
              promises.push(promise);
            }
          });
        });
        return promises;
    }
}

export default new RoomEquipmentService();