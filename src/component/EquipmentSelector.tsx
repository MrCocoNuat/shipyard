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
                    <Select key={equipmentIndex} options={toOptions(equipment[equipmentType])} 
                    defaultValue={toOption(ship.equipment[equipmentType][equipmentIndex])}
                    onChange={chosenEquipment => {
                        if (chosenEquipment == null){
                            return;
                        }
                        const copy = {...ship.equipment[equipmentType]};
                        copy[equipmentIndex] = chosenEquipment.value as Equipment;
                        chosenEquipment && setShip({...ship, equipment: {...ship.equipment, [equipmentType]: copy}});
                    }}
                    /> // extract these - too shallow! this does not need full setShip!
                )}
            </div>
        )}
        </div>
}

export default EquipmentSelector;