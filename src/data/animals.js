// Hardcoded content for the two featured animals in this prototype.
// In the final product this will live in Firestore, keyed by zooId + animalId.

export const ANIMALS = [
  {
    id: "lion",

    name: {
      hu: "Oroszlán",
      en: "Lion",
      de: "Löwe",
    },
    scientificName: "Panthera leo",
    src: "lionCard",
    intro: {
      hu: "A vadon élő oroszlánok elsősorban Afrikában élnek. Társas ragadozók, amelyek falkákban élnek és együtt vadásznak.",
      en: "Wild lions live mainly in Africa. They are social predators that live in prides and hunt together.",
      de: "Wild lebende Löwen leben hauptsächlich in Afrika. Sie sind soziale Raubtiere, die in Rudeln leben und gemeinsam jagen.",
    },
    habitat: {
      hu: "Szavannák, füves puszták és ritkás erdők Afrikában.",
      en: "Savannas, grasslands, and open woodlands in Africa.",
      de: "Savannen, Grasland und lichte Wälder in Afrika.",
    },
    diet: {
      hu: "Húsevő: elsősorban antilopot, zebrát és más nagytestű patásokat ejt el.",
      en: "Carnivore: it mainly hunts antelope, zebra, and other large hoofed animals.",
      de: "Fleischfresser: Er jagt vor allem Antilopen, Zebras und andere große Huftiere.",
    },
    lifestyle: {
      hu: "Falkában él, jellemzően több nőstényből, kölykökből és néhány hímből. A vadászat nagy részét a nőstények végzik.",
      en: "It lives in a pride, usually made up of several females, cubs, and a few males. Females do most of the hunting.",
      de: "Er lebt in einem Rudel, meist aus mehreren Weibchen, Jungtieren und einigen Männchen. Die Weibchen erledigen den größten Teil der Jagd.",
    },
    interestingFact: {
      hu: "Egy felnőtt hím oroszlán sörénye sötétebbé és dúsabbá válik, ahogy öregszik — a kutatók ebből is tudják becsülni a korát.",
      en: "A mature male lion’s mane becomes darker and fuller with age, which also helps researchers estimate his age.",
      de: "Die Mähne eines erwachsenen Löwenmännchens wird mit zunehmendem Alter dunkler und voller. Auch Forschende können daraus sein Alter schätzen.",
    },
    observationQuestion: {
      hu: "Mit csinál most az oroszlán?",
      en: "What is the lion doing now?",
      de: "Was macht der Löwe gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "A oroszlánok napi 16-20 órát is alhatnak — energiát spórolnak a vadászathoz.",
          en: "Lions may sleep for 16 to 20 hours a day, saving energy for hunting.",
          de: "Löwen schlafen bis zu 16 bis 20 Stunden am Tag und sparen Energie für die Jagd.",
        },
      },
      {
        id: "moving",
        label: { hu: "Mozog", en: "Moving", de: "In Bewegung" },
        note: {
          hu: "Figyeld meg a járását: az oroszlánok súlypontja hátrébb van, mint a legtöbb macskafélénél.",
          en: "Watch its walk: a lion’s center of gravity is farther back than in most cats.",
          de: "Beobachte seinen Gang: Der Schwerpunkt eines Löwen liegt weiter hinten als bei den meisten Katzen.",
        },
      },
      {
        id: "eating",
        label: { hu: "Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: 'A vadonban egy nagy zsákmányból az egész falka lakmározik — innen a "lakoma vagy éhezés" életmód.',
          en: "In the wild, the whole pride shares a large kill, leading to a feast-or-famine lifestyle.",
          de: "In freier Wildbahn teilt sich das ganze Rudel eine große Beute: ein Leben zwischen Festmahl und Hunger.",
        },
      },
      {
        id: "watching",
        label: {
          hu: "Figyel valamit",
          en: "Watching something",
          de: "Etwas beobachten",
        },
        note: {
          hu: "Az oroszlánok kiváló látással és hallással rendelkeznek — az éber testtartás sok mindent elárul.",
          en: "Lions have excellent sight and hearing, and an alert posture can reveal a lot.",
          de: "Löwen sehen und hören ausgezeichnet. Ihre aufmerksame Körperhaltung verrät oft viel.",
        },
      },
      {
        id: "playing",
        label: { hu: "Játszik", en: "Playing", de: "Spielen" },
        note: {
          hu: "A kölykök játéka valójában vadászati mozdulatokat gyakoroltat — a leselkedést és a rajtaütést.",
          en: "Cubs practise hunting movements through play, including stalking and pouncing.",
          de: "Jungtiere üben beim Spielen Jagdbewegungen wie Anschleichen und Anspringen.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — próbáld megkeresni egy másik ponton, vagy térj vissza később.",
          en: "That is okay. Try another viewing point or come back later.",
          de: "Das ist in Ordnung. Versuche es an einer anderen Stelle oder komm später wieder.",
        },
      },
    ],
  },
  {
    id: "elephant",

    name: {
      hu: "Elefánt",
      en: "Elephant",
      de: "Elefant",
    },
    scientificName: "Loxodonta africana / Elephas maximus",
    src: "elephantCard",
    intro: {
      hu: "Az elefántok a szárazföld legnagyobb élő emlősei. Rendkívül intelligensek, szoros családi kötelékben élnek, és kiváló memóriájuk van.",
      en: "Elephants are the largest living land mammals. They are highly intelligent, live in close family groups, and have excellent memories.",
      de: "Elefanten sind die größten lebenden Landsäugetiere. Sie sind sehr intelligent, leben in engen Familienverbänden und haben ein ausgezeichnetes Gedächtnis.",
    },
    habitat: {
      hu: "Szavannák, erdők és folyóvölgyek Afrikában és Ázsiában.",
      en: "Savannas, forests, and river valleys in Africa and Asia.",
      de: "Savannen, Wälder und Flusstäler in Afrika und Asien.",
    },
    diet: {
      hu: "Növényevő: füvet, leveleket, kérget és gyümölcsöt fogyaszt — naponta akár 150 kg-ot is.",
      en: "Herbivore: it eats grass, leaves, bark, and fruit, sometimes up to 150 kg a day.",
      de: "Pflanzenfresser: Er frisst Gras, Blätter, Rinde und Früchte, manchmal bis zu 150 kg am Tag.",
    },
    lifestyle: {
      hu: "Nőstények és kölykeik családi csoportokban élnek, amelyet a legidősebb, legtapasztaltabb nőstény vezet.",
      en: "Females and calves live in family groups led by the oldest and most experienced female.",
      de: "Weibchen und Jungtiere leben in Familiengruppen, die vom ältesten und erfahrensten Weibchen geführt werden.",
    },
    interestingFact: {
      hu: "Az elefánt ormánya több mint 40 000 izmot tartalmaz, és elég finom mozdulatokra képes ahhoz, hogy egyetlen szem mogyorót is felvegyen.",
      en: "An elephant’s trunk contains more than 40,000 muscles and is precise enough to pick up a single peanut.",
      de: "Der Rüssel eines Elefanten enthält mehr als 40.000 Muskeln und kann präzise genug sein, um eine einzelne Erdnuss aufzuheben.",
    },
    observationQuestion: {
      hu: "Mit csinál most az elefánt?",
      en: "What is the elephant doing now?",
      de: "Was macht der Elefant gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "Az elefántok gyakran állva alszanak, csak néhány órát éjszakánként.",
          en: "Elephants often sleep standing up, for only a few hours each night.",
          de: "Elefanten schlafen oft im Stehen und nur wenige Stunden pro Nacht.",
        },
      },
      {
        id: "moving",
        label: { hu: "Mozog", en: "Moving", de: "In Bewegung" },
        note: {
          hu: "Figyeld meg a lépteit — a talpán lévő párna csillapítja a lépések zaját.",
          en: "Watch its steps: the cushion in its foot softens the sound of walking.",
          de: "Beobachte seine Schritte: Das Polster unter dem Fuß dämpft die Geräusche.",
        },
      },
      {
        id: "eating",
        label: { hu: "Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: "Az ormányával téphet le ágakat, és a szájához emelheti a táplálékot.",
          en: "It can tear off branches with its trunk and lift food to its mouth.",
          de: "Mit dem Rüssel kann er Äste abreißen und Nahrung zum Mund führen.",
        },
      },
      {
        id: "watching",
        label: {
          hu: "Figyel valamit",
          en: "Watching something",
          de: "Etwas beobachten",
        },
        note: {
          hu: "A fülcsapkodás gyakran a hőszabályozás jele, nem csak a figyelemé.",
          en: "Flapping ears often help regulate body temperature, not just show attention.",
          de: "Das Fächeln mit den Ohren dient oft der Temperaturregulierung und nicht nur der Aufmerksamkeit.",
        },
      },
      {
        id: "playing",
        label: { hu: "Játszik", en: "Playing", de: "Spielen" },
        note: {
          hu: "A fiatal elefántok gyakran fröcskölnek vízzel vagy porral játékból.",
          en: "Young elephants often splash water or throw dust for fun.",
          de: "Junge Elefanten spritzen oft aus Spaß mit Wasser oder werfen mit Staub.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — próbálj másik szögből nézni, vagy sétálj tovább egy kicsit.",
          en: "That is okay. Try looking from another angle or walk on a little.",
          de: "Das ist in Ordnung. Versuche es aus einem anderen Blickwinkel oder geh ein Stück weiter.",
        },
      },
    ],
  },
  {
    id: "penguin",

    name: {
      hu: "Pingvin",
      en: "Penguin",
      de: "Pinguin",
    },
    scientificName: "Spheniscidae",
    src: "penguinCard",
    intro: {
      hu: "A pingvinek röpképtelen tengeri madarak, amelyek kiválóan alkalmazkodtak a vízi életmódhoz. Idejük nagy részét a tengerben töltik vadászattal.",
      en: "Penguins are flightless seabirds that are highly adapted to life in the water. They spend most of their time at sea hunting.",
      de: "Pinguine sind flugunfähige Seevögel, die hervorragend an das Leben im Wasser angepasst sind. Sie verbringen die meiste Zeit jagend im Meer.",
    },
    habitat: {
      hu: "Főként a déli féltekén: az Antarktisztól kezdve Dél-Afrika, Dél-Amerika és Ausztrália tengerpartjaiig, sőt a Galápagos-szigetekig.",
      en: "Mainly in the Southern Hemisphere: from Antarctica to the coasts of South Africa, South America, Australia, and even the Galápagos Islands.",
      de: "Hauptsächlich auf der Südhalbkugel: von der Antarktis bis zu den Küsten Südafrikas, Südamerikas, Australiens und sogar den Galápagos-Inseln.",
    },
    diet: {
      hu: "Húsevő: elsősorban hallal, garnélarákkal (krillel) és kalmárral táplálkozik.",
      en: "Carnivore: feeds mainly on fish, krill, and squid.",
      de: "Fleischfresser: ernährt sich hauptsächlich von Fisch, Krill und Tintenfisch.",
    },
    lifestyle: {
      hu: "Társas lény, hatalmas kolóniákban (kráterekben) él és fészkel. Nagyon jól úszik és mélyre tud merülni a zsákmányért.",
      en: "Social animal, living and nesting in large colonies. It is an excellent swimmer and can dive deep for prey.",
      de: "Soziales Tier, das in riesigen Kolonien lebt und nistet. Er ist ein hervorragender Schwimmer und kann auf der Suche nach Beute tief tauchen.",
    },
    interestingFact: {
      hu: "A pingvinek szárnyai az evolúció során hatékony uszonyokká alakultak, így a víz alatt úgy tűnik, mintha repülnének.",
      en: "Over time, penguins' wings evolved into efficient flippers, making them look as if they are flying underwater.",
      de: "Die Flügel der Pinguine haben sich im Laufe der Evolution zu effizienten Flossen entwickelt, sodass es unter Wasser aussieht, als würden sie fliegen.",
    },
    observationQuestion: {
      hu: "Mit csinál most a pingvin?",
      en: "What is the penguin doing now?",
      de: "Was macht der Pinguin gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "A pingvinek állva vagy a hasukon fekve is képesek aludni, gyakran egymáshoz bújva tartják melegen magukat.",
          en: "Penguins can sleep standing up or lying on their bellies, often huddling together to stay warm.",
          de: "Pinguine können im Stehen oder auf dem Bauch liegend schlafen und kuscheln sich oft aneinander, um sich warm zu halten.",
        },
      },
      {
        id: "moving",
        label: { hu: "Mozog", en: "Moving", de: "In Bewegung" },
        note: {
          hu: "A szárazföldön jellegzetesen tipegnek, de a jégen néha a hasukon csúszva (szánkózva) haladnak gyorsabban.",
          en: "On land they have a distinctive waddle, but on ice they sometimes toboggan on their bellies to move faster.",
          de: "An Land watscheln sie charakteristisch, aber auf Eis rutschen sie manchmal auf dem Bauch (Schlittenfahren), um sich schneller zu bewegen.",
        },
      },
      {
        id: "eating",
        label: { hu: "Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: "A pingvinek egészben nyelik le a halat a víz alatt. Nyelvükön tüskék találhatók, hogy a csúszós zsákmány ne menekülhessen el.",
          en: "Penguins swallow fish whole underwater. They have backward-facing spines on their tongues to keep slippery prey from escaping.",
          de: "Pinguine verschlingen Fische unter Wasser im Ganzen. Ihre Zungen haben nach hinten gerichtete Stacheln, damit die schlüpfrige Beute nicht entkommt.",
        },
      },
      {
        id: "swimming",
        label: { hu: "Úszik", en: "Swimming", de: "Schwimmen" },
        note: {
          hu: "A vízi akrobaták akár 20-30 km/h sebességgel is képesek úszni, és időnként kiugranak a vízből levegőért.",
          en: "These aquatic acrobats can swim up to 20-30 km/h and occasionally leap out of the water to breathe.",
          de: "Diese Akrobaten des Wassers können bis zu 20–30 km/h schnell schwimmen und springen manchmal aus dem Wasser, um Luft zu holen.",
        },
      },
      {
        id: "preening",
        label: { hu: "Tollászkodik", en: "Preening", de: "Gefieder pflegen" },
        note: {
          hu: "A tollazat ápolása létfontosságú: speciális olajjal vonják be a tollaikat, így azok teljesen vízállóak maradnak.",
          en: "Preening is essential: they spread a special oil over their feathers to keep them completely waterproof.",
          de: "Die Gefiederpflege ist lebenswichtig: Sie verteilen ein spezielles Öl auf ihren Federn, damit diese vollständig wasserdicht bleiben.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — lehet, hogy épp a víz alatt búvárkodik vagy a búvóhelyén pihen.",
          en: "That is okay. It might be diving underwater or resting in its shelter.",
          de: "Das ist in Ordnung. Vielleicht taucht er gerade unter Wasser oder ruht sich in seinem Unterschlupf aus.",
        },
      },
    ],
  },
];

