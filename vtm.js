const app = Vue.createApp({
  data() {
    return {
      attributes: {
        id: 'Attributes',
        resource: [
          0, 9, 4, 3, 1, 0,
        ] /*vtm5e attribute distribution: 1 times 4 dots; 3 times 3 dots, 4 times 2 dots, 
        9 times 1 dots (as we want to be able to set attribute to 1 everytime we want)
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
        resource: [27, 7, 5, 3, 0, 0],
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
    };
  },
  methods: {
    /** 
     * will update data based on event received from child component 
     * input parameter statChangeData is array identifying which stat needs to be changed to which value
     * for example
     * [ "Attributes", "Physical", "Strength", 5]
    */
    updateStat(statChangeData) {
      if (statChangeData[0] == "Attributes") {
        var forComparing = this.attributes;
      }
      else {
        var forComparing = this.skills;
      }
      for (var statCategory = 0; statCategory < forComparing.data.length; statCategory++) {
        if (forComparing.data[statCategory].id == statChangeData[1]) {
          for (var stat = 0; stat < forComparing.data[statCategory].list.length; stat++) {
            if (forComparing.data[statCategory].list[stat].id == statChangeData[2]) {
              if (statChangeData[0] == "Attributes") {
                this.attributes.data[statCategory].list[stat].value = statChangeData[3];
              }
              else {
                this.skills.data[statCategory].list[stat].value = statChangeData[3];
              }
            }
          }
        } 
      }
    } 
  },
  template: `
  <stat-section 
    :stats="this.attributes"
    @statsectionchange="this.updateStat($event)"
    >
  </stat-section>
  <stat-section 
    :stats="this.skills"
    @statsectionchange="this.updateStat($event)"
    >
  </stat-section>`
});

/** Displays entire section of attributes or skills
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
app.component('stat-section', {
  props: ['stats'],
  emits: {statsectionchange: null},
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
      * checks if change is allowed
      * if not it will try lower value
      * first allowed value is emitted
      */
    emitAllowedChange(received_event) {
      var i = received_event[2];
      for (i; i >= 0; i--) {      
        if (this.allocatedResources[i] < this.stats.resource[i]) {
          break;
        }
      }
      this.$emit('statsectionchange', [this.stats.id].concat(received_event).slice(0,-1).concat(i));
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
        @statcategorychange="emitAllowedChange($event);"
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
  emits: {statcategorychange: null},
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
            @statchange="this.$emit('statcategorychange', [categ.id, item.id, $event]);">
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
  emits: {statchange: null},
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null
    };
  },  
  template: `
    <div>
      <div class="statName">{{stat.id}}</div>
      <div class="points">  
        <span
          v-for="i in scale"
          :class="{
            point: true,
            init: i <= this.initialValue,
            fill: i > this.initialValue && i <= this.stat.value,
            active: this.hoverPointer && (i === this.hoverPointer || i > this.hoverPointer !== i > this.stat.value)         
          }"      
          @click="(stat.value >= i) ? this.$emit('statchange', i-1) : this.$emit('statchange', i);"
          @mouseover = "this.hoverPointer = i;"
          @mouseleave = "this.hoverPointer = null;"    
        >
        </span>          
      </div>             
    </div>`
});

const vm = app.mount('#root');
