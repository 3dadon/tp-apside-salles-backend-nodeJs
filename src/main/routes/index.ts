import { Application } from "express";
import roomRoutes from "./room.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/rooms", roomRoutes);
  }
}
