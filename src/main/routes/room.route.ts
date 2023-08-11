import { Router } from "express";
import { roomWorks } from "../controllers/room.controller";

class RoomRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", roomWorks);
  }
}

export default new RoomRoutes().router;
