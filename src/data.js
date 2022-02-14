/* TODO make a set of names and randomly pick a default on page load*/
const DEFAULTNAME = "A Kindred That Is Not To Be Named";
const DEFAULTCONCEPT = "Hidden and invisible spy";
const DEFAULTAMBITION = "Become master spy";
const DEFAULTDESIRE = "Creep up on current master spy";
const DEFAULTSIRE = "Anonymous";
const DEFAULTAGE = "26 by looks, 74 by birth";
const DEFAULTDESC = "Entirely common guy";

export const biography = {
  name: {
    id: "Name",
    value: "",
    placeholder: DEFAULTNAME 
  },
  sex: {
    id: "Sex",
    value: "Male",
    list: ["Male", "Female"],
    disabledValue: "Choose sex"
  },
  concept: {
    id: "Concept",
    value: "",
    placeholder: DEFAULTCONCEPT 
  },
  clan: {
    id: "Clan",
    value: "Thin-Blood",
    list: ["Thin-Blood", "Caitiff" ,"Brujah", "Gangrel", "Malkavian", "Nosferatu", "Toreador", "Tremere", "Ventrue"],
    disabledValue: "Pick a Clan"
  },
  generation: {
    id: "Generation",
    value: "16th",
    list: ["16th", "15th", "14th", "13th", "12th", "11th", "10th"],
    disabledValue: "Pick generation"
  },
  faction: {
    id: "Faction",
    value: "Camarilla",
    list: ["Anarch", "Autarki", "Camarilla", "Sabbat"],
    disabledValue: "Pick faction"
  },
  predator: {
    id: "Predator Type",
    value: "Alleycat",
    list: ["Alleycat", "Bagger", "Blood Leech", "Cleaver", "Consensualist", "Farmer", "Osiris", "Sandman", "Scene Queen", "Siren"],
    disabledValue: "Choose Your Predator Type",
  },
  predatorDiscipline: {
    id: "Predator Discipline",
    list: ["Celerity", "Potence"],
    value: null
  },
  ambition: {
    id: "Ambition",
    value: "",
    placeholder: DEFAULTAMBITION
  },
  desire: {
    id: "Desire",
    value: "",
    placeholder: DEFAULTDESIRE
  },
  sire: {
    id: "Sire",
    value: "",
    placeholder: DEFAULTSIRE
  },
  age: {
    id: "Age",
    value: "",
    placeholder: DEFAULTAGE
  },
  description: {
    id: "Description",
    value: "",
    placeholder: DEFAULTDESC
  },
  image: {
    id: "Image",
    value: "data:image/png;base64,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"
  }

};

