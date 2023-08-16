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
}


export function initRoomCtrl (server: Application) {
    server.get("/rooms", (req, res) => {
        res.end('GET /rooms');
    });
}

export function roomWorks(req: Request, res: Response): Response {
  return res.json({ message: "room works !" });
}