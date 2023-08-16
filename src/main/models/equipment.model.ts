export interface IEquipment {
    name: string;
    iconName: string;
    isPresent: boolean;
}

export class Equipment implements IEquipment {
    constructor(public name: string, public iconName: string, public isPresent: boolean) {}
}