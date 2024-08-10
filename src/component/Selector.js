import * as hullDefinitions from '../specs/hull.json';
import * as weaponDefinitions from '../specs/weapon.json';
import * as armorDefinitions from '../specs/armor.json';
import * as specialDefinitions from '../specs/special.json';
import { useState } from 'react';
import Select from 'react-select';

function Selector() {
    const [hull, setHull] = useState(null);
    // hull will need to be distinctified from shipDefinition - and this will need to be shipDefinition
    //  hullDefinition = {name, maxmass, slots, ...}
    // shipDefinition = {hull, mass, weapons, armor, specials, ...}
    return (
      <div className="selector">
        <div className="hull-selector">
          <Select options={Array.from(hullDefinitions).map(hullDefinition => ({value: hullDefinition, label: hullDefinition.name}))} onChange={(hullDefinition) => setHull(hullDefinition.value)}/>
          <p>{hull && hull.maxMass}</p>
        </div>
        <div className="weapon-selector">
            {new Array(hull?.slots.weapon || 0).fill(0).map((_, i) => <Select options={Array.from(weaponDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div>
        <div className="armor-selector">
            {new Array(hull?.slots.armor || 0).fill(0).map((_, i) => <Select options={Array.from(armorDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div>
        <div className="special-selector">
            {new Array(hull?.slots.special || 0).fill(0).map((_, i) => <Select options={Array.from(specialDefinitions).map(weaponDefinition => ({value: weaponDefinition, label: weaponDefinition.name}))} key={i}/>)}
        </div>
      </div>
    );
  }
  
  export default Selector;
  