import { Router } from "express";
import { RoomController } from "../controllers/room.controller";

class RoomRoutes {
  router = Router();
  roomController = new RoomController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.roomController.findAll);
  }
}

export default new RoomRoutes().router;
