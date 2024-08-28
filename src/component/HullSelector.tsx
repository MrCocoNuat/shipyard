import { Equipment, EquipmentType, Hull, Ship, Upgrade } from "../type/types.ts";
import Select from 'react-select';
import {emptyEquipmentOf, equipment, hulls} from '../definition/DefinitionProvider.ts';
import React from "react";
import { toOption, toOptionRaw, toOptions, toOptionsRaw } from "./labeler.ts";
import { getAllEnumValues } from "enum-for";

function upgradesOf(hull: Hull){
    return Object.values(Upgrade).filter(upgrade => hull.atUpgrade[upgrade]);
}

function emptyShip(hull : Hull | null, upgrade : Upgrade) : Ship | null {
    return hull == null ? null : {hull: hull, upgrade: upgrade, equipment: emptyEquipmentSetFor(hull, upgrade)};
}

function emptyEquipmentSetFor(hull: Hull | null, upgrade : Upgrade) : {[equipmentType in EquipmentType] : Equipment[]}{
    const equipment = {} as {[equipmentType in EquipmentType] : Equipment[]};
    const upgradeConfig = hull?.atUpgrade[upgrade];
    if (!upgradeConfig){
        throw Error(`Upgrade not supported ${hull}, ${upgrade}`);    
    }
    const slotConfig = upgradeConfig.slots;
    getAllEnumValues(EquipmentType).forEach(equipmentType => equipment[equipmentType] = Array.from({length: slotConfig[equipmentType] || 0}).fill(emptyEquipmentOf(equipmentType)) as Equipment[]);
    return equipment;
}

function upgradeChangedShip(ship : Ship, newUpgrade: Upgrade) : Ship {
    return {...ship, upgrade: newUpgrade, equipment: equipmentForCopiedFrom(ship.hull, newUpgrade, ship)};
}

// changing upgrade of a single hull shouldn't wipe the entire equipment
function equipmentForCopiedFrom(hull: Hull | null, upgrade : Upgrade, equipmentSource : Ship) {
    // this establishes slot config. 
    const equipment = emptyEquipmentSetFor(hull, upgrade);
    
    getAllEnumValues(EquipmentType).forEach(equipmentType => {
        const sourceEquipment = equipmentSource.equipment[equipmentType] || [];
        console.log(equipmentType, sourceEquipment);
        // fill in these with the old ship's equipment
        const spliceCount = Math.min(Object.entries(sourceEquipment).length, equipment[equipmentType].length)
        equipment[equipmentType].splice(0,spliceCount, ...(sourceEquipment.slice(0, spliceCount)));
        // and then the rest of the slots, if any, stay as emptyEquipment
    });
    return equipment;
  }

// yes, some of these should be useContext. I don't care.
function HullSelector({ship, setShip} : {ship : Ship | null, setShip : React.Dispatch<React.SetStateAction<Ship | null>>}) {
    return <div>
        <Select options={toOptions(hulls)} value={ship && toOption(ship.hull)} 
        onChange={selection => selection && setShip(emptyShip(selection.value, Upgrade.MK1))}/>
        {ship 
            && Object.keys(ship.hull.atUpgrade).length > 1  //don't show for ships with no upgrades
            && <Select options={toOptionsRaw(upgradesOf(ship.hull))} 
            value={toOptionRaw(ship.upgrade)} 
            onChange={upgrade => upgrade && setShip(upgradeChangedShip(ship, upgrade.value as Upgrade))}/>}
        </div>
}

export default HullSelector;