export const predatorDefinitions = [
  {
    id: "Alleycat",
    specialties: [ 
      { skill: "Intimidation", specialty: "Stickups"},
      { skill: "Brawl", specialty: "Grappling"}
    ],
    disciplines: ["Celerity", "Potence"],
    humanityModifier: -1,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: [],
    advantages: ["Criminal Contacts ***"]
  },
  {
    id: "Bagger",
    specialties: [ 
      { skill: "Larceny", specialty: "Lock-picking"},
      { skill: "StreetWise", specialty: "Black Market"}
    ],
    disciplines: ["Blood Sorcery", "Obfuscate"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: ["Feeding Merit: Iron Gullet ***"],
    flaws: ["The Enemy **"],
    advantages: []
  },
  {
    id: "Blood Leech",
    specialties: [ 
      { skill: "Brawl", specialty: "Kindred"},
      { skill: "Stealth", specialty: "against Kindred"}
    ],
    disciplines: ["Celerity", "Protean"],
    humanityModifier: -1,
    bloodPotencyModifier: 1,
    merits: [],
    flaws: ["Dark Secret Diablerist ** or Shunned ** ", "Feeding flaw ** Prey Exclusion (mortals)"],
    advantages: []
  },
  {
    id: "Cleaver",
    specialties: [ 
      { skill: "Persuasion", specialty: "Gaslighting"},
      { skill: "Subterfudge", specialty: "Coverups"}
    ],
    disciplines: ["Animalism", "Dominate"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Dark Secret Celaver *"],
    advantages: ["Herd ** "]
  },
  {
    id: "Consensualist",
    specialties: [ 
      { skill: "Medicine", specialty: "Phlebotomy"},
      { skill: "Persuasion", specialty: "Victims"}
    ],
    disciplines: ["Auspex", "Fortitude"],
    humanityModifier: 1,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Dark Secret Masquerade Breacher *", "Feeding Flaw Prey exclusion (non-consenting) *"],
    advantages: []
  },
  {
    id: "Farmer",
    specialties: [ 
      { skill: "Animal Ken", specialty: "Specific Animal"},
      { skill: "Survival", specialty: "Hunting"}
    ],
    disciplines: ["Animalism", "Protean"],
    humanityModifier: 1,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Feeding Flaw Vegan **"],
    advantages: []
  },
  {
    id: "Osiris",
    specialties: [ 
      { skill: "Occult", specialty: "Specific tradition"},
      { skill: "Performance", specialty: "Specific entertainment field"}
    ],
    disciplines: ["Blood Sorcery", "Presence"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Two dots between Enemies and Mythic Flaws"],
    advantages: ["3 dots between Fame and Herd"]
  },
  {
    id: "Sandman",
    specialties: [ 
      { skill: "Medicine", specialty: "Anesthetics"},
      { skill: "Stealth", specialty: "Break-in"}
    ],
    disciplines: ["Auspex", "Obfuscate"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Two dots between Enemies and Mythic Flaws"],
    advantages: ["1 dot of Resources"]
  },
  {
    id: "Scene Queen",
    specialties: [ 
      { skill: "Etiquette", specialty: "Specific scene"},
      { skill: "Leadership", specialty: "Specific scene"},
      { skill: "Streetwise", specialty: "Specific scene"}
    ],
    disciplines: ["Dominate", "Potence"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: [],
    flaws: ["Influence flaw Disliked or Feeding flaw Prey exclusion (different subculture from yours)"],
    advantages: ["Fame * and Contact * "]
  },
  {
    id: "Siren",
    specialties: [ 
      { skill: "Persuasion", specialty: "Seduction"},
      { skill: "Subterfudge", specialty: "Seduction"},
    ],
    disciplines: ["Fortitude", "Presence"],
    humanityModifier: 0,
    bloodPotencyModifier: 0,
    merits: ["Looks Merit Beautiful **"],
    flaws: ["Enemy a spurned lover or jelaous partner * "],
    advantages: []
  },
]


export const skillDistributions = [
  {
    id: "Balanced",
    resource: [12, 7, 5, 3, 0, 0],
  },
  {
    id: "Jack-of-all-trades",
    resource: [8, 10, 8, 1, 0, 0],
  },
  {
    id: "Specialist",
    resource: [17, 3, 3, 3, 1, 0],
  },
];

export const attributes = {
  id: "Attributes",
  description: "<p>Attributes are traits that measure a character's innate capabilities. There are three main categories:</p> <ul><li>Physical, <li>Social, <li>Mental.</ul> <p>And there are three different attributes in each,</p> <ul><li>one representing power, <li>second finesse <li>and third resistance.</ul><p>Normal mortal humans and most animals are limited to ratings of between 1 and 5, though in extreme cases they may have attribute ratings of zero. Especially large or fast animals may have Physical attributes beyond this range.</p> <p>Supernatural creatures are often capable of raising their attributes beyond mortal capability. These greater limits may be temporarily granted by the application of supernatural powers, or permanent, as the creature's supernatural body and mind have potential beyond the limitations of mortals.</p><p><b>Pick</b></p><table><tr><td>best attribute :</td><td>4 dots</td></tr><tr><td>three attributes :</td><td>3 dots each</td></tr><tr><td>four attributes :</td><td>2 dots each</td></tr><tr><td>worst attribute :</td><td>1 dot</td></tr></table>",
  resource: [
    0,
    1,
    4,
    3,
    1,
    0,
  ] /*vtm5e attribute distribution: 1 times 4 dots; 3 times 3 dots, 4 times 2 dots
        sum of values in resource <= amount of values in section*/,
  data: [
    {
      id: "Physical",
      description:
        "Physical Attributes measure a character’s general strength, agility, and stamina. Due to the vagaries of the Blood, strong, quick, or tough vampires need not look muscle-bound, graceful, or meaty. Some of the most lethal Kindred appear most deceptively weak and slow.",
      list: [
        {
          id: "Strength",
          value: 1,
          description: {
            general:
              "Strength governs how big a mortal you can lift, how hard you can hit them, and how much force you can push your dead body to exert. (The rough amount you can deadlift without an Attribute test appears in parentheses below.)",
            1: "You can easily crush a beer can. (20 kg: a Christmas tree, a stop sign)",
            2: "You are physically average. (45 kg: a toilet)",
            3: "You might be able to break open a wooden door. (115 kg: a large human, an empty coffin, a refrigerator)",
            4: "You are a prime physical specimen, likely with very visible musculature. (180 kg: a full coffin, an empty dump- ster)",
            5: "You are a true powerhouse and can likely break open a metal fire door, tear open a chain-link fence, or snap open a chained gate. (250 kg: a motorcycle, a piano)",
          },
        },
        {
          id: "Dexterity",
          value: 1,
          description: {
            general:
              "Dexterity governs your agility and grace, how swiftly you dodge that stake to your heart, and how much fine motor control you possess when up against the clock.",
            1: "You can run, but balance and dodging are a challenge.",
            2: "Your sprint is solid, and sometimes you appear graceful.",
            3: "Your agility is impressive, and your coordination is as good as any trained amateur.",
            4: "You could excel at acrobatics and move in a way few humans can.",
            5: "Your movements are liquid and hypnotic – almost superhuman.",
          },
        },
        {
          id: "Stamina",
          value: 1,
          description: {
            general:
              "Stamina absorbs physical harm, such as a speeding bullet or a hunter’s blade, and lets you persevere through hazards and arduous effort. Your Stamina + 3 equals your Health.",
            1: "Even lesser exertions make you winded.",
            2: "You can take a beating, but consider suing for peace.",
            3: "Several days of hard hiking with a backpack is no problem for you.",
            4: "You could win a marathon or take copious amounts of pain, at least physically.",
            5: "Even if you were a mortal, you’d never break a sweat.",
          },
        },
      ],
    },
    {
      id: "Social",
      description:
        "As manipulative creatures, Kindred use humans as building blocks in their power structure, in addition to using them as food and fuel. Social Attributes determine first impressions; the character’s ability to charm, inspire, and motivate people; and the nature of their interactions with others.",
      list: [
        {
          id: "Charisma",
          value: 1,
          description: {
            general:
              "Charisma measures your natural charm, grace, and sex appeal. If you have it, it draws people to you, making feeding a hell of a lot easier. Charisma doesn’t depend on good looks, which are their own Merit (See Looks, p. 179).",
            1: "You can speak clearly, though few people tend to listen.",
            2: "Generally likeable despite your undead nature, you may even have friends.",
            3: "People trust you implicitly, and you easily make friends.",
            4: "You possess significant personal magnetism and draw followers like flies.",
            5: "You could lead a city in rebellion, if you so choose.",
          },
        },
        {
          id: "Manipulation",
          value: 1,
          description: {
            general:
              "Manipulation is your ability to twist others to your point of view, lie convincingly, and walk away after duping a mark without anyone being any the wiser.",
            1: "As long as you stay honest, you can convince people to do what you want.",
            2: "Your ability to deceive surpasses the will of the weakwilled and simpleminded.",
            3: "You never have to pay full price for anything.",
            4: "You could be a cult leader – or a politician.",
            5: "You could convince the Prince to invest in desert property, or maybe even to call off the Blood Hunt on your head.",
          },
        },
        {
          id: "Composure",
          value: 1,
          description: {
            general:
              "Composure allows you to remain calm, to command your emotions, and to put others at ease despite anxiety. It is also represents your ability to stay cool in everything from firefights to intimate encounters. Your Composure + Resolve equals your Willpower (p. 157).",
            1: "The slightest insult or confrontation could drive you to frenzy.",
            2: "You can subdue your predatory instincts in most nonhostile situations.",
            3: "Others look to you for guidance when the blood spatter hits the fan.",
            4: "You can effortlessly bluff at cards and can manage your Beast to some extent.",
            5: "The Beast is your pet.",
          },
        },
      ],
    },
    {
      id: "Mental",
      description:
        "Mental Attributes represent the capacity for learning, intuition, and focus. High Mental Attributes might indicate native genius, superb education, or strong will. Low Mental Attributes might derive from naiveté, ignorance, or just incapacity at thinking. But that was in life",
      list: [
        {
          id: "Intelligence",
          value: 1,
          description: {
            general:
              "Intelligence measures your ability to reason, research, and apply logic. You can recall and analyze information from books or from your senses. No puzzle or mystery can elude the truly intelligent.",
            1: "You can read and write competently, though some terms confound you.",
            2: "You are smart enough to realize your limitations.",
            3: "You are enlightened, able to piece together clues without difficulty.",
            4: "You’re likely consulted by members of Clan Tremere for your wisdom.",
            5: "Genius does not cover the depths and range of your intellect.",
          },
        },
        {
          id: "Wits",
          value: 1,
          description: {
            general:
              "Wits are for thinking quickly and reacting correctly on little information. “You hear a sound” is Wits; You hear two guards coming” is Intelligence. Wits let you smell an ambush or answer the Harpy back at court right away, instead of thinking of the best response the next night.",
            1: "You get the point eventually, but it takes explaining.",
            2: "You can bet the odds in poker or apply the emergency brakes in time. Usually.",
            3: "You can analyze a situation and quickly work out the best escape route.",
            4: "You are never caught on the back foot and always come up with a smart riposte.",
            5: "You think and respond more quickly than most people can comprehend.",
          },
        },
        {
          id: "Resolve",
          value: 1,
          description: {
            general:
              "Resolve provides focus and determination, and measures concentration and mental fortitude. Resolve powers allnight watches and blocks out distractions. Your Composure + Resolve equals your Willpower.",
            1: "You have minimal attention for all but the most pressing things.",
            2: "You can settle in for the long haul, as long as it’s not too long.",
            3: "Distracting you takes more effort than most other people want to spend.",
            4: "You can bruteforce your way to a deduction past any obstacles.",
            5: "You can think in a gunfight or watch the door in a blood orgy and then clean up every shell casing or spilled droplet.",
          },
        },
      ],
    },
  ],
};

export const skills = {
  id: "Skills",
  description: "<p>Skills are traits that represent a character's acquired capabilities. Typically a Skill is combined with an Attribute (and occasionally a third supernatural trait) to form a dice pool for an action, representing the character's natural prowess and learned ability coming together to perform a task. </p><p>Like Attributes, Skills are grouped into Physical, Social and Mental categories and are rated from 0 to 5 dots. There are eight Skills in each category for a total of 24 broad Skills, representing all possible learned activities.</p><p>Tasks which are instinctual rather than learned - like observing one's environment or resisting one's emotions - are generally resolved using Attributes only, and do not involve Skill use.</p><p>To represent more specific training, characters may nominate Specialties which effectively increase the Skill's rating by one for tasks within their purview. For example, a character with a Medicine Skill rating of 2 with a speciality in \"First Aid\" would have an effective Skill rating of 3 when administering CPR or applying a pressure bandage.</p><p>Attempting to perform an action \"untrained\" - with a rating of zero in the required Skill - imposes an additional penalty on that action. This penalty is higher for Mental skills than for the other two categories.</p><p>There are three  skill distributions, restricting how many dots you can pick:</p><ul><li>Balanced - Three Skills at 3; five Skills at 2; seven Skills at 1<li>Jack-of-all-trades - One Skill at 3; eight Skills at 2; ten Skills at 1<li>Specialist - One Skill at 4; three Skills at 3; three Skills at 2; three Skills at 1</ul>",
  resource: [12, 7, 5, 3, 0, 0],
  data: [
    {
      id: "Physical",
      description:
        "Physical Skills depend entirely, or at least in large part, on physical control, aptitude, or effort.",
      list: [
        {
          id: "Athlethics",
          value: 0,
          description: {
            general:
              "Athletics allows you to outpace someone in pursuit, leap out of the way of an oncoming car, and climb and swim like a healthy, robust living person. A character can use Athletics in place of any Physical combat Skill in a conflict roll, but in that case, they never inflict any hits on their opponent, no matter how many successes they roll.",
            1: "You were always attentive in gym class and you still have a spring in your step.",
            2: "Despite being dead, you are still as fit as a mortal doing regular exercise.",
            3: "You are fit as a fiddle and could play professional sports. Night games, at least.",
            4: "With your parkour abilities, why would you need to turn into a bat?",
            5: "Olympic records await you; only a very few peak humans can achieve what you can. Vampires mistake your skill for Physical Disciplines.",
            specialties:
              "Specialties: Acrobatics, Archery, Climbing, Endurance, Jumping, Parkour, Swimming, Throwing",
          },
        },
        {
          id: "Brawl",
          value: 0,
          description: {
            general:
              "Brawl enables characters to hit their target when they swing with fist, boot, or claw. As long as you have no weapon in hand, the attack constitutes a brawl, from elegant aikijutsu to dirty street fighting.",
            1: "You had a tough upbringing and had to fight to justify your place. You still have some moves.",
            2: "You received some training in hitting someone hard and accurately.",
            3: "You more than hold your own in a scrap.",
            4: "You either received Spetsnazquality training, or you have spent decades of afterlife in fights.",
            5: "You could win MMA championships even without the use of your vampiric powers.",
            specialties:
              "Specialties: Animals, Armed Mortals, Bar Fights, Grappling, Kindred, Sporting Combat, Unarmed Mortals, Werewolves, While in Protean Beast Form",
          },
        },
        {
          id: "Craft",
          value: 0,
          description: {
            general:
              "Craft broadly encompasses artistry, creation of items and utilities from the beautiful to the functional, and arts and crafts from throwing pottery all the way to building and reinforcing your own haven. When you take this Skill, you get a free specialty. Unlike most Skills, you can have more specialties in Craft than you have dots.",
            1: "You are an amateur, but you know what you are doing.",
            2: "Your craftsmanship is admired for its functionality.",
            3: "Your creations can be beautiful or horrifying, but their intent always clear.",
            4: "Your skill is highly respected among the kine and Kindred aware of it.",
            5: "You are often chosen to create the focal point for parties at Elysium.",
            specialties:
              "Specializations: Carpentry, Carving, Design, Painting, Sculpting, Sewing, Weaponsmithing ",
          },
        },
        {
          id: "Drive",
          value: 0,
          description: {
            general:
              "Anyone (except perhaps 500-yearold vampires) can learn to drive a car. The Drive Skill connotes ability to drive fast and safely under 160 adverse conditions or in stressful situations: to drive offroad, speed away from ambushes, win street races, and get out of chases with the Second Inquisition.",
            1: "You are a cautious driver, unlikely to make any mistakes.",
            2: "You can put your foot down without much fear of an accident, providing visibility is good.",
            3: "You have won car chases, earning a cool reputation among the Anarchs.",
            4: "You could be a stunt driver or the personal chauffeur of a Prince or Baron.",
            5: "You know cars inside and out. Few can match your skill and knowledge.",
            specialties:
              "Specialties: AllTerrain Vehicles, Evasion, Motorcycles, Street Racing, Stunts, Tailing, Trucks, Vintage Models ",
          },
        },
        {
          id: "Firearms",
          value: 0,
          description: {
            general:
              "Firearms Cainites use Firearms not only for the human reasons (efficiency and thrill) but to preserve the Masquerade. This Skill comprises familiarity with small arms from holdout pistols to assault rifles. It also includes other triggeroperated weapons, such as crossbows and shoulderfired rocketpropelled grenades. Finally, it includes cleaning, unjamming, and rapidly reloading such weapons.",
            1: "You’ve fired a gun a few times, at the range or in lessformal circumstances.",
            2: "You know (and know how) to keep your weapon clean, take it apart, and reassemble it.",
            3: "You’ve been in the shit (“seen the elephant” if you’re older than a century) and come out the other side.",
            4: "You can handle trick shots, called shots, running shots – really anything ending in a gunshot.",
            5: "You’ve been practicing since the debut of the Winchester.",
            specialties:
              "Specialties: Crossbows, Gun Dealing, Gunsmithing, Handloading Ammunition, QuickDraw, Sniper, Trick Shooting",
          },
        },
        {
          id: "Larceny",
          value: 0,
          description: {
            general:
              "This Skill entails familiarity with the tools and techniques for picking locks, planting bugs, deactivating standard burglar and car alarms, manual forgery, hot-wiring automobiles, or even safecracking, as well as countless forms of breaking and entering. Characters also use it for setting up “unbeatable” security systems or deducing how and where systems failed in a break-in. Ventrue probably call the skill “Security.” These days, most high-end security systems feature computer controls, video surveillance, or electronic alarms, so they might also involve the Technology Skill to defeat.",
            1: "You can pick a simple lock or a careless pocket.",
            2: "You can hotwire a car or shoplift with ease.",
            3: "You can identify the locations of security cameras and alarms so to best bypass them.",
            4: "You can defeat a keypad, retool an ID card, or crack a safe.",
            5: "You can get into – or out of – the vault of a multinational bank.",
            specialties:
              "Specialties: Alarms, Forgery, Grand Theft Auto, Housebreaking, Lockpicking, Pickpocket, Safecracking, Security Analysis ",
          },
        },
        {
          id: "Melee",
          value: 0,
          description: {
            1: "You can swing a bat or blade and mostly hit the people you intend to.",
            2: "Your clear competence with a weapon in hand should give attackers pause.",
            3: "Your skill with a melee weapon is known throughout the domain.",
            4: "The fools brought a gun to your knife fight.",
            5: "You are the domain’s weaponmaster, sought out by Kindred far and wide for your skill.",
            specialties:
              "Specialties: Axes, Chains, Clubs, Fencing, Disarming Blows, Garrotes, Improvised Weapons, Knives, Stakes, Swords",
          },
        },
        {
          id: "Stealth",
          value: 0,
          description: {
            general:
              "Stealth allows a character to shadow a target, making vampires with this ability superlative hunters. They benefit from the ability to spy, sneak, and blend in with crowds when needed.",
            1: "Spotting you under the cover of darkness or in camouflage proves difficult.",
            2: "You can sneak by casual observers and stalk unknowing victims without raising any hackles.",
            3: "You evade patrolling guards, moving softly and hiding easily.",
            4: "Your subtle, silent passage could make you a worthy ninja – or a worthy foe for ninja.",
            5: "The Children of Haqim come to you for advice on stalking and hiding, if they can find you.",
            specialties:
              "Specialties: Ambushes, Crowds, Disguise, Hiding, Shadowing, Silent Movement, Urban, Wilderness",
          },
        },
        {
          id: "Survival",
          value: 0,
          description: {
            general:
              "Survival conveys the ability to exist in the wild and other adverse conditions, and to return to civilization again: navigate by the stars, establish a makeshift haven, and notice werewolf signs before it’s too late. Some of its related functions apply in parks, brownfields, and other wastelands of the urban jungle.",
            1: "You know the trails and wilderness around your domain.",
            2: "You spend more time outdoors than inside, and you can track anyone who doesn’t possess woodcraft.",
            3: "You can subsist outside the city, setting traps for mortals and a shelter for yourself.",
            4: "You can thrive outside the city like the true predator you are.",
            5: "Gangrel run in packs with you – if they can keep up.",
            specialties:
              "Specialties: Desert, Hunting, Jungle, Tracking, Traps, Shelters, Urban Exploration, Woodlands",
          },
        },
      ],
    },
    {
      id: "Social",
      description:
        "Social Skills operate in the space between people or between Kindred. Although they depend on your ability and your personality, the other party’s response contributes something to the effort. Without skill on your part, that response tends to be negative.",
      list: [
        {
          id: "Animal Ken",
          value: 0,
          description: {
            general:
              "Animal Ken allows you to cow, pacify, and even befriend animals.This Skill allows you to predict how an animal might react in a given situation, train a domesticated creature, or even try to calm or enrage animals. Without this Skill, most creatures pointedly avoid or grow aggressive around vampires.",
            1: "Animals shy away from you but will not bolt or snap.",
            2: "Animals are docile around you, acting as if you aren’t there, unless you build a rapport with them.",
            3: "Animals treat you as if you were a warm, friendly owner, unless provoked to do otherwise.",
            4: "You draw animals into your orbit. Few attacking creatures maintain their aggression.",
            5: "You can sense an animal’s feelings and thoughts, and they can feel and act on yours.",
            specialties:
              "Specialties: Attack Training, Cats, Dogs, Falconry, Horses, Pacification, Rats, Snakes, Stunt Training, Wolves",
          },
        },
        {
          id: "Etiquette",
          value: 0,
          description: {
            general:
              "Etiquette is the ability to identify and respond to the social conventions in the current scene, set new protocols, and please everyone around with your good graces. Use this Skill in both Kindred and mortal high society.",
            1: "You know how to address your local ruler without causing a faux pas.",
            2: "You know the rules of etiCHARACTERS quette in each of the domain’s popular nightspots.",
            3: "You impress others with your command of politeness, deference, and grace.",
            4: "Your behavior sets trends, especially if you do something to buck the norm of etiquette.",
            5: "The Keeper of Elysium and the Harpies look to you to establish domain protocol.",
            specialties:
              "Specialties: Anarch, Camarilla, Celebrities, Corporate, Elysium, Feudal, OnePercenter, Secret Society",
          },
        },
        {
          id: "Insight",
          value: 0,
          description: {
            general:
              "Insight grants you the ability to interpret body language, note subtle cues in expression and tone, and determine truth from lies. It also allows you to perceive and understand the motives behind another’s actions.",
            1: "You can see straight through hollow boasts.",
            2: "You pick up on the hidden emotion between humans and even sometimes between Kindred.",
            3: "You can provide psychotherapy even more effectively than someone who doesn’t want to eat their patient.",
            4: "You are an undead lie detector. Only the best con artists can slip one by you.",
            5: "People may be books of blood, but they are printed in very large type – easy to read.",
            specialties:
              "Specialties: Ambitions, Desires, Detect Lies, Emotions, Empathy, Interrogation, Motives, Phobias, Vices",
          },
        },
        {
          id: "Intimidation",
          value: 0,
          description: {
            general:
              "Intimidation is the power to bully, coerce, threaten, and strongarm your way to a social victory. Vampires who rely on Intimidation do not hesitate to crush the wills – and occasionally the finger bones – of their foes.",
            1: "You can cut a scathing insult effectively.",
            2: "You can push your way around most humans without difficulty.",
            3: "Your swagger and your cruel behavior have earned you your reputation.",
            4: "You're far past mere physical threats.",
            5: "Even fellow Kindred may step back if you step up.",
            specialties:
              "Specialties: Extortion, Insults, Interrogation, Physical Coercion, Staredowns, Veiled Threats",
          },
        },
        {
          id: "Leadership",
          value: 0,
          description: {
            general:
              "Leadership grants you the ability to lead a crowd, command a detachment, boost the morale of your supporters, or subdue a riot.A strong Prince or Baron must possess Leadership or risk losing their throne.",
            1: "You have led informal clubs before and can organize Kindred of like mind.",
            2: "Your voice makes itself heard in council, and even your superiors sometimes listen.",
            3: "You can command on the battlefield and lead your soldiers into death.",
            4: "You can inspire the injured and dying to action, so long as you are there to lead them.",
            5: "Your words fill a vampire’s heart with enough strength to make it feel alive and beating.",
            specialties:
              "Specialties: Command, Inspiration, Oratory, Praxis, Team Dynamics, War Pack ",
          },
        },
        {
          id: "Performance",
          value: 0,
          description: {
            general:
              "Performance covers a range of arts, from dance to poetry and comedy to storytelling. You may be an inspired performer in your own right or simply an enthusiastic student of the arts. When you take this Skill, you get a free specialty.",
            1: "You are the life of the party, but you wouldn’t take your act on stage.",
            2: "You have performed for others, to mixed reviews. Some love you, others hate you.",
            3: "You are an expert student of your chosen performing art.",
            4: "You perform your practiced art form stunningly, winning over even Toreador far and wide.",
            5: "Improvisation holds no terrors for you: every night a different audience, every night a different show.",
            specialties:
              "Specialties: Comedy, Dance, Drama, Drums, Guitar, Keyboards, Poetry, Public Speaking, Rap, Singing, Violin, Wind Instruments <br>In theory, the Storyteller could break these specialties down endlessly – can even a fivedot pop star also perform as a coloratura soprano and a country crooner? But in practice, unless the whole chronicle happens in a musical or theatrical milieu, allow broader specialties.",
          },
        },
        {
          id: "Persuasion",
          value: 0,
          description: {
            general:
              "Use Persuasion when trying to convince others that you know what’s best for them, and that one bite won’t hurt at all. Skilled persuaders can play on victims’ emotions and appeal to peers’ reason. Persuasion applies in law courts and princely courts, in boardrooms, barrooms, and bedrooms.",
            1: "You can sell to a motivated buyer.",
            2: "You can always swing a discount or get on the inside track of the latest gossip.",
            3: "You can always figure out a compromise in a given conflict.",
            4: "The other side starts looking for a settlement when they see you in court, human or Kindred.",
            5: "You may be the original silvertongued devil.",
            specialties:
              "Specialties: Bargaining, Fast Talk, Interrogation, Legal Argument, Negotiation, Rhetoric",
          },
        },
        {
          id: "Streetwise",
          value: 0,
          description: {
            general:
              "Streetwise enables characters to talk the language and negotiate the societies of the streets and the underworld. You can understand code words and slang, interpret graffiti tags, and emulate gang signs.",
            1: "You know where to score drugs and sex in your domain.",
            2: "You know which gangs operate in the area, including their colors and rivalries. You may have your own graffiti tag.",
            3: "You can tell the good shit from bad, score guns, and blend in seamlessly with street people or gangbangers.",
            4: "When gangsters say “I know a guy,” you’re who they know.",
            5: "You can hire, orchestrate, or arrange almost any criminal activity anywhere in your city.",
            specialties:
              "Specialties: Arms Dealing, Black Market, Bribery, Drugs, Fence Stolen Goods, Gangs, Graffiti, Personal Rep, Sex Trade, Urban Survival ",
          },
        },
        {
          id: "Subterfuge",
          value: 0,
          description: {
            general:
              "Subterfuge is the art of lying convincingly, spinning a yarn, and making good excuses for bad actions. This Skill defines your talent for intrigue, secrets, and doubledealing. Subterfuge can also used for seduction and imitating mortal behavior.",
            1: "You can tell believable, simple lies.",
            2: "You can hustle naive people, old and young, into giving you their things.",
            3: "You can operate on multiple levels, telling lies intended to be uncovered to bolster other lies.",
            4: "You can operate endlessly in deep cover: a perfect double agent. Perhaps you are!",
            5: "Nobody believes you have even a single dot in Subterfuge.",
            specialties:
              "Specialties: Bluff, Feign Mortality, Impeccable Lies, Innocence, The Long Con, Seduction ",
          },
        },
      ],
    },
    {
      id: "Mental",
      description:
        "Mental Skills depend almost entirely on specialized knowledge, as well as on the character’s core intellectual gifts.",
      list: [
        {
          id: "Academics",
          value: 0,
          description: {
            general:
              "Academics reflects understanding, higher education, and ability to research fields within the humanities and the liberal arts. Historical study, for instance, is hardly “just academic” if your immortal enemies lived – and left traces – in that period. When you take this Skill, you get a free specialty. For foreign languages, use the Linguistics Merit",
            1: "Basic primary and secondary education; a night class at community college",
            2: "Basic university education or tutelage from a mediocre mentor; a fouryear degree",
            3: "Advanced university education or dedicated personal tuition; an excellent fouryear degree, a doctorate ",
            4: "Advanced specialized study beyond university, learning into subjects few understand",
            5: "Refined and advanced scholarship, likely to be sought out for advice and tutelage",
            specialties:
              "Specialties: Architecture, English Literature, History of Art, History (specific Field or Period), Journalism, Philosophy, Research, Teaching, Theology",
          },
        },
        {
          id: "Awareness",
          value: 0,
          description: {
            general:
              "Awareness handles your perceptions. You may spot a Child of Haqim before a strike occurs, spy a key dropped in the trash, or sense a lingering perfume.",
            1: "You have a history of knowing when something is out of place.",
            2: "You can spot erratic or pattern behavior in an individual.",
            3: "You can see through most disguises and sense concealed dangers or hidden clues.",
            4: "Even when you are distracted, few things are beyond your notice.",
            5: "Your senses are those of a wild animal.",
            specialties:
              "Specialties: Ambushes, Camouflage, Concealed Objects, Hearing, Instincts, Smell, Sight, Traps, Wilderness",
          },
        },
        {
          id: "Finance",
          value: 0,
          description: {
            general:
              "Finance allows you to identify trends in the market, invest well, manipulate stock, and know when a fall is coming. It also allows you to assess – and trace – the wealth of others and broker financial deals. You can generally appraise art, property, or any other noncriminal good. Ventrue value this Skill more than some Disciplines.",
            1: "You can run a business and keep books.",
            2: "You can manage a corporate division or bank branch; you file impeccably plausible tax returns.",
            3: "Thanks to international tradCHARACTERS ing, you make a fine broker on foreign stock exchanges.",
            4: "Investment banks follow your financial lead. You have no trouble concealing fraud.",
            5: "You can make money do anything, including stick to your pockets – or crash countries.",
            specialties:
              "Specialties: Appraisal, Banking, Black Markets, Corporate Finance, Currency Manipulation, Fine Art, Forensic Accounting, Money Laundering, Stock Market ",
          },
        },
        {
          id: "Investigation",
          value: 0,
          description: {
            general:
              "Investigation allows you to unravel cases of mundane and mysterious means, spot clues, interpret them, and trace missing persons. Vampires find this Skill especially useful when a vessel escapes.",
            1: "You love a good mystery novel and fancy yourself an amateur sleuth.",
            2: "You have a firm knowledge of criminology and the signature acts of local rogues.",
            3: "You are, or could be, a detective by trade. Nothing in a crime scene escapes you.",
            4: "The Sheriff comes to you when unknown parties sabotage the domain’s safety.",
            5: "You set riddles for others and live an enigmatic existence few can penetrate.",
            specialties:
              "Specialties: Criminology, Deduction, Forensics, Missing Persons, Murder, Paranormal Mysteries, Traffic Analysis ",
          },
        },
        {
          id: "Medicine",
          value: 0,
          description: {
            general:
              "Medicine allows you to fix people who are broken and diagnose causes of death or sickness in a victim. It also allows you to use medical equipment, prescribe drugs, and stanch (or encourage) rapid blood flow. Characters use Medicine to heal Aggravated Health damage in mortals (see p. 127).",
            1: "You know basic anatomy and the difference in blood flow from a vein and an artery. You can perform CPR and other first aid. You may have been a medical student in life.",
            2: "You can comfortably treat minor traumas and illnesses and narrow down a diagnosis. You may have been a nurse or EMT in life.",
            3: "Your training allows you to perform major operations and treat serious injuries. You may have been an internist, pediatrician, or general practitioner in life.",
            4: "You can diagnose and treat all but the rarest of illnesses. You may have been a surgeon or specialist in life.",
            5: "You are a noted medical expert, sought out by mortals and immortals alike.",
            specialties:
              "Specialties: First Aid, Haematology, Pathology, Pharmacy, Phlebotomy, Surgery, Trauma Care, Veterinary ",
          },
        },
        {
          id: "Occult",
          value: 0,
          description: {
            general:
              "Occult represents knowledge of the mystical world, extending from the rites and practices of Freemasons and Rosicrucians, all the way to Noddist scholars and real mages. You can recognize occult sigils and folkmagic practices, effective or not.",
            1: "You know the legends of Caine and the Antediluvians, and you may have read the Book of Nod.",
            2: "You can sift the truth from pop occult nonsense.",
            3: "You have firsthand experience of something inexplicable, even by Kindred standards.",
            4: "You could name most of the Antediluvians and even comprehend a Tremere ritual.",
            5: "Tremere and Children of Haqim consult with you on obscure lore.",
            specialties:
              "Specializations: Alchemy, Blood Magic, Faeries, Ghosts, Grimoires, Infernalism, Magi, Necromancy, Noddism, Parapsychology, Voudun, Werewolves ",
          },
        },
        {
          id: "Politics",
          value: 0,
          description: {
            general:
              "Politics covers diplomacy and bureaucracy: both human and Kindred. You can work with, and possibly put pressure on, city government and perhaps higher levels. Among Kindred, you know the inside scoop on which sects are dominant where, who is at war with whom, and where the bodies are buried. Literally.",
            1: "You follow mortal political affairs in your regnum, and you know at least what the elders reveal about Kindred politics.",
            2: "You can apply influence at a local level, or you know who can.",
            3: "You could run political campaigns or political machines, or make waves in your sect as an upandcomer.",
            4: "You know the true personaliCHARACTERS ties of the real movers and shakers, live and undead, in your area.",
            5: "You could guess at the unknown members of the Camarilla’s Inner Circle.",
            specialties:
              "Specialties: Anarchs, Camarilla, City Government, Clan (specific), Diplomacy, Media, National Politics, State/Provincial Politics ",
          },
        },
        {
          id: "Science",
          value: 0,
          description: {
            general:
              "Science is a broad church, covering everything from basic principles of life to the understanding of universal entropy. The laws of science govern the mortal world, and vampires who wish to rule that world study them. Levels of the Science Skill roughly match those in Academics, from “some college” to “worldfamous scholar.” Also like Academics, characters with a rating in Science get a free specialty.",
            1: "You dabble in the sciences and understand the principles behind the building blocks of life.",
            2: "You can accurately explain the competing scientific theories of the Embrace to another vampire.",
            3: "You make an excellent scientific manager; you can run a laboratory, interpret scientific findings, and get up to speed on scientific research in most fields. You can repair scientific equipment.",
            4: "You are an expert in your field and in those allied to it.",
            5: "Few peers match your understanding, and others come to you for guidance.",
            specialties:
              "Specialties: Astronomy, Biology, Chemistry, Demolitions, Engineering, Genetics, Geology, Mathematics, Physics",
          },
        },
        {
          id: "Technology",
          value: 0,
          description: {
            general:
              "Technology acts as something of a moving target; it governs the operation and understanding of “technical developments most vampires find mystifying.” In 1870, it might have governed steam engines and electricity; these nights, it governs computers and computer systems. Of course, now computers govern almost everything – including steam turbines in power plants and electrical systems in office buildings.",
            1: "You know how to upgrade a home PC and keep it protected from viruses.",
            2: "You can conceal your IP, operate drones, and fake a digital photograph.",
            3: "You can create and unleash your own viruses without fear of detection.",
            4: "The Prince might call you personally to manage cybersecurity for their domain.",
            5: "On the internet, nobody knows you’re a vampire – or that you’re there at all.",
            specialties:
              "Specializations: Artillery, Coding, Computer Building, Data Mining, Hacking, Networks, Phones, Surveillance Systems",
          },
        },
      ],
    },
  ],
};

export const disciplines = [
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  },
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  },
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  },
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  },
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  },
  {
    id: null,
    value: null,
    abilities: [
      { level: "1", value: null },
      { level: "2", value: null }, 
      { level: "3", value: null },
      { level: "4", value: null },
      { level: "5", value: null }
    ]
  }
]

