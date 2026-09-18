// Hardcoded content for the two featured animals in this prototype.
// In the final product this will live in Firestore, keyed by zooId + animalId.

export const ANIMALS = [
  {
    id: 'lion',
    art: 'lion',
    name: 'Oroszlán',
    scientificName: 'Panthera leo',
    intro:
      'A vadon élő oroszlánok elsősorban Afrikában élnek. Társas ragadozók, amelyek falkákban élnek és együtt vadásznak.',
    habitat: 'Szavannák, füves puszták és ritkás erdők Afrikában.',
    diet: 'Húsevő: elsősorban antilopot, zebrát és más nagytestű patásokat ejt el.',
    lifestyle:
      'Falkában él, jellemzően több nőstényből, kölykökből és néhány hímből. A vadászat nagy részét a nőstények végzik.',
    interestingFact:
      'Egy felnőtt hím oroszlán sörénye sötétebbé és dúsabbá válik, ahogy öregszik — a kutatók ebből is tudják becsülni a korát.',
    observationQuestion: 'Mit csinál most az oroszlán?',
    observationOptions: [
      { id: 'resting', label: 'Pihen', note: 'A oroszlánok napi 16-20 órát is alhatnak — energiát spórolnak a vadászathoz.' },
      { id: 'moving', label: 'Mozog', note: 'Figyeld meg a járását: az oroszlánok súlypontja hátrébb van, mint a legtöbb macskafélénél.' },
      { id: 'eating', label: 'Eszik', note: 'A vadonban egy nagy zsákmányból az egész falka lakmározik — innen a "lakoma vagy éhezés" életmód.' },
      { id: 'watching', label: 'Figyel valamit', note: 'Az oroszlánok kiváló látással és hallással rendelkeznek — az éber testtartás sok mindent elárul.' },
      { id: 'playing', label: 'Játszik', note: 'A kölykök játéka valójában vadászati mozdulatokat gyakoroltat — a leselkedést és a rajtaütést.' },
      { id: 'not-visible', label: 'Nem látom', note: 'Nem baj — próbáld megkeresni egy másik ponton, vagy térj vissza később.' },
    ],
  },
  {
    id: 'elephant',
    art: 'elephant',
    name: 'Elefánt',
    scientificName: 'Loxodonta africana / Elephas maximus',
    intro:
      'Az elefántok a szárazföld legnagyobb élő emlősei. Rendkívül intelligensek, szoros családi kötelékben élnek, és kiváló memóriájuk van.',
    habitat: 'Szavannák, erdők és folyóvölgyek Afrikában és Ázsiában.',
    diet: 'Növényevő: füvet, leveleket, kérget és gyümölcsöt fogyaszt — naponta akár 150 kg-ot is.',
    lifestyle:
      'Nőstények és kölykeik családi csoportokban élnek, amelyet a legidősebb, legtapasztaltabb nőstény vezet.',
    interestingFact:
      'Az elefánt ormánya több mint 40 000 izmot tartalmaz, és elég finom mozdulatokra képes ahhoz, hogy egyetlen szem mogyorót is felvegyen.',
    observationQuestion: 'Mit csinál most az elefánt?',
    observationOptions: [
      { id: 'resting', label: 'Pihen', note: 'Az elefántok gyakran állva alszanak, csak néhány órát éjszakánként.' },
      { id: 'moving', label: 'Mozog', note: 'Figyeld meg a lépteit — a talpán lévő párna csillapítja a lépések zaját.' },
      { id: 'eating', label: 'Eszik', note: 'Az ormányával téphet le ágakat, és a szájához emelheti a táplálékot.' },
      { id: 'watching', label: 'Figyel valamit', note: 'A fülcsapkodás gyakran a hőszabályozás jele, nem csak a figyelemé.' },
      { id: 'playing', label: 'Játszik', note: 'A fiatal elefántok gyakran fröcskölnek vízzel vagy porral játékból.' },
      { id: 'not-visible', label: 'Nem látom', note: 'Nem baj — próbálj másik szögből nézni, vagy sétálj tovább egy kicsit.' },
    ],
  },
]

export function getAnimalById(id) {
  return ANIMALS.find((a) => a.id === id) || null
}

export const ANIMAL_TYPES = ['Emlős', 'Madár', 'Hüllő', 'Kétéltű', 'Hal', 'Rovar', 'Egyéb']

export const DIET_OPTIONS = ['Növény', 'Hús', 'Hal', 'Gyümölcs', 'Rovar', 'Egyéb', 'Nem tudom']

export const OBSERVED_OPTIONS = ['Mozog', 'Pihen', 'Eszik', 'Iszik', 'Játszik', 'Figyel', 'Egyéb']
