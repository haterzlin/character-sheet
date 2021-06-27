//var global = {};
var characters_list = {
	0: {
	"Name": " --- Peter --- ",
	"Age": 11,
	"Attributes":
		{
		"Physical":
			{
			"Strength": 4,
			"Dexterity": 1,
			"Stamina": 5
			},
		"Social":
			{
			"Charisma": 3,
			"Manipulation": 2,
			"Composure": 5
			},
		"Mental":
			{
			"Intelligence": 1,
			"Wits": 4,
			"Resolve": 5
		        }
		}
	},
	1: {
	"Name": " --- Lubo --- ",
	"Age": 22,
	"Attributes":
		{
		"Physical":
			{
			"Strength": 4,
			"Dexterity": 3,
			"Stamina": 3
			},
		"Social":
			{
			"Charisma": 5,
			"Manipulation": 4,
			"Composure": 1
			},
		"Mental":
			{
			"Intelligence": 4,
			"Wits": 3,
			"Resolve": 3
		        }
		}
	}
	};


var config =  {
"lng_selected": "cz",
"character_selected": null,

"CharacterSheetBlank": {
	"Name": " --- BLANK --- ",
	"Age": "",
	"Description": "",
	"Attributes":
		{
		"Physical":
			{
			"Priority": -1,
			"Strength": 1,
			"Dexterity": 1,
			"Stamina": 1
			},
		"Social":
			{
			"Priority": -1,
			"Charisma": 1,
			"Manipulation": 1,
			"Composure": 1
			},
		"Mental":
			{
			"Priority": -1,
			"Intelligence": 1,
			"Wits": 1,
			"Resolve": 1
		        }
		},
	"Skills":
		{
		"Physical":
			{
			"Athletics": 0,
			"Melee": 0,
			"Larceny": 0,
			"Shooting": 0,
			"Casting": 0,
			"Riding": 0,
			"Flying": 0,
			"Brewing": 0,
			"Stealth": 0,
			"Survival1": 0,
			"Brawl": 0,
			"Survival2": 0
			},
		"Social":
			{
			"Empathy": 0,
			"Intimidation": 0,
			"Persuasion": 0,
			"Subterfuge": 0,
			"Animal Ken": 0,
			"Expression": 0,
			"Etiquette": 0
			},
		"Mental":
			{
			"Awareness": 0,
			"Investigation": 0,
			"Ancient Runes": 0,
			"Herbology": 0,
			"Magic Theory": 0,
			"Potions": 0,
			"Magical Creatures": 0,
			"Crafts": 0
		        }
		},
	"Spells":
		{
		"Physical":
			{
			"push": 0,
			"shield": 0,
			"rope": 0,
			"disarm": 0,
			"magic arm": 0
			},
		"Social":
			{
			"charm": 0,
			"intimidate": 0,
			"social defense charm": 0
			},
		"Mental":
			{
			"examine magic": 0,
			"mind defense": 0,
			"mind attack": 0
		        },
		"Elemental":
			{
			"fire bolt": 0,
			"lightning": 0,
			"freeze": 0
		        }
		}
	},

// parser setting - character_sheet name concat with form_field id
"parser_template":
	{
	// level, sheet_id_name, field_id
	"Name": 1,
	"Age": 2,
	"Description": 3,
	"Attributes":
		{
		"Physical":
			{
			"Priority": 12,
			"Strength": 13,
			"Dexterity": 14,
			"Stamina": 15
			},
		"Social":
			{
			"Priority": 17,
			"Charisma": 18,
			"Manipulation": 19,
			"Composure": 20
			},
		"Mental":
			{
			"Priority": 22,
			"Intelligence": 23,
			"Wits": 24,
			"Resolve": 25
		        }
		},
	"Skills":
		{
		"Physical":
			{
			"Athletics": 32,
			"Melee": 33,
			"Larceny": 34,
			"Shooting": 35,
			"Casting": 36,
			"Riding": 37,
			"Flying": 38,
			"Brewing": 39,
			"Stealth": 40,
			"Survival1": 41,
			"Brawl": 42,
			"Survival2": 43
			},
		"Social":
			{
			"Empathy": 45,
			"Intimidation": 46,
			"Persuasion": 47,
			"Subterfuge": 48,
			"Animal Ken": 49,
			"Expression": 50,
			"Etiquette": 51
			},
		"Mental":
			{
			"Awareness": 53,
			"Investigation": 54,
			"Ancient Runes": 55,
			"Herbology": 56,
			"Magic Theory": 57,
			"Potions": 58,
			"Magical Creatures": 59,
			"Crafts": 60,
		        }
		},
	"Spells":
		{
		"Physical":
			{
			"push": 72,
			"shield": 73,
			"rope": 74,
			"disarm": 75,
			"magic arm": 76
			},
		"Social":
			{
			"charm": 78,
			"intimidate": 79,
			"social defense charm": 80
			},
		"Mental":
			{
			"examine magic": 82,
			"mind defense": 83,
			"mind attack": 84
		        },
		"Elemental":
			{
			"fire bolt": 86,
			"lightning": 87,
			"freeze": 88
		        }
		}
	},

"fields":
	{
//	id: {field_type, field_id, field_label(lng_id), field_placeholder, field_value}
	 0: {"type": "headerMain", "text": 26, "description": ""},
	 1: {"type": "inputText", "label": 2, "placeholder": "", "value": ""},
	 2: {"type": "inputText", "label": 3, "placeholder": "", "value": ""},
	 3: {"type": "inputText", "label": 25, "placeholder": "", "value": ""},

	10: {"type": "header", "text": 12, "description": ""},
	11: {"type": "attHeader", "text": 13, "description": "", "value": "10", "value_range": [0,7]},
	12: {"type": "attPriorityBar", "label": 27, "description": "", "value": "0", "value_range":[0,3]},
	13: {"type": "attPointBar", "label": 16, "description": "", "value": "0", "value_range":[1,5]},
	14: {"type": "attPointBar", "label": 17, "description": "", "value": "0", "value_range":[1,5]},
	15: {"type": "attPointBar", "label": 18, "description": "", "value": "0", "value_range":[1,5]},
	16: {"type": "attHeader", "text": 14, "description": "", "value": "10", "value_range": [0,7]},
	17: {"type": "attPriorityBar", "label": 28, "description": "", "value": "0", "value_range":[0,3]},
	18: {"type": "attPointBar", "label": 19, "description": "", "value": "0", "value_range":[1,5]},
	19: {"type": "attPointBar", "label": 20, "description": "", "value": "0", "value_range":[1,5]},
	20: {"type": "attPointBar", "label": 21, "description": "", "value": "0", "value_range":[1,5]},
	21: {"type": "attHeader", "text": 15, "description": "", "value": "10", "value_range": [0,7]},
	22: {"type": "attPriorityBar", "label": 29, "description": "", "value": "0", "value_range":[0,3]},
	23: {"type": "attPointBar", "label": 22, "description": "", "value": "0", "value_range":[1,5]},
	24: {"type": "attPointBar", "label": 23, "description": "", "value": "0", "value_range":[1,5]},
	25: {"type": "attPointBar", "label": 24, "description": "", "value": "0", "value_range":[1,5]},
	  
	30: {"type": "header", "text": 40, "description": ""},
	31: {"type": "attHeader", "text": 41, "description": "", "value": "10", "value_range": [0,10]},
	32: {"type": "attPointBar", "label": 50, "description": "", "value": "0", "value_range":[0,5]},
	33: {"type": "attPointBar", "label": 51, "description": "", "value": "0", "value_range":[0,5]},
	34: {"type": "attPointBar", "label": 52, "description": "", "value": "0", "value_range":[0,5]},
	35: {"type": "attPointBar", "label": 53, "description": "", "value": "0", "value_range":[0,5]},
	36: {"type": "attPointBar", "label": 54, "description": "", "value": "0", "value_range":[0,5]},
	37: {"type": "attPointBar", "label": 55, "description": "", "value": "0", "value_range":[0,5]},
	38: {"type": "attPointBar", "label": 56, "description": "", "value": "0", "value_range":[0,5]},
	39: {"type": "attPointBar", "label": 57, "description": "", "value": "0", "value_range":[0,5]},
	40: {"type": "attPointBar", "label": 58, "description": "", "value": "0", "value_range":[0,5]},
	41: {"type": "attPointBar", "label": 59, "description": "", "value": "0", "value_range":[0,5]},
	42: {"type": "attPointBar", "label": 60, "description": "", "value": "0", "value_range":[0,5]},
	43: {"type": "attPointBar", "label": 61, "description": "", "value": "0", "value_range":[0,5]},
	44: {"type": "attHeader", "text": 42, "description": "", "value": "10", "value_range": [0,10],},
	45: {"type": "attPointBar", "label": 62, "description": "", "value": "0", "value_range":[0,5]},
	46: {"type": "attPointBar", "label": 63, "description": "", "value": "0", "value_range":[0,5]},
	47: {"type": "attPointBar", "label": 64, "description": "", "value": "0", "value_range":[0,5]},
	48: {"type": "attPointBar", "label": 65, "description": "", "value": "0", "value_range":[0,5]},
	49: {"type": "attPointBar", "label": 66, "description": "", "value": "0", "value_range":[0,5]},
	50: {"type": "attPointBar", "label": 67, "description": "", "value": "0", "value_range":[0,5]},
	51: {"type": "attPointBar", "label": 68, "description": "", "value": "0", "value_range":[0,5]},
	52: {"type": "attHeader", "text": 43, "description": "", "value": "10", "value_range": [0,10]},
	53: {"type": "attPointBar", "label": 69, "description": "", "value": "0", "value_range":[0,5]},
	54: {"type": "attPointBar", "label": 70, "description": "", "value": "0", "value_range":[0,5]},
	55: {"type": "attPointBar", "label": 71, "description": "", "value": "0", "value_range":[0,5]},
	56: {"type": "attPointBar", "label": 72, "description": "", "value": "0", "value_range":[0,5]},
	57: {"type": "attPointBar", "label": 73, "description": "", "value": "0", "value_range":[0,5]},
	58: {"type": "attPointBar", "label": 74, "description": "", "value": "0", "value_range":[0,5]},
	59: {"type": "attPointBar", "label": 75, "description": "", "value": "0", "value_range":[0,5]},
	60: {"type": "attPointBar", "label": 76, "description": "", "value": "0", "value_range":[0,5]},

	70: {"type": "header", "text": 80, "description": ""},
	71: {"type": "attHeader", "text": 81, "description": "", "value": "10", "value_range": [0,10]},
	72: {"type": "attPointBar", "label": 90, "description": "", "value": "0", "value_range":[0,5]}, 
	73: {"type": "attPointBar", "label": 91, "description": "", "value": "0", "value_range":[0,5]},
	74: {"type": "attPointBar", "label": 92, "description": "", "value": "0", "value_range":[0,5]},
	75: {"type": "attPointBar", "label": 93, "description": "", "value": "0", "value_range":[0,5]},
	76: {"type": "attPointBar", "label": 94, "description": "", "value": "0", "value_range":[0,5]},
	77: {"type": "attHeader", "text": 82, "description": "", "value": "10", "value_range": [0,10]},
	78: {"type": "attPointBar", "label": 95, "description": "", "value": "0", "value_range":[0,5]},
	79: {"type": "attPointBar", "label": 96, "description": "", "value": "0", "value_range":[0,5]},
	80: {"type": "attPointBar", "label": 97, "description": "", "value": "0", "value_range":[0,5]},
	81: {"type": "attHeader", "text": 83, "description": "", "value": "10", "value_range": [0,10]},
	82: {"type": "attPointBar", "label": 98, "description": "", "value": "0", "value_range":[0,5]},
	83: {"type": "attPointBar", "label": 99, "description": "", "value": "0", "value_range":[0,5]},
	84: {"type": "attPointBar", "label": 100, "description": "", "value": "0", "value_range":[0,5]},
	85: {"type": "attHeader", "text": 84, "description": "", "value": "10", "value_range": [0,10]},
	86: {"type": "attPointBar", "label": 101, "description": "", "value": "0", "value_range":[0,5]},
	87: {"type": "attPointBar", "label": 102, "description": "", "value": "0", "value_range":[0,5]},
	88: {"type": "attPointBar", "label": 103, "description": "", "value": "0", "value_range":[0,5]},
	
	
	200: {"type": "lngBar", "label": 200, "placeholder": "", "value": ""},
	201: {"type": "charactersBar", "label": 201, "placeholder": "", "value": ""},
	202: {"type": "buttonsBar", "label": 202, "placeholder": "", "value": ""}
	}

};

