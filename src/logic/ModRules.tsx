import { DamageType } from "bungie-api-ts/destiny2";
import { getAllMods } from "src/logic/Mods";

export const enum Raid {
	LW     = "enhancements.season_outlaw",
	Garden = "enhancements.raid_garden",
	DSC    = "enhancements.raid_descent",
	VoG    = "enhancements.raid_v520",
	Vow    = "enhancements.raid_v600",
	KF     = "enhancements.raid_v620",
	RoN    = "enhancements.raid_v700",
}

export const enum Weight {
	Primary,
	Special,
	Heavy
}

// TODO:
//export const DamageType.None = 8;

export interface ModRule {
	buffsWeaponEnergy?: DamageType[];
	buffsAmmo?: Weight[];
}

export function getModsForRaid( raid: Raid ) {
	return getAllMods().slice().filter( m => m.plug?.plugCategoryIdentifier === raid );
}

export const modRules: Record<number, ModRule> = {
	2793473444: {
		/* Absolution */
	},
	3184690956: {
		/* Absolution */
	},
	1401506405: {
		/* Aggressive Oracle Disruptor */
	},
	2725575870: {
		/* Anti-Oracle */
	},
	2725575871: {
		/* Anti-Praetorian */
	},
	2059068466: {
		/* Arc Dexterity */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	2794359402: {
		/* Arc Dexterity */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	3798468567: {
		/* Arc Holster */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	4294909663: {
		/* Arc Holster */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	1125523126: {
		/* Arc Loader */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	3046678542: {
		/* Arc Loader */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	450381139: {
		/* Arc Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	4283953067: {
		/* Arc Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	953234331: {
		/* Arc Resistance */
	},
	3539253011: {
		/* Arc Resistance */
	},
	534479613: {
		/* Arc Scavenger */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	2436471653: {
		/* Arc Scavenger */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	2724068510: {
		/* Arc Siphon */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	3847471926: {
		/* Arc Siphon */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	96682422: {
		/* Arc Targeting */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	967052942: {
		/* Arc Targeting */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	1834163303: {
		/* Arc Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	2246316031: {
		/* Arc Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	856936828: {
		/* Ashes to Assets */
	},
	2136310244: {
		/* Ashes to Assets */
	},
	3064687909: {
		/* Benevolent Finisher */
	},
	2194294579: {
		/* Better Already */
	},
	3245543337: {
		/* Bolstering Detonation */
	},
	3726719281: {
		/* Bolstering Detonation */
	},
	4188291233: {
		/* Bomber */
	},
	4004774874: {
		/* Bulwark Finisher */
	},
	1036972936: {
		/* Cabal Extinguisher */
	},
	2577472338: {
		/* Charged Up */
	},
	3181984586: {
		/* Charged Up */
	},
	539051925: {
		/* Chill Out */
	},
	930759851: {
		/* Concussive Dampener */
	},
	3719981603: {
		/* Concussive Dampener */
	},
	1435557120: {
		/* Discipline Mod */
	},
	3896141096: {
		/* Discipline Mod */
	},
	1098978103: {
		/* Distorted Glyphkeeper */
	},
	4039026690: {
		/* Distribution */
	},
	4267244538: {
		/* Distribution */
	},
	3895804619: {
		/* Dreambane Mod */
	},
	1604394872: {
		/* Dynamo */
	},
	2414626352: {
		/* Dynamo */
	},
	422994787: {
		/* Emergency Reinforcement */
	},
	1024379611: {
		/* Emergency Reinforcement */
	},
	84503918: {
		/* Empowered Finish */
	},
	1208761894: {
		/* Empowered Finish */
	},
	1996040463: {
		/* Enhanced Nightmare Banisher */
	},
	4193902249: {
		/* Enhanced Nightmare Breaker */
	},
	1565861116: {
		/* Enhanced Nightmare Crusher */
	},
	817361141: {
		/* Enhanced Operator Augment */
	},
	3630287380: {
		/* Enhanced Relay Defender */
	},
	2037533514: {
		/* Enhanced Resistant Tether */
	},
	1578165808: {
		/* Enhanced Scanner Augment */
	},
	1362793604: {
		/* Enhanced Suppressor Augment */
	},
	4020036031: {
		/* Enhanced Voltaic Ammo Collector */
	},
	865380761: {
		/* Enhanced Voltaic Mote Collector */
	},
	4004774877: {
		/* Explosive Finisher */
	},
	2649291407: {
		/* Fastball */
	},
	965934024: {
		/* Firepower */
	},
	2485657760: {
		/* Firepower */
	},
	1036972938: {
		/* Focused Darkness */
	},
	1036972939: {
		/* Focused Light */
	},
	3657186535: {
		/* Focusing Strike */
	},
	3685945823: {
		/* Focusing Strike */
	},
	1901221009: {
		/* Font of Agility */
	},
	4046357305: {
		/* Font of Agility */
	},
	686455429: {
		/* Font of Endurance */
	},
	3075302157: {
		/* Font of Endurance */
	},
	1255614814: {
		/* Font of Focus */
	},
	1781551382: {
		/* Font of Focus */
	},
	1193713026: {
		/* Font of Restoration */
	},
	1672155562: {
		/* Font of Restoration */
	},
	633101315: {
		/* Font of Vigor */
	},
	2771425787: {
		/* Font of Vigor */
	},
	1130820873: {
		/* Font of Wisdom */
	},
	3461249873: {
		/* Font of Wisdom */
	},
	1924584408: {
		/* Grenade Kickstart */
	},
	4182064480: {
		/* Grenade Kickstart */
	},
	1036557198: {
		/* Hands-On */
	},
	3938489430: {
		/* Hands-On */
	},
	1677180919: {
		/* Harmonic Dexterity */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	2479297167: {
		/* Harmonic Dexterity */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	3969361392: {
		/* Harmonic Holster */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1702273159: {
		/* Harmonic Loader */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	2657604783: {
		/* Harmonic Loader */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1103878128: {
		/* Harmonic Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1971149752: {
		/* Harmonic Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1293710444: {
		/* Harmonic Resistance */
	},
	877723168: {
		/* Harmonic Scavenger */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1301391064: {
		/* Harmonic Scavenger */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	3832366019: {
		/* Harmonic Siphon */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1305536863: {
		/* Harmonic Targeting */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	1891463783: {
		/* Harmonic Targeting */
		buffsWeaponEnergy: [ DamageType.None ],
	},
	4004774875: {
		/* Healthy Finisher */
	},
	644105: {
		/* Heavy Ammo Finder */
	},
	554409585: {
		/* Heavy Ammo Finder */
	},
	1274140735: {
		/* Heavy Ammo Scout */
	},
	1709236482: {
		/* Heavy Handed */
	},
	2447449706: {
		/* Heavy Handed */
	},
	2142852459: {
		/* Herd Thinner */
	},
	377010989: {
		/* Impact Induction */
	},
	1153260021: {
		/* Impact Induction */
	},
	1750845415: {
		/* Innervation */
	},
	3325390304: {
		/* Insulation */
	},
	1866564759: {
		/* Intellect Mod */
	},
	2724608735: {
		/* Intellect Mod */
	},
	4230067633: {
		/* Into the Light */
	},
	1848187513: {
		/* Invigoration */
	},
	1561736585: {
		/* Kinetic Dexterity */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2076329105: {
		/* Kinetic Dexterity */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	3276278122: {
		/* Kinetic Holster */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	3573031954: {
		/* Kinetic Holster */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2237975061: {
		/* Kinetic Loader */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2586562813: {
		/* Kinetic Loader */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2305736470: {
		/* Kinetic Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2407398462: {
		/* Kinetic Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	579997810: {
		/* Kinetic Scavenger */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	1097608874: {
		/* Kinetic Scavenger */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	897335593: {
		/* Kinetic Siphon */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	1388734897: {
		/* Kinetic Siphon */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2214424583: {
		/* Kinetic Targeting */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2467203039: {
		/* Kinetic Targeting */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	14520248: {
		/* Kinetic Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	2318667184: {
		/* Kinetic Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	531057500: {
		/* Lucent Blades */
	},
	830369300: {
		/* Lucent Blades */
	},
	1763668984: {
		/* Melee Damage Resistance */
	},
	2562645296: {
		/* Melee Damage Resistance */
	},
	1139671158: {
		/* Melee Kickstart */
	},
	1763780622: {
		/* Melee Kickstart */
	},
	4021790309: {
		/* Minor Discipline Mod */
	},
	350061697: {
		/* Minor Intellect Mod */
	},
	2519597513: {
		/* Minor Intellect Mod */
	},
	1703647492: {
		/* Minor Mobility Mod */
	},
	1124184622: {
		/* Minor Recovery Mod */
	},
	1237786518: {
		/* Minor Recovery Mod */
	},
	2113881316: {
		/* Minor Resilience Mod */
	},
	2532323436: {
		/* Minor Resilience Mod */
	},
	2639422088: {
		/* Minor Strength Mod */
	},
	3808902618: {
		/* Mobility Mod */
	},
	4183296050: {
		/* Mobility Mod */
	},
	2031584061: {
		/* Momentum Transfer */
	},
	3599522901: {
		/* Momentum Transfer */
	},
	1291268263: {
		/* Mortal Medicine */
	},
	2874957617: {
		/* Nightmare Banisher */
	},
	1560574695: {
		/* Nightmare Breaker */
	},
	3736152098: {
		/* Nightmare Crusher */
	},
	1291268261: {
		/* Old Gods' Boon */
	},
	4004774873: {
		/* One-Two Finisher */
	},
	1039115606: {
		/* Orbs of Restoration */
	},
	3791691774: {
		/* Orbs of Restoration */
	},
	4160037471: {
		/* Outreach */
	},
	2982306509: {
		/* Power Preservation */
	},
	3149307605: {
		/* Power Preservation */
	},
	2175577211: {
		/* Powerful Friends */
	},
	1389309840: {
		/* Precise Jolts */
	},
	518521232: {
		/* Precise Oracle Disruptor */
	},
	2245839670: {
		/* Proximity Ward */
	},
	4081595582: {
		/* Proximity Ward */
	},
	4243059257: {
		/* Radiant Heat */
	},
	2199590568: {
		/* Radiant Light */
	},
	4076776732: {
		/* Rapid Oracle Disruptor */
	},
	40751621: {
		/* Reaper */
	},
	4149682173: {
		/* Reaper */
	},
	2493161484: {
		/* Recovery Mod */
	},
	4204488676: {
		/* Recovery Mod */
	},
	4087056174: {
		/* Recuperation */
	},
	3415291596: {
		/* Relay Defender */
	},
	1036972937: {
		/* Release Recover */
	},
	1180408010: {
		/* Resilience Mod */
	},
	2568808786: {
		/* Resilience Mod */
	},
	2887845822: {
		/* Resistant Tether */
	},
	1170405455: {
		/* Restorative Finisher */
	},
	1291268262: {
		/* Run for Your Life */
	},
	48578555: {
		/* Shield Break Charge */
	},
	3047946307: {
		/* Shield Break Charge */
	},
	3808234135: {
		/* Shocked Glyphkeeper */
	},
	2779468392: {
		/* Siphoned Glyphkeeper */
	},
	2851458940: {
		/* Smoldering Glyphkeeper */
	},
	4004774876: {
		/* Snapload Finisher */
	},
	657773637: {
		/* Sniper Damage Resistance */
	},
	707237917: {
		/* Sniper Damage Resistance */
	},
	531665167: {
		/* Solar Dexterity */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	3067648983: {
		/* Solar Dexterity */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	3675553168: {
		/* Solar Holster */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	3775916472: {
		/* Solar Holster */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	634608391: {
		/* Solar Loader */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	1079896271: {
		/* Solar Loader */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	411014648: {
		/* Solar Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2526773280: {
		/* Solar Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	3194530172: {
		/* Solar Resistance */
	},
	3846931924: {
		/* Solar Resistance */
	},
	56663992: {
		/* Solar Scavenger */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	688956976: {
		/* Solar Scavenger */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	1086997255: {
		/* Solar Siphon */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	4255093903: {
		/* Solar Siphon */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	331268185: {
		/* Solar Targeting */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2719698929: {
		/* Solar Targeting */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2283894334: {
		/* Solar Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2319885414: {
		/* Solar Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2831374162: {
		/* Solar/Strand Dual Siphon */
		buffsWeaponEnergy: [ DamageType.Thermal, DamageType.Strand ],
	},
	2595839237: {
		/* Special Ammo Finder */
	},
	3775800797: {
		/* Special Ammo Finder */
	},
	25154119: {
		/* Special Ammo Scout */
	},
	4004774872: {
		/* Special Finisher */
	},
	1627901452: {
		/* Stacks on Stacks */
	},
	3994043492: {
		/* Stacks on Stacks */
	},
	899058084: {
		/* Stagnant Glyphkeeper */
	},
	193878019: {
		/* Stasis Dexterity */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	2267311547: {
		/* Stasis Dexterity */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	335129856: {
		/* Stasis Holster */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	2801811288: {
		/* Stasis Holster */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	703902595: {
		/* Stasis Loader */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	2793548555: {
		/* Stasis Loader */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	3294892432: {
		/* Stasis Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	3462414552: {
		/* Stasis Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	638704972: {
		/* Stasis Resistance */
	},
	3456250548: {
		/* Stasis Resistance */
	},
	2734674728: {
		/* Stasis Scavenger */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	3174771856: {
		/* Stasis Scavenger */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	837201397: {
		/* Stasis Siphon */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	3188328909: {
		/* Stasis Siphon */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	721001747: {
		/* Stasis Targeting */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	1801153435: {
		/* Stasis Targeting */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	2526922422: {
		/* Stasis Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	2921714558: {
		/* Stasis Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	3323910164: {
		/* Strand Dexterity */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3979300428: {
		/* Strand Dexterity */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	2805854721: {
		/* Strand Holster */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3581696649: {
		/* Strand Holster */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	95934356: {
		/* Strand Loader */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	4244246940: {
		/* Strand Loader */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	2303417969: {
		/* Strand Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	4287822553: {
		/* Strand Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	1305848463: {
		/* Strand Scavenger */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	2257238439: {
		/* Strand Scavenger */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3279257734: {
		/* Strand Siphon */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3926119246: {
		/* Strand Siphon */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3000428062: {
		/* Strand Targeting */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3013778406: {
		/* Strand Targeting */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	1501094193: {
		/* Strand Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	3112965625: {
		/* Strand Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Strand ],
	},
	1763607626: {
		/* Strength Mod */
	},
	4287799666: {
		/* Strength Mod */
	},
	518521234: {
		/* Superstructure Defender */
	},
	1401506407: {
		/* Superstructure Medic */
	},
	4076776734: {
		/* Superstructure Striker */
	},
	3829100654: {
		/* Supreme Nightmare Banisher */
	},
	2023980600: {
		/* Supreme Nightmare Breaker */
	},
	2045123179: {
		/* Supreme Nightmare Crusher */
	},
	2859541905: {
		/* Taken Armaments */
	},
	3570105787: {
		/* Taken Barrier */
	},
	399528760: {
		/* Taken Invigoration */
	},
	2589105944: {
		/* Taken Repurposing */
	},
	2158846614: {
		/* Tangled Up */
	},
	1755737153: {
		/* Time Dilation */
	},
	1783952505: {
		/* Time Dilation */
	},
	3922904113: {
		/* Umbral Hastening */
	},
	1956421814: {
		/* Umbral Recharge */
	},
	2804214704: {
		/* Umbral Sharpening */
	},
	319908131: {
		/* Unflinching Arc Aim */
	},
	792400107: {
		/* Unflinching Arc Aim */
	},
	293178904: {
		/* Unflinching Harmonic Aim */
	},
	3094620656: {
		/* Unflinching Harmonic Aim */
	},
	1262438062: {
		/* Unflinching Kinetic Aim */
	},
	2325151798: {
		/* Unflinching Kinetic Aim */
	},
	1019574576: {
		/* Unflinching Solar Aim */
	},
	1553790504: {
		/* Unflinching Solar Aim */
	},
	1118428792: {
		/* Unflinching Stasis Aim */
	},
	2959504464: {
		/* Unflinching Stasis Aim */
	},
	3598972737: {
		/* Unflinching Strand Aim */
	},
	3979621113: {
		/* Unflinching Strand Aim */
	},
	3437323171: {
		/* Unflinching Void Aim */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	3887037435: {
		/* Unflinching Void Aim */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	1125986156: {
		/* Utility Finisher */
	},
	1044888195: {
		/* Utility Kickstart */
	},
	3160387771: {
		/* Utility Kickstart */
	},
	4076776733: {
		/* Vex Breaker */
	},
	1401506404: {
		/* Vex Destroyer */
	},
	518521233: {
		/* Vex Striker */
	},
	467550918: {
		/* Void Dexterity */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	1017385934: {
		/* Void Dexterity */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2452545487: {
		/* Void Holster */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2634786903: {
		/* Void Holster */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	3224649746: {
		/* Void Loader */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	3980769162: {
		/* Void Loader */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	1669792723: {
		/* Void Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2413278875: {
		/* Void Reserves */
		buffsAmmo: [ Weight.Special, Weight.Heavy ],
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2788997987: {
		/* Void Resistance */
	},
	3410844187: {
		/* Void Resistance */
	},
	802695661: {
		/* Void Scavenger */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2815817957: {
		/* Void Scavenger */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	1210012576: {
		/* Void Siphon */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2773358872: {
		/* Void Siphon */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	1589556860: {
		/* Void Targeting */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	2888195476: {
		/* Void Targeting */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	3467460423: {
		/* Void Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	3914973263: {
		/* Void Weapon Surge */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
	110793779: {
		/* Void/Strand Dual Siphon */
		buffsWeaponEnergy: [ DamageType.Void, DamageType.Strand ],
	},
	1947468772: {
		/* Volatile Volleys */
	},
	928186993: {
		/* Voltaic Ammo Collector */
	},
	4134680615: {
		/* Voltaic Mote Collector */
	},
	3643044286: {
		/* Will of Light (Arc) */
		buffsWeaponEnergy: [ DamageType.Arc ],
	},
	1291268260: {
		/* Will of Light (Kinetic) */
		buffsWeaponEnergy: [ DamageType.Kinetic ],
	},
	3540739611: {
		/* Will of Light (Solar) */
		buffsWeaponEnergy: [ DamageType.Thermal ],
	},
	2074494595: {
		/* Will of Light (Stasis) */
		buffsWeaponEnergy: [ DamageType.Stasis ],
	},
	852793406: {
		/* Will of Light (Void) */
		buffsWeaponEnergy: [ DamageType.Void ],
	},
};
