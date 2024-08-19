import { equipment } from "../definition/DefinitionProvider";
import { Equipment, EquipmentType, Ship } from "../type/types.ts";
import { sum } from "../util/util.ts";
import { massModifiersOf } from "./ModifierEngine.ts";

export function massOf(ship: Ship){
    let totalMass = ship.hull.unladenMass;
    console.warn("unladen mass:", totalMass);
    const massModifiers = massModifiersOf(ship);
    // sum each equipmentType's mass
    const massByEquipmentType = {};
    for (const equipmentType in EquipmentType){
        const equipmentList : {[index in number]: Equipment} = ship.equipment[equipmentType];
        console.log(equipmentType, equipmentList);
        massByEquipmentType[equipmentType] = sum(Object.values(equipmentList).map(equipment => equipment.mass || 0));
    }
    console.warn("massByEquipmentType:", massByEquipmentType);
    totalMass += sum(Object.values(massByEquipmentType));

    // apply equipment-specific massModifiers NOT to modified mass
    const additionalMassByEquipmentType = {};
    for (const equipmentType in EquipmentType){
        additionalMassByEquipmentType[equipmentType] = 0;
        for (const relevantMassModifier of massModifiers.filter(massModifier => massModifier.equipmentType === equipmentType)){
            additionalMassByEquipmentType[equipmentType] += relevantMassModifier.massPercent * massByEquipmentType[equipmentType] / 100;
        }
        additionalMassByEquipmentType[equipmentType] = Math.round(additionalMassByEquipmentType[equipmentType]);
    }
    console.warn("additionalMassByEquipmentType:", additionalMassByEquipmentType);
    totalMass += sum(Object.values(additionalMassByEquipmentType));

    // apply ship massModifiers to MODIFIED mass
    let additionalMass = 0;
    for (const shipMassModifier of massModifiers.filter(massModifier => massModifier.equipmentType === null)){
        additionalMass += Math.round(shipMassModifier.massPercent * totalMass / 100);
    }
    console.warn("ship modifier additional mass:", additionalMass);
    totalMass += additionalMass;
    

    return totalMass;
}