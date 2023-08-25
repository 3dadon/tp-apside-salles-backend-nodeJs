import { ICrudInterface } from "../dao/crud.interface";
import { Equipment } from "../models/equipment.model";

class EquipmentService implements ICrudInterface{
    save(any: any) {
        throw new Error("Method not implemented.");
    }
    findAll(any: any) {
        throw new Error("Method not implemented.");
    }
    findById(any: any) {
        throw new Error("Method not implemented.");
    }

    async findByName(_name?: string) {
       return await Equipment.findOne({ where: { name: _name } });
    }

    update(any: any) {
        throw new Error("Method not implemented.");
    }
    delete(any: any) {
        throw new Error("Method not implemented.");
    }

}

export default new EquipmentService();