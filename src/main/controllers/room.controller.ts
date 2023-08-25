import { Request, Response, json } from "express";
import roomService from "../services/room.service";
import roomEquipmentService from "../services/room-equipment.service";
import Room from "../models/room.model";
import { RoomEquipment } from "../models/room-equipment.model";
import { Equipment } from "../models/equipment.model";
import equipmentService from "../services/equipment.service";

export class RoomController {

  constructor() {}

  async findAll(req: Request, res: Response) {
    try {
      const rooms = await roomService.findAll();

      res.status(200).send(rooms);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while retrieving rooms."
      });
    }

  }

  async findById(req: Request, res: Response) {
    const roomId = parseInt(req.params.id);

    try {
      await roomService.findById(roomId).then((roomFound) => {
        if(roomFound === null || roomFound === undefined) {
            res.status(404).send({"errorMessage": "There is no room with id "+roomId});
        }
  
        res.status(200).send(roomFound);
        console.log('roomFound : '+roomFound);
      });
    } catch (err) {
      console.log("Error while retrieving room with id : "+roomId);
      res.status(500).send({
        message: "Some error occurred while retrieving room with id : "+roomId
      });
    }
  }

  async save(req: Request, res: Response) {
    try {
      await roomService.save(req.body).then((roomSaved) => {
        // Liaison room-équipements
        let equipments: Equipment[] = req.body.equipments;
        let checkedEquipments = equipments.filter((allEq) => allEq.isPresent);
        if(checkedEquipments.length > 0) {
          checkedEquipments.forEach((eq) => {
            equipmentService.findByName(eq.name).then((_eq) => {
              console.log('eq :'+JSON.stringify(_eq));
              if(_eq) {
                let roomEquipment: RoomEquipment = new RoomEquipment();
                roomEquipment.EquipmentId = _eq.id;
                roomEquipment.room_id = roomSaved.id;
                roomEquipmentService.save(roomEquipment).then(() => {res.status(200).send(roomSaved);}).catch((err) => {throw new Error("Sauvegarde des équipements sélectionnés impossible.");});
              }
            });
          });
        } else {
          res.status(200).send(roomSaved);
        }
      })
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while creating room."
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let room: Room = req.body;
      room.id = parseInt(req.params.id);
      let message = {success: "", error: ""};
      await roomService.update(room).then((result) => {
        if (result===1) {
          console.log(JSON.stringify(req.body.equipments));
          let equipments: Equipment[] = req.body.equipments;
          roomEquipmentService.deleteLinksAndSaveNew(equipments, room.id)
          .then(() => {
            message.success = "Sauvegarde de la salle et des équipements OK";
            res.status(200).send(message);
          }).catch((error) => {
            console.log(error);
            message.error = "Erreur lors de la sauvegarde des équipements";
            throw new Error(message.error);
          });
        } else {
          res.status(404).send({"errorMessage":"Impossible d\'updater la salle d\'id "+room.id});
        }
      }).catch((error) => {
        console.log(error);
        message.error = "Erreur lors de la sauvegarde des équipements";
        res.status(500).send(message);
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({"errorMessage":"Failed to update Room with id : "+req.params.id});
      throw new Error("Failed to update Room with id : "+req.params.id);
    }   
  }

  async delete(req: Request, res: Response) {
    try {
      const roomId = parseInt(req.params.id);
      const result = await roomService.delete(roomId);

      if(result && result > 0) {
        res.status(200).send({"message":"delete de la salle "+roomId+" OK"});
      } else {
        res.status(404).send({"errorMessage":"Impossible de supprimer la salle d\'id "+roomId});
      }
    } catch(err) {
      console.log('Erreur lors de la suppression de la salle d\'id '+req.params.id);
    }
  }
}