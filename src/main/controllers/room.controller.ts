import { Application } from "express";

export function initRoomCtrl (server: Application) {
    server.get("/rooms", (req, res) => {
        res.end('GET /rooms');
      });
}