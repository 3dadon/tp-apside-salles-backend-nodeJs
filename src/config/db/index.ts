import { Sequelize } from "sequelize-typescript";
import Room from "../../main/models/room.model";
import { config, dialect } from "./db.config";
import { Equipment } from "../../main/models/equipment.model";
import { RoomEquipment } from "../../main/models/room-equipment.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [Room, Equipment, RoomEquipment]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;
