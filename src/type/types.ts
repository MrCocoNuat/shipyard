export enum RestrictionType {
    TIER = "TIER",
    FACTION = "FACTION",
    CLASS = "CLASS",
    BLOOD = "BLOOD",
} 
export type Restriction = TierRestriction | FactionRestriction | ClassRestriction | BloodRestriction;
export type TierRestriction = {
    restrictionType: RestrictionType.TIER
    allowedTiers: Tier[],
}    
export function isTierRestriction(restriction : Restriction) : restriction is TierRestriction{
    return restriction.restrictionType === RestrictionType.TIER;
}
export type FactionRestriction = {
    restrictionType: RestrictionType.FACTION
    allowedFactions: Faction[]
}
export function isFactionRestriction(restriction : Restriction) : restriction is FactionRestriction{
    return restriction.restrictionType === RestrictionType.FACTION;
}
export type ClassRestriction = {
    restrictionType: RestrictionType.CLASS
    allowedClasses: Class[]
}
export function isClassRestriction(restriction : Restriction) : restriction is ClassRestriction{
    return restriction.restrictionType === RestrictionType.CLASS;
}
export enum BloodRestrictionType {
    CAN_BE_BLOOD = "CAN_BE_BLOOD", // can be fit in both Weapon and Blood Weapon slots
    MUST_BE_BLOOD = "MUST_BE_BLOOD" // can only be fit into Blood Weapon slots
}
export type BloodRestriction = {
    restrictionType: RestrictionType.BLOOD,
    bloodRestrictionType: BloodRestrictionType
}
export function isBloodRestriction(restriction : Restriction) : restriction is BloodRestriction{
    return restriction.restrictionType === RestrictionType.BLOOD;
}

export enum EquipmentType {
    WEAPON = "WEAPON",
    ARMOR = "ARMOR",
    SPECIAL = "SPECIAL",
    RESISTOR = "RESISTOR",
    SHIELD = "SHIELD",
    HANGAR = "HANGAR",
    ABLATOR = "ABLATOR", // "Ablative Armor"
    SCREEN = "SCREEN",
    SPAWNER = "SPAWNER",
    TRIGGER = "TRIGGER",
    OPERATION = "OPERATION",
    EXPERIMENTAL_SALVAGE = "EXPERIMENTAL_SALVAGE",
    UPGRADE = "UPGRADE",
    SKIN = "SKIN",
    BLOOD_WEAPON = "BLOOD_WEAPON"
}
const DEFENSE_TYPES = [EquipmentType.SHIELD, EquipmentType.ABLATOR, EquipmentType.SCREEN] as const;

export type Equipment = Weapon | Armor | Shield | Ablator | Special | Hangar;

export type Weapon = {
    equipmentType: EquipmentType.WEAPON,
    name: string,
    mass: number,
    weaponType: WeaponType,
    damageType: DamageType,
    dps: number,
    modifiers: Modifier[]
    restrictions: Restriction[]
}

export type Armor = {
    equipmentType: EquipmentType.ARMOR,
    name: string,
    mass: number,
    health: number,
    modifiers: Modifier[]
    restrictions: Restriction[]
}