var lng = {
"en": {
	1: "EN",
	26: "Character Sheet",
	2: "Name",
	3: "Age",
	25: "Description",
	4: "Player",
	5: "Koncept",
	6: "Ctnost",
	7: "Neřest",
	8: "Kronika",
	9: "Klan",
	10: "Covenant",
	12: "Attributes",
	13: "Physical",
	14: "Social",
	15: "Mental",
	16: "Strength",
	17: "Dexterity",
	18: "Stamina",
	19: "Charisma",
	20: "Manipulation",
	21: "Composure",
	22: "Intelligence",
	23: "Wits",
	24: "Resolve",
	27: "Priority",
	28: "Priority",
	29: "Priority",

	40: "Skills",
	41: "Physical",
	42: "Social",
	43: "Mental",
	50: "Athletics",
	51: "Melee",
	52: "Larceny",
	53: "Shooting",
	54: "Casting",
	55: "Riding",
	56: "Flying",
	57: "Brewing",
	58: "Stealth",
	59: "Survival1",
	60: "Brawl",
	61: "Survival2",
	62: "Empathy",
	63: "Intimidation",
	64: "Persuasion",
	65: "Subterfuge",
	66: "Animal Ken",
	67: "Expression",
	68: "Etiquette",
	69: "Awareness",
	70: "Investigation",
	71: "Ancient Runes",
	72: "Herbology",
	73: "Magic Theory",
	74: "Potions",
	75: "Magical Creatures",
	76: "Crafts",

	80: "Spells",
	81: "Physical",
	82: "Social",
	83: "Mental",
	84: "Elemental",
	90: "push",
	91: "shield",
	92: "rope",
	93: "disarm",
	94: "magic arm",
	95: "charm",
	96: "intimidate",
	97: "social defense charm",
	98: "examine magic",
	99: "mind defense",
	100: "mind attack",
	101: "fire bolt",
	102: "lightning",
	103: "freeze",

	200: "Select language",
	201: "Import (json)",
	202: "Export (json)"
	},
"cz": {
	1: "CZ",
	26: "Character Sheet",
	2: "Jméno",
	3: "Zdánlivý věk",
	25: "Description",
	4: "Hráč",
	5: "Koncept",
	6: "Ctnost",
	7: "Neřest",
	8: "Kronika",
	9: "Klan",
	10: "Covenant",
	12: "Atributy",
	13: "Fyzické",
	14: "Společenské",
	15: "Duševní",
	16: "Síla",
	17: "Obratnost",
	18: "Výdrž",
	19: "Vystupování",
	20: "Manipulace",
	21: "Vyrovnanost",
	22: "Inteligence",
	23: "Důvtip",
	24: "Rozhodnost",
	27: "Priority",
	28: "Priority",
	29: "Priority",

	40: "Skills",
	41: "Physical",
	42: "Social",
	43: "Mental",
	50: "Athletics",
	51: "Melee",
	52: "Larceny",
	53: "Shooting",
	54: "Casting",
	55: "Riding",
	56: "Flying",
	57: "Brewing",
	58: "Stealth",
	59: "Survival1",
	60: "Brawl",
	61: "Survival2",
	62: "Empathy",
	63: "Intimidation",
	64: "Persuasion",
	65: "Subterfuge",
	66: "Animal Ken",
	67: "Expression",
	68: "Etiquette",
	69: "Awareness",
	70: "Investigation",
	71: "Ancient Runes",
	72: "Herbology",
	73: "Magic Theory",
	74: "Potions",
	75: "Magical Creatures",
	76: "Crafts",

	80: "Spells",
	81: "Physical",
	82: "Social",
	83: "Mental",
	84: "Elemental",
	90: "push",
	91: "shield",
	92: "rope",
	93: "disarm",
	94: "magic arm",
	95: "charm",
	96: "intimidate",
	97: "social defense charm",
	98: "examine magic",
	99: "mind defense",
	100: "mind attack",
	101: "fire bolt",
	102: "lightning",
	103: "freeze",

	200: "Zmenit jazyk",
	201: "Import (json)",
	202: "Export (json)"
	}
};
