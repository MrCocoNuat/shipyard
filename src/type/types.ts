enum EquipmentType {
    WEAPON,
    ARMOR,
    SPECIAL,
    RESISTOR,
    SHIELD,
    HANGAR,
    ABLATOR,
    SCREEN,
    SPAWNER,
    TRIGGER,
    OPERATION,
    EXPERIMENTAL_SALVAGE,
    UPGRADE,
    SKIN,
    BLOOD_WEAPON
}

enum WeaponType {
    RAY_CANNON,
    BEAM,
    DRIVER,
    VULCAN,
    MISSILE,
    TORPEDO,
    SQUADRON,
    SPAWNER
}

enum DamageType {
    UNTYPED,
    ENERGY,
    KINETIC,
    EXPLOSIVE,
    ALIEN,
    PLASMA,
    BLIGHT,
    BLOOD
}

enum Upgrade {
    MK1,
    MK2,
    MK3,
    MK4,
    MK5,
    ELITE
}

enum Faction {
    MINER_REBELLION,
    VEGA_FEDERATION,
    VEGA_SECURITY,
    IRON_STAR_COMPANY,
    DEMON_CORPS,
    ALIEN,
    XENO_DIVISION,
    AXIS,
    MARAUDERS,
    ALTAIRIAN,
    UMBRA,
    PHARMAKON,
    SPECTRE_DIVISION,
    IMPERIUM_LIBERATUS,
    RETROCITORS,
    ASTRAL_BARONY,
    RETROSYN_CONSORTIUM,
    VEGA_ALLIANCE,
    BLOOD_REBELLION,
    NIGHTFALL_COALITION,
    QUANTUM_ENFORCER
}

enum Class {
    CORVETTE,
    FRIGATE,
    CRUISER,
    BATTLESHIP,
    DESTROYER,
    CARRIER,
    SPECIALIST,
    FIGHTER,
    TITAN,
    RANGER,
    DREADNOUGHT,
    SECTOR_FLAGSHIP
}

const FLAGSHIP_CLASSES = [Class.CARRIER, Class.DREADNOUGHT, Class.SECTOR_FLAGSHIP]

enum Tier {
    T1,
    T2,
    T3,
    T4,
    T5,
    T6,
    T7,
    T8,
    T9,
    T10,
    T11,
    T12,
    T13,
    T14
}

type HullDefinition {
    name : string,
    upgrade : {[upgradeLevel : Upgrade] : 
        {
        slots: {[equipmentType : EquipmentType] : number}
        maxMass: number,
        effects: any[]
        }
    }
}


}

type Ship {
    hull: HullDefinition
    equipment: {any[]}
}

