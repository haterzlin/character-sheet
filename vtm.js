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
  <attribute-section 
    :stats="attributes"
    @stat-section-change="$event[0].value=$event[1]">
  </attribute-section>
  <skill-section 
    :stats="skills"
    :distributions="skillDistributions"
    @stat-section-change="$event[0].value=$event[1]">
  </skill-section>
  <discipline-section 
    v-if="biography.clan"
    :stats="disciplines"
    :clan="biography.clan"
    @stat-section-change="$event[0].value=$event[1]">
  </discipline-section>`
});

const statSectionMixin = {
  props: ['stats'],
  emits: ['statSectionChange'],
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
      <div class="resourceCount">{{allocatedResources}} | {{stats.resource}}</div>
      <div 
        v-for= "category in stats.data"
        :key="category.id"
        class="statList">
        <h2>{{category.id}}</h2>
        <ul class="ulStats">
          <li 
            v-for="item in category.list"
            :key="item.id">
            <stat 
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)">
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
      <select v-model="stats.resource">
        <option disabled value="">Select a distribution</option>
        <option 
          v-for="distrib in distributions"
          :key = "distrib.id"
          :value="distrib.resource">
          {{distrib.id}}
        </option>
      </select>
      <div class="resourceCount">{{allocatedResources}} | {{stats.resource}}</div>
      <div 
        v-for= "category in stats.data"
        :key="category.id"
        class="statList">
        <h2>{{category.id}}</h2>
        <ul class="ulStats">
          <li 
            v-for="item in category.list"
            :key="item.id">
            <stat 
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)">
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
      <div class="resourceCount">{{allocatedResources}} | {{stats.resource}}</div>
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
              @stat-change="emitAllowedChange($event)">
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
              @stat-change="(!clan.abilities || $event[2]) ? emitAllowedChange($event) : ''">
            </stat>
          </li>
        </ul>
      </div>  
    </div>`
});

const vm = app.mount('#root');
