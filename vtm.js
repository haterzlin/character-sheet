
//import './vtm.css';
function exists(ref){
  return (typeof ref) && (ref !== null);
}


/*TODO 
    confirm whether data[0].id is the same for
      strenght:{
        %DATA%
      } 
      AND
      {
        id: "strenght"
        %DATA%
      }*/
const app = Vue.createApp({
  data() {
    return {
      skillPriorities:{
        0:{ 
          id: "specialist",
          display: "Specialist",
          resource: [0,2,3,3,1,0]
        }
      },
      clans :{
        thinblood:{
          display: "Thin-blood",
          abilities: null,
          blood: "0",
        },
        caitiff:{
          display: "Caitiff",
          abilities: null,
          blood: ">0"
        },
        nosferatu:{
          display: "Nosferatu",
          abilities: ["obfuscate", "potency", "animalism"],
          blood: ">0"
        },
      },
      bio: {
        name : null,
        age : null,
        clanSelect: null,
        bloodPotency : 0,
        skillPrioritySelect: null,
      },
      //TODO^^DATA ABOVE IS WIP^^
      attributes: {
          display: "Attributes",
          parent: "attributes",
          data: [
            {
                display: "Physical",                 
                list: [
                    { 
                      id: "strength",
                      display: "Strength",
                      description: "",
                      value: 1 
                    },{ 
                      id: "dexterity", 
                      display: "Dexterity",
                      description: "", 
                      value: 1 
                    },{ 
                      id: "stamina", 
                      display: "Stamina",
                      description: "",
                      value: 1 
                    },
                ],
            },{
                display: "Social",                 
                list: [
                    { 
                      id: "charisma", 
                      display: "Charisma",
                      description: "",
                      value: 1 
                    },{ 
                      id: "manipulation", 
                      display: "Manipulation", 
                      description: "",
                      value: 1 
                    },{ 
                      id: "composure", 
                      display: "Composure", 
                      description: "",
                      value: 1 
                    }     
                ],
            },{
                display: "Mental",                 
                list: [
                    { 
                      id: "intelligence",
                      display: "Intelligence",
                      description: "",
                      value: 1 
                    },{ 
                      id: "wits", 
                      display: "Wits",
                      description: "",
                      value: 1
                    },{ 
                      id: "resolve", 
                      display: "Resolve",
                      description: "",
                      value: 1                      
                    } 
                ],
        }],
        resource: [0, 1, 4, 3, 1, 0],/*vtm5e attribute distribution: 1 times 4 dots; 3 times 3 dots, 4 times 2 dots
        sum of values in resource <= amount of values in section*/
        //scale: [1, 5], // or maybe scale (range whatever) is calculated as resource.index of -1 and resource.length? (which would be 6 so no... so i guess len-1?)       
      },
      skills: {
          display: "Skills",
          parent: "skills",
          data: [
              {
                display: "Physical",
                list: [
                    {id: "athlethics", display: "Athlethics",value: 0},
                    {id: "brawl", display: "Brawl",value: 0},
                    {id: "craft", display: "Craft",value: 0},
                    {id: "drive", display: "Drive",value: 0},
                    {id: "firearms", display: "Firearms", value: 0},
                    {id: "larceny", display: "Larceny", value: 0},
                    {id: "melee", display: "Melee", value: 0},
                    {id: "stealth", display: "Stealth",value: 0},
                    {id: "survival", display: "Survival",value: 0}
                ],
             },
             {
                display: "Social",
                list: [
                    {id: "animal ken", display: "Animal Ken",value: 0},
                    {id: "etiquette", display: "Etiquette",value: 0},
                    {id: "insight", display: "Insight",value: 0},
                    {id: "intimidation", display: "Intimidation",value: 0},
                    {id: "leadership", display: "Leadership", value: 0},
                    {id: "performance", display: "Performance", value: 0},
                    {id: "persuasion", display: "Persuasion", value: 0},
                    {id: "streetwise", display: "Streetwise",value: 0},
                    {id: "subterfuge", display: "Subterfuge",value: 0}
                ],
             },
             {
                display: "Mental",
                list: [
                    {id: "academics", display: "Academics",value: 0},
                    {id: "awareness", display: "Awareness",value: 0},
                    {id: "finance", display: "Finance",value: 0},
                    {id: "investigation", display: "Investigation",value: 0},
                    {id: "medicine", display: "Medicine", value: 0},
                    {id: "occult", display: "Occult", value: 0},
                    {id: "politics", display: "Politics", value: 0},
                    {id: "science", display: "Science",value: 0},
                    {id: "technology", display: "Technology",value: 0}
                ],
             
             },],
             resource: [12,7,5,3,0,0],
             
        }
  }}
})
//SHEET
app.component('sheet',{
  props: ['attr', 'skills'],
  template: `<stat-section 
               :stats="attr"               
               :parent="attr.parent"></stat-section>
               <stat-section 
               :stats="skills"               
               :parent="skills.parent"></stat-section>
            `
})
// <div>{{attr}}</div>