export type Shield = {
    equipmentType: EquipmentType.SHIELD,
    name: string,
    mass: number,
    energy: number,
    absorbancePercent: number,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

export type Hangar = {
    equipmentType: EquipmentType.HANGAR,
    name: string,
    mass: number,
    dps: number,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

export type Ablator = {
    equipmentType: EquipmentType.ABLATOR,
    name: string,
    mass: number,
    energy: number,
    absorbancePercent: number,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

export type Special = {
    equipmentType: EquipmentType.SPECIAL,
    name: string,
    mass: undefined,
    modifiers: Modifier[],
    restrictions: Restriction[]
}

export enum WeaponType {
    RAY_CANNON = "RAY_CANNON",
    BEAM = "BEAM",
    DRIVER = "DRIVER",
    VULCAN = "VULCAN",
    MISSILE = "MISSILE",
    TORPEDO = "TORPEDO",
    SQUADRON = "SQUADRON",
    SPAWNER = "SPAWNER"
}

export enum DamageType {
    UNTYPED = "UNTYPED",
    ENERGY = "ENERGY",
    KINETIC = "KINETIC",
    EXPLOSIVE = "EXPLOSIVE",
    ALIEN = "ALIEN",
    PLASMA = "PLASMA",
    BLIGHT = "BLIGHT",
    VOID = "VOID",
    BLOOD = "BLOOD",
    QUANTUM = "QUANTUM",
    ENERGY_NEBULA = "ENERGY_NEBULA",
    KINETIC_NEBULA = "KINETIC_NEBULA",
    EXPLOSIVE_NEBULA = "EXPLOSIVE_NEBULA",
    ALIEN_NEBULA = "ALIEN_NEBULA",
    PLASMA_NEBULA = "PLASMA_NEBULA",
    BLIGHT_NEBULA = "BLIGHT_NEBULA",
    VOID_NEBULA = "VOID_NEBULA"
}

export enum Upgrade {
    MK1 = "MK1",
    MK2 = "MK2",
    MK3 = "MK3",
    MK4 = "MK4",
    MK5 = "MK5",
    ELITE = "ELITE"
}

export enum Faction {
    MINER_REBELLION = "MINER_REBELLION",
    VEGA_FEDERATION = "VEGA_FEDERATION",
    VEGA_SECURITY = "VEGA_SECURITY",
    IRON_STAR_COMPANY = "IRON_STAR_COMPANY",
    DEMON_CORPS = "DEMON_CORPS",
    ALIEN = "ALIEN",
    XENO_DIVISION = "XENO_DIVISION",
    AXIS = "AXIS",
    MARAUDERS = "MARAUDERS",
    ALTAIRIAN = "ALTAIRIAN",
    UMBRA = "UMBRA",
    PHARMAKON = "PHARMAKON",
    SPECTRE_DIVISION = "SPECTRE_DIVISION",
    IMPERIUM_LIBERATUS = "IMPERIUM_LIBERATUS",
    RETROCITORS = "RETROCITORS",
    ASTRAL_BARONY = "ASTRAL_BARONY",
    RETROSYN_CONSORTIUM = "RETROSYN_CONSORTIUM",
    VEGA_ALLIANCE = "VEGA_ALLIANCE",
    BLOOD_REBELLION = "BLOOD_REBELLION",
    NIGHTFALL_COALITION = "NIGHTFALL_COALITION",
    QUANTUM_ENFORCER = "QUANTUM_ENFORCER"
}

export enum Class {
    CORVETTE = "CORVETTE",
    FRIGATE = "FRIGATE",
    CRUISER = "CRUISER",
    BATTLESHIP = "BATTLESHIP",
    DESTROYER = "DESTROYER",
    CARRIER = "CARRIER",
    SPECIALIST = "SPECIALIST",
    BATTLECRUISER = "BATTLECRUISER",
    FIGHTER = "FIGHTER",
    TITAN = "TITAN",
    RANGER = "RANGER",
    DREADNOUGHT = "DREADNOUGHT",
    SECTOR_FLAGSHIP = "SECTOR_FLAGSHIP"
}

const FLAGSHIP_CLASSES = [Class.CARRIER, Class.DREADNOUGHT, Class.SECTOR_FLAGSHIP] as const;

export enum Tier {
    T1 = "T1",
    T2 = "T2",
    T3 = "T3",
    T4 = "T4",
    T5 = "T5",
    T6 = "T6",
    T7 = "T7",
    T8 = "T8",
    T9 = "T9",
    T10 = "T10",
    T11 = "T11",
    T12 = "T12",
    T13 = "T13",
    T14 = "T14"
}

export type Modifier = MassModifier | ArmorResistanceModifier | DefenseResistanceModifier | ShipResistanceModifier ; // | OtherEffecct | ...
export enum ModifierType {
    MASS = "MASS",
    ARMOR_RESISTANCE = "ARMOR_RESISTANCE", // this applies resistance only to the health that the armor itself provides
    DEFENSE_RESISTANCE = "DEFENSE_RESISTANCE", // this applies resistance only to the energy that the defense itself provides
    SHIP_RESISTANCE = "SHIP_RESISTANCE" // this applies resistance to the health of the whole ship
} 


export type MassModifier = { //TODO: WEAPON mass modifiers affect squadrons too
    modifierType: ModifierType.MASS,
    equipmentType: EquipmentType | null, // null implies whole ship mass
    massPercent: number
}
export function isMassModifier(modifier : Modifier) : modifier is MassModifier {
    return modifier.modifierType === ModifierType.MASS;
}
export type ArmorResistanceModifier = {
    modifierType: ModifierType.ARMOR_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}
export function isArmorResistanceModifier(modifier : Modifier) : modifier is ArmorResistanceModifier {
    return modifier.modifierType === ModifierType.ARMOR_RESISTANCE;
}
export type DefenseResistanceModifier = {
    modifierType: ModifierType.DEFENSE_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}
export function isDefenseResistanceModifier(modifier : Modifier) : modifier is DefenseResistanceModifier {
    return modifier.modifierType === ModifierType.DEFENSE_RESISTANCE;
}
export type ShipResistanceModifier = {
    modifierType: ModifierType.SHIP_RESISTANCE,
    damageType: DamageType,
    resistancePercent: number
}
export function isShipResistanceModifier(modifier : Modifier) : modifier is ShipResistanceModifier {
    return modifier.modifierType === ModifierType.SHIP_RESISTANCE;
}

export type Hull = {
    name : string,
    tier : Tier,
    faction : Faction,
    class: Class,
    unladenMass: number,
    atUpgrade : {[upgrade in Upgrade]? : 
        {
        slots: {[equipmentType in EquipmentType]? : number}
        maxMass: number,
        modifiers: Modifier[]
        } | undefined
    }
}


export type Ship = {
    hull: Hull,
    upgrade: Upgrade,
    equipment: {[equipmentType in EquipmentType] : Equipment[]}
}
export type Complement = Ship["equipment"]
export function isShip(ship : any) : ship is Ship {
    return ship.hull !== undefined;
}


export type Fleet = {
    ships: [Ship] | [Ship, Ship] | [Ship, Ship, Ship] | [Ship, Ship, Ship, Ship] | [Ship, Ship, Ship, Ship, Ship] | [Ship, Ship, Ship, Ship, Ship, Ship],
}
export function isFleet(fleet : any) : fleet is Fleet {
    return fleet.ships !== undefined;
}


// it is really annoying to have to put this everywhere
export type SelectOption<T> = {value: T, label: string}
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>
export type Consumer<T> = (arg: T) => void
export type BiConsumer<T,U> = (arg1: T, arg2: U) => void
export function isDefined<T>(arg: T | null | undefined) : arg is T {
    return arg !== null && arg !== undefined;
}