const DEFAULTNAME = "A Kindred That Is Not To Be Named";
const app = Vue.createApp({
  data() {
    return {
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
          bloodPotency: "=0",
        },{
          id: "Caitiff",
          abilities: null,
          bloodPotency: ">0"
        },{
          id: "Brujah",
          abilities: ["Celerity", "Potence", "Presence"],
          bloodPotency: ">0"
        },{
          id: "Gangrel",
          abilities: ["Animalism", "Fortitude", "Protean"],
          bloodPotency: ">0"
        },{
          id: "Malkavian",
          abilities: ["Auspex", "Dominate", "Obfuscate"],
          bloodPotency: ">0"
        },{
          id: "Nosferatu",
          abilities: ["Animalism", "Obfuscate", "Potence"],
          bloodPotency: ">0"
        },{
          id: "Toreador",
          abilities: ["Celerity", "Potence", "Presence"],
          bloodPotency: ">0"
        },{
          id: "Tremere",
          abilities: ["Animalism", "Blood Sorcery", "Dominate"],
          bloodPotency: ">0"
        },{
          id: "Ventrue",
          abilities: ["Dominate", "Fortitude", "Presence"],
          bloodPotency: ">0"
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
            list: [
              {
                id: 'Strength',
                value: 1,
              },
              {
                id: 'Dexterity',
                value: 1,
              },
              {
                id: 'Stamina',
                value: 1,
              },
            ],
          },
          {
            id: 'Social',
            list: [
              {
                id: 'Charisma',
                value: 1,
              },
              {
                id: 'Manipulation',
                value: 1,
              },
              {
                id: 'Composure',
                value: 1,
              },
            ],
          },
          {
            id: 'Mental',
            list: [
              {
                id: 'Intelligence',
                value: 1,
              },
              {
                id: 'Wits',
                value: 1,
              },
              {
                id: 'Resolve',
                value: 1,
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
            list: [
              {
                id: 'Athlethics',
                value: 0,
              },
              {
                id: 'Brawl',
                value: 0,
              },
              {
                id: 'Craft',
                value: 0,
              },
              {
                id: 'Drive',
                value: 0,
              },
              {
                id: 'Firearms',
                value: 0,
              },
              {
                id: 'Larceny',
                value: 0,
              },
              {
                id: 'Melee',
                value: 0,
              },
              {
                id: 'Stealth',
                value: 0,
              },
              {
                id: 'Survival',
                value: 0,
              },
            ],
          },
          {
            id: 'Social',
            list: [
              {
                id: 'Animal Ken',
                value: 0,
              },
              {
                id: 'Etiquette',
                value: 0,
              },
              {
                id: 'Insight',
                value: 0,
              },
              {
                id: 'Intimidation',
                value: 0,
              },
              {
                id: 'Leadership',
                value: 0,
              },
              {
                id: 'Performance',
                value: 0,
              },
              {
                id: 'Persuasion',
                value: 0,
              },
              {
                id: 'Streetwise',
                value: 0,
              },
              {
                id: 'Subterfuge',
                value: 0,
              },
            ],
          },
          {
            id: 'Mental',
            list: [
              {
                id: 'Academics',
                value: 0,
              },
              {
                id: 'Awareness',
                value: 0,
              },
              {
                id: 'Finance',
                value: 0,
              },
              {
                id: 'Investigation',
                value: 0,
              },
              {
                id: 'Medicine',
                value: 0,
              },
              {
                id: 'Occult',
                value: 0,
              },
              {
                id: 'Politics',
                value: 0,
              },
              {
                id: 'Science',
                value: 0,
              },
              {
                id: 'Technology',
                value: 0,
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
          },
          {
            id: 'Auspex',
            value: 0,
          },
          {
            id: 'Blood Sorcery',
            value: 0,
          },
          {
            id: 'Celerity',
            value: 0,
          },
          {
            id: 'Dominate',
            value: 0,
          },
          {
            id: 'Fortitude',
            value: 0,
          },
          {
            id: 'Obfuscate',
            value: 0,
          },
          {
            id: 'Potence',
            value: 0,
          },
          {
            id: 'Presence',
            value: 0,
          },
          {
            id: 'Protean',
            value: 0,
          },
          
        ],
      },
    };
  },
  template: `
  <character-info
    :bio="biography"
    :clans="clans">
  </character-info>
  <stat-section 
    :stats="attributes"
    @stat-section-change="$event[0].value=$event[1]"
    >
  </stat-section>
  <stat-section 
    :stats="skills"
    @stat-section-change="$event[0].value=$event[1]"
    >
  </stat-section>`
});

/** Displays entire section of attributes or skills
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
app.component('stat-section', {
  props: ['stats'],
  emits: ['statSectionChange'],
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
      if (received_event[0].value <= received_event[1]) {        
        for (i; i >= 0; i--) {      
          if (this.allocatedResources[i] < this.stats.resource[i]) {
            break;
          }
        }
      }
      else{ 
        i--;
      }
      this.$emit('statSectionChange', [received_event[0], i]);           
    }      
  },
  template: `
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <div class="resourceCount">{{allocatedResources}}</div>
      <stat-category
        v-for="list in stats.data"
        :key="list.id"
        :categ="list"
        :scale="stats.resource.length - 1"
        @stat-category-change="emitAllowedChange($event)"
      >
      </stat-category>      
    </div>`
});

/** displays category of attributes
  * in case there is stat change from child component stat
  * it will build whole category list with change and emits to parent component
  */
app.component('stat-category', {  
  props: ['categ', 'scale'],
  emits: ['statCategoryChange'],
  template: `
    <div class="statList">
      <h2>{{categ.id}}</h2>
      <ul class="ulStats">
        <li 
          v-for="item in categ.list"
          :key="item.id">
          <stat 
            :stat="item"
            :scale="scale"
            @stat-change="$emit('statCategoryChange', $event)">
          </stat>
        </li>
      </ul>
    </div>`,
});

/** displays clickable point representing number depending on scale and stat value
  * after click, change is emitted to parent component to decide if it is alright
  */
app.component('stat', {  
  props: ['stat', 'scale'],
  emits: ['statChange'],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null
    };
  },  
  template: `
    <div class="stat">
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
          @click="$emit('statChange', [stat, i])"
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
        <option disabled value=null>-none-</option>
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
          :value="clan.id">
          {{clan.id}}
        </option>
      </select>
      <b>Faction:</b>
      <select v-model="bio.faction">
        <option disabled value="">Choose Your Coterie's Faction</option>
        <option>Cammarilla</option>
        <option>etc</option>
        <option>C</option>
      </select>
      </div>`
});

const vm = app.mount('#root');
