import { ModifierFlags } from "typescript";
import { Equipment, EquipmentType, isMassModifier, MassModifier, Modifier, Ship, Upgrade } from "../type/types.ts";

// each equipment can generate massModifiers for any equipmentType or the whole ship
export function equipmentMassModifiersOf(ship: Ship){
    const massModifiers : MassModifier[] = [];
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

// these are done differently! applied multiplicatively on the additive equipment mass modifiers
export function innateMassModifiersOf(ship: Ship){
    const upgradeConfig = ship.hull.atUpgrade[ship.upgrade];
    if (upgradeConfig == null){
        throw Error(`upgrade not supported, how did you do this? ${ship}`);
    }
    if (upgradeConfig.modifiers === undefined){
        return [];
    }
    return upgradeConfig.modifiers.filter(isMassModifier);
}
