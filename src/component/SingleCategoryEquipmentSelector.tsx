import Select from "react-select";
import { Consumer, Equipment, EquipmentType, SetState, Ship } from "../type/types.ts";
import { toOption, toOptions } from "./labeler.ts";
import { equipment } from "../definition/DefinitionProvider.ts";
import React from "react";

function setSingleEquipment(ship: Ship, setSingleCategoryEquipment: Consumer<Equipment[]>, equipmentType: EquipmentType, index: number, equipment: Equipment){
    const copy = [...ship.equipment[equipmentType]];
    copy[index] = equipment;
    setSingleCategoryEquipment(copy);
}

function SingleCategoryEquipmentSelector({ship, setSingleCategoryEquipment, equipmentType, slotCount} : {ship: Ship, setSingleCategoryEquipment : Consumer<Equipment[]>, equipmentType : EquipmentType, slotCount: number}) {
    return Array.from({length: slotCount}, (_, equipmentIndex) =>
        <Select key={equipmentIndex} options={toOptions<Equipment>(equipment[equipmentType])} 
        value={toOption(ship.equipment[equipmentType][equipmentIndex])}
        onChange={chosenEquipment => {
            chosenEquipment && setSingleEquipment(ship, setSingleCategoryEquipment, equipmentType, equipmentIndex, chosenEquipment.value);
        }}
        /> 
    )
}

export default SingleCategoryEquipmentSelector;