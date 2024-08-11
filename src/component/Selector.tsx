import { useState } from 'react';
import Select from 'react-select';
import React from 'react';
import {hulls} from '../definition/DefinitionProvider.ts';

function emptyShip(hullDefinition){
  return hullDefinition == null ? null : {hull: hullDefinition, equipment: [], specialEffects: []};
}

function Selector() {
    const [ship, setShip] = useState(null);
    console.log(hulls);

    return (
      <div className="selector">
        <div className="hull-selector">
          {"look in log"}
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
  