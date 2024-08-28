import * as hullJsons from './hull.json';
import * as weaponJsons from './weapon.json';
import * as armorJsons from './armor.json';
import * as specialJsons from './special.json';
import * as shieldJsons from './shield.json';
import * as hangarJsons from './hangar.json';
import {Ablator, Armor, BloodRestrictionType, Equipment, EquipmentType, Hangar, Hull, RestrictionType, Shield, Special, Tier, Upgrade, Weapon, WeaponType} from '../type/types.ts';
import { unlink } from 'fs';


export const emptyHull = {
    name: "(none)",
    tier: null,
    faction: null,
    class: null,
    unladenMass: 0,
    atUpgrade: {
        "MK1": {
            slots: {},
            maxMass: 0,
            modifiers: []
        }
    }
}

export const emptyBlankEquipment = {
    name: "(none)",
    mass: 0,
    modifiers: [],
    restrictions: [],
}

export function emptyEquipmentOf<T extends Equipment>(equipmentType: EquipmentType) : T {
    return {...emptyBlankEquipment, equipmentType} as unknown as T; //TODO: temp
}

// some massaging is necessary to turn json into real definitions.
// Typescript infers incoming tier and faction definitions and so on are only of type string, 
// not of more the narrow types Tier or Faction
export const hulls : readonly Hull[] = [emptyHull, ...Array.from(hullJsons)] as Hull[];
export const weapons: readonly Weapon[] = [emptyEquipmentOf(EquipmentType.WEAPON), ...Array.from(weaponJsons)
                                    .filter(weapon => ! weapon.restrictions
                                                        .filter(restriction => restriction.restrictionType === RestrictionType.BLOOD)
                                                        .some(restriction => restriction.bloodRestrictionType === BloodRestrictionType.MUST_BE_BLOOD)) // exclude MUST_BE_BLOOD weapons
                                    .map(weaponJson => ({...weaponJson, equipmentType: EquipmentType.WEAPON}))] as Weapon[];
export const armor: readonly Armor[] = [emptyEquipmentOf(EquipmentType.ARMOR), ...Array.from(armorJsons).map(armorJson => ({...armorJson, equipmentType: EquipmentType.ARMOR}))] as Armor[];
export const specials: readonly Special[] =[emptyEquipmentOf(EquipmentType.SPECIAL), ...Array.from(specialJsons).map(specialJson => ({...specialJson, equipmentType: EquipmentType.SPECIAL}))] as Special[];
export const shields: readonly Shield[] = [emptyEquipmentOf(EquipmentType.SHIELD), ...Array.from(shieldJsons).map(shieldJson => ({...shieldJson, equipmentType: EquipmentType.SHIELD}))] as Shield[];
export const ablators = [emptyEquipmentOf(EquipmentType.ABLATOR)] as const;
export const screens = [emptyEquipmentOf(EquipmentType.SCREEN)] as const;
export const spawners = [emptyEquipmentOf(EquipmentType.SPAWNER)] as const;
export const resistors = [emptyEquipmentOf(EquipmentType.RESISTOR)] as const;
export const hangars = [emptyEquipmentOf(EquipmentType.HANGAR), ...Array.from(hangarJsons).map(hangarJson => ({...hangarJson, equipmentType: EquipmentType.HANGAR}))] as Hangar[];
export const triggers = [emptyEquipmentOf(EquipmentType.TRIGGER)] as const;
export const operations = [emptyEquipmentOf(EquipmentType.OPERATION)] as const;
export const experimentalSalvages = [emptyEquipmentOf(EquipmentType.EXPERIMENTAL_SALVAGE)] as const;
export const upgrades = [emptyEquipmentOf(EquipmentType.UPGRADE)] as const;
export const skins = [emptyEquipmentOf(EquipmentType.SKIN)] as const;
export const bloodWeapons : readonly Weapon[] = [emptyEquipmentOf(EquipmentType.WEAPON), ...Array.from(weaponJsons)
                                .filter(weapon => weapon.restrictions
                                                    .filter(restriction => restriction.restrictionType === RestrictionType.BLOOD)
                                                    .some(restriction => restriction.bloodRestrictionType === BloodRestrictionType.MUST_BE_BLOOD || restriction.bloodRestrictionType == BloodRestrictionType.CAN_BE_BLOOD))  // exclude any that are not CAN_BE_BLOOD or MUST_BE_BLOOD
                                .map(weaponJson => ({...weaponJson, equipmentType: EquipmentType.WEAPON}))] as Weapon[];

export const equipment = {
    [EquipmentType.WEAPON]: weapons,
    [EquipmentType.ARMOR]: armor,
    [EquipmentType.SPECIAL]: specials,
    [EquipmentType.SHIELD]: shields,
    [EquipmentType.ABLATOR]: ablators,
    [EquipmentType.SCREEN]: screens,
    [EquipmentType.SPAWNER]: spawners,
    [EquipmentType.RESISTOR]: resistors,
    [EquipmentType.HANGAR]: hangars,
    [EquipmentType.TRIGGER]: triggers,
    [EquipmentType.OPERATION]: operations,
    [EquipmentType.EXPERIMENTAL_SALVAGE]: experimentalSalvages,
    [EquipmentType.UPGRADE]: upgrades,
    [EquipmentType.BLOOD_WEAPON]: bloodWeapons,
    [EquipmentType.SKIN]: skins,
} as const;


// console.log("Hellion is tier 14:",  hulls[0].tier == Tier.T14);
// console.log("Segmenter is tier 13:", hulls[1].tier== Tier.T13);
// console.log("Hellion's innate modifiers at mk4:", hulls[0].atUpgrade[Upgrade.MK4]?.modifiers);
// console.log("Hellion's weapon and blood weapon slots at elite:", hulls[0].atUpgrade[Upgrade.ELITE]?.slots[EquipmentType.WEAPON], hulls[0].atUpgrade[Upgrade.ELITE]?.slots[EquipmentType.BLOOD_WEAPON]);