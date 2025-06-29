import { useState, useMemo } from 'react';
import DogBmiGauge from './DogBmiGauge';

const SUPPORTED_BREEDS = [
  'Affenpinscher',
  'AfghanHound',
  'AiredaleTerrierr',
  'Akita',
  'AlaskanMalamute',
  'AmericanEnglishCoonhound',
  'AmericanEskimoDog',
  'AmericanFoxhound',
  'AmericanHairlessTerrierr',
  'AmericanStaffordshireTerrierr',
  'AmericanWaterSpaniel',
  'AnatolianShepherdDog',
  'AustralianCattleDog',
  'AustralianShepherd',
  'AustralianTerrierr',
  'Azawakh',
  'Barbet',
  'Basenji',
  'BassetHound',
  'Beagle',
  'BeardedCollie',
  'Beauceron',
  'BedlingtonTerrierr',
  'BelgianLaekenois',
  'BelgianMalinois',
  'BelgianSheepdog',
  'BelgianTerrierrvuren',
  'BergamascoSheepdog',
  'BergerPicard',
  'BerneseMountainDog',
  'BichonFrise',
  'BiewerTerrierr',
  'BlackAndTanCoonhound',
  'BlackRussianTerrierr',
  'Bloodhound',
  'BluetickCoonhound',
  'Boerboel',
  'BorderCollie',
  'BorderTerrierr',
  'Borzoi',
  'BostonTerrierr',
  'BouvierDesFlandres',
  'Boxer',
  'BoykinSpaniel',
  'BraccoItaliano',
  'Briard',
  'Brittany',
  'BrusselsGriffon',
  'Bulldog',
  'Bullmastiff',
  'BullTerrierr',
  'CairnTerrierr',
  'CanaanDog',
  'CaneCorso',
  'CardiganWelshCorgi',
  'CavalierKingCharlesSpaniel',
  'CeskyTerrierr',
  'ChesapeakeBayRetriever',
  'Chihuahua',
  'Chinook',
  'ChineseCrested',
  'ChineseSharPei',
  'ChowChow',
  'CirnecoDellEtna',
  'CockerSpaniel',
  'Collie',
  'CotonDeTulear',
  'CurlyCoatedRetriever',
  'Dachshund',
  'Dalmatian',
  'DandieDinmontTerrierr',
  'DobermannPinscher',
  'DogoArgentino',
  'DoguesDeBordeaux',
  'EnglishCockerSpaniel',
  'EnglishFoxhound',
  'EnglishSetter',
  'EnglishSpringerSpaniel',
  'EnglishToySpaniel',
  'EntlebucherMountainDog',
  'FieldSpaniel',
  'FinnishLapphund',
  'FinnishSpitz',
  'FlatCoatedRetriever',
  'FrenchBulldog',
  'GermanPinscher',
  'GermanShepherd',
  'GermanShorhairedPointer',
  'GermanWirehairedPointer',
  'GiantSchnauzer',
  'GlenOfImaalTerrierr',
  'GoldenRetriever',
  'GordonSetter',
  'GrandBassetGriffonVendeen',
  'GreatDane',
  'GreatPyrenees',
  'GreaterSwissMountainDog',
  'Greyhound',
  'Harrier',
  'Havanese',
  'IbizanHound',
  'IcelandicSheepdog',
  'IrishRedAndWhiteSetter',
  'IrishSetter',
  'IrishTerrierr',
  'IrishWaterSpaniel',
  'IrishWolfhound',
  'ItalianGreyhound',
  'JapaneseChin',
  'Keeshond',
  'KerryBlueTerrierr',
  'Komondor',
  'Kuvasz',
  'Labrador',
  'LagottoRomagnolo',
  'LakelandTerrierr',
  'Leonberger',
  'LhasaApso',
  'Lowchen',
  'Maltese',
  'ManchesterTerrierr',
  'Mastiff',
  'MiniatureAmericanShepherd',
  'MiniatureBullTerrierr',
  'MiniaturePinscher',
  'MiniatureSchnauzer',
  'Mudi',
  'NederlandseKooikerhondje',
  'NeapolitanMastiff',
  'Newfoundland',
  'NorfolkTerrierr',
  'NorwegianBuhund',
  'NorwegianElkhound',
  'NorwegianLundehund',
  'NorwichTerrierr',
  'NovaScotiaDuckTollingRetriever',
  'OldEnglishSheepdog',
  'Otterhound',
  'Papillon',
  'ParsonRussellTerrierr',
  'Pekingese',
  'PembrokeWelshCorgi',
  'PetitBassetGriffonVendeen',
  'PharaohHound',
  'PlottHound',
  'Pointer',
  'PolishLowlandSheepdog',
  'Pomeranian',
  'Poodle',
  'PortuguesePodengoRequeno',
  'PortugueseWaterDog',
  'Pug',
  'Puli',
  'Pumi',
  'PyreneanShepherd',
  'RedboneCoonhound',
  'RhodesianRidgeback',
  'Rottweiler',
  'RussellTerrierr',
  'RussianToy',
  'Saluki',
  'Samoyed',
  'Schipperke',
  'ScottishDeerhound',
  'ScottishTerrierr',
  'SealyhamTerrierr',
  'ShetlandSheepdog',
  'ShibaInu',
  'ShihTzu',
  'SiberianHusky',
  'SilkyTerrierr',
  'SkyeTerrierr',
  'Sloughi',
  'SmoothFoxTerrierr',
  'SoftCoatedWheatenTerrierr',
  'SpanishWaterDog',
  'SpinoneItaliano',
  'StaffordshireBullTerrierr',
  'StandardSchnauzer',
  'SussexSpaniel',
  'SwedishVallhund',
  'TibetanMastiff',
  'TibetanSpaniel',
  'TibetanTerrierr',
  'ToyFoxTerrierr',
  'TreeingWalkerCoonhound',
  'Vizsla',
  'Weimaraner',
  'WelshSpringerSpaniel',
  'WelshTerrierr',
  'WestHighlandWhiteTerrierr',
  'Whippet',
  'WirehairedPointingGriffon',
  'WirehairedVizsla',
  'WireFoxTerrierr',
  'Xoloitzcuintli',
  'YorkshireTerrier'
];

