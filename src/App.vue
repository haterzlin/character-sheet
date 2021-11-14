<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HoverWindow from "./components/HoverWindow.vue";
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
      mouseOverData: null,
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
    dataWithPath() {      
      var tmp = {};
      this.refNested(tmp, attributes,);
      this.refNested(tmp, skills);
      disciplines.data.forEach(element => {
        let dataPath = "Disciplines/" + element.id + '/';
        tmp[dataPath] = { 
            data: { stat: element },
            path2Data: dataPath
          }
      });
      return tmp;      
    }
  },
  methods: {
    setDataValue(event) {
      event[0].value = event[1];      
    },
    refNested(targetArray, append){
      let dataPath;
      append.data.forEach(element => {
        dataPath = append.id + '/' + element.id + '/'
        targetArray[dataPath] = {          
            data: { category: element}, 
            path2Data: dataPath
          }
        element.list.forEach(item => {
          dataPath = append.id + '/' + element.id + '/' + item.id + '/'
          targetArray[dataPath] = { 
            data: { stat: item }, 
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
    @hover="mouseOverData = $event">
  </vitals-sidebar>
  <div class="sheet">
    <character-info 
      :bio="biography" 
      @bio-change="$event[0].value = $event[1]">
    </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="setDataValue($event)"
      @stat-section-hover="mouseOverData = $event"
    >
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="setDataValue($event)"
      @stat-section-hover="mouseOverData = $event"
    >
    </skill-section>
    <discipline-section
      :stats="disciplines"
      :selectedClan="biography.clan.value"
      @stat-section-change="setDataValue($event)"
      @stat-section-hover="mouseOverData = $event"
    >
    </discipline-section>
  </div>
  <hover-window 
    :mouse-over-data="mouseOverData"
    :descriptions-with-path="dataWithPath">
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
