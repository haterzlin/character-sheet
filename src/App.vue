<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HoverWindow from "./components/HelpWindow.vue";
import VitalsSideBar from './components/VitalsSideBar.vue';
import {biography, skillDistributions, attributes, skills, disciplines, vitals} from "./data.js";
import {ref} from "vue"

export default {
  data() {
    return {
      
      // load externals
      biography: biography,
      skills: skills,
      skillDistributions: skillDistributions,
      attributes: attributes,
      disciplines: disciplines,
      vitals:vitals,

      //local states
      helpData: null,
      help: false,
    };
  },
  components: {
    "hover-window": HoverWindow,
    "skill-section": SkillSection,
    "discipline-section": DisciplineSection,
    "attribute-section": AttributeSection,
    "character-info": CharacterInfo,
    "vitals-sidebar": VitalsSideBar
  },
  /**
   * TODO explain this computed
   */
  computed: {
    dataWithPath() {      
      var tmp = {};
      let separator = '>'
      let terminalSymbol = '?'
      this.path4Nested(tmp, attributes, separator, terminalSymbol);
      let path = disciplines.id + terminalSymbol
      tmp[disciplines.id] = {
        data: { category: disciplines },
        items: {},
        name: disciplines.id,
        path2Data: path
      };
      disciplines.data.forEach(element => {
        let dataPath = disciplines.id + separator + element.id + terminalSymbol;
        let name = disciplines.id
        tmp[disciplines.id].items[element.id] = { 
            data: { stat: element, resource: disciplines.resource},
            items: {}, //add empty array to avoid v-for/v-if collision, could be used to show abilities
            name: element.id,
            path2Data: dataPath
          };
      });      
      this.path4Nested(tmp, skills, separator, terminalSymbol);
      vitals.forEach(element => {
        let dataPath = "Vitals" + separator + element.id + terminalSymbol;
        tmp[element.id] = { 
            data: { category: element },
            items: {},
            name: element.id,
            path2Data: dataPath
          }
      });
      // TODO sort(tmp)
      return tmp;      
    }
  },
  methods: {
    setDataValue(event) {
      event[0].value = event[1];      
    },
    /**
     * TODO explain this method, better
     * event handler, if help==true send data to helpWidnow; help -> false
     */
    handleHelp(event) {
      if (this.help){
        this.help = false;
        this.helpData = event;
      }
    },

    /**
     * TODO explain this method
     */
    path4Nested(targetArray, append, separator, terminalSymbol) {
      let dataPath = append.id + terminalSymbol;
      targetArray[append.id] = {
        data: { category: append },
        items: {},
        name: append.id,
        path2Data: dataPath
      }
      append.data.forEach(element => {
        dataPath = append.id + separator + element.id + terminalSymbol;
        targetArray[append.id].items[element.id] = {          
            data: { category: element},
            items: {},
            name: element.id,
            path2Data: dataPath
          }
        element.list.forEach(item => {
          dataPath = append.id + separator + element.id + separator + item.id + terminalSymbol;
          targetArray[append.id].items[element.id].items[item.id]  = { 
            data: { stat: item, resource: append.resource },
            items: {},
            name: item.id,
            path2Data: dataPath
          }
        });
      });
      return;
    },
  },
};
</script>

<template>
  <vitals-sidebar
    :vitals="vitals"
    :stamina="attributes.data[0].list[2].value"
    :composure="attributes.data[1].list[2].value"
    :resolve="attributes.data[2].list[2].value"
    :generation="biography.generation.value"
    :style="{cursor: (help) ? 'help' : null}"
    @vital-stat-help="handleHelp($event)">
  </vitals-sidebar>
  <div 
    class="sheet"
    :style="{cursor: (help) ? 'help' : null}">
    <character-info 
      :bio="biography" 
      @bio-change="$event[0].value = $event[1]">
    </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="setDataValue($event)"
      @stat-help="handleHelp($event)"
    >
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="setDataValue($event)"
      @stat-help="handleHelp($event)"
    >
    </skill-section>
    <discipline-section
      :stats="disciplines"
      :selectedClan="biography.clan.value"
      @stat-section-change="setDataValue($event)"
      @stat-help="handleHelp($event)"
    >
    </discipline-section>
  </div>
  <hover-window 
    :mouse-over-data="helpData"
    :descriptions-with-path="dataWithPath"
    @help-click="help=true"
    @get-help="handleHelp($event)">
  </hover-window>
</template>

<style>
.point {
  height: 14px;
  width: 14px;
  margin: 1px;
  background-color: none;
  border-radius: 50%;
  border: 2px;
  border-style: outset;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.point.init {
  background: radial-gradient(#ff6666, #660000);
}

.point.fill {
  background: radial-gradient(#ff6666, #cc0000);
}

.stat:hover > .statName {
  color:#cc0000
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
}

div.statList {
  width: 240px;
  float: left;
  padding: 10px;
}
.ulStats {
  text-align: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
div.sheet {
  float: left;
  width: 800px;
  margin-bottom: 60px;
}
</style>