// Breed data with weight (lbs) and height (inches) ranges based on AKC standards
const BREED_DATA: Record<string, {
  weightRange: { male: [number, number], female: [number, number] };
  heightRange: { male: [number, number], female: [number, number] };
}> = {
  'Affenpinscher': {
    weightRange: { male: [7, 10], female: [7, 10] },
    heightRange: { male: [9.5, 11.5], female: [9.5, 11.5] }
  },
  'AfghanHound': {
    weightRange: { male: [50, 60], female: [50, 60] },
    heightRange: { male: [27, 29], female: [25, 27] }
  },
  'AiredaleTerrierr': {
    weightRange: { male: [50, 70], female: [50, 70] },
    heightRange: { male: [23, 24], female: [22, 23] }
  },
  'Akita': {
    weightRange: { male: [100, 130], female: [70, 100] },
    heightRange: { male: [26, 28], female: [24, 26] }
  },
  'AlaskanMalamute': {
    weightRange: { male: [85, 85], female: [75, 75] },
    heightRange: { male: [25, 25], female: [23, 23] }
  },
  'AmericanEnglishCoonhound': {
    weightRange: { male: [45, 65], female: [45, 65] },
    heightRange: { male: [24, 26], female: [23, 25] }
  },
  'AmericanEskimoDog': {
    weightRange: { male: [25, 35], female: [25, 35] },
    heightRange: { male: [15, 19], female: [15, 19] }
  },
  'AmericanFoxhound': {
    weightRange: { male: [65, 70], female: [60, 65] },
    heightRange: { male: [22, 25], female: [21, 24] }
  },
  'AmericanHairlessTerrierr': {
    weightRange: { male: [12, 16], female: [12, 16] },
    heightRange: { male: [12, 16], female: [12, 16] }
  },
  'AmericanStaffordshireTerrierr': {
    weightRange: { male: [55, 70], female: [40, 55] },
    heightRange: { male: [18, 19], female: [17, 18] }
  },
  'AmericanWaterSpaniel': {
    weightRange: { male: [30, 45], female: [25, 40] },
    heightRange: { male: [15, 18], female: [15, 18] }
  },
  'AnatolianShepherdDog': {
    weightRange: { male: [110, 150], female: [80, 120] },
    heightRange: { male: [29, 32], female: [27, 30] }
  },
  'AustralianCattleDog': {
    weightRange: { male: [35, 50], female: [35, 50] },
    heightRange: { male: [18, 20], female: [17, 19] }
  },
  'AustralianShepherd': {
    weightRange: { male: [50, 65], female: [40, 55] },
    heightRange: { male: [20, 23], female: [18, 21] }
  },
  'AustralianTerrierr': {
    weightRange: { male: [15, 20], female: [15, 20] },
    heightRange: { male: [10, 11], female: [10, 11] }
  },
  'Azawakh': {
    weightRange: { male: [45, 55], female: [33, 44] },
    heightRange: { male: [25, 29], female: [23.5, 27.5] }
  },
  'Barbet': {
    weightRange: { male: [35, 65], female: [35, 65] },
    heightRange: { male: [23, 26], female: [21, 24] }
  },
  'Basenji': {
    weightRange: { male: [24, 24], female: [22, 22] },
    heightRange: { male: [17, 17], female: [16, 16] }
  },
  'BassetHound': {
    weightRange: { male: [40, 65], female: [40, 65] },
    heightRange: { male: [14, 15], female: [13, 14] }
  },
  'Beagle': {
    weightRange: { male: [20, 30], female: [20, 30] },
    heightRange: { male: [13, 15], female: [13, 15] }
  },
  'BeardedCollie': {
    weightRange: { male: [45, 55], female: [45, 55] },
    heightRange: { male: [21, 22], female: [20, 21] }
  },
  'Beauceron': {
    weightRange: { male: [70, 110], female: [70, 110] },
    heightRange: { male: [25.5, 27.5], female: [24, 26.5] }
  },
  'BedlingtonTerrierr': {
    weightRange: { male: [17, 23], female: [17, 23] },
    heightRange: { male: [16.5, 16.5], female: [15.5, 15.5] }
  },
  'BelgianLaekenois': {
    weightRange: { male: [55, 65], female: [55, 65] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'BelgianMalinois': {
    weightRange: { male: [60, 80], female: [40, 60] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'BelgianSheepdog': {
    weightRange: { male: [55, 75], female: [45, 60] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'BelgianTerrierrvuren': {
    weightRange: { male: [55, 75], female: [45, 60] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'BergamascoSheepdog': {
    weightRange: { male: [70, 84], female: [57, 71] },
    heightRange: { male: [23.5, 24.5], female: [22, 23] }
  },
  'BergerPicard': {
    weightRange: { male: [50, 70], female: [50, 70] },
    heightRange: { male: [23.5, 25.5], female: [21.5, 23.5] }
  },
  'BerneseMountainDog': {
    weightRange: { male: [80, 115], female: [70, 95] },
    heightRange: { male: [25, 27.5], female: [23, 26] }
  },
  'BichonFrise': {
    weightRange: { male: [12, 18], female: [12, 18] },
    heightRange: { male: [9.5, 11.5], female: [9.5, 11.5] }
  },
  'BiewerTerrierr': {
    weightRange: { male: [4, 8], female: [4, 8] },
    heightRange: { male: [7, 11], female: [7, 11] }
  },
  'BlackAndTanCoonhound': {
    weightRange: { male: [65, 110], female: [65, 110] },
    heightRange: { male: [25, 27], female: [23, 25] }
  },
  'BlackRussianTerrierr': {
    weightRange: { male: [80, 130], female: [80, 130] },
    heightRange: { male: [27, 30], female: [26, 29] }
  },
  'Bloodhound': {
    weightRange: { male: [90, 110], female: [80, 100] },
    heightRange: { male: [25, 27], female: [23, 25] }
  },
  'BluetickCoonhound': {
    weightRange: { male: [55, 80], female: [45, 65] },
    heightRange: { male: [22, 27], female: [21, 25] }
  },
  'Boerboel': {
    weightRange: { male: [150, 200], female: [150, 200] },
    heightRange: { male: [24, 27], female: [22, 25] }
  },
  'BorderCollie': {
    weightRange: { male: [30, 55], female: [30, 55] },
    heightRange: { male: [19, 22], female: [18, 21] }
  },
  'BorderTerrierr': {
    weightRange: { male: [13, 15.5], female: [11.5, 14] },
    heightRange: { male: [13, 16], female: [11, 14] }
  },
  'Borzoi': {
    weightRange: { male: [75, 105], female: [60, 85] },
    heightRange: { male: [28, 28], female: [26, 26] }
  },
  'BostonTerrierr': {
    weightRange: { male: [12, 25], female: [12, 25] },
    heightRange: { male: [15, 17], female: [15, 17] }
  },
  'BouvierDesFlandres': {
    weightRange: { male: [70, 110], female: [70, 110] },
    heightRange: { male: [24.5, 27.5], female: [23.5, 26.5] }
  },
  'Boxer': {
    weightRange: { male: [65, 80], female: [50, 65] },
    heightRange: { male: [23, 25], female: [21.5, 23.5] }
  },
  'BoykinSpaniel': {
    weightRange: { male: [30, 40], female: [25, 35] },
    heightRange: { male: [15.5, 18], female: [14, 16.5] }
  },
  'BraccoItaliano': {
    weightRange: { male: [55, 90], female: [55, 90] },
    heightRange: { male: [22.5, 26], female: [21, 24] }
  },
  'Briard': {
    weightRange: { male: [55, 100], female: [55, 100] },
    heightRange: { male: [23, 27], female: [22, 25.5] }
  },
  'Brittany': {
    weightRange: { male: [30, 40], female: [30, 40] },
    heightRange: { male: [17.5, 20.5], female: [17.5, 20.5] }
  },
  'BrusselsGriffon': {
    weightRange: { male: [8, 10], female: [8, 10] },
    heightRange: { male: [7, 10], female: [7, 10] }
  },
  'Bulldog': {
    weightRange: { male: [50, 50], female: [40, 40] },
    heightRange: { male: [14, 15], female: [14, 15] }
  },
  'Bullmastiff': {
    weightRange: { male: [110, 130], female: [100, 120] },
    heightRange: { male: [25, 27], female: [24, 26] }
  },
  'BullTerrierr': {
    weightRange: { male: [50, 70], female: [50, 70] },
    heightRange: { male: [21, 22], female: [21, 22] }
  },
  'CairnTerrierr': {
    weightRange: { male: [14, 14], female: [13, 13] },
    heightRange: { male: [10, 10], female: [9.5, 9.5] }
  },
  'CanaanDog': {
    weightRange: { male: [45, 55], female: [35, 45] },
    heightRange: { male: [20, 24], female: [19, 23] }
  },
  'CaneCorso': {
    weightRange: { male: [100, 110], female: [88, 99] },
    heightRange: { male: [25, 27.5], female: [23.5, 26] }
  },
  'CardiganWelshCorgi': {
    weightRange: { male: [30, 38], female: [25, 34] },
    heightRange: { male: [10.5, 12.5], female: [10.5, 12.5] }
  },
  'CavalierKingCharlesSpaniel': {
    weightRange: { male: [13, 18], female: [13, 18] },
    heightRange: { male: [12, 13], female: [12, 13] }
  },
  'CeskyTerrierr': {
    weightRange: { male: [14, 24], female: [14, 24] },
    heightRange: { male: [10, 13], female: [10, 13] }
  },
  'ChesapeakeBayRetriever': {
    weightRange: { male: [65, 80], female: [55, 70] },
    heightRange: { male: [23, 26], female: [21, 24] }
  },
  'Chihuahua': {
    weightRange: { male: [2, 6], female: [2, 6] },
    heightRange: { male: [5, 8], female: [5, 8] }
  },
  'Chinook': {
    weightRange: { male: [55, 90], female: [50, 65] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'ChineseCrested': {
    weightRange: { male: [8, 12], female: [8, 12] },
    heightRange: { male: [11, 13], female: [11, 13] }
  },
  'ChineseSharPei': {
    weightRange: { male: [45, 60], female: [45, 60] },
    heightRange: { male: [18, 20], female: [18, 20] }
  },
  'ChowChow': {
    weightRange: { male: [45, 70], female: [45, 70] },
    heightRange: { male: [17, 20], female: [17, 20] }
  },
  'CirnecoDellEtna': {
    weightRange: { male: [22, 26], female: [17, 22] },
    heightRange: { male: [18, 19.5], female: [16.5, 18] }
  },
  'CockerSpaniel': {
    weightRange: { male: [25, 30], female: [20, 25] },
    heightRange: { male: [14.5, 15.5], female: [13.5, 14.5] }
  },
  'Collie': {
    weightRange: { male: [60, 75], female: [50, 65] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'CotonDeTulear': {
    weightRange: { male: [9, 15], female: [8, 13] },
    heightRange: { male: [10, 11], female: [9, 10] }
  },
  'CurlyCoatedRetriever': {
    weightRange: { male: [60, 95], female: [60, 95] },
    heightRange: { male: [25, 27], female: [23, 25] }
  },
  'Dachshund': {
    weightRange: { male: [16, 32], female: [16, 32] },
    heightRange: { male: [8, 9], female: [8, 9] }
  },
  'Dalmatian': {
    weightRange: { male: [45, 70], female: [45, 70] },
    heightRange: { male: [19, 24], female: [19, 24] }
  },
  'DandieDinmontTerrierr': {
    weightRange: { male: [18, 24], female: [18, 24] },
    heightRange: { male: [8, 11], female: [8, 11] }
  },
  'DobermannPinscher': {
    weightRange: { male: [75, 100], female: [60, 90] },
    heightRange: { male: [26, 28], female: [24, 26] }
  },
  'DogoArgentino': {
    weightRange: { male: [80, 100], female: [80, 100] },
    heightRange: { male: [24, 26.5], female: [23.5, 25.5] }
  },
  'DoguesDeBordeaux': {
    weightRange: { male: [110, 145], female: [99, 120] },
    heightRange: { male: [23.5, 27], female: [23, 26] }
  },
  'EnglishCockerSpaniel': {
    weightRange: { male: [28, 34], female: [26, 32] },
    heightRange: { male: [16, 17], female: [15, 16] }
  },
  'EnglishFoxhound': {
    weightRange: { male: [60, 75], female: [60, 75] },
    heightRange: { male: [24, 24], female: [24, 24] }
  },
  'EnglishSetter': {
    weightRange: { male: [65, 80], female: [45, 55] },
    heightRange: { male: [25, 27], female: [23, 25] }
  },
  'EnglishSpringerSpaniel': {
    weightRange: { male: [50, 50], female: [40, 40] },
    heightRange: { male: [20, 20], female: [19, 19] }
  },
  'EnglishToySpaniel': {
    weightRange: { male: [8, 14], female: [8, 14] },
    heightRange: { male: [9, 10], female: [9, 10] }
  },
  'EntlebucherMountainDog': {
    weightRange: { male: [50, 65], female: [40, 55] },
    heightRange: { male: [17, 21], female: [16, 20] }
  },
  'FieldSpaniel': {
    weightRange: { male: [35, 50], female: [35, 50] },
    heightRange: { male: [18, 18], female: [17, 17] }
  },
  'FinnishLapphund': {
    weightRange: { male: [33, 53], female: [33, 53] },
    heightRange: { male: [18, 21], female: [16, 19] }
  },
  'FinnishSpitz': {
    weightRange: { male: [25, 33], female: [20, 28] },
    heightRange: { male: [17.5, 20], female: [15.5, 18] }
  },
  'FlatCoatedRetriever': {
    weightRange: { male: [60, 70], female: [55, 70] },
    heightRange: { male: [23, 24.5], female: [22, 23.5] }
  },
  'FrenchBulldog': {
    weightRange: { male: [20, 28], female: [20, 28] },
    heightRange: { male: [11, 13], female: [11, 13] }
  },
  'GermanPinscher': {
    weightRange: { male: [25, 45], female: [25, 45] },
    heightRange: { male: [17, 20], female: [17, 20] }
  },
  'GermanShepherd': {
    weightRange: { male: [65, 90], female: [50, 70] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'GermanShorhairedPointer': {
    weightRange: { male: [55, 70], female: [45, 60] },
    heightRange: { male: [23, 25], female: [21, 23] }
  },
  'GermanWirehairedPointer': {
    weightRange: { male: [60, 70], female: [50, 60] },
    heightRange: { male: [24, 26], female: [22, 24] }
  },
  'GiantSchnauzer': {
    weightRange: { male: [60, 85], female: [55, 75] },
    heightRange: { male: [25.5, 27.5], female: [23.5, 25.5] }
  },
  'GlenOfImaalTerrierr': {
    weightRange: { male: [32, 40], female: [32, 40] },
    heightRange: { male: [12.5, 14], female: [12.5, 14] }
  },
  'GoldenRetriever': {
    weightRange: { male: [65, 75], female: [55, 65] },
    heightRange: { male: [23, 24], female: [21.5, 22.5] }
  },
  'GordonSetter': {
    weightRange: { male: [55, 80], female: [45, 70] },
    heightRange: { male: [24, 27], female: [23, 26] }
  },
  'GrandBassetGriffonVendeen': {
    weightRange: { male: [40, 45], female: [40, 45] },
    heightRange: { male: [15.5, 18], female: [15.5, 18] }
  },
  'GreatDane': {
    weightRange: { male: [140, 175], female: [110, 140] },
    heightRange: { male: [30, 32], female: [28, 30] }
  },
  'GreatPyrenees': {
    weightRange: { male: [100, 160], female: [85, 115] },
    heightRange: { male: [27, 32], female: [25, 29] }
  },
  'GreaterSwissMountainDog': {
    weightRange: { male: [115, 140], female: [85, 110] },
    heightRange: { male: [25.5, 28.5], female: [23.5, 27] }
  },
  'Greyhound': {
    weightRange: { male: [65, 70], female: [60, 65] },
    heightRange: { male: [28, 30], female: [27, 28] }
  },
  'Harrier': {
    weightRange: { male: [45, 60], female: [45, 60] },
    heightRange: { male: [19, 21], female: [19, 21] }
  },
  'Havanese': {
    weightRange: { male: [7, 13], female: [7, 13] },
    heightRange: { male: [8.5, 11.5], female: [8.5, 11.5] }
  },
  'IbizanHound': {
    weightRange: { male: [50, 50], female: [45, 45] },
    heightRange: { male: [23.5, 27.5], female: [22.5, 26] }
  },
  'IcelandicSheepdog': {
    weightRange: { male: [30, 30], female: [25, 25] },
    heightRange: { male: [18, 18], female: [16.5, 16.5] }
  },
  'IrishRedAndWhiteSetter': {
    weightRange: { male: [42, 60], female: [35, 50] },
    heightRange: { male: [24.5, 26], female: [22.5, 24] }
  },
  'IrishSetter': {
    weightRange: { male: [70, 70], female: [60, 60] },
    heightRange: { male: [27, 27], female: [25, 25] }
  },
  'IrishTerrierr': {
    weightRange: { male: [27, 27], female: [25, 25] },
    heightRange: { male: [18, 18], female: [18, 18] }
  },
  'IrishWaterSpaniel': {
    weightRange: { male: [55, 68], female: [45, 58] },
    heightRange: { male: [22, 24], female: [21, 23] }
  },
  'IrishWolfhound': {
    weightRange: { male: [120, 120], female: [105, 105] },
    heightRange: { male: [32, 32], female: [30, 30] }
  },
  'ItalianGreyhound': {
    weightRange: { male: [7, 14], female: [7, 14] },
    heightRange: { male: [13, 15], female: [13, 15] }
  },
  'JapaneseChin': {
    weightRange: { male: [7, 11], female: [7, 11] },
    heightRange: { male: [8, 11], female: [8, 11] }
  },
  'Keeshond': {
    weightRange: { male: [35, 45], female: [35, 45] },
    heightRange: { male: [18, 18], female: [17, 17] }
  },
  'KerryBlueTerrierr': {
    weightRange: { male: [33, 40], female: [30, 37] },
    heightRange: { male: [18.5, 19.5], female: [17.5, 19] }
  },
  'Komondor': {
    weightRange: { male: [100, 130], female: [80, 110] },
    heightRange: { male: [27.5, 27.5], female: [25.5, 25.5] }
  },
  'Kuvasz': {
    weightRange: { male: [100, 115], female: [70, 90] },
    heightRange: { male: [28, 30], female: [26, 28] }
  },
  'Labrador': {
    weightRange: { male: [65, 80], female: [55, 70] },
    heightRange: { male: [22.5, 24.5], female: [21.5, 23.5] }
  },
  'LabradorRetriever': {
    weightRange: { male: [65, 80], female: [55, 70] },
    heightRange: { male: [22.5, 24.5], female: [21.5, 23.5] }
  },
  'LagottoRomagnolo': {
    weightRange: { male: [28, 35], female: [24, 31] },
    heightRange: { male: [17, 19], female: [16, 18] }
  },
  'LakelandTerrierr': {
    weightRange: { male: [17, 17], female: [15, 15] },
    heightRange: { male: [14.5, 14.5], female: [14.5, 14.5] }
  },
  'Leonberger': {
    weightRange: { male: [110, 170], female: [90, 140] },
    heightRange: { male: [28, 31.5], female: [25.5, 29.5] }
  },
  'LhasaApso': {
    weightRange: { male: [12, 18], female: [12, 18] },
    heightRange: { male: [10, 11], female: [10, 11] }
  },
  'Lowchen': {
    weightRange: { male: [15, 18], female: [15, 18] },
    heightRange: { male: [12, 14], female: [12, 14] }
  },
  'Maltese': {
    weightRange: { male: [6, 9], female: [6, 9] },
    heightRange: { male: [7, 9], female: [7, 9] }
  },
  'ManchesterTerrierr': {
    weightRange: { male: [12, 22], female: [12, 22] },
    heightRange: { male: [10, 16], female: [10, 16] }
  },
  'Mastiff': {
    weightRange: { male: [160, 230], female: [120, 170] },
    heightRange: { male: [30, 30], female: [27.5, 27.5] }
  },
  'MiniatureAmericanShepherd': {
    weightRange: { male: [20, 40], female: [20, 40] },
    heightRange: { male: [14, 18], female: [13, 17] }
  },
  'MiniatureBullTerrierr': {
    weightRange: { male: [18, 28], female: [18, 28] },
    heightRange: { male: [10, 14], female: [10, 14] }
  },
  'MiniaturePinscher': {
    weightRange: { male: [8, 10], female: [8, 10] },
    heightRange: { male: [10, 12.5], female: [10, 12.5] }
  },
  'MiniaturePoodle': {
    weightRange: { male: [10, 15], female: [10, 15] },
    heightRange: { male: [10, 15], female: [10, 15] }
  },
  'MiniatureSchnauzer': {
    weightRange: { male: [11, 20], female: [11, 20] },
    heightRange: { male: [12, 14], female: [12, 14] }
  },
  'Newfoundland': {
    weightRange: { male: [130, 150], female: [100, 120] },
    heightRange: { male: [28, 28], female: [26, 26] }
  },
  'NorfolkTerrierr': {
    weightRange: { male: [11, 12], female: [11, 12] },
    heightRange: { male: [9, 10], female: [9, 10] }
  },
  'NorwegianBuhund': {
    weightRange: { male: [31, 40], female: [26, 35] },
    heightRange: { male: [17, 18.5], female: [16, 17.5] }
  },
  'NorwegianElkhound': {
    weightRange: { male: [48, 55], female: [48, 55] },
    heightRange: { male: [20.5, 20.5], female: [19.5, 19.5] }
  },
  'NorwegianLundehund': {
    weightRange: { male: [20, 30], female: [20, 30] },
    heightRange: { male: [13, 15], female: [12, 14] }
  },
  'NorwichTerrierr': {
    weightRange: { male: [12, 12], female: [12, 12] },
    heightRange: { male: [10, 10], female: [10, 10] }
  },
  'NovaScotiaDuckTollingRetriever': {
    weightRange: { male: [35, 50], female: [35, 50] },
    heightRange: { male: [18, 21], female: [17, 20] }
  },
  'OldEnglishSheepdog': {
    weightRange: { male: [60, 100], female: [60, 100] },
    heightRange: { male: [22, 22], female: [21, 21] }
  },
  'Otterhound': {
    weightRange: { male: [80, 115], female: [65, 100] },
    heightRange: { male: [24, 27], female: [23, 26] }
  },
  'Papillon': {
    weightRange: { male: [5, 10], female: [5, 10] },
    heightRange: { male: [8, 11], female: [8, 11] }
  },
  'ParsonsRussellTerrierr': {
    weightRange: { male: [13, 17], female: [13, 17] },
    heightRange: { male: [12, 15], female: [12, 15] }
  },
  'Pekingese': {
    weightRange: { male: [14, 14], female: [14, 14] },
    heightRange: { male: [6, 9], female: [6, 9] }
  },
  'PembrokWelshCorgi': {
    weightRange: { male: [30, 30], female: [28, 28] },
    heightRange: { male: [10, 12], female: [10, 12] }
  },
  'PeruvianIncaOrchid': {
    weightRange: { male: [8, 55], female: [8, 55] },
    heightRange: { male: [9.75, 25.75], female: [9.75, 25.75] }
  },
  'PetitBassetGriffonVendeen': {
    weightRange: { male: [25, 40], female: [25, 40] },
    heightRange: { male: [13, 15], female: [13, 15] }
  },
  'Pharaohound': {
    weightRange: { male: [45, 55], female: [45, 55] },
    heightRange: { male: [23, 25], female: [21, 24] }
  },
  'PlottHound': {
    weightRange: { male: [50, 75], female: [40, 65] },
    heightRange: { male: [20, 25], female: [20, 23] }
  },
  'Pointer': {
    weightRange: { male: [55, 75], female: [45, 65] },
    heightRange: { male: [25, 28], female: [23, 26] }
  },
  'PolishLowlandSheepdog': {
    weightRange: { male: [30, 50], female: [30, 50] },
    heightRange: { male: [17.5, 20], female: [16.5, 18.5] }
  },
  'Pomeranian': {
    weightRange: { male: [3, 7], female: [3, 7] },
    heightRange: { male: [6, 7], female: [6, 7] }
  },
  'Poodle': {
    weightRange: { male: [45, 70], female: [45, 60] },
    heightRange: { male: [15, 15], female: [15, 15] }
  },
  'PortuguesePodengo': {
    weightRange: { male: [35, 66], female: [35, 66] },
    heightRange: { male: [16, 28], female: [16, 28] }
  },
  'PortugueseWaterDog': {
    weightRange: { male: [42, 60], female: [35, 50] },
    heightRange: { male: [20, 23], female: [17, 21] }
  },
  'Pug': {
    weightRange: { male: [14, 18], female: [14, 18] },
    heightRange: { male: [10, 13], female: [10, 13] }
  },
  'Puli': {
    weightRange: { male: [25, 35], female: [25, 35] },
    heightRange: { male: [17, 17], female: [16, 16] }
  },
  'Pumi': {
    weightRange: { male: [27, 29], female: [22, 24] },
    heightRange: { male: [17, 18.5], female: [15, 17] }
  },
  'PyreneaanMastiff': {
    weightRange: { male: [140, 200], female: [120, 180] },
    heightRange: { male: [30, 31], female: [28, 30] }
  },
  'Redbone': {
    weightRange: { male: [45, 70], female: [45, 70] },
    heightRange: { male: [22, 27], female: [21, 26] }
  },
  'RhodesianRidgeback': {
    weightRange: { male: [85, 85], female: [70, 70] },
    heightRange: { male: [25, 27], female: [24, 26] }
  },
  'Rottweiler': {
    weightRange: { male: [95, 135], female: [80, 100] },
    heightRange: { male: [24, 27], female: [22, 25] }
  },
  'RussellTerrierr': {
    weightRange: { male: [9, 15], female: [9, 15] },
    heightRange: { male: [8, 12], female: [8, 12] }
  },
  'RussianToyTerrierr': {
    weightRange: { male: [3, 6], female: [3, 6] },
    heightRange: { male: [8, 11], female: [8, 11] }
  },
  'Saluki': {
    weightRange: { male: [40, 65], female: [40, 65] },
    heightRange: { male: [23, 28], female: [23, 28] }
  },
  'Samoyed': {
    weightRange: { male: [45, 65], female: [35, 50] },
    heightRange: { male: [21, 23.5], female: [19, 21] }
  },
  'Schipperke': {
    weightRange: { male: [10, 16], female: [10, 16] },
    heightRange: { male: [11, 13], female: [10, 12] }
  },
  'ScottishDeerhound': {
    weightRange: { male: [85, 110], female: [75, 95] },
    heightRange: { male: [30, 32], female: [28, 28] }
  },
  'ScottishTerrierr': {
    weightRange: { male: [19, 22], female: [18, 21] },
    heightRange: { male: [10, 10], female: [10, 10] }
  },
  'SealyhamTerrierr': {
    weightRange: { male: [23, 24], female: [23, 24] },
    heightRange: { male: [10.5, 10.5], female: [10.5, 10.5] }
  },
  'ShetlandSheepdog': {
    weightRange: { male: [15, 25], female: [15, 25] },
    heightRange: { male: [13, 16], female: [13, 16] }
  },
  'ShibaInu': {
    weightRange: { male: [23, 23], female: [17, 17] },
    heightRange: { male: [14.5, 16.5], female: [13.5, 15.5] }
  },
  'ShihTzu': {
    weightRange: { male: [9, 16], female: [9, 16] },
    heightRange: { male: [9, 10.5], female: [9, 10.5] }
  },
  'SiberianHusky': {
    weightRange: { male: [45, 60], female: [35, 50] },
    heightRange: { male: [21, 23.5], female: [20, 22] }
  },
  'SilkyTerrierr': {
    weightRange: { male: [8, 10], female: [8, 10] },
    heightRange: { male: [9, 10], female: [9, 10] }
  },
  'SkeyeTerrierr': {
    weightRange: { male: [35, 45], female: [25, 40] },
    heightRange: { male: [10, 10], female: [9.5, 9.5] }
  },
  'SmoothFoxTerrierr': {
    weightRange: { male: [18, 18], female: [16, 16] },
    heightRange: { male: [15.5, 15.5], female: [15.5, 15.5] }
  },
  'SoftCoatedWheatenTerrierr': {
    weightRange: { male: [35, 40], female: [30, 35] },
    heightRange: { male: [18, 19], female: [17, 18] }
  },
  'SpanishWaterDog': {
    weightRange: { male: [40, 49], female: [31, 40] },
    heightRange: { male: [17.75, 19.75], female: [15.75, 18] }
  },
  'SpinoneItaliano': {
    weightRange: { male: [61, 82], female: [61, 82] },
    heightRange: { male: [23, 27], female: [22, 25] }
  },
  'StaffordshireTerrierr': {
    weightRange: { male: [28, 38], female: [24, 34] },
    heightRange: { male: [18, 19], female: [17, 18] }
  },
  'StandardPoodle': {
    weightRange: { male: [45, 70], female: [45, 60] },
    heightRange: { male: [15, 15], female: [15, 15] }
  },
  'StandardSchnauzer': {
    weightRange: { male: [35, 45], female: [30, 40] },
    heightRange: { male: [18.5, 19.5], female: [17.5, 18.5] }
  },
  'SussexSpaniel': {
    weightRange: { male: [35, 45], female: [35, 45] },
    heightRange: { male: [13, 15], female: [13, 15] }
  },
  'SwedishVallhund': {
    weightRange: { male: [20, 35], female: [20, 35] },
    heightRange: { male: [12.5, 13.75], female: [11.5, 12.75] }
  },
  'TibetanMastiff': {
    weightRange: { male: [90, 150], female: [70, 120] },
    heightRange: { male: [26, 26], female: [24, 24] }
  },
  'TibetanSpaniel': {
    weightRange: { male: [9, 15], female: [9, 15] },
    heightRange: { male: [10, 10], female: [10, 10] }
  },
  'TibetanTerrierr': {
    weightRange: { male: [18, 30], female: [18, 30] },
    heightRange: { male: [14, 17], female: [14, 17] }
  },
  'ToyFoxTerrierr': {
    weightRange: { male: [3.5, 7], female: [3.5, 7] },
    heightRange: { male: [8.5, 11.5], female: [8.5, 11.5] }
  },
  'ToyPoodle': {
    weightRange: { male: [4, 6], female: [4, 6] },
    heightRange: { male: [10, 10], female: [10, 10] }
  },
  'Treeing': {
    weightRange: { male: [45, 65], female: [35, 50] },
    heightRange: { male: [22, 26], female: [20, 23] }
  },
  'Vizsla': {
    weightRange: { male: [55, 60], female: [44, 55] },
    heightRange: { male: [22, 24], female: [21, 23] }
  },
  'Weimaraner': {
    weightRange: { male: [70, 90], female: [55, 75] },
    heightRange: { male: [25, 27], female: [23, 25] }
  },
  'WelshSpringerSpaniel': {
    weightRange: { male: [40, 55], female: [35, 50] },
    heightRange: { male: [18, 19], female: [17, 18] }
  },
  'WelshTerrierr': {
    weightRange: { male: [20, 20], female: [20, 20] },
    heightRange: { male: [15, 15], female: [15, 15] }
  },
  'WestHighlandWhiteTerrierr': {
    weightRange: { male: [15, 20], female: [13, 16] },
    heightRange: { male: [11, 11], female: [10, 10] }
  },
  'Whippet': {
    weightRange: { male: [25, 40], female: [25, 40] },
    heightRange: { male: [19, 22], female: [18, 21] }
  },
  'WireFoxTerrierr': {
    weightRange: { male: [18, 18], female: [16, 16] },
    heightRange: { male: [15.5, 15.5], female: [15.5, 15.5] }
  },
  'WirehairedPointingGriffon': {
    weightRange: { male: [50, 70], female: [35, 50] },
    heightRange: { male: [22, 24], female: [20, 22] }
  },
  'WirehairedVizsla': {
    weightRange: { male: [55, 65], female: [45, 55] },
    heightRange: { male: [23, 25], female: [21.5, 23] }
  },
  'Xoloitzcuintli': {
    weightRange: { male: [10, 55], female: [10, 55] },
    heightRange: { male: [10, 23], female: [10, 23] }
  },
  'YorkshireTerrierr': {
    weightRange: { male: [7, 7], female: [7, 7] },
    heightRange: { male: [7, 8], female: [7, 8] }
  }
};

const BREED_DISPLAY_NAMES: Record<string, string> = {
  'Affenpinscher': 'Affenpinscher',
  'AfghanHound': 'Afghan Hound',
  'AiredaleTerrierr': 'Airedale Terrier',
  'Akita': 'Akita',
  'AlaskanMalamute': 'Alaskan Malamute',
  'AmericanEnglishCoonhound': 'American English Coonhound',
  'AmericanEskimoDog': 'American Eskimo Dog',
  'AmericanFoxhound': 'American Foxhound',
  'AmericanHairlessTerrierr': 'American Hairless Terrier',
  'AmericanStaffordshireTerrierr': 'American Staffordshire Terrier',
  'AmericanWaterSpaniel': 'American Water Spaniel',
  'AnatolianShepherdDog': 'Anatolian Shepherd Dog',
  'AustralianCattleDog': 'Australian Cattle Dog',
  'AustralianShepherd': 'Australian Shepherd',
  'AustralianTerrierr': 'Australian Terrier',
  'Azawakh': 'Azawakh',
  'Barbet': 'Barbet',
  'Basenji': 'Basenji',
  'BassetHound': 'Basset Hound',
  'Beagle': 'Beagle',
  'BeardedCollie': 'Bearded Collie',
  'Beauceron': 'Beauceron',
  'BedlingtonTerrierr': 'Bedlington Terrier',
  'BelgianLaekenois': 'Belgian Laekenois',
  'BelgianMalinois': 'Belgian Malinois',
  'BelgianSheepdog': 'Belgian Sheepdog',
  'BelgianTerrierrvuren': 'Belgian Tervuren',
  'BergamascoSheepdog': 'Bergamasco Sheepdog',
  'BergerPicard': 'Berger Picard',
  'BerneseMountainDog': 'Bernese Mountain Dog',
  'BichonFrise': 'Bichon Frise',
  'BiewerTerrierr': 'Biewer Terrier',
  'BlackAndTanCoonhound': 'Black and Tan Coonhound',
  'BlackRussianTerrierr': 'Black Russian Terrier',
  'Bloodhound': 'Bloodhound',
  'BluetickCoonhound': 'Bluetick Coonhound',
  'Boerboel': 'Boerboel',
  'BorderCollie': 'Border Collie',
  'BorderTerrierr': 'Border Terrier',
  'Borzoi': 'Borzoi',
  'BostonTerrierr': 'Boston Terrier',
  'BouvierDesFlandres': 'Bouvier des Flandres',
  'Boxer': 'Boxer',
  'BoykinSpaniel': 'Boykin Spaniel',
  'BraccoItaliano': 'Bracco Italiano',
  'Briard': 'Briard',
  'Brittany': 'Brittany',
  'BrusselsGriffon': 'Brussels Griffon',
  'Bulldog': 'Bulldog',
  'Bullmastiff': 'Bullmastiff',
  'BullTerrierr': 'Bull Terrier',
  'CairnTerrierr': 'Cairn Terrier',
  'CanaanDog': 'Canaan Dog',
  'CaneCorso': 'Cane Corso',
  'CardiganWelshCorgi': 'Cardigan Welsh Corgi',
  'CavalierKingCharlesSpaniel': 'Cavalier King Charles Spaniel',
  'CeskyTerrierr': 'Cesky Terrier',
  'ChesapeakeBayRetriever': 'Chesapeake Bay Retriever',
  'Chihuahua': 'Chihuahua',
  'Chinook': 'Chinook',
  'ChineseCrested': 'Chinese Crested',
  'ChineseSharPei': 'Chinese Shar-Pei',
  'ChowChow': 'Chow Chow',
  'CirnecoDellEtna': 'Cirnechi dell\'Etna',
  'CockerSpaniel': 'Cocker Spaniel',
  'Collie': 'Collie',
  'CotonDeTulear': 'Coton de Tulear',
  'CurlyCoatedRetriever': 'Curly-Coated Retriever',
  'Dachshund': 'Dachshund',
  'Dalmatian': 'Dalmatian',
  'DandieDinmontTerrierr': 'Dandie Dinmont Terrier',
  'DobermannPinscher': 'Doberman Pinscher',
  'DogoArgentino': 'Dogo Argentino',
  'DoguesDeBordeaux': 'Dogues de Bordeaux',
  'EnglishCockerSpaniel': 'English Cocker Spaniel',
  'EnglishFoxhound': 'English Foxhound',
  'EnglishSetter': 'English Setter',
  'EnglishSpringerSpaniel': 'English Springer Spaniel',
  'EnglishToySpaniel': 'English Toy Spaniel',
  'EntlebucherMountainDog': 'Entlebucher Mountain Dog',
  'FieldSpaniel': 'Field Spaniel',
  'FinnishLapphund': 'Finnish Lapphund',
  'FinnishSpitz': 'Finnish Spitz',
  'FlatCoatedRetriever': 'Flat-Coated Retriever',
  'FrenchBulldog': 'French Bulldog',
  'GermanPinscher': 'German Pinscher',
  'GermanShepherd': 'German Shepherd Dog',
  'GermanShorhairedPointer': 'German Shorthaired Pointer',
  'GermanWirehairedPointer': 'German Wirehaired Pointer',
  'GiantSchnauzer': 'Giant Schnauzer',
  'GlenOfImaalTerrierr': 'Glen of Imaal Terrier',
  'GoldenRetriever': 'Golden Retriever',
  'GordonSetter': 'Gordon Setter',
  'GrandBassetGriffonVendeen': 'Grand Basset Griffon Vendéen',
  'GreatDane': 'Great Dane',
  'GreatPyrenees': 'Great Pyrenees',
  'GreaterSwissMountainDog': 'Greater Swiss Mountain Dog',
  'Greyhound': 'Greyhound',
  'Harrier': 'Harrier',
  'Havanese': 'Havanese',
  'IbizanHound': 'Ibizan Hound',
  'IcelandicSheepdog': 'Icelandic Sheepdog',
  'IrishRedAndWhiteSetter': 'Irish Red and White Setter',
  'IrishSetter': 'Irish Setter',
  'IrishTerrierr': 'Irish Terrier',
  'IrishWaterSpaniel': 'Irish Water Spaniel',
  'IrishWolfhound': 'Irish Wolfhound',
  'ItalianGreyhound': 'Italian Greyhound',
  'JapaneseChin': 'Japanese Chin',
  'Keeshond': 'Keeshond',
  'KerryBlueTerrierr': 'Kerry Blue Terrier',
  'Komondor': 'Komondor',
  'Kuvasz': 'Kuvasz',
  'Labrador': 'Labrador Retriever',
  'LagottoRomagnolo': 'Lagotto Romagnolo',
  'LakelandTerrierr': 'Lakeland Terrier',
  'Leonberger': 'Leonberger',
  'LhasaApso': 'Lhasa Apso',
  'Lowchen': 'Löwchen',
  'Maltese': 'Maltese',
  'ManchesterTerrierr': 'Manchester Terrier',
  'Mastiff': 'Mastiff',
  'MiniatureAmericanShepherd': 'Miniature American Shepherd',
  'MiniatureBullTerrierr': 'Miniature Bull Terrier',
  'MiniaturePinscher': 'Miniature Pinscher',
  'MiniatureSchnauzer': 'Miniature Schnauzer',
  'Mudi': 'Mudi',
  'NederlandseKooikerhondje': 'Nederlandse Kooikerhondje',
  'NeapolitanMastiff': 'Neapolitan Mastiff',
  'Newfoundland': 'Newfoundland',
  'NorfolkTerrierr': 'Norfolk Terrier',
  'NorwegianBuhund': 'Norwegian Buhund',
  'NorwegianElkhound': 'Norwegian Elkhound',
  'NorwegianLundehund': 'Norwegian Lundehund',
  'NorwichTerrierr': 'Norwich Terrier',
  'NovaScotiaDuckTollingRetriever': 'Nova Scotia Duck Tolling Retriever',
  'OldEnglishSheepdog': 'Old English Sheepdog',
  'Otterhound': 'Otterhound',
  'Papillon': 'Papillon',
  'ParsonRussellTerrierr': 'Parson Russell Terrier',
  'Pekingese': 'Pekingese',
  'PembrokeWelshCorgi': 'Pembroke Welsh Corgi',
  'PetitBassetGriffonVendeen': 'Petit Basset Griffon Vendéen',
  'PharaohHound': 'Pharaoh Hound',
  'PlottHound': 'Plott Hound',
  'Pointer': 'Pointer',
  'PolishLowlandSheepdog': 'Polish Lowland Sheepdog',
  'Pomeranian': 'Pomeranian',
  'Poodle': 'Poodle',
  'PortuguesePodengoRequeno': 'Portuguese Podengo Pequeno',
  'PortugueseWaterDog': 'Portuguese Water Dog',
  'Pug': 'Pug',
  'Puli': 'Puli',
  'Pumi': 'Pumi',
  'PyreneanShepherd': 'Pyrenean Shepherd',
  'RedboneCoonhound': 'Redbone Coonhound',
  'RhodesianRidgeback': 'Rhodesian Ridgeback',
  'Rottweiler': 'Rottweiler',
  'RussellTerrierr': 'Russell Terrier',
  'RussianToy': 'Russian Toy',
  'Saluki': 'Saluki',
  'Samoyed': 'Samoyed',
  'Schipperke': 'Schipperke',
  'ScottishDeerhound': 'Scottish Deerhound',
  'ScottishTerrierr': 'Scottish Terrier',
  'SealyhamTerrierr': 'Sealyham Terrier',
  'ShetlandSheepdog': 'Shetland Sheepdog',
  'ShibaInu': 'Shiba Inu',
  'ShihTzu': 'Shih Tzu',
  'SiberianHusky': 'Siberian Husky',
  'SilkyTerrierr': 'Silky Terrier',
  'SkyeTerrierr': 'Skye Terrier',
  'Sloughi': 'Sloughi',
  'SmoothFoxTerrierr': 'Smooth Fox Terrier',
  'SoftCoatedWheatenTerrierr': 'Soft Coated Wheaten Terrier',
  'SpanishWaterDog': 'Spanish Water Dog',
  'SpinoneItaliano': 'Spinone Italiano',
  'StaffordshireBullTerrierr': 'Staffordshire Bull Terrier',
  'StandardSchnauzer': 'Standard Schnauzer',
  'SussexSpaniel': 'Sussex Spaniel',
  'SwedishVallhund': 'Swedish Vallhund',
  'TibetanMastiff': 'Tibetan Mastiff',
  'TibetanSpaniel': 'Tibetan Spaniel',
  'TibetanTerrierr': 'Tibetan Terrier',
  'ToyFoxTerrierr': 'Toy Fox Terrier',
  'TreeingWalkerCoonhound': 'Treeing Walker Coonhound',
  'Vizsla': 'Vizsla',
  'Weimaraner': 'Weimaraner',
  'WelshSpringerSpaniel': 'Welsh Springer Spaniel',
  'WelshTerrierr': 'Welsh Terrier',
  'WestHighlandWhiteTerrierr': 'West Highland White Terrier',
  'Whippet': 'Whippet',
  'WirehairedPointingGriffon': 'Wirehaired Pointing Griffon',
  'WirehairedVizsla': 'Wirehaired Vizsla',
  'WireFoxTerrierr': 'Wire Fox Terrier',
  'Xoloitzcuintli': 'Xoloitzcuintli',
  'YorkshireTerrier': 'Yorkshire Terrier'
};

export function DogBmiCalculatorIsland() {
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [heightUnit, setHeightUnit] = useState<'inches' | 'cm'>('inches');
  const [showResult, setShowResult] = useState(false);
  const [breedSearch, setBreedSearch] = useState('');
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);

  // Filter breeds based on search input
  const filteredBreeds = useMemo(() => {
    if (!breedSearch.trim()) {
      return SUPPORTED_BREEDS;
    }
    return SUPPORTED_BREEDS.filter(breedKey => 
      BREED_DISPLAY_NAMES[breedKey].toLowerCase().includes(breedSearch.toLowerCase())
    );
  }, [breedSearch]);

  const handleBreedSelect = (selectedBreed: string) => {
    setBreed(selectedBreed);
    setBreedSearch(BREED_DISPLAY_NAMES[selectedBreed]);
    setShowBreedDropdown(false);
  };

  const handleBreedSearchChange = (value: string) => {
    setBreedSearch(value);
    setShowBreedDropdown(true);
    // Clear breed selection if search doesn't match exactly
    const exactMatch = SUPPORTED_BREEDS.find(breedKey => 
      BREED_DISPLAY_NAMES[breedKey].toLowerCase() === value.toLowerCase()
    );
    setBreed(exactMatch || '');
  };

  const handleCalculate = () => {
    if (!breed || !weight || !height) {
      alert('Please fill in all required information');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid numbers');
      return;
    }

    setShowResult(true);
  };

  // Convert weight to kg for calculation
  const getWeightInKg = () => {
    const weightNum = parseFloat(weight);
    return weightUnit === 'lbs' ? weightNum * 0.453592 : weightNum;
  };

  // Convert height to meters for calculation
  const getHeightInMeters = () => {
    const heightNum = parseFloat(height);
    return heightUnit === 'inches' ? heightNum * 0.0254 : heightNum * 0.01;
  };

  const handleReset = () => {
    setBreed('');
    setSex('male');
    setWeight('');
    setHeight('');
    setWeightUnit('lbs');
    setHeightUnit('inches');
    setShowResult(false);
    setBreedSearch('');
    setShowBreedDropdown(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 输入表单 */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🐕 Dog BMI Calculator</h2>
          <p className="text-gray-600">Enter your dog's information to get a scientific weight assessment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Breed Selection with Search */}
          <div className="relative">
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
              Breed *
            </label>
            <input
              id="breed"
              type="text"
              value={breedSearch}
              onChange={(e) => handleBreedSearchChange(e.target.value)}
              onFocus={() => setShowBreedDropdown(true)}
              onBlur={() => {
                // Delay hiding dropdown to allow for clicks
                setTimeout(() => setShowBreedDropdown(false), 200);
              }}
              placeholder="Search for a breed..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {showBreedDropdown && filteredBreeds.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredBreeds.map((breedKey) => (
                  <button
                    key={breedKey}
                    type="button"
                    onClick={() => handleBreedSelect(breedKey)}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                  >
                    {BREED_DISPLAY_NAMES[breedKey]}
                  </button>
                ))}
              </div>
            )}
            {showBreedDropdown && filteredBreeds.length === 0 && breedSearch.trim() && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="px-4 py-2 text-sm text-gray-500">
                  No breeds found matching "{breedSearch}"
                </div>
              </div>
            )}
          </div>

          {/* Sex Selection */}
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">
              Sex *
            </label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Weight Input */}
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Weight *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={weightUnit === 'lbs' ? 'e.g., 55.2' : 'e.g., 25.5'}
                min="0.1"
                step={weightUnit === 'lbs' ? '0.1' : '0.1'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          {/* Height Input */}
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Height (Shoulder Height) *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={heightUnit === 'inches' ? 'e.g., 24' : 'e.g., 60'}
                min="1"
                step={heightUnit === 'inches' ? '0.5' : '1'}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value as 'inches' | 'cm')}
                className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="inches">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Measure from ground to shoulder (withers)
            </p>
          </div>
        </div>

        {/* Button Group */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCalculate}
            disabled={!breed || !weight || !height}
            className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Calculate BMI
          </button>
          {showResult && (
            <button
              onClick={handleReset}
              className="border-2 border-gray-300 text-gray-700 py-3 px-8 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Display */}
      {showResult && breed && weight && height && (
        <div className="animate-fadeIn">
          <DogBmiGauge
            breed={breed}
            sex={sex}
            weight={parseFloat(weight)}
            height={parseFloat(height)}
            weightUnit={weightUnit}
            heightUnit={heightUnit}
            breedData={BREED_DATA[breed]}
          />
        </div>
      )}

      {/* Measurement Guide */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          📏 How to Measure Your Dog Correctly
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Weight Measurement</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use a digital scale for accuracy</li>
              <li>• Measure when your dog is calm</li>
              <li>• Large dogs can be weighed at vet clinics</li>
              <li>• Record to the nearest 0.1 lb/kg</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Height Measurement</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• From ground to shoulder (withers)</li>
              <li>• Measure in standing position</li>
              <li>• Use a measuring stick or tape</li>
              <li>• Record to the nearest 1 in/1 cm</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center">
          ⚠️ Important Notes
        </h3>
        <div className="text-sm text-yellow-800 space-y-2">
          <p>• BMI results are for reference only and cannot replace professional veterinary diagnosis</p>
          <p>• Standards may differ for puppies, senior dogs, and pregnant females</p>
          <p>• If you have concerns about your dog's weight, consult a professional veterinarian</p>
          <p>• Regular check-ups and appropriate exercise are key to maintaining healthy weight</p>
        </div>
      </div>
    </div>
  );
}

export default DogBmiCalculatorIsland;