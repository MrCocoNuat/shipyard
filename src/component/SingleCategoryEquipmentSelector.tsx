import Select from "react-select";
import { Equipment, EquipmentType, Ship } from "../type/types.ts";
import { toOption, toOptions } from "./labeler.ts";
import { equipment } from "../definition/DefinitionProvider.ts";
import React from "react";

function SingleCategoryEquipmentSelector({ship, setShip, equipmentType, slotCount} : {ship: Ship, setShip : React.Dispatch<React.SetStateAction<Ship | null>>, equipmentType : EquipmentType, slotCount: number}) {
    return Array.from({length: slotCount}, (_, equipmentIndex) =>
        <Select key={equipmentIndex} options={toOptions<Equipment>(equipment[equipmentType])} 
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
        // also resetting will not work if ship is the only prop since it never changed!
    )
}

export default SingleCategoryEquipmentSelector;