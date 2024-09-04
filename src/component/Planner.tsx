import { useState } from 'react';
import React from 'react';
import { Complement, SetState, Ship } from '../type/types.ts';
import HullSelector from './HullSelector.tsx';
import EquipmentSelector from './EquipmentSelector.tsx';
import { massOf } from '../engine/MassEngine.ts';


function setEquipment(ship : Ship | null, setShip : SetState<Ship | null>,  newEquipment : Complement){
  if (ship == null) return;
  var copy = {...ship, equipment: newEquipment};
  setShip(copy);
}

function Selector() {
    const [ship, setShip] = useState(null as Ship | null);
    console.log("Current ship:", ship);

    return (
      <div className="selector">
        <div className="hull-selector">
          <HullSelector {...{ship, setShip}}/>
          {ship && <div>
            <div>{`MASS: ${massOf(ship)}/${ship.hull.atUpgrade[ship.upgrade]?.maxMass}`}</div>
          </div>}
          <EquipmentSelector {...{ship}} setEquipment={newEquipment => setEquipment(ship, setShip, newEquipment)} />
        </div>
      </div>
    );
  }
  
  export default Selector;
  