import React from "react";
import { massOf } from "../engine/MassEngine.ts";
import { Fleet, isShip, Ship } from "../type/types.ts";

function MassGauge({target} : {target : Ship | Fleet}){
    if (isShip(target)){
        const maxMass = target.hull.atUpgrade[target.upgrade]?.maxMass;
        const currentMass = massOf(target);
        return <div>
            <label className="flex flex-col items-center">
                <div>{`Mass`}</div>
                <div>{`${currentMass} / ${maxMass}`}</div>
                <meter max={maxMass} value={currentMass}/>
            </label>
        </div>
    }
    return <></>; // unsupported
}

export default MassGauge;