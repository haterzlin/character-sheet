const DEFAULTNAME = "A Kindred That Is Not To Be Named";
const app = Vue.createApp({
  data() {
    return {
      mouseOverData: 'test',
      biography: {
        name: "",
        defaultName: DEFAULTNAME,/*make a set of names and randomly pick a default on page load*/
        age: null, /*why not age=0? bcuz if you use a value then placeholder does not apply in input box*/
        clan: null,
        generation: null,
        faction: null,
      },
      skillDistributions:[
        {
          id: "Balanced",
          resource: [12,7,5,3,0,0]
        },
        {
          id: "Jack-of-all-trades",
          resource: [8,10,8,1,0,0]
        },
        {
          id: "Specialist",
          resource: [17,3,3,3,1,0]
        },
      ],
      clans :[
        {
          id: "Thin-blood",
          abilities: null,
        },{
          id: "Caitiff",
          abilities: null,
        },{
          id: "Brujah",
          abilities: ["Celerity", "Potence", "Presence"],
        },{
          id: "Gangrel",
          abilities: ["Animalism", "Fortitude", "Protean"],
        },{
          id: "Malkavian",
          abilities: ["Auspex", "Dominate", "Obfuscate"],
        },{
          id: "Nosferatu",
          abilities: ["Animalism", "Obfuscate", "Potence"],
        },{
          id: "Toreador",
          abilities: ["Celerity", "Potence", "Presence"],
        },{
          id: "Tremere",
          abilities: ["Animalism", "Blood Sorcery", "Dominate"],
        },{
          id: "Ventrue",
          abilities: ["Dominate", "Fortitude", "Presence"],
        },
      ],
      attributes: {
        id: 'Attributes',
        resource: [
          0, 1, 4, 3, 1, 0,
        ] /*vtm5e attribute distribution: 1 times 4 dots; 3 times 3 dots, 4 times 2 dots
        sum of values in resource <= amount of values in section*/,
        data: [
          {
            id: 'Physical',
            description:"Physical Attributes measure a character’s general strength, agility, and stamina. Due to the vagaries of the Blood, strong, quick, or tough vampires need not look muscle-bound, graceful, or meaty. Some of the most lethal Kindred appear most deceptively weak and slow.",
            list: [
              {
                id: 'Strength',
                value: 1,
                description:{
                  general:"Strength governs how big a mortal you can lift, how hard you can hit them, and how much force you can push your dead body to exert. (The rough amount you can deadlift without an Attribute test appears in parentheses below.)",
                  1:"You can easily crush a beer can. (20 kg: a Christmas tree, a stop sign)",
                  2:"You are physically average. (45 kg: a toilet)",
                  3:"You might be able to break open a wooden door. (115 kg: a large human, an empty coffin, a refrigerator)",
                  4:"You are a prime physical specimen, likely with very visible musculature. (180 kg: a full coffin, an empty dump- ster)",
                  5:"You are a true powerhouse and can likely break open a metal fire door, tear open a chain-link fence, or snap open a chained gate. (250 kg: a motorcycle, a piano)"
                  }
              },
              {
                id: 'Dexterity',
                value: 1,
                description:{
                  general:"Dexterity governs your agility and grace, how swiftly you dodge that stake to your heart, and how much fine motor control you possess when up against the clock.",
                  1:"You can run, but balance and dodging are a challenge.",
                  2:"Your sprint is solid, and sometimes you appear graceful.",
                  3:"Your agility is impressive, and your coordination is as good as any trained amateur.",
                  4:"You could excel at acrobatics and move in a way few humans can.",
                  5:"Your movements are liquid and hypnotic – almost superhuman."
                  }
              },
              {
                id: 'Stamina',
                value: 1,
                description:{
                  general:"Stamina absorbs physical harm, such as a speeding bullet or a hunter’s blade, and lets you persevere through hazards and arduous effort. Your Stamina + 3 equals your Health.",
                  1:"Even lesser exertions make you winded.",
                  2:"You can take a beating, but consider suing for peace.",
                  3:"Several days of hard hiking with a backpack is no problem for you.",
                  4:"You could win a marathon or take copious amounts of pain, at least physically.",
                  5:"Even if you were a mortal, you’d never break a sweat."
                  }
              },
            ],
          },
          {
            id: 'Social',
            description:"As manipulative creatures, Kindred use humans as building blocks in their power structure, in addition to using them as food and fuel. Social Attributes determine first impressions; the character’s ability to charm, inspire, and motivate people; and the nature of their interactions with others.",
            list: [
              {
                id: 'Charisma',
                value: 1,
                description:{
                  general:"Charisma measures your natural charm, grace, and sex appeal. If you have it, it draws people to you, making feeding a hell of a lot easier. Charisma doesn’t depend on good looks, which are their own Merit (See Looks, p. 179).",
                  1:"You can speak clearly, though few people tend to listen.",
                  2:"Generally likeable despite your undead nature, you may even have friends.",
                  3:"People trust you implicitly, and you easily make friends.",
                  4:"You possess significant personal magnetism and draw followers like flies.",
                  5:"You could lead a city in rebellion, if you so choose."
                }
              },
              {
                id: 'Manipulation',
                value: 1,
                description:{
                  general:"Manipulation is your ability to twist others to your point of view, lie convincingly, and walk away after duping a mark without anyone being any the wiser.",
                  1:"As long as you stay honest, you can convince people to do what you want.",
                  2:"Your ability to deceive surpasses the will of the weakwilled and simpleminded.",
                  3:"You never have to pay full price for anything.",
                  4:"You could be a cult leader – or a politician.",
                  5:"You could convince the Prince to invest in desert property, or maybe even to call off the Blood Hunt on your head."
                }
              },
              {
                id: 'Composure',
                value: 1,
                description:{
                  general:"Composure allows you to remain calm, to command your emotions, and to put others at ease despite anxiety. It is also represents your ability to stay cool in everything from firefights to intimate encounters. Your Composure + Resolve equals your Willpower (p. 157).",
                  1:"The slightest insult or confrontation could drive you to frenzy.",
                  2:"You can subdue your predatory instincts in most nonhostile situations.",
                  3:"Others look to you for guidance when the blood spatter hits the fan.",
                  4:"You can effortlessly bluff at cards and can manage your Beast to some extent.",
                  5:"The Beast is your pet."
                }
              },
            ],
          },
          {
            id: 'Mental',
            description:"Mental Attributes represent the capacity for learning, intuition, and focus. High Mental Attributes might indicate native genius, superb education, or strong will. Low Mental Attributes might derive from naiveté, ignorance, or just incapacity at thinking. But that was in life",
            list: [
              {
                id: 'Intelligence',
                value: 1,
                description:{
                  general:"Intelligence measures your ability to reason, research, and apply logic. You can recall and analyze information from books or from your senses. No puzzle or mystery can elude the truly intelligent.",
                  1:"You can read and write competently, though some terms confound you.",
                  2:"You are smart enough to realize your limitations.",
                  3:"You are enlightened, able to piece together clues without difficulty.",
                  4:"You’re likely consulted by members of Clan Tremere for your wisdom.",
                  5:"Genius does not cover the depths and range of your intellect."
                }
              },
              {
                id: 'Wits',
                value: 1,
                description:{
                  general:"Wits are for thinking quickly and reacting correctly on little information. “You hear a sound” is Wits; You hear two guards coming” is Intelligence. Wits let you smell an ambush or answer the Harpy back at court right away, instead of thinking of the best response the next night.",
                  1:"You get the point eventually, but it takes explaining.",
                  2:"You can bet the odds in poker or apply the emergency brakes in time. Usually.",
                  3:"You can analyze a situation and quickly work out the best escape route.",
                  4:"You are never caught on the back foot and always come up with a smart riposte.",
                  5:"You think and respond more quickly than most people can comprehend."
                }
              },
              {
                id: 'Resolve',
                value: 1,
                description:{
                  general:"Resolve provides focus and determination, and measures concentration and mental fortitude. Resolve powers allnight watches and blocks out distractions. Your Composure + Resolve equals your Willpower.",
                  1:"You have minimal attention for all but the most pressing things.",
                  2:"You can settle in for the long haul, as long as it’s not too long.",
                  3:"Distracting you takes more effort than most other people want to spend.",
                  4:"You can bruteforce your way to a deduction past any obstacles.",
                  5:"You can think in a gunfight or watch the door in a blood orgy and then clean up every shell casing or spilled droplet."
                }
              },
            ],
          },
        ],
      },
      skills: {
        id: 'Skills',
        resource: [12, 7, 5, 3, 0, 0],
        data: [
          {
            id: 'Physical',
            description:"Physical Skills depend entirely, or at least in large part, on physical control, aptitude, or effort.",
            list: [
              {
                id: 'Athlethics',
                value: 0,
                description:{
                  general:"Athletics allows you to outpace someone in pursuit, leap out of the way of an oncoming car, and climb and swim like a healthy, robust living person. A character can use Athletics in place of any Physical combat Skill in a conflict roll, but in that case, they never inflict any hits on their opponent, no matter how many successes they roll.",
                  1:"You were always attentive in gym class and you still have a spring in your step.",
                  2:"Despite being dead, you are still as fit as a mortal doing regular exercise.",
                  3:"You are fit as a fiddle and could play professional sports. Night games, at least.",
                  4:"With your parkour abilities, why would you need to turn into a bat?",
                  5:"Olympic records await you; only a very few peak humans can achieve what you can. Vampires mistake your skill for Physical Disciplines.",
                  specialties: "Specialties: Acrobatics, Archery, Climbing, Endurance, Jumping, Parkour, Swimming, Throwing"
                }
             },
              {
                id: 'Brawl',
                value: 0,
                description:{
                  general:"Brawl enables characters to hit their target when they swing with fist, boot, or claw. As long as you have no weapon in hand, the attack constitutes a brawl, from elegant aikijutsu to dirty street fighting.",
                  1:"You had a tough upbringing and had to fight to justify your place. You still have some moves.",
                  2:"You received some training in hitting someone hard and accurately.",
                  3:"You more than hold your own in a scrap.",
                  4:"You either received Spetsnazquality training, or you have spent decades of afterlife in fights.",
                  5:"You could win MMA championships even without the use of your vampiric powers.",
                  specialties: "Specialties: Animals, Armed Mortals, Bar Fights, Grappling, Kindred, Sporting Combat, Unarmed Mortals, Werewolves, While in Protean Beast Form"
                }
             },
              {
                id: 'Craft',
                value: 0,
                description:{
                  general:"Craft broadly encompasses artistry, creation of items and utilities from the beautiful to the functional, and arts and crafts from throwing pottery all the way to building and reinforcing your own haven. When you take this Skill, you get a free specialty. Unlike most Skills, you can have more specialties in Craft than you have dots.",
                  1:"You are an amateur, but you know what you are doing.",
                  2:"Your craftsmanship is admired for its functionality.",
                  3:"Your creations can be beautiful or horrifying, but their intent always clear.",
                  4:"Your skill is highly respected among the kine and Kindred aware of it.",
                  5:"You are often chosen to create the focal point for parties at Elysium.",
                  specialties: "Specializations: Carpentry, Carving, Design, Painting, Sculpting, Sewing, Weaponsmithing "
                }
             },
              {
                id: 'Drive',
                value: 0,
                description:{
                  general:"Anyone (except perhaps 500-yearold vampires) can learn to drive a car. The Drive Skill connotes ability to drive fast and safely under 160 adverse conditions or in stressful situations: to drive offroad, speed away from ambushes, win street races, and get out of chases with the Second Inquisition.",
                  1:"You are a cautious driver, unlikely to make any mistakes.",
                  2:"You can put your foot down without much fear of an accident, providing visibility is good.",
                  3:"You have won car chases, earning a cool reputation among the Anarchs.",
                  4:"You could be a stunt driver or the personal chauffeur of a Prince or Baron.",
                  5:"You know cars inside and out. Few can match your skill and knowledge.",
                  specialties: "Specialties: AllTerrain Vehicles, Evasion, Motorcycles, Street Racing, Stunts, Tailing, Trucks, Vintage Models "
                }
             },
              {
                id: 'Firearms',
                value: 0,
                description:{
                  general:"Firearms Cainites use Firearms not only for the human reasons (efficiency and thrill) but to preserve the Masquerade. This Skill comprises familiarity with small arms from holdout pistols to assault rifles. It also includes other triggeroperated weapons, such as crossbows and shoulderfired rocketpropelled grenades. Finally, it includes cleaning, unjamming, and rapidly reloading such weapons.",
                  1:"You’ve fired a gun a few times, at the range or in lessformal circumstances.",
                  2:"You know (and know how) to keep your weapon clean, take it apart, and reassemble it.",
                  3:"You’ve been in the shit (“seen the elephant” if you’re older than a century) and come out the other side.",
                  4:"You can handle trick shots, called shots, running shots – really anything ending in a gunshot.",
                  5:"You’ve been practicing since the debut of the Winchester.",
                  specialties: "Specialties: Crossbows, Gun Dealing, Gunsmithing, Handloading Ammunition, QuickDraw, Sniper, Trick Shooting"
                }
             },
              {
                id: 'Larceny',
                value: 0,
                description:{
                  general:"This Skill entails familiarity with the tools and techniques for picking locks, planting bugs, deactivating standard burglar and car alarms, manual forgery, hot-wiring automobiles, or even safecracking, as well as countless forms of breaking and entering. Characters also use it for setting up “unbeatable” security systems or deducing how and where systems failed in a break-in. Ventrue probably call the skill “Security.” These days, most high-end security systems feature computer controls, video surveillance, or electronic alarms, so they might also involve the Technology Skill to defeat.",
                  1:"You can pick a simple lock or a careless pocket.",
                  2:"You can hotwire a car or shoplift with ease.",
                  3:"You can identify the locations of security cameras and alarms so to best bypass them.",
                  4:"You can defeat a keypad, retool an ID card, or crack a safe.",
                  5:"You can get into – or out of – the vault of a multinational bank.",
                  specialties: "Specialties: Alarms, Forgery, Grand Theft Auto, Housebreaking, Lockpicking, Pickpocket, Safecracking, Security Analysis "
                }
             },
              {
                id: 'Melee',
                value: 0,
                description:{
                  1:"You can swing a bat or blade and mostly hit the people you intend to.",
                  2:"Your clear competence with a weapon in hand should give attackers pause.",
                  3:"Your skill with a melee weapon is known throughout the domain.",
                  4:"The fools brought a gun to your knife fight.",
                  5:"You are the domain’s weaponmaster, sought out by Kindred far and wide for your skill.",
                  specialties: "Specialties: Axes, Chains, Clubs, Fencing, Disarming Blows, Garrotes, Improvised Weapons, Knives, Stakes, Swords"
                }
             },
              {
                id: 'Stealth',
                value: 0,
                description:{
                  general:"Stealth allows a character to shadow a target, making vampires with this ability superlative hunters. They benefit from the ability to spy, sneak, and blend in with crowds when needed.",
                  1:"Spotting you under the cover of darkness or in camouflage proves difficult.",
                  2:"You can sneak by casual observers and stalk unknowing victims without raising any hackles.",
                  3:"You evade patrolling guards, moving softly and hiding easily.",
                  4:"Your subtle, silent passage could make you a worthy ninja – or a worthy foe for ninja.",
                  5:"The Children of Haqim come to you for advice on stalking and hiding, if they can find you.",
                  specialties: "Specialties: Ambushes, Crowds, Disguise, Hiding, Shadowing, Silent Movement, Urban, Wilderness"
                }
             },
              {
                id: 'Survival',
                value: 0,
                description:{
                  general:"Survival conveys the ability to exist in the wild and other adverse conditions, and to return to civilization again: navigate by the stars, establish a makeshift haven, and notice werewolf signs before it’s too late. Some of its related functions apply in parks, brownfields, and other wastelands of the urban jungle.",
                  1:"You know the trails and wilderness around your domain.",
                  2:"You spend more time outdoors than inside, and you can track anyone who doesn’t possess woodcraft.",
                  3:"You can subsist outside the city, setting traps for mortals and a shelter for yourself.",
                  4:"You can thrive outside the city like the true predator you are.",
                  5:"Gangrel run in packs with you – if they can keep up.",
                  specialties: "Specialties: Desert, Hunting, Jungle, Tracking, Traps, Shelters, Urban Exploration, Woodlands"
                }
             },
            ],
          },
          {
            id: 'Social',
            description:"Social Skills operate in the space between people or between Kindred. Although they depend on your ability and your personality, the other party’s response contributes something to the effort. Without skill on your part, that response tends to be negative.",
            list: [
              {
                id: 'Animal Ken',
                value: 0,
                description:{
                  general:"Animal Ken allows you to cow, pacify, and even befriend animals.This Skill allows you to predict how an animal might react in a given situation, train a domesticated creature, or even try to calm or enrage animals. Without this Skill, most creatures pointedly avoid or grow aggressive around vampires.",
                  1:"Animals shy away from you but will not bolt or snap.",
                  2:"Animals are docile around you, acting as if you aren’t there, unless you build a rapport with them.",
                  3:"Animals treat you as if you were a warm, friendly owner, unless provoked to do otherwise.",
                  4:"You draw animals into your orbit. Few attacking creatures maintain their aggression.",
                  5:"You can sense an animal’s feelings and thoughts, and they can feel and act on yours.",
                  specialties: "Specialties: Attack Training, Cats, Dogs, Falconry, Horses, Pacification, Rats, Snakes, Stunt Training, Wolves"
                }
             },
              {
                id: 'Etiquette',
                value: 0,
                description:{
                  general:"Etiquette is the ability to identify and respond to the social conventions in the current scene, set new protocols, and please everyone around with your good graces. Use this Skill in both Kindred and mortal high society.",
                  1:"You know how to address your local ruler without causing a faux pas.",
                  2:"You know the rules of etiCHARACTERS quette in each of the domain’s popular nightspots.",
                  3:"You impress others with your command of politeness, deference, and grace.",
                  4:"Your behavior sets trends, especially if you do something to buck the norm of etiquette.",
                  5:"The Keeper of Elysium and the Harpies look to you to establish domain protocol.",
                  specialties: "Specialties: Anarch, Camarilla, Celebrities, Corporate, Elysium, Feudal, OnePercenter, Secret Society"
                }
             },
              {
                id: 'Insight',
                value: 0,
                description:{
                  general:"Insight grants you the ability to interpret body language, note subtle cues in expression and tone, and determine truth from lies. It also allows you to perceive and understand the motives behind another’s actions.",
                  1:"You can see straight through hollow boasts.",
                  2:"You pick up on the hidden emotion between humans and even sometimes between Kindred.",
                  3:"You can provide psychotherapy even more effectively than someone who doesn’t want to eat their patient.",
                  4:"You are an undead lie detector. Only the best con artists can slip one by you.",
                  5:"People may be books of blood, but they are printed in very large type – easy to read.",
                  specialties: "Specialties: Ambitions, Desires, Detect Lies, Emotions, Empathy, Interrogation, Motives, Phobias, Vices"
                }
             },
              {
                id: 'Intimidation',
                value: 0,
                description:{
                  general:"Intimidation is the power to bully, coerce, threaten, and strongarm your way to a social victory. Vampires who rely on Intimidation do not hesitate to crush the wills – and occasionally the finger bones – of their foes.",
                  1:"You can cut a scathing insult effectively.",
                  2:"You can push your way around most humans without difficulty.",
                  3:"Your swagger and your cruel behavior have earned you your reputation.",
                  4:"You're far past mere physical threats.",
                  5:"Even fellow Kindred may step back if you step up.",
                  specialties: "Specialties: Extortion, Insults, Interrogation, Physical Coercion, Staredowns, Veiled Threats"
                }
             },
              {
                id: 'Leadership',
                value: 0,
                description:{
                  general:"Leadership grants you the ability to lead a crowd, command a detachment, boost the morale of your supporters, or subdue a riot.A strong Prince or Baron must possess Leadership or risk losing their throne.",
                  1:"You have led informal clubs before and can organize Kindred of like mind.",
                  2:"Your voice makes itself heard in council, and even your superiors sometimes listen.",
                  3:"You can command on the battlefield and lead your soldiers into death.",
                  4:"You can inspire the injured and dying to action, so long as you are there to lead them.",
                  5:"Your words fill a vampire’s heart with enough strength to make it feel alive and beating.",
                  specialties: "Specialties: Command, Inspiration, Oratory, Praxis, Team Dynamics, War Pack "
                }
             },
              {
                id: 'Performance',
                value: 0,
                description:{
                  general:"Performance covers a range of arts, from dance to poetry and comedy to storytelling. You may be an inspired performer in your own right or simply an enthusiastic student of the arts. When you take this Skill, you get a free specialty.",
                  1:"You are the life of the party, but you wouldn’t take your act on stage.",
                  2:"You have performed for others, to mixed reviews. Some love you, others hate you.",
                  3:"You are an expert student of your chosen performing art.",
                  4:"You perform your practiced art form stunningly, winning over even Toreador far and wide.",
                  5:"Improvisation holds no terrors for you: every night a different audience, every night a different show.",
                  specialties: "Specialties: Comedy, Dance, Drama, Drums, Guitar, Keyboards, Poetry, Public Speaking, Rap, Singing, Violin, Wind Instruments <br>In theory, the Storyteller could break these specialties down endlessly – can even a fivedot pop star also perform as a coloratura soprano and a country crooner? But in practice, unless the whole chronicle happens in a musical or theatrical milieu, allow broader specialties."
                }
             },
              {
                id: 'Persuasion',
                value: 0,
                description:{
                  general:"Use Persuasion when trying to convince others that you know what’s best for them, and that one bite won’t hurt at all. Skilled persuaders can play on victims’ emotions and appeal to peers’ reason. Persuasion applies in law courts and princely courts, in boardrooms, barrooms, and bedrooms.",
                  1:"You can sell to a motivated buyer.",
                  2:"You can always swing a discount or get on the inside track of the latest gossip.",
                  3:"You can always figure out a compromise in a given conflict.",
                  4:"The other side starts looking for a settlement when they see you in court, human or Kindred.",
                  5:"You may be the original silvertongued devil.",
                  specialties: "Specialties: Bargaining, Fast Talk, Interrogation, Legal Argument, Negotiation, Rhetoric"
                }
             },
              {
                id: 'Streetwise',
                value: 0,
                description:{
                  general:"Streetwise enables characters to talk the language and negotiate the societies of the streets and the underworld. You can understand code words and slang, interpret graffiti tags, and emulate gang signs.",
                  1:"You know where to score drugs and sex in your domain.",
                  2:"You know which gangs operate in the area, including their colors and rivalries. You may have your own graffiti tag.",
                  3:"You can tell the good shit from bad, score guns, and blend in seamlessly with street people or gangbangers.",
                  4:"When gangsters say “I know a guy,” you’re who they know.",
                  5:"You can hire, orchestrate, or arrange almost any criminal activity anywhere in your city.",
                  specialties: "Specialties: Arms Dealing, Black Market, Bribery, Drugs, Fence Stolen Goods, Gangs, Graffiti, Personal Rep, Sex Trade, Urban Survival "
                }
             },
              {
                id: 'Subterfuge',
                value: 0,
                description:{
                  general:"Subterfuge is the art of lying convincingly, spinning a yarn, and making good excuses for bad actions. This Skill defines your talent for intrigue, secrets, and doubledealing. Subterfuge can also used for seduction and imitating mortal behavior.",
                  1:"You can tell believable, simple lies.",
                  2:"You can hustle naive people, old and young, into giving you their things.",
                  3:"You can operate on multiple levels, telling lies intended to be uncovered to bolster other lies.",
                  4:"You can operate endlessly in deep cover: a perfect double agent. Perhaps you are!",
                  5:"Nobody believes you have even a single dot in Subterfuge.",
                  specialties: "Specialties: Bluff, Feign Mortality, Impeccable Lies, Innocence, The Long Con, Seduction "
                }
             },
            ],
          },
          {
            id: 'Mental',
            description:"Mental Skills depend almost entirely on specialized knowledge, as well as on the character’s core intellectual gifts.",
            list: [
              {
                id: 'Academics',
                value: 0,
                description:{
                  general:"Academics reflects understanding, higher education, and ability to research fields within the humanities and the liberal arts. Historical study, for instance, is hardly “just academic” if your immortal enemies lived – and left traces – in that period. When you take this Skill, you get a free specialty. For foreign languages, use the Linguistics Merit",
                  1:"Basic primary and secondary education; a night class at community college",
                  2:"Basic university education or tutelage from a mediocre mentor; a fouryear degree",
                  3:"Advanced university education or dedicated personal tuition; an excellent fouryear degree, a doctorate ",
                  4:"Advanced specialized study beyond university, learning into subjects few understand",
                  5:"Refined and advanced scholarship, likely to be sought out for advice and tutelage",
                  specialties: "Specialties: Architecture, English Literature, History of Art, History (specific Field or Period), Journalism, Philosophy, Research, Teaching, Theology"
                }
             },
              {
                id: 'Awareness',
                value: 0,
                description:{
                  general:"Awareness handles your perceptions. You may spot a Child of Haqim before a strike occurs, spy a key dropped in the trash, or sense a lingering perfume.",
                  1:"You have a history of knowing when something is out of place.",
                  2:"You can spot erratic or pattern behavior in an individual.",
                  3:"You can see through most disguises and sense concealed dangers or hidden clues.",
                  4:"Even when you are distracted, few things are beyond your notice.",
                  5:"Your senses are those of a wild animal.",
                  specialties: "Specialties: Ambushes, Camouflage, Concealed Objects, Hearing, Instincts, Smell, Sight, Traps, Wilderness",
                }
             },
              {
                id: 'Finance',
                value: 0,
                description:{
                  general:"Finance allows you to identify trends in the market, invest well, manipulate stock, and know when a fall is coming. It also allows you to assess – and trace – the wealth of others and broker financial deals. You can generally appraise art, property, or any other noncriminal good. Ventrue value this Skill more than some Disciplines.",
                  1:"You can run a business and keep books.",
                  2:"You can manage a corporate division or bank branch; you file impeccably plausible tax returns.",
                  3:"Thanks to international tradCHARACTERS ing, you make a fine broker on foreign stock exchanges.",
                  4:"Investment banks follow your financial lead. You have no trouble concealing fraud.",
                  5:"You can make money do anything, including stick to your pockets – or crash countries.",
                  specialties: "Specialties: Appraisal, Banking, Black Markets, Corporate Finance, Currency Manipulation, Fine Art, Forensic Accounting, Money Laundering, Stock Market "
                }
             },
              {
                id: 'Investigation',
                value: 0,
                description:{
                  general:"Investigation allows you to unravel cases of mundane and mysterious means, spot clues, interpret them, and trace missing persons. Vampires find this Skill especially useful when a vessel escapes.",
                  1:"You love a good mystery novel and fancy yourself an amateur sleuth.",
                  2:"You have a firm knowledge of criminology and the signature acts of local rogues.",
                  3:"You are, or could be, a detective by trade. Nothing in a crime scene escapes you.",
                  4:"The Sheriff comes to you when unknown parties sabotage the domain’s safety.",
                  5:"You set riddles for others and live an enigmatic existence few can penetrate.",
                  specialties: "Specialties: Criminology, Deduction, Forensics, Missing Persons, Murder, Paranormal Mysteries, Traffic Analysis "
                }
             },
              {
                id: 'Medicine',
                value: 0,
                description:{
                  general:"Medicine allows you to fix people who are broken and diagnose causes of death or sickness in a victim. It also allows you to use medical equipment, prescribe drugs, and stanch (or encourage) rapid blood flow. Characters use Medicine to heal Aggravated Health damage in mortals (see p. 127).",
                  1:"You know basic anatomy and the difference in blood flow from a vein and an artery. You can perform CPR and other first aid. You may have been a medical student in life.",
                  2:"You can comfortably treat minor traumas and illnesses and narrow down a diagnosis. You may have been a nurse or EMT in life.",
                  3:"Your training allows you to perform major operations and treat serious injuries. You may have been an internist, pediatrician, or general practitioner in life.",
                  4:"You can diagnose and treat all but the rarest of illnesses. You may have been a surgeon or specialist in life.",
                  5:"You are a noted medical expert, sought out by mortals and immortals alike.",
                  specialties: "Specialties: First Aid, Haematology, Pathology, Pharmacy, Phlebotomy, Surgery, Trauma Care, Veterinary "
                }
             },
              {
                id: 'Occult',
                value: 0,
                description:{
                  general:"Occult represents knowledge of the mystical world, extending from the rites and practices of Freemasons and Rosicrucians, all the way to Noddist scholars and real mages. You can recognize occult sigils and folkmagic practices, effective or not.",
                  1:"You know the legends of Caine and the Antediluvians, and you may have read the Book of Nod.",
                  2:"You can sift the truth from pop occult nonsense.",
                  3:"You have firsthand experience of something inexplicable, even by Kindred standards.",
                  4:"You could name most of the Antediluvians and even comprehend a Tremere ritual.",
                  5:"Tremere and Children of Haqim consult with you on obscure lore.",
                  specialties: "Specializations: Alchemy, Blood Magic, Faeries, Ghosts, Grimoires, Infernalism, Magi, Necromancy, Noddism, Parapsychology, Voudun, Werewolves "
                }
             },
              {
                id: 'Politics',
                value: 0,
                description:{
                  general:"Politics covers diplomacy and bureaucracy: both human and Kindred. You can work with, and possibly put pressure on, city government and perhaps higher levels. Among Kindred, you know the inside scoop on which sects are dominant where, who is at war with whom, and where the bodies are buried. Literally.",
                  1:"You follow mortal political affairs in your regnum, and you know at least what the elders reveal about Kindred politics.",
                  2:"You can apply influence at a local level, or you know who can.",
                  3:"You could run political campaigns or political machines, or make waves in your sect as an upandcomer.",
                  4:"You know the true personaliCHARACTERS ties of the real movers and shakers, live and undead, in your area.",
                  5:"You could guess at the unknown members of the Camarilla’s Inner Circle.",
                  specialties: "Specialties: Anarchs, Camarilla, City Government, Clan (specific), Diplomacy, Media, National Politics, State/Provincial Politics "
                }
             },
              {
                id: 'Science',
                value: 0,
                description:{
                  general:"Science is a broad church, covering everything from basic principles of life to the understanding of universal entropy. The laws of science govern the mortal world, and vampires who wish to rule that world study them. Levels of the Science Skill roughly match those in Academics, from “some college” to “worldfamous scholar.” Also like Academics, characters with a rating in Science get a free specialty.",
                  1:"You dabble in the sciences and understand the principles behind the building blocks of life.",
                  2:"You can accurately explain the competing scientific theories of the Embrace to another vampire.",
                  3:"You make an excellent scientific manager; you can run a laboratory, interpret scientific findings, and get up to speed on scientific research in most fields. You can repair scientific equipment.",
                  4:"You are an expert in your field and in those allied to it.",
                  5:"Few peers match your understanding, and others come to you for guidance.",
                  specialties: "Specialties: Astronomy, Biology, Chemistry, Demolitions, Engineering, Genetics, Geology, Mathematics, Physics"
                }
             },
              {
                id: 'Technology',
                value: 0,
                description:{
                  general:"Technology acts as something of a moving target; it governs the operation and understanding of “technical developments most vampires find mystifying.” In 1870, it might have governed steam engines and electricity; these nights, it governs computers and computer systems. Of course, now computers govern almost everything – including steam turbines in power plants and electrical systems in office buildings.",
                  1:"You know how to upgrade a home PC and keep it protected from viruses.",
                  2:"You can conceal your IP, operate drones, and fake a digital photograph.",
                  3:"You can create and unleash your own viruses without fear of detection.",
                  4:"The Prince might call you personally to manage cybersecurity for their domain.",
                  5:"On the internet, nobody knows you’re a vampire – or that you’re there at all.",
                  specialties: "Specializations: Artillery, Coding, Computer Building, Data Mining, Hacking, Networks, Phones, Surveillance Systems"
                }
             },
            ],
          },
        ],
      },
      disciplines:{
        id: "Disciplines",
        resource: [0,1,1,0,0,0],
        data: [
          {
            id: 'Animalism',
            value: 0,
            abilities:{
              1:['bond famulus', 'sense the beast'],
              2:['feral whispers'],
              3:['animal succulence','quell the beast','unliving hive'],
              4:['subsume the spirit'],
              5:['animal dominion','drawing out the beast']
            },
            description:{
                  general:"Animalism is a Discipline that brings the vampire closer to their animalistic nature. This not only allows them to communicate with and gain dominance over creatures of nature, but gives them influence over the Beast itself.<ul><li> Type: Mental</li><li>Masquerade threat: Low to medium. While talking to animalsmight seem eccentric, only the most violent applications of the Discipline elicit more than a few raised eyebrows.</li><li>Blood Resonance: Animal blood, preferably feral.</li></ul>",
                }
          },
          {
            id: 'Auspex',
            value: 0,
            abilities:{
              1:['heightened senses', 'sense the unseen'],
              2:['premonition'],
              3:['scry the soul','share the senses'],
              4:['spirit’s touch'],
              5:['clairvoyance','possession','telepathy']
            },
            description:{
                  general:"Auspex is a Discipline that grants vampires supernatural senses.<ul><li> Type: Mental</li><li>Masquerade threat: Low. Auspex never by itself manifests in a way visible to the naked eye or causes effects that can’t be rationalized, if only as dumb luck.</li><li>Blood Resonance: Phlegmatic. Artists (especially photographers) and visionaries, certain schizophrenics, users of psychoactive substances, detectives.</li></ul>",
                }
          },
          {
            id: 'Blood Sorcery',
            value: 0,
            abilities:{
              1:['corrosive vitae', 'a taste for blood'],
              2:['extinguish vitae'],
              3:['blood of potency','scorpion ’ s touch'],
              4:['theft of vitae'],
              5:['baal’s caress','cauldron of blood']
            },
            description:{
                  general:"Blood Magic, or Blood Sorcery, refers to the magic performed by vampires, fueled by religious or occult practices and the power of Cainite vitae. <ul><li>Type: Sorcery</li><li>Masquerade Threat:Low-High. The individual appearance of the powers and Rituals in Blood Sorcery varies as widely as their effects.</li><li>Blood Resonance: Sanguine. Although not inherent in the Blood itself, Blood Sorcery responds eagerly to blood from human occultists, sorcerers, and cult leaders, as well as hemophiles and bibliophiles.</li></ul>"
                }
          },
          {
            id: 'Celerity',
            value: 0,
            abilities:{
              1:['cat’s grace', 'rapid reflexes'],
              2:['fleetness'],
              3:['traversal','blink'],
              4:['draught of elegance','unerring aim'],
              5:['lightning strike','split second']
            },
            description:{
                  general:"Celerity is a Discipline that grants vampires supernatural quickness and reflexes.<ul><li>Type: Physical</li><li>Masquerade Threat: Medium-High. Most Celerity powers are clearly inhuman, the only saving grace being that they’re very hard to catch on film or photograph.</li><li>Blood Resonance: Choleric. Fear and utter terror, runners, athletes, amphetamine and alkaloid users, habitual players of first-person shooters and other twitch games.</li></ul>",

                }
          },
          {
            id: 'Dominate',
            value: 0,
            abilities:{
              1:['cloud memory', 'compel'],
              2:['mesmerize','dementation'],
              3:['the forgetful mind','submerged directive'],
              4:['rationalize'],
              5:['mass manipulation','terminal decree']
            },
            description:{
                  general:"Dominate grants the vampire the ability to control the actions of others, manipulate their memories, and force living creatures into acts they would not perform of their own volition.<ul><li>Type: Mental</li><li>Masquerade Threat: Low. Bar-ring someone Dominating an entire auditorium to jump off the cliffs of Dover, it remains one of the more subtle vampiric powers.</li><li>Blood Resonance: Phlegmatic. The blood of the submissive or the dominant, masters and slaves, captains of industry, power trippers, cult leaders and followers.</li></ul>",

                }
          },
          {
            id: 'Fortitude',
            value: 0,
            abilities:{
              1:['resilience', 'unswayable mind'],
              2:['toughness','enduring beasts'],
              3:['defy bane','fortify the inner facade'],
              4:['draught of endurance'],
              5:['flesh of marble','prowess from pain']
            },
            description:{
                  general:"Fortitude is a Discipline that grants Kindred unearthly toughness, even to the point of resisting fire and sunlight. <ul><li>Type: Physical</li><li>Masquerade Threat: Medium. Eyewitnesses undoubtedly react upon someone taking a terminal beating or a hail of bullets and getting back up seemingly unhurt. Favorite cover-up explanations include erroneous recollection in the excitement (the bullets only seemed to hit), special effects (YouTube prank), or the tried-and-tested “must have been on PCP” rationale.</li><li>Blood Resonance: Melancholic. Survivors of war, abuse, or misfortune; endurance runners; mountain climbers; infantry and special forces; those with very powerful immune systems.</li></ul>",
                }
          },
          {
            id: 'Obfuscate',
            value: 0,
            abilities:{
              1:['cloak of shadows', 'silence of death'],
              2:['unseen passage'],
              3:['ghost in the machine','mask of a thousand faces'],
              4:['conceal','vanish'],
              5:['cloak the gathering','impostor’s guise']
            },
            description:{
                  general:"Obfuscate is a Discipline that allows vampires to conceal themselves, deceive the mind of others, or make them ignore what the user does not want to be seen. <ul><li>Type: Mental</li><li>Masquerade Threat: Low. Avoiding detection is the whole point of this Discipline.</li><li>Blood Resonance: Melancholic. The ignored and unseen, the homeless, forgotten, and depressed; spies, pickpockets, excellent servants, roadies and stagehands, and all the background people.</li></ul>",

                }
          },
          {
            id: 'Potence',
            value: 0,
            abilities:{
              1:['lethal body', 'soaring leap'],
              2:['prowess'],
              3:['brutal feed','spark of rage','uncanny grip'],
              4:['draught of might'],
              5:['earthshock','fist of caine']
            },
            description:{
                  general:"Potence is the Discipline that endows vampires with physical vigor and preternatural strength. Vampires with the Potence Discipline possess physical prowess beyond mortal bounds. <ul><li>Type: Physical</li><li>Masquerade Threat: Medium to high. Lesser exercises of the Discipline might be passed off as \“hysterical strength,\” but once pavement cracks and buildings start to crumble that explanation loses what little credibility it had.</li><li>Blood Resonance: Choleric. The strong and healthy; athletes and young men and women in their prime, gym rats, wrestlers, construction workers and lum-berjacks, longshoremen.</li></ul>"
                }
          },
          {
            id: 'Presence',
            value: 0,
            abilities:{
              1:['awe', 'daunt'],
              2:['lingering kiss'],
              3:['dread gaze','entrancement'],
              4:['irresistible voice','summon'],
              5:['majesty','star magnetism']
            },
            description:{
                  general:"Presence is the Discipline of supernatural allure and emotional manipulation which allows Kindred to attract, sway, and control crowds. <ul><li>Type: Mental</li><li>Masquerade Threat: Low-Medium. A subtle power, people seldom realize Presence has affected them at all. As with most Disciplines, its higher powers can leave puzzled witnesses behind, especially once the effects wear off.</li><li>Blood Resonance: Sanguine. The beautiful and lustful, those completely infatuated with the vampire, models and actors and movie stars, compelling public and private speakers from politicians to car salesmen, YouTube sensations and Instagram influencers.</li></ul>"
                }
          },
          {
            id: 'Protean',
            value: 0,
            abilities:{
              1:['eyes of the beast', 'weight of the feather'],
              2:['feral weapons'],
              3:['earth meld','shapechange'],
              4:['metamorphosis'],
              5:['mist form','the unfettered heart']
            },
            description:{
                  general:"Protean is a Discipline that gives vampires the ability to change form, from growing feral claws to evaporating into a cloud of mist. <ul><li>Type: Physical</li><li>Masquerade Threat: High. One of the most overt Disciplines available to vampires, more or less all Protean powers can breach the Masquerade on their own.</li><li>Blood Resonance: Animal blood, especially animals matching shapeshifted forms; the blood of werewolves, changelings, and other supernatural chimeras of man and beast.</li></ul>"
                }
          },
        ],
      },
    };
  },

  template: `
  <div class="sheet">
    <character-info
      :bio="biography"
      :clans="clans">
    </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="$event[0].value=$event[1]"
      @stat-section-hover="mouseOverData=$event">
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="$event[0].value=$event[1]"
      @stat-section-hover="mouseOverData=$event">
    </skill-section>
    <discipline-section
      v-if="biography.clan"
      :stats="disciplines"
      :clan="biography.clan"
      @stat-section-change="$event[0].value=$event[1]"
      @stat-section-hover="mouseOverData=$event">
    </discipline-section>
  </div>
  <hover-window
    :mouse-over-data="mouseOverData"></hover-window>`
});

