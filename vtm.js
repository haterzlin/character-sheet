
const app = Vue.createApp({
  data() {
    return {
      attributes: {
          display: "Attributes",
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
             
             },],
             
             
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
  template: `
             <div class="statSection">
               <h2>{{stats.display}}</h2>
               <stat-category v-for="list in stats.data"
               :key="list.display"
               :categ="list"
               ></stat-category></div>`,
  
})

//STAT CATEGORY
app.component('stat-category',{
  props: ['categ'],
  template:`<div class="statList"><h2>{{categ.display}}</h2>
             <ul class="ulStats">
             <li v-for="item in categ.list" :key="item.display">
             <stat 
               :stat="item"
               ></stat></li></ul></div>`
})

//STAT
app.component('stat',{
  props: ['stat'],
  data() {
    return {
      initialValue : this.stat.value,
      hoverPointer : null,
      hoverToggle : false
    }},
  template: `<div>  
    <div :class="{stat : true}">        
      <div class="statName">{{stat.display}}</div>
      <div class="points">  
        <span v-for="i in 5"       
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
        

        //clicked filled point -> removing points, not below limit aka initial value
        if ((diff <= 0)&&(i>init)) i--;             
    
        //OK setting values 
        /*TODO
          https://v3.vuejs.org/style-guide/#implicit-parent-child-communication-use-with-caution
          consider using emits instead*/
        this.stat.value = i;
      }
    }     
})

const vm = app.mount('#root')

