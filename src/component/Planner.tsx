import { useState } from 'react';
import Select from 'react-select';
import React from 'react';
import { Ship } from '../type/types.ts';
import HullSelector from './HullSelector.tsx';
import EquipmentSelector from './EquipmentSelector.tsx';
import { massOf } from '../engine/MassEngine.ts';



function Selector() {
    const [ship, setShip] = useState(null as Ship | null);
    console.log("Current ship:", ship);

    return (
      <div className="selector">
        <div className="hull-selector">
          <HullSelector ship={ship} setShip={setShip}/>
          {ship && <div>
            <div>{`MASS: ${massOf(ship)}/${ship.hull.atUpgrade[ship.upgrade]?.maxMass}`}</div>
          </div>}
          <EquipmentSelector ship={ship} setShip={setShip}/>
        </div>
      </div>
    );
  }
  
  export default Selector;
  