const statSectionMixin = {
  props: ['stats'],
  emits: ['statSectionChange','statSectionHover'],
  methods: {
    /**
      * if we are adding
      * checks if change is allowed
      * if change is not allowed, we will try lower value
      * first allowed value is emitted
      * if we are not adding, no restriction check is needed, so we emit event
      */
    emitAllowedChange(received_event) {
      var i = received_event[1];
      for (; i > received_event[0].value; i--) {
        if (this.allocatedResources[i] < this.stats.resource[i])  {
          break;
        }
      }
      if (received_event[2]){
        i--;
      }
      this.$emit('statSectionChange', [received_event[0], i]);
    }
  },
  computed: {
    /** Returns reference to computed value allocated resource
      * used to make mouse-over event data react to click
      */
    allocatedRef(){
      return Vue.computed(()=>this.allocatedResources)
    }
  }
}

const attributesAndSkillsMixin = {
  computed: {
    /**
     * @returns {Array} of numbers describing how many points are currently assigned
     * for example [0,9,0,0,0,0] means there are 9 attributes with value 1
     * while [0,1,4,3,1,0] means 1 attribute with value 1, 4 attributes with value 2,
     * 3 attributes with value 3, 1 attribute with value 4 and 0 attributes with value 5
     */
    allocatedResources() {
      let tmp = Array(this.stats.resource.length).fill(0);
      for (var i = 0; i < this.stats.data.length; i++) {
        for (var j = 0; j < this.stats.data[i].list.length; j++) {
          tmp[this.stats.data[i].list[j].value]++;
        }
      }
      return tmp;
    }
  },
}

