import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { RoomController } from "../controllers/room.controller";

class AuthRoutes {
  router = Router();
  authController = new AuthController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.authController.login);
  }
}

export default new AuthRoutes().router;
