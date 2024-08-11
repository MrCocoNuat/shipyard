import * as hullJsons from './hull.json';
import * as weaponJsons from './weapon.json';
import * as armorJsons from './armor.json';
import * as specialJsons from './special.json';
import * as shieldJsons from './shield.json';
import {EquipmentType, Hull, Tier, Upgrade, WeaponType} from '../type/types.ts';

// some massaging is necessary to turn json into real definitions.
// Typescript infers incoming tier and faction definitions and so on are only of type string, 
// not of more the narrow types Tier or Faction
export const hulls : Hull[] = Array.from(hullJsons) as Hull[];


console.log("Hellion is tier 14:",  hulls[0].tier == Tier.T14);
console.log("Segmenter is tier 13:", hulls[1].tier== Tier.T13);
console.log("Hellion's innate modifiers at mk4:", hulls[0].atUpgrade[Upgrade.MK4]?.modifiers);
console.log("Hellion's weapon and blood weapon slots at elite:", hulls[0].atUpgrade[Upgrade.ELITE]?.slots[EquipmentType.WEAPON], hulls[0].atUpgrade[Upgrade.ELITE]?.slots[EquipmentType.BLOOD_WEAPON]);