/** Displays entire section of attributes
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
app.component('attribute-section', {
  mixins:[statSectionMixin,attributesAndSkillsMixin],
  template: `
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <div
        v-for= "category in stats.data"
        :key="category.id"
        class="statList"
        @mouseenter="$emit('statSectionHover', {category:category})"
        @mouseleave="$emit('statSectionHover',null)">
        <h2>{{category.id}}</h2>
        <ul class="ulStats">
          <li
            v-for="item in category.list"
            :key="item.id">
            <stat
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)"
              @stat-hover-start="$emit('statSectionHover',{stat:$event.stat, hoverPointer:$event.hoverPointer, allocated:allocatedRef, resource: stats.resource});"
              @stat-hover-end="$emit('statSectionHover', {category:category})">
            </stat>
          </li>
        </ul>
      </div>
    </div>`
});

/** Displays entire section of skills
 * displays select for distribution of skills
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
app.component('skill-section', {
  mixins:[statSectionMixin,attributesAndSkillsMixin],
  props:['distributions'],
  template: `
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <select
        v-model="stats.resource"
        :style="{display:'block'}">
        <option disabled value="">Select a distribution</option>
        <option
          v-for="distrib in distributions"
          :key = "distrib.id"
          :value="distrib.resource">
          {{distrib.id}}
        </option>
      </select>
      <div
        v-for= "category in stats.data"
        :key="category.id"
        class="statList"
        @mouseenter="$emit('statSectionHover', {category:category})"
        @mouseleave="$emit('statSectionHover',null)">
        <h2>{{category.id}}</h2>
        <ul class="ulStats">
          <li
            v-for="item in category.list"
            :key="item.id">
            <stat
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)"
              @stat-hover-start="$emit('statSectionHover',{stat:$event.stat, hoverPointer:$event.hoverPointer, allocated:allocatedRef, resource: stats.resource});"
              @stat-hover-end="$emit('statSectionHover', {category:category})">
            </stat>
          </li>
        </ul>
      </div>
    </div>`
});

/** displays clickable point representing number depending on scale and stat value
  * after click, change is emitted to parent component to decide if it is alright
  */
