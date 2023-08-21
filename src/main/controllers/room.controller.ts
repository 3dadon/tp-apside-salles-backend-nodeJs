import { Request, Response } from "express";
import roomService from "../services/room.service";

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
      const roomFound = await roomService.findById(roomId);
      
      if(roomFound === null || roomFound === undefined) {
          res.status(404).send({"errorMessage": "There is no room with id "+roomId});
      }

      res.status(200).send(roomFound);
      console.log('roomFound : '+roomFound);
    } catch (err) {
      console.log("Error while retrieving room with id : "+roomId);
      res.status(500).send({
        message: "Some error occurred while retrieving room with id : "+roomId
      });
    }
  }

  async save(req: Request, res: Response) {
    try {
      const roomSaved = await roomService.save(req.body);

      res.status(200).send(roomSaved);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Some error occurred while creating room."
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      let room = req.body;
      room.id = parseInt(req.params.id);
      const result = await roomService.update(room);

      if(result===1) {
        res.status(200).send({"message":"update de la salle "+room.id+" OK"});
      } else {
        res.status(404).send({"errorMessage":"Impossible d\'updater la salle d\'id "+room.id});
      }
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