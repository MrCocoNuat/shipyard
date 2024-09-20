import { equipment } from "../definition/DefinitionProvider";
import { Equipment, EquipmentType, Ship } from "../type/types.ts";
import { sum } from "../util/util.ts";
import { equipmentMassModifiersOf, innateMassModifiersOf } from "./ModifierEngine.ts";


 // order is extremely important - these steps are not associative
export function massOf(ship: Ship){
    let totalMass = ship.hull.unladenMass;
    console.warn("unladen mass:", totalMass);

    // sum each equipmentType's mass
    // apply innate massModifiers here
    const innateMassModifiers = innateMassModifiersOf(ship);
    const massByEquipmentType = {};
    for (const equipmentType in EquipmentType){
        const equipmentList : {[index in number]: Equipment} = ship.equipment[equipmentType];
        massByEquipmentType[equipmentType] = sum(Object.values(equipmentList).map(equipment => equipment.mass || 0));
        let innateAdditionalMass = 0;
        for (const relevantMassModifier of innateMassModifiers.filter(massModifier => massModifier.equipmentType === equipmentType)){
            innateAdditionalMass += relevantMassModifier.massPercent * massByEquipmentType[equipmentType] / 100;
        }
        massByEquipmentType[equipmentType] += innateAdditionalMass;
    }
    console.warn("massByEquipmentType:", massByEquipmentType);
    totalMass += sum(Object.values(massByEquipmentType));

    // apply equipment-specific massModifiers
    const equipmentMassModifiers = equipmentMassModifiersOf(ship); 
    const additionalMassByEquipmentType = {};
    for (const equipmentType in EquipmentType){
        additionalMassByEquipmentType[equipmentType] = 0;
        for (const relevantMassModifier of equipmentMassModifiers.filter(massModifier => massModifier.equipmentType === equipmentType)){
            additionalMassByEquipmentType[equipmentType] += relevantMassModifier.massPercent * massByEquipmentType[equipmentType] / 100;
        }
        additionalMassByEquipmentType[equipmentType] = additionalMassByEquipmentType[equipmentType];
    }
    console.warn("additionalMassByEquipmentType:", additionalMassByEquipmentType);
    totalMass += sum(Object.values(additionalMassByEquipmentType));

    // apply ship massModifiers
    let additionalMass = 0;
    for (const shipMassModifier of equipmentMassModifiers.filter(massModifier => massModifier.equipmentType === null)){
        additionalMass += shipMassModifier.massPercent * totalMass / 100;
    }
    console.warn("ship modifier additional mass:", additionalMass);
    totalMass += additionalMass;

    return Math.ceil(totalMass);
}