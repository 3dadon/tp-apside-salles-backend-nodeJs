import { Model, Table, Column, DataType } from "sequelize-typescript";


@Table({
    tableName: "t_room",
  })
export default class Room extends Model {

    @Column({
        type: DataType.NUMBER,
        field: "capacity"
    })
    capacity?: number;

    @Column({
        type: DataType.BOOLEAN,
        field: "accessibility"
    })
    accessibility?: boolean;

    // @Column({
    //     type: DataType.ARRAY,
    //     field: "equipments"
    // })
    // equipments?: Equipment[];

    @Column({
        type: DataType.STRING,
        field: "address"
    })
    address?: string;

    @Column({
        type: DataType.STRING,
        field: "telephone"
    })
    telephone?: string;
}