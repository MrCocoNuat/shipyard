import React, { useContext } from "react";
import { Complement, Consumer, Equipment, EquipmentType, isDefined, SetState, Ship } from "../type/types";
import SingleCategoryEquipmentSelector from "./SingleCategoryEquipmentSelector.tsx";
import { getAllEnumEntries, getAllEnumValues } from "enum-for";
import { ShipContext } from "./Planner.tsx";

function setSingleCategoryEquipment(ship: Ship, setEquipment: Consumer<Complement>, equipmentType : EquipmentType, newEquipment: Equipment[]){
    const copy = ship.equipment;
    copy[equipmentType] = newEquipment;
    setEquipment(copy);
}

function EquipmentSelector({setEquipment} : {setEquipment : Consumer<Complement>}) {

    const ship = useContext(ShipContext);

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
                <SingleCategoryEquipmentSelector 
                setSingleCategoryEquipment={newSingleCategoryEquipment => setSingleCategoryEquipment(ship, setEquipment, equipmentType as EquipmentType, newSingleCategoryEquipment)} 
                    {...{ ship, equipmentType: equipmentType as EquipmentType, slotCount }}/>
            </div>
        )}
        </div>
}

export default EquipmentSelector;