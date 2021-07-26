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
});

app.component('sheet', {
  props: ['attr', 'skills'],
  template: `
    <stat-section 
      :stats="attr">
    </stat-section>
    <stat-section 
      :stats="skills">
    </stat-section>`
});

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
  template: `    
    <div class="statSection">
      <h2>{{stats.id}}</h2>
      <div class="resourceCount">{{resourceCount}}</div>
      <stat-category 
        v-for="list in stats.data"
        :key="list.id"
        :categ="list"
        :resource="this.resourceCount"
        :scale="stats.resource.length - 1">
      </stat-category>      
    </div>`
});

app.component('stat-category', {
  props: ['categ', 'resource', 'scale'],
  template: `
    <div class="statList">
      <h2>{{categ.id}}</h2>
      <ul class="ulStats">
        <li 
          v-for="item in categ.list"
          :key="item.id">
          <stat 
            :stat="item"
            :resource="resource"
            :scale="scale">
          </stat>
        </li>
      </ul>
    </div>`,
});

app.component('stat', {
  props: ['stat', 'resource', 'scale'],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null,
      isActive: false,
    };
  },
  
  methods: {
    /*TODO computed could be better instead of method */
    /**
     * Returns list of classes to add to point with value i
     *
     * @param {Number} i Value of processed point
     */
    pointClass(i) {
      return {
        point: true,
        init: i <= this.initialValue,
        fill: i > this.initialValue && i <= this.stat.value,
        active: this.hoverPointer && (i === this.hoverPointer || i > this.hoverPointer !== i > this.stat.value),
      };
    },
    /**
     * What to do when user clicks on point
     * - we check restriction if we can change value 
     * - if yes we save value to data
     * - we also modify resourceCount array
    */
    handleClick() {
      var new_value = this.hoverPointer;
      let tmp;

      /**
       * Called when user clicks value higher than the current value of stat
       * Returns highest possible value that can be added
       *
       * @param {AvailableDots} array Amount of dots you can allocate
       * @param {ValueClicked} index
      */
      const addCheck = (array, index) => {
        var i;
        for (i = index; i >= 0; i--) {
          if (array[i] > 0) break;
        }
        return i;
      };
      
      //clicked empty point -> check if add is possible
      if (new_value > this.stat.value) {
        tmp = addCheck(this.resource, new_value);
        new_value = tmp > this.stat.value ? tmp : this.stat.value;
      }
      //clicked filled point -> removing points, not below limit aka initial value
      else if (new_value > this.initialValue) new_value--;

      //OK setting values
      /*TODO
        https://v3.vuejs.org/style-guide/#implicit-parent-child-communication-use-with-caution
        consider using emits instead*/
      this.resource[this.stat.value] += 1;
      this.resource[new_value] += -1;
      this.stat.value = new_value;
    },
  },
  
  template: `  
    <div :class="{stat : true, active : isActive}">        
      <div class="statName">{{stat.id}}</div>
      <div class="points">  
        <span 
          v-for="i in scale"       
          :class="pointClass(i)"
          @click = "handleClick()" 
          @mouseover = "isActive = true; hoverPointer = i;"
          @mouseleave = "isActive = false; hoverPointer = null;"               
          :value = i>
        </span>          
      </div>             
    </div>`
});

const vm = app.mount('#root');
