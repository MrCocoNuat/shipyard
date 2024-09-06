import { createContext, useState } from 'react';
import React from 'react';
import { Complement, SetState, Ship } from '../type/types.ts';
import HullSelector from './HullSelector.tsx';
import EquipmentSelector from './EquipmentSelector.tsx';
import { massOf } from '../engine/MassEngine.ts';
import MassGauge from './MassGauge.tsx';

export const ShipContext = createContext(null as Ship | null);

function setEquipment(ship : Ship | null, setShip : SetState<Ship | null>,  newEquipment : Complement){
  if (ship == null) return;
  var copy = {...ship, equipment: newEquipment};
  setShip(copy);
}

function Selector() {
    const [ship, setShip] = useState(null as Ship | null);
    console.log("Current ship:", ship);

    return (
      <ShipContext.Provider value={ship}>
      <div className="selector">
        <div className="hull-selector">
          <HullSelector {...{setShip}}/>
          {ship && <MassGauge target={ship}/>}
          <EquipmentSelector setEquipment={newEquipment => setEquipment(ship, setShip, newEquipment)} />
        </div>
      </div>
      </ShipContext.Provider>
    );
  }
  
  export default Selector;
  