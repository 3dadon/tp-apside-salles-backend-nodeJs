import { Application } from "express";
import { Request, Response } from "express";


export function initRoomCtrl (server: Application) {
    server.get("/rooms", (req, res) => {
        res.end('GET /rooms');
    });
}

export function roomWorks(req: Request, res: Response): Response {
  return res.json({ message: "room works !" });
}