app.component('stat', {
  props: ['stat', 'scale'],
  emits: ['statChange','statHoverStart','statHoverEnd'],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null
    };
  },
  template: `
    <div
      class="stat"
      @mouseover="$emit('statHoverStart',{stat:stat, hoverPointer:hoverPointer})"
      @mouseleave="$emit('statHoverEnd')">
      <div class="statName">{{stat.id}}</div>
      <div class="points">
        <span
          v-for="i in scale"
          :class="{
            point: true,
            init: i <= initialValue,
            fill: i > initialValue && i <= stat.value,
            active: hoverPointer && (i === hoverPointer || i > hoverPointer !== i > stat.value)
          }"
          @click="$emit('statChange', [stat, i, ((stat.value >= i) && (i > initialValue))])"
          @mouseover = "hoverPointer = i"
          @mouseleave = "hoverPointer = null"
        >
        </span>
      </div>
    </div>`
});

/**
  * displays inputs for name and age
  * displays selects for clan, generation, faction
  */
app.component('character-info', {
  props: ['bio', 'clans'],

  template: `
    <div class="char-info">
      <input
        class="heading1"
        type="text"
        v-model="bio.name"
        :placeholder="bio.defaultName"
        />
      <b>Age:</b>
      <input
        :style= "{width: 7 + 'ch'}"
        v-model="bio.age"
        type="number"
        :placeholder = '123'/>
      <b>Generation:</b>
      <select
        v-model="bio.generation">
        <option>15th</option>
        <option>14th</option>
        <option>13th</option>
      </select>
      <b>Clan:</b>
      <select v-model="bio.clan">
        <option disabled value="">Pick a Clan</option>
        <option
          v-for="clan in clans"
          :key = "clan.id"
          :value="clan">
          {{clan.id}}
        </option>
      </select>
      <b>Faction:</b>
      <select v-model="bio.faction">
        <option disabled value="">Choose Your Coterie's Faction</option>
        <option value="Anarch">Anarch</option>
        <option value="Autarki">Autarki</option>
        <option value="Camarilla">Camarilla</option>
        <option value="Sabbat">Sabbat</option>
      </select>
      </div>`
});

