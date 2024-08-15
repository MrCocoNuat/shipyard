import { ModifierFlags } from "typescript";
import { Equipment, EquipmentType, isMassModifier, MassModifier, Ship, Upgrade } from "../type/types.ts";

export function massModifiersOf(ship: Ship){
    // each equipment can generate massModifiers for any equipmentType or the whole ship
    // nevertheless it is OK to put all of them together, they are associative
    const upgradeConfig = ship.hull.atUpgrade[ship.upgrade];
    if (upgradeConfig == null){
        throw Error(`upgrade not supported, how did you do this? ${ship}`);
    }
    if (upgradeConfig.modifiers === undefined){
        return [];
    }
    const massModifiers = upgradeConfig.modifiers.filter(isMassModifier);
    for(const equipmentType in EquipmentType){
        const equipmentList : {[index in number]: Equipment} = ship.equipment[equipmentType];
        if (equipmentList === undefined){
            continue;
        }
        for (const equipment of Object.values(equipmentList)){
            if (equipment !== undefined && equipment.modifiers !== undefined){ 
                massModifiers.push(...equipment.modifiers.filter(isMassModifier));
            }
        }
    }
    return massModifiers;
}
