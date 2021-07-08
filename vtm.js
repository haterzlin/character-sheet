
const app = Vue.createApp({
  data() {
    return {
      attributes: {
          display: "Attributes",
          resource: [0, 1, 4, 3, 1, 0],/*vtm5e attribute distribution: 1 times 4 dots; 3 times 3 dots, 4 times 2 dots
        sum of values in resource <= amount of values in section*/
          data: [
            {
                display: "Physical",                 
                list: [
                    { 
                      display: "Strength",
                      value: 1 
                    },{ 
                      display: "Dexterity",
                      value: 1 
                    },{ 
                      display: "Stamina",
                      value: 1 
                    },
                ],
            },{
                display: "Social",                 
                list: [
                    { 
                      display: "Charisma",
                      value: 1 
                    },{ 
                      display: "Manipulation", 
                      value: 1 
                    },{ 
                      display: "Composure", 
                      value: 1 
                    }     
                ],
            },{
                display: "Mental",                 
                list: [
                    { 
                      display: "Intelligence",
                      value: 1 
                    },{ 
                      display: "Wits",
                      value: 1
                    },{ 
                      display: "Resolve",
                      value: 1                      
                    } 
                ],
                
        }],
             
      },
      skills: {
          display: "Skills",
          resource: [12,7,5,3,0,0],
          data: [
              {
                display: "Physical",
                list: [
                    {display: "Athlethics",value: 0},
                    {display: "Brawl",value: 0},
                    {display: "Craft",value: 0},
                    {display: "Drive",value: 0},
                    {display: "Firearms", value: 0},
                    {display: "Larceny", value: 0},
                    {display: "Melee", value: 0},
                    {display: "Stealth",value: 0},
                    {display: "Survival",value: 0}
                ],
             },
             {
                display: "Social",
                list: [
                    {display: "Animal Ken",value: 0},
                    {display: "Etiquette",value: 0},
                    {display: "Insight",value: 0},
                    {display: "Intimidation",value: 0},
                    {display: "Leadership", value: 0},
                    {display: "Performance", value: 0},
                    {display: "Persuasion", value: 0},
                    {display: "Streetwise",value: 0},
                    {display: "Subterfuge",value: 0}
                ],
             },
             {
                display: "Mental",
                list: [
                    {display: "Academics",value: 0},
                    {display: "Awareness",value: 0},
                    {display: "Finance",value: 0},
                    {display: "Investigation",value: 0},
                    {display: "Medicine", value: 0},
                    {display: "Occult", value: 0},
                    {display: "Politics", value: 0},
                    {display: "Science",value: 0},
                    {display: "Technology",value: 0}
                ],
             },
             
             ],
             
             
        }
  }}
})
//SHEET
app.component('sheet',{
  props: ['attr', 'skills'],
  template: `<stat-section 
               :stats="attr"               
               ></stat-section>
               <stat-section 
               :stats="skills"               
               ></stat-section>
            `
})

//STAT SECTION
app.component('stat-section',{
  props: ['stats'],
  data() {
    return { 
      resourceCount : null,
  }},
  template: `<div>{{resourceCount}}</div>
             <div class="statSection">
               <h2>{{stats.display}}</h2>
               <stat-category v-for="list in stats.data"
               :key="list.display"
               :categ="list"
               :resource="this.resourceCount"
               :scale="stats.resource.length - 1"
               ></stat-category></div>`,
  created(){
    let tmp = Array(this.stats.resource.length).fill(0)
      for (var i = 0; i < this.stats.data.length; i++){
        for (var j = 0; j < this.stats.data[i].list.length; j++){
          tmp[this.stats.data[i].list[j].value]++;
        }
      }
    tmp.forEach((element, index) => tmp[index] = this.stats.resource[index] - element);
    this.resourceCount = tmp;
  }
  
})

//STAT CATEGORY
app.component('stat-category',{
  props: ['categ','resource','scale'],
  template:`<div class="statList"><h2>{{categ.display}}</h2>
             <ul class="ulStats">
             <li v-for="item in categ.list" :key="item.display">
             <stat 
               :stat="item"
               :resource="resource"
               :scale="scale"
               ></stat></li></ul></div>`
})

//STAT
app.component('stat',{
  props: ['stat','resource','scale'],
  data() {
    return {
      initialValue : this.stat.value,
      hoverPointer : null,
      hoverToggle : false
    }},
  template: `<div>  
    <div :class="{stat : true, mOver : hoverToggle}">        
      <div class="statName">{{stat.display}}</div>
      <div class="points">  
        <span v-for="i in scale"       
          :class="pointClass(i)"
          @click = "handleClick()" 
          @mouseover = "handleHover(i , true)"
          @mouseleave = "handleHover(i , false)"               
          :value = i
        ></span>          
      </div>       
      </div>
    </div>`,
        
    methods: {
      pointClass(i){
        const init_val = this.initialValue;
        const ptr = this.hoverPointer;
        const val = this.stat.value;
        return {
             point : true,
             init : i<=init_val,
             fill : i>init_val &&i<=val,
             mOver : (ptr && (i === ptr || ((i>ptr) !== (i>val))))
             }
      },
      handleHover(i, hover){
        if (!hover) i=null;
        this.hoverToggle = hover;
        this.hoverPointer = i; 
      },
      handleClick(){
        const init = this.initialValue;
        var value = this.stat.value;
        var i = this.hoverPointer;
        var diff = i - value;
        let tmp;
        
        // -1 if not found || i if found [0, index]
        const addCheck = (array, index) =>{
          var i;
          for (i = index; i >=0 ;i--){
            if (array[i]>0) break;
          }          
          return i;
        }
        //adding points : check limit
        if (diff > 0) {
          tmp = addCheck(this.resource,i);
          i = (tmp > value) ? tmp : value;
        }
        //clicked filled point -> removing points, not below limit aka initial value
        if ((diff <= 0)&&(i>init)) i--;             
    
        //OK setting values 
        /*TODO
          https://v3.vuejs.org/style-guide/#implicit-parent-child-communication-use-with-caution
          consider using emits instead*/
        this.resource[value]+=1;
        this.resource[i]+=-1;
        this.stat.value = i;
      }
    }     
})

const vm = app.mount('#root')

