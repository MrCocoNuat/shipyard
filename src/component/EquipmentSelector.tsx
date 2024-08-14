import React from "react";
import { Equipment, Ship } from "../type/types";
import SingleCategoryEquipmentSelector from "./SingleCategoryEquipmentSelector";
import Select from "react-select";
import { toOption, toOptions } from "./labeler.ts";
import { equipment } from "../definition/DefinitionProvider.ts";

function EquipmentSelector({ship, setShip} : {ship : Ship | null, setShip : React.Dispatch<React.SetStateAction<Ship | null>>}) {
    const upgradeConfig = ship?.hull.atUpgrade[ship.upgrade];
    if (!upgradeConfig){
        return <></>; // nothing to display, this ship is invalid
    }
    const slotConfig = upgradeConfig.slots;
    console.warn(slotConfig);
    console.warn(ship.equipment);
    return <div>
        {Object.entries(slotConfig).filter(([, slotCount]) => slotCount > 0).map(([equipmentType, slotCount], equipmentTypeIndex) => 
            <div key={equipmentTypeIndex /* totally fine to use this - if it changes, the whole ship needs to be wiped anyway*/}>
                <div>{equipmentType}</div>
                {Array.from({length: slotCount}, (_, equipmentIndex) =>
                    <Select options={toOptions(equipment[equipmentType])} 
                    defaultValue={toOption(ship.equipment[equipmentType][equipmentIndex])} // LOOKHERE when this quipment slot is empty, this is UNDEFINED passed into toOption!!
                    onChange={chosenEquipment => chosenEquipment && setShip({...ship, equipment: {...ship.equipment, [equipmentType]: ship.equipment[equipmentType].slice().splice(equipmentIndex, 1, chosenEquipment.value as Equipment)}})}
                    /> // extract these - too shallow! this does not need full setShip!
                )}
            </div>
        )}
        </div>
}

export default EquipmentSelector;