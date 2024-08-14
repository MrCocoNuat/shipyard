import { Equipment, EquipmentType, Hull, Ship, Upgrade } from "../type/types.ts";
import Select from 'react-select';
import {hulls} from '../definition/DefinitionProvider.ts';
import React from "react";
import { toOption, toOptionRaw, toOptions, toOptionsRaw } from "./labeler.ts";

function upgradesOf(hull: Hull){
    return Object.values(Upgrade).filter(upgrade => hull.atUpgrade[upgrade]);
}

function emptyShip(hull : Hull | null, upgrade : Upgrade) : Ship | null {
    return hull == null ? null : {hull: hull, upgrade: upgrade, equipment: emptyEquipment(hull, upgrade)};
}

function emptyEquipment(hull: Hull | null, upgrade : Upgrade) :  {[equipmentType in EquipmentType]? : Equipment[]}{
    const upgradeConfig = hull?.atUpgrade[upgrade];
    if (!upgradeConfig){
        return {};
    }
    const slotConfig = upgradeConfig.slots;
    const equipment = {};
    Object.entries(slotConfig).forEach(([equipmentType, slotCount]) => equipment[equipmentType] = Array(slotCount))
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
            defaultValue={toOptionRaw(ship.upgrade)} 
            onChange={upgrade => upgrade && setShip(emptyShip(ship.hull, upgrade.value as Upgrade))}/>}
        </div>
}

export default HullSelector;