<script>
const SEPARATOR = '>'
const TERMINALSYMBOL = '?'
const HELP_DATA = {
  data: {
    description: "<b>help window -- ?</b><p>click on (?) to hide this window so then you can click another element to see info</p><p>or use select and simply pick it</p><p>click 'x' to dismiss this element</p>"
    },
  name: "Help",
  path2Data: "Help" + TERMINALSYMBOL
};

import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HoverWindow from "./components/HelpWindow.vue";
import VitalsSideBar from './components/VitalsSideBar.vue';
import {biography, skillDistributions, attributes, skills, disciplines, disciplinesDefinition, vitals} from "./data.js";

export default {
  data() {
    return {
      
      // load externals
      biography: biography,
      skills: skills,
      skillDistributions: skillDistributions,
      attributes: attributes,
      disciplines: disciplines,
      disciplinesDefinition: disciplinesDefinition,
      vitals: vitals,

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
  computed: {
    /**
     * TODO explain this computed
     * @returns {JSON}
     * restructure data to make select/menu in help-window simple
     */
    dataWithPath() {      
      var tmp = {};
      tmp[HELP_DATA.name] = HELP_DATA;
      this.restructureNested(tmp, attributes);
      tmp[disciplinesDefinition.id] = {
        data: { category: disciplines },
        items: {},
        name: disciplinesDefinition.id,
        path2Data: disciplinesDefinition.path2Data
      };
      disciplinesDefinition.data.forEach(element => {
        tmp[disciplinesDefinition.id].items[element.id] = { 
            data: { stat: element, resource: disciplinesDefinition.resource},
            items: {}, //add empty array to avoid v-for/v-if collision, could be used to show abilities
            name: element.id,
            path2Data: element.path2Data
          };
      });
      this.restructureNested(tmp, skills);
      vitals.forEach(element => {
        tmp[element.id] = { 
            data: { category: element },
            items: {},
            name: element.id,
            path2Data: element.path2Data
          }
      });
      // TODO sort(tmp)
      return tmp;      
    }
  },
  created(){
    this.bindPathToData();
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
     * TODO explain this method, maybe better
     * is called when created, binds paths to data
     */
    bindPathToData(){
      let separator = SEPARATOR;
      let terminalSymbol = TERMINALSYMBOL;
      this.bindPath4Nested(attributes, separator, terminalSymbol);
      this.bindPath4Nested(skills, separator, terminalSymbol);
      
      disciplinesDefinition.path2Data = disciplinesDefinition.id + terminalSymbol;
      disciplinesDefinition.data.forEach(element => {
        element.path2Data = disciplinesDefinition.id + separator + element.id + terminalSymbol;
      });      
      vitals.forEach(element => {
        element.path2Data = element.id + terminalSymbol;
      });
    },
    /**
     * TODO explain this method
     * binds path {String} for @param append {JSON} and its nested children
     * uses @param separator {String} to separate ids and @param terminalSymbol to indicate there is no additional id
     */
    bindPath4Nested(append, separator, terminalSymbol) {
      append.path2Data = append.id + terminalSymbol;
      append.data.forEach(element => {
        element.path2Data = append.id + separator + element.id + terminalSymbol;
        element.list.forEach(item => {
          item.path2Data = append.id + separator + element.id + separator + item.id + terminalSymbol;
        });
      });
    },

    /**
     * TODO explain this method
     * restructure data for data such as skills or attributes
     * @param targetArray {JSON} data is restructured to this array
     * @param append {JSON} data that is to be restructured, should be structured @param append.data{JSON} JSON @param append.data.list{JSON} JSON
     */
    restructureNested(targetArray, append) {
      targetArray[append.id] = {
        data: { category: append },
        items: {},
        name: append.id,
        path2Data: append.path2Data
      }
      append.data.forEach(element => {
        targetArray[append.id].items[element.id] = {          
            data: { category: element},
            items: {},
            name: element.id,
            path2Data: element.path2Data
          }
        element.list.forEach(item => {
          targetArray[append.id].items[element.id].items[item.id]  = { 
            data: { stat: item, resource: append.resource },
            items: {},
            name: item.id,
            path2Data: item.path2Data
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
      :disciplines="disciplines"
      :selectedClan="biography.clan.value"
      :disciplines-definition="disciplinesDefinition"
      @disciplines-change="disciplines = $event"
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
select {
  border: none;
  width: 95%;
}
select:hover {
  background-color: #dddddd;
  cursor: pointer;
}
</style>
