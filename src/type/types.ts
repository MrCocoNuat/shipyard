import { DotToken, EnumType, EqualsToken } from "typescript";

enum RestrictionType {
    TIER,
    FACTION,
    CLASS
} 
type Restriction = TierRestriction | FactionRestriction | ClassRestriction;
type TierRestriction = {
    restrictionType: RestrictionType.TIER
    allowedTiers: Tier[],
}    
type FactionRestriction = {
    restrictionType: RestrictionType.FACTION
    allowedFactions: Faction[]
}
type ClassRestriction = {
    restrictionType: RestrictionType.CLASS
    allowedClasses: Class[]
}

enum EquipmentType {
    WEAPON,
    ARMOR,
    SPECIAL,
    RESISTOR,
    SHIELD,
    HANGAR,
    ABLATOR, // "Ablative Armor"
    SCREEN,
    SPAWNER,
    TRIGGER,
    OPERATION,
    EXPERIMENTAL_SALVAGE,
    UPGRADE,
    SKIN,
    BLOOD_WEAPON
}
const DEFENSE_TYPES = [EquipmentType.SHIELD, EquipmentType.ABLATOR, EquipmentType.SCREEN]

type Equipment = Armor | Shield | Ablator;

type Weapon = {
    equipmentType: EquipmentType.WEAPON,
    name: string,
    mass: number,
    weaponType: WeaponType,
    damageType: DamageType,
    dps: number
}

type Armor = {
    equipmentType: EquipmentType.ARMOR,
    name: string,
    mass: number,
    health: number,
    modifiers: Modifier[]
    restrictions: Restriction[]
}

type Shield = {
    equipmentType: EquipmentType.SHIELD,
    name: string,
    mass: number,
    energy: number,
    absorbancePercent: number,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

type Ablator = {
    equipmentType: EquipmentType.ABLATOR,
    name: string,
    mass: number,
    energy: number,
    absorbancePercent: number,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

type Special = {
    equipmentType: EquipmentType.SPECIAL,
    name: string,
    modifiers: Modifier[],
    restrictions: Restriction[]
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
    VOID,
    BLOOD,
    QUANTUM,
    ENERGY_NEBULA,
    KINETIC_NEBULA,
    EXPLOSIVE_NEBULA,
    ALIEN_NEBULA,
    PLASMA_NEBULA,
    BLIGHT_NEBULA,
    VOID_NEBULA
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
    BATTLECRUISER,
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

type Modifier = MassModifier | ArmorResistanceModifier | DefenseResistanceModifier | ShipResistanceModifier ; // | OtherEffecct | ...
enum ModifierType {
    MASS,
    ARMOR_RESISTANCE, // this applies resistance only to the health that the armor itself provides
    DEFENSE_RESISTANCE, // this applies resistance only to the energy that the defense itself provides
    SHIP_RESISTANCE // this applies resistance to the health of the whole ship
} 


type MassModifier = {
    modifierType: ModifierType.MASS,
    equipmentType: EquipmentType | null, // null implies whole ship mass
    massPercent: number
}
type ArmorResistanceModifier = {
    modifierType: ModifierType.ARMOR_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}
type DefenseResistanceModifier = {
    modifierType: ModifierType.DEFENSE_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}
type ShipResistanceModifier = {
    modifierType: ModifierType.SHIP_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}

type Hull = {
    name : string,
    tier : Tier,
    faction : Faction,
    class: Class,
    unladenMass: number,
    atUpgrade : {[upgrade in Upgrade] : 
        {
        slots: {[equipmentType in EquipmentType] : number | null}
        maxMass: number,
        modifiers: Modifier[]
        } | undefined
    }
}


type Ship = {
    hull: Hull
    equipment: any[]
}

