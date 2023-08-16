import { Application } from "express";
import roomRoutes from "./room.route";
import authRoutes from "./auth.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/rooms", roomRoutes);
    app.use("/api/auth", authRoutes);
  }
}