export const disciplinesDefinition = {
  id: "Disciplines",
  description: "<p>Discipline is a term used by vampires to describe their supernatural powers.</p><p>Aside from their inherent immortal condition and the ability to use vitae to regenerate wounds and improve their strength, dexterity and stamina, proficiency in a Discipline gives the vampire additional supernatural abilities of great strategic value.</p><p>Training in each of the Disciplines provides the Cainite with several related powers such as superhuman speed, strength, resilience, command over animals, shapeshifting abilities, sensory powers, the ability to dominate the minds of other creatures, and many more. </p><p>Clan Disciplines - Every clan has three inherent Disciplines which they pick up more readily and do not require training to learn. </p><p>Pick two of the Disciplines associated with your clan, and take two dots in one and one dot in the other.</p><p>If you are Caitiff, thus having no clan, pick any two Disciplines you like and take two dots in one and one dot in the other.</p>",
  resource: [0, 1, 1, 0, 0, 0],
  data: [
    {
      id: "Animalism",      
      value: 0,      
      abilities: {
        1: ["bond famulus", "sense the beast"],
        2: ["feral whispers"],
        3: ["animal succulence", "quell the beast", "unliving hive"],
        4: ["subsume the spirit"],
        5: ["animal dominion", "drawing out the beast"],
      },
      clans: ["Gangrel", "Nosferatu"],
      description: {
        general:
          "Animalism is a Discipline that brings the vampire closer to their animalistic nature. This not only allows them to communicate with and gain dominance over creatures of nature, but gives them influence over the Beast itself.<ul><li> Type: Mental</li><li>Masquerade threat: Low to medium. While talking to animalsmight seem eccentric, only the most violent applications of the Discipline elicit more than a few raised eyebrows.</li><li>Blood Resonance: Animal blood, preferably feral.</li></ul>",
      },
    },
    {
      id: "Auspex",
      value: 0,
      abilities: {
        1: ["heightened senses", "sense the unseen"],
        2: ["premonition"],
        3: ["scry the soul", "share the senses"],
        4: ["spirit’s touch"],
        5: ["clairvoyance", "possession", "telepathy"],
      },
      clans: ["Malkavian", "Toreador", "Tremere"],
      description: {
        general:
          "Auspex is a Discipline that grants vampires supernatural senses.<ul><li> Type: Mental</li><li>Masquerade threat: Low. Auspex never by itself manifests in a way visible to the naked eye or causes effects that can’t be rationalized, if only as dumb luck.</li><li>Blood Resonance: Phlegmatic. Artists (especially photographers) and visionaries, certain schizophrenics, users of psychoactive substances, detectives.</li></ul>",
      },
    },
    {
      id: "Blood Sorcery",
      value: 0,
      abilities: {
        1: ["corrosive vitae", "a taste for blood"],
        2: ["extinguish vitae"],
        3: ["blood of potency", "scorpion ’ s touch"],
        4: ["theft of vitae"],
        5: ["baal’s caress", "cauldron of blood"],
      },
      clans: ["Tremere"],
      description: {
        general:
          "Blood Magic, or Blood Sorcery, refers to the magic performed by vampires, fueled by religious or occult practices and the power of Cainite vitae. <ul><li>Type: Sorcery</li><li>Masquerade Threat:Low-High. The individual appearance of the powers and Rituals in Blood Sorcery varies as widely as their effects.</li><li>Blood Resonance: Sanguine. Although not inherent in the Blood itself, Blood Sorcery responds eagerly to blood from human occultists, sorcerers, and cult leaders, as well as hemophiles and bibliophiles.</li></ul>",
      },
    },
    {
      id: "Celerity",
      value: 0,
      abilities: {
        1: ["cat’s grace", "rapid reflexes"],
        2: ["fleetness"],
        3: ["traversal", "blink"],
        4: ["draught of elegance", "unerring aim"],
        5: ["lightning strike", "split second"],
      },
      clans: ["Brujah", "Toreador"],
      description: {
        general:
          "Celerity is a Discipline that grants vampires supernatural quickness and reflexes.<ul><li>Type: Physical</li><li>Masquerade Threat: Medium-High. Most Celerity powers are clearly inhuman, the only saving grace being that they’re very hard to catch on film or photograph.</li><li>Blood Resonance: Choleric. Fear and utter terror, runners, athletes, amphetamine and alkaloid users, habitual players of first-person shooters and other twitch games.</li></ul>",
      },
    },
    {
      id: "Dominate",
      value: 0,
      abilities: {
        1: ["cloud memory", "compel"],
        2: ["mesmerize", "dementation"],
        3: ["the forgetful mind", "submerged directive"],
        4: ["rationalize"],
        5: ["mass manipulation", "terminal decree"],
      },
      clans: ["Malkavian", "Tremere", "Ventrue"],
      description: {
        general:
          "Dominate grants the vampire the ability to control the actions of others, manipulate their memories, and force living creatures into acts they would not perform of their own volition.<ul><li>Type: Mental</li><li>Masquerade Threat: Low. Bar-ring someone Dominating an entire auditorium to jump off the cliffs of Dover, it remains one of the more subtle vampiric powers.</li><li>Blood Resonance: Phlegmatic. The blood of the submissive or the dominant, masters and slaves, captains of industry, power trippers, cult leaders and followers.</li></ul>",
      },
    },
    {
      id: "Fortitude",
      value: 0,
      abilities: {
        1: ["resilience", "unswayable mind"],
        2: ["toughness", "enduring beasts"],
        3: ["defy bane", "fortify the inner facade"],
        4: ["draught of endurance"],
        5: ["flesh of marble", "prowess from pain"],
      },
      clans: ["Gangrel", "Ventrue"],
      description: {
        general:
          "Fortitude is a Discipline that grants Kindred unearthly toughness, even to the point of resisting fire and sunlight. <ul><li>Type: Physical</li><li>Masquerade Threat: Medium. Eyewitnesses undoubtedly react upon someone taking a terminal beating or a hail of bullets and getting back up seemingly unhurt. Favorite cover-up explanations include erroneous recollection in the excitement (the bullets only seemed to hit), special effects (YouTube prank), or the tried-and-tested “must have been on PCP” rationale.</li><li>Blood Resonance: Melancholic. Survivors of war, abuse, or misfortune; endurance runners; mountain climbers; infantry and special forces; those with very powerful immune systems.</li></ul>",
      },
    },
    {
      id: "Obfuscate",
      value: 0,
      abilities: {
        1: ["cloak of shadows", "silence of death"],
        2: ["unseen passage"],
        3: ["ghost in the machine", "mask of a thousand faces"],
        4: ["conceal", "vanish"],
        5: ["cloak the gathering", "impostor’s guise"],
      },
      clans: ["Malkavian", "Nosferatu"],
      description: {
        general:
          "Obfuscate is a Discipline that allows vampires to conceal themselves, deceive the mind of others, or make them ignore what the user does not want to be seen. <ul><li>Type: Mental</li><li>Masquerade Threat: Low. Avoiding detection is the whole point of this Discipline.</li><li>Blood Resonance: Melancholic. The ignored and unseen, the homeless, forgotten, and depressed; spies, pickpockets, excellent servants, roadies and stagehands, and all the background people.</li></ul>",
      },
    },
    {
      id: "Potence",
      value: 0,
      abilities: {
        1: ["lethal body", "soaring leap"],
        2: ["prowess"],
        3: ["brutal feed", "spark of rage", "uncanny grip"],
        4: ["draught of might"],
        5: ["earthshock", "fist of caine"],
      },
      clans: ["Brujah", "Nosferatu"],
      description: {
        general:
          "Potence is the Discipline that endows vampires with physical vigor and preternatural strength. Vampires with the Potence Discipline possess physical prowess beyond mortal bounds. <ul><li>Type: Physical</li><li>Masquerade Threat: Medium to high. Lesser exercises of the Discipline might be passed off as \“hysterical strength,\” but once pavement cracks and buildings start to crumble that explanation loses what little credibility it had.</li><li>Blood Resonance: Choleric. The strong and healthy; athletes and young men and women in their prime, gym rats, wrestlers, construction workers and lum-berjacks, longshoremen.</li></ul>",
      },
    },
    {
      id: "Presence",
      value: 0,
      abilities: {
        1: ["awe", "daunt"],
        2: ["lingering kiss"],
        3: ["dread gaze", "entrancement"],
        4: ["irresistible voice", "summon"],
        5: ["majesty", "star magnetism"],
      },
      clans: ["Brujah", "Toreador", "Ventrue"],
      description: {
        general:
          "Presence is the Discipline of supernatural allure and emotional manipulation which allows Kindred to attract, sway, and control crowds. <ul><li>Type: Mental</li><li>Masquerade Threat: Low-Medium. A subtle power, people seldom realize Presence has affected them at all. As with most Disciplines, its higher powers can leave puzzled witnesses behind, especially once the effects wear off.</li><li>Blood Resonance: Sanguine. The beautiful and lustful, those completely infatuated with the vampire, models and actors and movie stars, compelling public and private speakers from politicians to car salesmen, YouTube sensations and Instagram influencers.</li></ul>",
      },
    },
    {
      id: "Protean",
      value: 0,
      abilities: {
        1: ["eyes of the beast", "weight of the feather"],
        2: ["feral weapons"],
        3: ["earth meld", "shapechange"],
        4: ["metamorphosis"],
        5: ["mist form", "the unfettered heart"],
      },
      clans: ["Gangrel"],
      description: {
        general:
          "Protean is a Discipline that gives vampires the ability to change form, from growing feral claws to evaporating into a cloud of mist. <ul><li>Type: Physical</li><li>Masquerade Threat: High. One of the most overt Disciplines available to vampires, more or less all Protean powers can breach the Masquerade on their own.</li><li>Blood Resonance: Animal blood, especially animals matching shapeshifted forms; the blood of werewolves, changelings, and other supernatural chimeras of man and beast.</li></ul>",
      },
    },
  ],
};

export const vitals = [
  {
    id: "Health",
    style: "healthPt",
    scale: 15,
    //TODO should contain sth like> depends: ['stamina'],
    defaultModifier: 3,
    description: "Your Health; usually equals stamina + 3",
  },
  {
    id: "Willpower",
    style: "willPt",
    scale: 15,
    //TODO should contain sth like> depends: ['composure', 'resolve'],
    description: "Your Willpower; usually equals composure + resolve",
  },
  {
    id: "Humanity",
    style: "humanityPt",
    scale: 10,
    value: 7, 
    description: "Your Humanity, a measure of resistance against the beast",
  },
  {
    id: "Hunger",
    style: "hungerPt",
    scale: 5,
    value: 1,
    description: "Your Hunger",
  },
  {
    id: "Blood Potency",
    style: "point",
    scale: 10,
    //TODO depends on generation
    description: "Your Blood Potency: a measure of Caine's blood in Your character",
    },
];
