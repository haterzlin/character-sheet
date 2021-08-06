const app = Vue.createApp({
  data() {
    return {
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
        for (var statCategory = 0; statCategory < this.attributes.data.length; statCategory++) {
          if (this.attributes.data[statCategory].id == statChangeData[1]) {
            for (var stat = 0; stat < this.attributes.data[statCategory].list.length; stat++) {
              if (this.attributes.data[statCategory].list[stat].id == statChangeData[2]) {
                this.attributes.data[statCategory].list[stat].value = statChangeData[3];
              }
            }
          } 
        }
      }
      else {
        for (var statCategory = 0; statCategory < this.skills.data.length; statCategory++) {
          if (this.skills.data[statCategory].id == statChangeData[1]) {
            for (var stat = 0; stat < this.skills.data[statCategory].list.length; stat++) {
              if (this.skills.data[statCategory].list[stat].id == statChangeData[2]) {
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
  data() {
    return {
      resourceCount: null,
    };
  },
/**
   * Counts values in stats.data, same format as stats.resource
   *
   * @param {Number} stats.resource Amount of dots you can allocate
   * @param {JSON} stats.data Current values
   * @param {Array} of numbers resourceCount - restricting how many stats can have array index values, for example:
   * [ 0, -8, 4, 3, 1, 0 ]
   * first zero - we can have 0 attributes with value 0
   * -8 - we can have only 1 attribute with value 1 and there are 9 attributes with value 1 currently
   * 4 - we can have 4 attributes with value 2 and there are zero allocated
   * 3 - we can have 3 attrs with value 3
   * ...
   */
  created() {
    let tmp = Array(this.stats.resource.length).fill(0);
    for (var i = 0; i < this.stats.data.length; i++) {
      for (var j = 0; j < this.stats.data[i].list.length; j++) {
        tmp[this.stats.data[i].list[j].value]++;
      }
    }
    tmp.forEach(
      (element, index) => (tmp[index] = this.stats.resource[index] - element)
    );
    this.resourceCount = tmp;
  },
  emits: {statsectionchange: null},
  template: `    
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <div class="resourceCount">{{resourceCount}}</div>
      <stat-category 
        v-for="list in stats.data"
        :key="list.id"
        :categ="list"
        :scale="stats.resource.length - 1"
        @statcategorychange="          
          //check if change is allowed
          // if yes, modify resource
          // sendStatSection.resourceCount[$event[0]]+=1;
          // sendStatSection.resourceCount[$event[1]]+=-1;
          this.$emit('statsectionchange', [stats.id].concat($event));
        "
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
            @statchange="
              this.$emit('statcategorychange', [categ.id, item.id, $event]);
            ">
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
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null
    };
  },  
  emits: {statchange: null},
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
          @click="this.$emit('statchange', i)"
          @mouseover = "this.hoverPointer = i;"
          @mouseleave = "this.hoverPointer = null;"    
        >
        </span>          
      </div>             
    </div>`
});

const vm = app.mount('#root');
