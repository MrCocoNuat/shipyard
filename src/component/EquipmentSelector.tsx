import React from "react";
import { Equipment, EquipmentType, Ship } from "../type/types";
import SingleCategoryEquipmentSelector from "./SingleCategoryEquipmentSelector.tsx";

function EquipmentSelector({ship, setShip} : {ship : Ship | null, setShip : React.Dispatch<React.SetStateAction<Ship | null>>}) {
    const upgradeConfig = ship?.hull.atUpgrade[ship.upgrade];
    if (!upgradeConfig){
        return <></>; // nothing to display, this ship is invalid
    }
    const slotConfig = upgradeConfig.slots;
    console.warn(ship.equipment);
    return <div>
        {Object.entries(slotConfig).filter(([, slotCount]) => slotCount > 0).map(([equipmentType, slotCount], equipmentTypeIndex) => 
            <div key={equipmentTypeIndex /* totally fine to use this - if it changes, the whole ship needs to be wiped anyway*/}>
                <div>{equipmentType}</div>
                <SingleCategoryEquipmentSelector {...{ship, setShip, equipmentType: equipmentType as EquipmentType, slotCount}}/>
            </div>
        )}
        </div>
}

export default EquipmentSelector;