//STAT SECTION
app.component('stat-section',{
  props: ['stats', 'parent'],
  data() {
    return { 
      resourceCount : null,
  }},
  template: `<div>{{resourceCount}}</div>
             <div class="statSection">
               <h2>{{stats.display}}</h2>
               <stat-category v-for="list in stats.data"
               :categ="list"
               :resource="this.resourceCount"
               :scale="stats.resource.length - 1"
               :parent="parent"></stat-category></div>`,
  /*computed:{
    resourceCount(){
      //debugger;
      //this.stats.data[0].list[0].value // Strength = 1
      let tmp = Array(this.stats.resource.length).fill(0)
      for (var i = 0; i < this.stats.data.length; i++){
        for (var j = 0; j < this.stats.data[i].list.length; j++){
          tmp[this.stats.data[i].list[j].value]++;
        }
      }
      return tmp;
    }
  }*/
  //TODO UNTESTED : check if resource changed and reflects data correctly
  watch:{
    resource: (newVal,oldVal) => {
      this.resourceCount.forEach((element, index) => this.resourceCount[index] = newVal[index] + element - oldVal[index]);
    }
  },
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
  props: ['categ','resource','scale','parent'],
  template:`<div class="statList"><h2>{{categ.display}}</h2>
             <ul class="ulStats">
             <li v-for="item in categ.list">
             <stat 
               :stat="item"
               :resource="resource"
               :scale="scale"
               :parent="parent"></stat></li></ul></div>`
})


//STAT
app.component('stat',{
  props: ['stat', 'resource', 'scale', 'parent'],
  data() {
    return {
      initialValue : this.stat.value,
      hoverPointer : null,
      hoverToggle : false
    }},
  template: `<div>  
    <div :class="{stat : true, mOver : hoverToggle}">        
      <div class="statName">{{stat.display}}</div>
      <div v-if="stat.specialty" class="specialty">{{stat.specialty}}</div>
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
        //debugger;
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
          //if (tmp <= 0) i = value;
          //else i = tmp;
          i = (tmp > value) ? tmp : value;
        }
        //clicked filled point -> removing points, not below limit aka initial value
        if ((diff <= 0)&&(i>init)) i--;             
    
        //OK setting values 
        //emit: change value count
        this.resource[value]+=1;
        this.resource[i]+=-1;
        this.stat.value = i;
      }
    }     
})
/*
classNamePoint(i){
    //debugger;
    let value = this.state.value;
    let fill = i<=value;
    let ptr = this.state.hoverPointer;
    let init = i===this.props.value;
    let bonus = false;//this.props.bonus>0;//TODO
    let hover = (ptr && ((i>ptr) !== (i>value))) ? ' mOver' : '';
    let picker = init ? ' init' : fill ? ' fill' : bonus ? ' bonus' : '';
    let name = 'point' + picker + hover;
    return name;
  }
*/
const vm = app.mount('#root')
//console.log(vm.$data.Attributes) // => 5