export function getAnimalById(id) {
  return ANIMALS.find((a) => a.id === id) || null;
}

export function getAnimalName(animal, language = "hu") {
  return animal?.name?.[language] || animal?.name?.hu || "";
}

export function getAnimalText(animal, field, language = "hu") {
  const value = animal?.[field];
  return value?.[language] || value?.hu || "";
}

export function getAnimalObservationOptions(animal, language = "hu") {
  return (animal?.observationOptions || []).map((option) => ({
    ...option,
    label: option.label?.[language] || option.label?.hu || "",
    note: option.note?.[language] || option.note?.hu || "",
  }));
}

export const ANIMAL_TYPES = [
  { id: "mammal", label: { hu: "Emlős", en: "Mammal", de: "Säugetier" } },
  { id: "bird", label: { hu: "Madár", en: "Bird", de: "Vogel" } },
  { id: "reptile", label: { hu: "Hüllő", en: "Reptile", de: "Reptil" } },
  {
    id: "amphibian",
    label: { hu: "Kétéltű", en: "Amphibian", de: "Amphibie" },
  },
  { id: "fish", label: { hu: "Hal", en: "Fish", de: "Fisch" } },
  { id: "insect", label: { hu: "Rovar", en: "Insect", de: "Insekt" } },
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Andere" } },
];