/** Displays entire section of disciplines
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
app.component('discipline-section', {
  mixins:[statSectionMixin],
  props:['clan'],
  computed: {
    /**
     * @returns {Array} of numbers describing how many points are currently assigned
     * for example [0,9,0,0,0,0] means there are 9 attributes with value 1
     * while [0,1,4,3,1,0] means 1 attribute with value 1, 4 attributes with value 2,
     * 3 attributes with value 3, 1 attribute with value 4 and 0 attributes with value 5
     */
    allocatedResources() {
      let tmp = Array(this.stats.resource.length).fill(0);
      for (var i = 0; i < this.stats.data.length; i++) {
        tmp[this.stats.data[i].value]++;
      }
      return tmp;
    },
  },
  methods:{
    /**
     * @returns if discipline is primary or not
     */
    isPrimary(discipline){
      if (!this.clan.abilities) return false;
      for (var i = 0; i< this.clan.abilities.length; i++){
        if (discipline.id == this.clan.abilities[i]){
          return true;
        }
      }
      return false;
    },
  },
  template: `
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <div class="statList">
        <h2>Primary</h2>
        <ul class="ulStats">
          <li
            v-for="item in stats.data"
            :key="item.id">
            <stat
              v-show = "isPrimary(item)"
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)"
              @stat-hover-start="$emit('statSectionHover',{stat:$event.stat, hoverPointer:$event.hoverPointer, category:'Primary', section:stats.id, allocated:allocatedRef, resource: stats.resource})"
              @stat-hover-end="$emit('statSectionHover', null)">
            </stat>
          </li>
        </ul>
      </div>
      <div class="statList">
        <h2>Secondary</h2>
        <ul class="ulStats">
          <li
            v-for="item in stats.data"
            :key="item.id">
            <stat
              v-show = "!isPrimary(item)"
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="(!clan.abilities || $event[2]) ? emitAllowedChange($event) : ''"
              @stat-hover-start="$emit('statSectionHover',{stat:$event.stat, hoverPointer:$event.hoverPointer, category: 'Secondary', section:stats.id, allocated:allocatedRef, resource: stats.resource, isCaitiff:clan.abilities===null})"
              @stat-hover-end="$emit('statSectionHover', null)">
            </stat>
          </li>
        </ul>
      </div>
    </div>`
});
/** Displays details about the element that the mouse is over
  * mostly works with stats so far
  */
