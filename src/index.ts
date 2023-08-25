import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./main/routes";
import Database from "./config/db";
import Room from "./main/models/room.model";
import { Equipment } from "./main/models/equipment.model";
import { RoomEquipment } from "./main/models/room-equipment.model";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:4200"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync();
    Room.belongsToMany(Equipment, {as:'equipments', through: RoomEquipment, foreignKey: 'room_id'});
    console.log('Sequelize instances : '+db.sequelize?.models);
  }
}
