import { useState } from 'react';
import Select from 'react-select';
import React from 'react';
import { Ship } from '../type/types.ts';
import HullSelector from './HullSelector.tsx';
import EquipmentSelector from './EquipmentSelector.tsx';



function Selector() {
    const [ship, setShip] = useState(null as Ship | null);
    console.log("Current ship:", ship);

    return (
      <div className="selector">
        <div className="hull-selector">
          <HullSelector ship={ship} setShip={setShip}/>
          <EquipmentSelector ship={ship} setShip={setShip}/>
          {/* <Select options={Array.from(hullDefinitions).map(hullDefinition => ({value: hullDefinition, label: hullDefinition.name}))} onChange={(hullDefinition) => setShip(emptyShip(hullDefinition.value))}/> */}
          {/* <p>{ship && ship.hull.maxMass}</p> */}
        </div>
        {/* <div className="weapon-selector">
            {new Array(ship?.hull.slots.weapon || 0).fill(0).map((_, i) => <Select options={Array.from(weaponDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div>
        <div className="armor-selector">
            {new Array(ship?.hull.slots.armor || 0).fill(0).map((_, i) => <Select options={Array.from(armorDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div>
        <div className="special-selector">
            {new Array(ship?.hull.slots.special || 0).fill(0).map((_, i) => <Select options={Array.from(specialDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div> */}
      </div>
    );
  }
  
  export default Selector;
  