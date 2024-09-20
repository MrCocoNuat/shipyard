# shipyard

*project under construction*

A fully-featured fleet planner for the online RTS Vega Conflict. Unfortunately I have come to despise both this game and playing it and I will vehemently discourage from even touching it anyone who values their own time even marginally. Thus I have also little motivation to continue working on this repository.

Hopefully it will be useful to somebody.

![comparison to ingame](/assets/comparison.png)

The core features are already present - 90% of what remains is data transformation of all the hulls and equipment from the game into this planner, as I only imported the equipment I use in the game. Most of the rest is UI, I suppose.


### Technology

This is a static React app served up by whatever server you please. It runs on Node for now but there is no particular requirement for it to.

### Building
Simple as: 
```sh
git clone https://github.com/mrcoconuat/shipyard
cd shipyard
npm install
npm run start
```
 
## Design

Here's the fun part!

The major types are:
```typescript
export type Ship = {
    hull: Hull,
    upgrade: Upgrade,
    equipment: {[equipmentType in EquipmentType] : Equipment[]}
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
```
allowing for flexible specification of any hull at any upgrade.

Equipment is defined with a general union type, and the marker field `equipmentType`:
```typescript
export type Equipment = Weapon | Armor | Shield | Ablator | Special | Hangar | UpgradeEquipment; // | ...

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
```

Restrictions and Modifiers are built out the same, succintly capturing the game's logic:
```typescript
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


export type Modifier = MassModifier | ArmorResistanceModifier | DefenseResistanceModifier | ShipResistanceModifier ; // | OtherEffect | ...

export type MassModifier = {
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
```

And all of these neatly come together into Definitions:
```json
{
    "name": "Segmenter",
    "tier": "T13",
    "faction": "VEGA_ALLIANCE",
    "class": "SPECIALIST",
    "unladenMass": 400,
    "atUpgrade": {
        "MK1": {
            "maxMass": 19000,
            "slots": {
                "BLOOD_WEAPON": 4,
                "ARMOR": 2,
                "SHIELD": 2,
                "SPECIAL": 2,
                "TRIGGER": 1,
                "UPGRADE": 1
            },
            "modifiers": [
                {
                    "modifierType": "MASS",
                    "equipmentType": "ARMOR",
                    "massPercent": -10
                },
                {
                    "modifierType": "MASS",
                    "equipmentType": "SHIELD",
                    "massPercent": -20
                }
            ]
        },
        "MK2": {
            "maxMass": 20000,
            "slots": {
                "BLOOD_WEAPON": 4,
                "ARMOR": 3,
                "SHIELD": 2,
                "SPECIAL": 2,
                "TRIGGER": 1,
                "UPGRADE": 1
            }
            // ...
        }
    }
}


{
    "name": "Blood Aorta Vulcan 4",
    "mass": 6151,
    "weaponType": "VULCAN",
    "damageType": "BLOOD",
    "dps": 32500,
    "restrictions": [
        {
            "restrictionType": "TIER",
            "allowedTiers": ["T13","T14"]
        },
        {
            "restrictionType": "FACTION",
            "allowedFactions": ["VEGA_ALLIANCE", "NIGHTFALL_COALITION"]
        },
        {
            "restrictionType": "BLOOD",
            "bloodRestrictionType": "MUST_BE_BLOOD"
        }
    ]
}
```
