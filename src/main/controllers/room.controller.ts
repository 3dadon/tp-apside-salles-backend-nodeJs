import { Application } from "express";
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
}


export function initRoomCtrl (server: Application) {
    server.get("/rooms", (req, res) => {
        res.end('GET /rooms');
    });
}

export function roomWorks(req: Request, res: Response): Response {
  return res.json({ message: "room works !" });
}