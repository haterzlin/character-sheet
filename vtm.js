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
    /*TODO computed could be better instead of method*/
    pointClass(i) {
      return {
        point: true,
        init: i <= this.initialValue,
        fill: i > this.initialValue && i <= this.stat.value,
        mOver: this.hoverPointer && (i === this.hoverPointer || i > this.hoverPointer !== i > this.stat.value),
      };
    },
    
    handleClick() {
      var i = this.hoverPointer;
      var diff = i - this.stat.value;
      let tmp;

      // -1 if not found || i if found [0, index]
      const addCheck = (array, index) => {
        var i;
        for (i = index; i >= 0; i--) {
          if (array[i] > 0) break;
        }
        return i;
      };
      //adding points : check limit
      if (diff > 0) {
        tmp = addCheck(this.resource, i);
        i = tmp > this.stat.value ? tmp : this.stat.value;
      }
      //clicked filled point -> removing points, not below limit aka initial value
      if (diff <= 0 && i > this.initialValue) i--;

      //OK setting values
      /*TODO
        https://v3.vuejs.org/style-guide/#implicit-parent-child-communication-use-with-caution
        consider using emits instead*/
      this.resource[this.stat.value] += 1;
      this.resource[i] += -1;
      this.stat.value = i;
    },
  },
  
  template: `  
    <div :class="{stat : true, mOver : isActive}">        
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
