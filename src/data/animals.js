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
    typeId: "mammal",
    intro: {
      hu: "A vadon élő oroszlánok elsősorban Afrikában élnek. Társas ragadozók, amelyek csapatos falkákban élnek és együtt vadásznak.",
      en: "Wild lions live mainly in Africa. They are social predators that live in prides and hunt together.",
      de: "Wildlebende Löwen kommen hauptsächlich in Afrika vor. Sie sind soziale Raubtiere, die in Rudeln leben und gemeinsam jagen.",
    },
    habitat: {
      hu: "Szavannák, füves puszták és ritkás erdők Afrikában.",
      en: "Savannas, grasslands, and open woodlands in Africa.",
      de: "Savannen, Grasland und lichte Wälder in Afrika.",
    },
    diet: {
      hu: "Húsevő: elsősorban antilopokat, zebrákat és más nagytestű patásokat ejt el.",
      en: "Carnivore: mainly hunts antelopes, zebras, and other large hoofed animals.",
      de: "Fleischfresser: Jagt vor allem Antilopen, Zebras und andere große Huftiere.",
    },
    lifestyle: {
      hu: "Falkában él, amely jellemzően több nőstényből, kölykökből és néhány hímből áll. A vadászat nagy részét a nőstények végzik.",
      en: "Lives in a pride, usually consisting of several females, cubs, and a few males. Females do most of the hunting.",
      de: "Lebt in einem Rudel, das meist aus mehreren Weibchen, Jungtieren und einigen Männchen besteht. Die Weibchen erledigen den größten Teil der Jagd.",
    },
    interestingFact: {
      hu: "Egy kifejlett hím oroszlán sörénye az kor előrehaladtával sötétebbé és dúsabbá válik — a kutatók ebből is meg tudják becsülni a korát.",
      en: "A mature male lion’s mane becomes darker and fuller with age, which helps researchers estimate its age.",
      de: "Die Mähne eines ausgewachsenen Löwenmännchens wird mit zunehmendem Alter dunkler und dichter. Forschende können daran sein Alter schätzen.",
    },
    observationQuestion: {
      hu: "Mit csinál most az oroszlán?",
      en: "What is the lion doing right now?",
      de: "Was macht der Löwe gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "Az oroszlánok napi 16–20 órát is alhatnak, hogy energiát spóroljanak a vadászathoz.",
          en: "Lions can sleep up to 16–20 hours a day to save energy for hunting.",
          de: "Löwen schlafen bis zu 16 bis 20 Stunden am Tag, um Energie für die Jagd zu sparen.",
        },
      },
      {
        id: "moving",
        label: { hu: "Mozog", en: "Moving", de: "In Bewegung" },
        note: {
          hu: "Figyeld meg a mozgását: az oroszlánok súlypontja hátrébb van, mint a legtöbb macskafélének.",
          en: "Watch its walk: a lion’s center of gravity is further back than in most other cats.",
          de: "Beobachte seinen Gang: Der Schwerpunkt eines Löwen liegt weiter hinten als bei den meisten anderen Katzen.",
        },
      },
      {
        id: "eating",
        label: { hu: "Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: "A vadonban egy nagyobb zsákmányból az egész falka lakmározik — innen ered a „bőség vagy éhezés” életmódjuk.",
          en: "In the wild, the whole pride shares a large kill, leading to a feast-or-famine lifestyle.",
          de: "In freier Wildbahn teilt sich das ganze Rudel eine große Beute – ein Leben zwischen Überfluss und Hunger.",
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
          hu: "Az oroszlánok látása és hallása is kiváló — az éber testtartásuk sok mindent elárul.",
          en: "Lions have excellent eyesight and hearing; an alert posture reveals a lot.",
          de: "Löwen sehen und hören ausgezeichnet. Ihre aufmerksame Körperhaltung verrät oft viel.",
        },
      },
      {
        id: "playing",
        label: { hu: "Játszik", en: "Playing", de: "Spielen" },
        note: {
          hu: "A kölykök a játékkal valójában a vadászati mozdulatokat — a leselkedést és a rajtaütést — gyakorolják.",
          en: "Cubs practice hunting skills through play, such as stalking and pouncing.",
          de: "Jungtiere üben beim Spielen Jagdbewegungen wie das Anschleichen und Anspringen.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — próbáld megkeresni egy másik nézőpontból, vagy térj vissza később.",
          en: "That's okay — try another viewing point or come back later.",
          de: "Das macht nichts – versuche es an einer anderen Stelle oder komm später wieder.",
        },
      },
    ],
  },
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  {
    id: "elephant",

    name: {
      hu: "Elefánt",
      en: "Elephant",
      de: "Elefant",
    },
    scientificName: "Loxodonta africana / Elephas maximus",
    src: "elephantCard",
    typeId: "mammal",
    intro: {
      hu: "Az elefántok a legnagyobb szárazföldi emlősök. Rendkívül intelligensek, szoros családi közösségekben élnek, és kiváló a memóriájuk.",
      en: "Elephants are the largest living land mammals. They are highly intelligent, live in close family groups, and have exceptional memories.",
      de: "Elefanten sind die größten lebenden Landsäugetiere. Sie sind sehr intelligent, leben in engen Familienverbänden und haben ein ausgezeichnetes Gedächtnis.",
    },
    habitat: {
      hu: "Szavannák, erdők és folyóvölgyek Afrikában és Ázsiában.",
      en: "Savannas, forests, and river valleys in Africa and Asia.",
      de: "Savannen, Wälder und Flusstäler in Afrika und Asien.",
    },
    diet: {
      hu: "Növényevő: füvet, leveleket, fák kérgét és gyümölcsöket fogyaszt — naponta akár 150 kg-ot is.",
      en: "Herbivore: eats grass, leaves, bark, and fruit — up to 150 kg a day.",
      de: "Pflanzenfresser: frisst Gras, Blätter, Rinde und Früchte – bis zu 150 kg am Tag.",
    },
    lifestyle: {
      hu: "A nőstények és a kölykök családi csoportokban élnek, amelyeket a legidősebb, legtapasztaltabb nőstény (a matriárka) vezet.",
      en: "Females and calves live in family groups led by the oldest and most experienced female.",
      de: "Weibchen und Jungtiere leben in Familiengruppen, die vom ältesten und erfahrensten Weibchen geführt werden.",
    },
    interestingFact: {
      hu: "Az elefánt ormánya több mint 40 000 izmot tartalmaz, és annyira finom mozdulatokra képes, hogy egyetlen szem mogyorót is fel tud venni vele.",
      en: "An elephant’s trunk contains over 40,000 muscles and is precise enough to pick up a single peanut.",
      de: "Der Rüssel eines Elefanten enthält mehr als 40.000 Muskeln und ist so feinfühlig, dass er eine einzelne Erdnuss aufheben kann.",
    },
    observationQuestion: {
      hu: "Mit csinál most az elefánt?",
      en: "What is the elephant doing right now?",
      de: "Was macht der Elefant gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "Az elefántok gyakran állva alszanak, és éjszakánként mindössze néhány órát pihennek.",
          en: "Elephants often sleep standing up, for only a few hours each night.",
          de: "Elefanten schlafen oft im Stehen und nur wenige Stunden pro Nacht.",
        },
      },
      {
        id: "moving",
        label: { hu: "Mozog", en: "Moving", de: "In Bewegung" },
        note: {
          hu: "Figyeld meg a lépteit — a talpán lévő zsírpárna elnyeli a lépések zaját.",
          en: "Watch its steps: the soft cushion on its feet dampens the sound of its footsteps.",
          de: "Beobachte seine Schritte: Das Polster unter der Sohle dämpft die Schalleinwirkung der Schritte.",
        },
      },
      {
        id: "eating",
        label: { hu: "Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: "Az ormányával ágakat téphet le, és a szájához emelheti a táplálékot.",
          en: "It uses its trunk to tear off branches and lift food into its mouth.",
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
          hu: "A fülcsapkodás elsősorban a hőszabályozást szolgálja, nem csupán a figyelem jele.",
          en: "Flapping their ears mainly helps regulate body temperature, rather than just showing alertness.",
          de: "Das Fächeln mit den Ohren dient primär der Temperaturregulierung und ist nicht nur ein Zeichen von Aufmerksamkeit.",
        },
      },
      {
        id: "playing",
        label: { hu: "Játszik", en: "Playing", de: "Spielen" },
        note: {
          hu: "A fiatal elefántok gyakran fröcskölnek vízzel vagy szórnak port magukra játékból.",
          en: "Young elephants often splash water or throw dust on themselves for fun.",
          de: "Junge Elefanten spritzen oft aus Spaß mit Wasser oder bewerfen sich mit Staub.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — próbáld másik szögből nézni, vagy sétálj tovább egy kicsit.",
          en: "That's okay — try looking from another angle or walk ahead a bit.",
          de: "Das macht nichts – versuche es aus einem anderen Blickwinkel oder geh ein Stück weiter.",
        },
      },
    ],
  },
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  {
    id: "penguin",

    name: {
      hu: "Pingvin",
      en: "Penguin",
      de: "Pinguin",
    },
    scientificName: "Spheniscidae",
    src: "penguinCard",
    typeId: "bird",
    intro: {
      hu: "A pingvinek röpképtelen tengeri madarak, amelyek kiválóan alkalmazkodtak a vízi életmódhoz. Idejük nagy részét a tengerben töltik vadászattal.",
      en: "Penguins are flightless seabirds highly adapted to life in the water. They spend most of their time at sea hunting.",
      de: "Pinguine sind flugunfähige Seevögel, die hervorragend an das Leben im Wasser angepasst sind. Sie verbringen die meiste Zeit jagend im Meer.",
    },
    habitat: {
      hu: "Főként a déli féltekén: az Antarktisztól kezdve Dél-Afrika, Dél-Amerika és Ausztrália tengerpartjaiig, sőt a Galápagos-szigetekig.",
      en: "Mainly in the Southern Hemisphere: from Antarctica to the coasts of South Africa, South America, Australia, and even the Galápagos Islands.",
      de: "Hauptsächlich auf der Südhalbkugel: von der Antarktis bis zu den Küsten Südafrikas, Südamerikas, Australiens und sogar den Galápagos-Inseln.",
    },
    diet: {
      hu: "Húsevő: elsősorban halakkal, garnélarákokkal (krillel) és kalmárokkal táplálkozik.",
      en: "Carnivore: feeds mainly on fish, krill, and squid.",
      de: "Fleischfresser: ernährt sich hauptsächlich von Fisch, Krill und Tintenfisch.",
    },
    lifestyle: {
      hu: "Társas lény, hatalmas kolóniákban él és fészkel. Nagyon jól úszik, és mélyre tud merülni a zsákmányért.",
      en: "Social animal living and nesting in large colonies. It is an excellent swimmer and can dive deep for prey.",
      de: "Soziales Tier, das in riesigen Kolonien lebt und nistet. Er ist ein hervorragender Schwimmer und kann auf der Suche nach Beute tief tauchen.",
    },
    interestingFact: {
      hu: "A pingvinek szárnyai az evolúció során hatékony uszonyokká alakultak, így a víz alatt úgy tűnik, mintha repülnének.",
      en: "Over time, penguins' wings evolved into efficient flippers, making it look as though they are flying underwater.",
      de: "Die Flügel der Pinguine haben sich im Laufe der Evolution zu effizienten Flossen entwickelt, sodass es unter Wasser aussieht, als würden sie fliegen.",
    },
    observationQuestion: {
      hu: "Mit csinál most a pingvin?",
      en: "What is the penguin doing right now?",
      de: "Was macht der Pinguin gerade?",
    },
    observationOptions: [
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "A pingvinek állva és a hasukon fekve is képesek aludni; gyakran egymáshoz bújva melegítik egymást.",
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
          hu: "A pingvinek egészben nyelik le a halat a víz alatt. Nyelvükön hátrafelé mutató tüskék találhatók, így a csúszós zsákmány nem tud kiszabadulni.",
          en: "Penguins swallow fish whole underwater. They have backward-facing spines on their tongues to keep slippery prey from escaping.",
          de: "Pinguine verschlingen Fische unter Wasser im Ganzen. Ihre Zungen haben nach hinten gerichtete Stacheln, damit die schlüpfrige Beute nicht entkommt.",
        },
      },
      {
        id: "swimming",
        label: { hu: "Úszik", en: "Swimming", de: "Schwimmen" },
        note: {
          hu: "Ezek a vízi akrobaták akár 20–30 km/h sebességgel is képesek úszni, és időnként kiugranak a vízből levegőért.",
          en: "These aquatic acrobats can swim at speeds of 20–30 km/h and occasionally leap out of the water to breathe.",
          de: "Diese Akrobaten des Wassers können bis zu 20–30 km/h schnell schwimmen und springen manchmal aus dem Wasser, um Luft zu holen.",
        },
      },
      {
        id: "preening",
        label: { hu: "Tollászkodik", en: "Preening", de: "Gefieder pflegen" },
        note: {
          hu: "A tollazat ápolása létfontosságú: egy speciális faggyús olajjal vonják be a tollaikat, így azok teljesen vízállóak maradnak.",
          en: "Preening is essential: they spread a special waterproofing oil over their feathers.",
          de: "Die Gefiederpflege ist lebenswichtig: Sie verteilen ein spezielles Öl auf ihren Federn, damit diese vollständig wasserdicht bleiben.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — lehet, hogy épp a víz alatt van, vagy a búvóhelyén pihen.",
          en: "That's okay — it might be diving underwater or resting in its shelter.",
          de: "Das macht nichts – vielleicht taucht er gerade unter Wasser oder ruht sich in seinem Unterschlupf aus.",
        },
      },
    ],
  },
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  {
    id: "giraffe",

    name: {
      hu: "Zsiráf",
      en: "Giraffe",
      de: "Giraffe",
    },
    scientificName: "Giraffa camelopardalis",
    src: "giraffeCard",
    typeId: "mammal",
    intro: {
      hu: "A zsiráf a Föld legmagasabb szárazföldi állata. Hosszú nyakával és lábaival könnyedén eléri a lombkorona legfelső leveleit is.",
      en: "The giraffe is the tallest land animal on Earth. With its long neck and legs, it easily reaches leaves high up in the tree canopy.",
      de: "Die Giraffe ist das höchste Landtier der Erde. Mit ihrem langen Hals und ihren langen Beinen erreicht sie mühelos die Blätter in den Baumkronen.",
    },
    habitat: {
      hu: "Afrika szavannái, füves területei és nyílt akácerdői.",
      en: "Savannas, grasslands, and open acacia woodlands in Africa.",
      de: "Savannen, Grasland und offene Akazienwälder in Afrika.",
    },
    diet: {
      hu: "Növényevő: főként az akácfák leveleit, hajtásait és virágait fogyasztja.",
      en: "Herbivore: mainly feeds on the leaves, shoots, and flowers of acacia trees.",
      de: "Pflanzenfresser: ernährt sich hauptsächlich von Blättern, Trieben und Blüten von Akazienbäumen.",
    },
    lifestyle: {
      hu: "Laza, nyitott csordákban él. Sokat vándorol táplálék után kutatva, és a nap nagy részét legeléssel tölti.",
      en: "Lives in loose, open herds. It wanders widely in search of food and spends most of the day browsing.",
      de: "Sie lebt in lockeren Herden. Sie wandert viel auf der Suche nach Nahrung und verbringt den Großteil des Tages mit Fressen.",
    },
    interestingFact: {
      hu: "A zsiráf nyelve akár 45–50 cm hosszú is lehet, kékesfekete színe pedig megvédi a leégéstől a legelés közben.",
      en: "A giraffe's tongue can be up to 45–50 cm long and is bluish-black, protecting it from sunburn while feeding.",
      de: "Die Zunge einer Giraffe kann bis zu 45–50 cm lang sein und ist blau-schwarz, was sie beim Fressen vor Sonnenbrand schützt.",
    },
    observationQuestion: {
      hu: "Mit csinál most a zsiráf?",
      en: "What is the giraffe doing right now?",
      de: "Was macht die Giraffe gerade?",
    },
    observationOptions: [
      {
        id: "eating",
        label: { hu: "Legel / Eszik", en: "Eating", de: "Fressen" },
        note: {
          hu: "Hosszú, ügyes nyelvével elkerüli a tüskéket, hogy elérje a legfinomabb leveleket.",
          en: "Using its long, dexterous tongue, it avoids thorns to reach the best leaves.",
          de: "Mit ihrer langen, geschickten Zunge umgeht sie Dornen, um an die besten Blätter zu gelangen.",
        },
      },
      {
        id: "moving",
        label: { hu: "Sétál", en: "Walking", de: "Gehen" },
        note: {
          hu: "A zsiráfok úgynevezett poroszka járással haladnak: egyszerre az azonos oldalon lévő lábaikat emelik fel.",
          en: "Giraffes walk with a pacing gait, moving both legs on the same side of the body simultaneously.",
          de: "Giraffen bewegen sich im Passgang: Sie heben gleichzeitig die Beine derselben Körperseite.",
        },
      },
      {
        id: "drinking",
        label: { hu: "Iszik", en: "Drinking", de: "Trinken" },
        note: {
          hu: "Ivás közben szélesre terpeszti mellső lábait, hogy elérje a vizet — ebben a helyzetben a legsebezhetőbb.",
          en: "To drink, it must spread its front legs wide to reach the water, making it vulnerable to predators.",
          de: "Zum Trinken muss sie die Vorderbeine weit spreizen, um das Wasser zu erreichen – in dieser Haltung ist sie am verletzlichsten.",
        },
      },
      {
        id: "resting",
        label: { hu: "Pihen", en: "Resting", de: "Ruhen" },
        note: {
          hu: "A zsiráfok ritkán fekszenek le, és általában csak 5–30 percet alszanak naponta, többnyire állva.",
          en: "Giraffes rarely lie down and usually sleep for only 5 to 30 minutes a day, often standing up.",
          de: "Giraffen legen sich selten hin und schlafen meist nur 5 bis 30 Minuten am Tag, oft im Stehen.",
        },
      },
      {
        id: "watching",
        label: {
          hu: "Körültekint",
          en: "Looking around",
          de: "Ausschau halten",
        },
        note: {
          hu: "Magasságának köszönhetően a zsiráf a szavanna „őrtornya”: már messziről észreveszi a veszélyt.",
          en: "Thanks to its height, the giraffe acts as the 'watchtower' of the savanna, spotting danger from afar.",
          de: "Dank ihrer Höhe dient die Giraffe als 'Aussichtsturm' der Savanne und erkennt Gefahren schon von Weitem.",
        },
      },
      {
        id: "not-visible",
        label: { hu: "Nem látom", en: "Not visible", de: "Nicht zu sehen" },
        note: {
          hu: "Nem baj — próbáld megkeresni egy másik ponton, vagy térj vissza később.",
          en: "That's okay — try another viewing point or come back later.",
          de: "Das macht nichts – versuche es an einer anderen Stelle oder komm später wieder.",
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
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Sonstige" } },
];

export const DIET_OPTIONS = [
  { id: "plants", label: { hu: "Növény", en: "Plants", de: "Pflanzen" } },
  { id: "meat", label: { hu: "Hús", en: "Meat", de: "Fleisch" } },
  { id: "fish", label: { hu: "Hal", en: "Fish", de: "Fisch" } },
  { id: "fruit", label: { hu: "Gyümölcs", en: "Fruit", de: "Obst" } },
  { id: "insects", label: { hu: "Rovar", en: "Insects", de: "Insekten" } },
  {
    id: "Omnivore",
    label: { hu: "Mindenevő", en: "Omnivore", de: "Allesfresser" },
  },
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Sonstige" } },
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
  { id: "other", label: { hu: "Egyéb", en: "Other", de: "Sonstige" } },
];

export function getOptionLabel(option, language = "hu") {
  return option?.label?.[language] || option?.label?.hu || "";
}

export function getAnimalTypeLabel(animal, language = "hu") {
  const type = ANIMAL_TYPES.find((option) => option.id === animal?.typeId);
  return getOptionLabel(type, language);
}