app.component('hover-window',{
  props:['mouseOverData'],
  data(){
    return{
      data: "test"
    }
  },
  watch:{
    mouseOverData:{
       handler(newVal){
          if (newVal) this.data = newVal;
        },
        deep: true
      }
  },
  template:`
    <div class="hover">
      <div
        class=resource
        v-if="data.allocated && data.resource">
        <span
          :style="{display: 'block'}"
          v-for="(item,index) in data.allocated">{{item}}/{{data.resource[index]}} of {{index}}</span>
      </div>
      <div v-if="data.category">
        <p v-html="data.category.description"></p>
      </div>
      <div
        class="statDescription"
        v-if="data.stat">
      <p v-html="data.stat.description.general"></p>
      <p
        v-if="data.stat.description.specialties"
        v-html="data.stat.description.specialties"></p>
      <div v-if="data.hoverPointer && data.allocated">
        <span
          v-for="i in data.allocated.length-1"
          class="point"
          :class="{init : data.hoverPointer>=i}">
        </span>
      </div>
      <p
        v-if="data.stat.description[data.hoverPointer]"
        v-html="data.stat.description[data.hoverPointer]"></p>
      <p
        v-if="data.stat.abilities && !data.stat.description[data.hoverPointer]">
        <h4
          v-for="item in data.stat.abilities[data.hoverPointer]">{{item}}</h4></p>
      </div>
    </div>
  `
});

const vm = app.mount('#root');