export const DIET_OPTIONS = [
  { id: "plants", label: { hu: "Növény", en: "Plants", de: "Pflanzen" } },
  { id: "meat", label: { hu: "Hús", en: "Meat", de: "Fleisch" } },
  { id: "fish", label: { hu: "Hal", en: "Fish", de: "Fisch" } },
  { id: "fruit", label: { hu: "Gyümölcs", en: "Fruit", de: "Obst" } },
  { id: "insects", label: { hu: "Rovar", en: "Insects", de: "Insekten" } },
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Andere" } },
  {
    id: "unknown",
    label: { hu: "Nem tudom", en: "I don't know", de: "Weiß ich nicht" },
  },
];

export const OBSERVED_OPTIONS = [
  { id: "moving", label: { hu: "Mozog", en: "Moving", de: "In Bewegung" } },
  { id: "resting", label: { hu: "Pihen", en: "Resting", de: "Ruhen" } },
  { id: "eating", label: { hu: "Eszik", en: "Eating", de: "Fressen" } },
  { id: "drinking", label: { hu: "Iszik", en: "Drinking", de: "Trinken" } },
  { id: "playing", label: { hu: "Játszik", en: "Playing", de: "Spielen" } },
  { id: "watching", label: { hu: "Figyel", en: "Watching", de: "Beobachten" } },
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Andere" } },
];

export function getOptionLabel(option, language = "hu") {
  return option?.label?.[language] || option?.label?.hu || "";
}
