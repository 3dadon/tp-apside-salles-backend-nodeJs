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
    this.router.get("/:id", this.roomController.findById);
    this.router.post("/create", this.roomController.save);
    this.router.put("/update/:id", this.roomController.update);
  }
}

export default new RoomRoutes().router;
