<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HoverWindow from "./components/HoverWindow.vue";
import VitalsSideBar from './components/VitalsSideBar.vue'
import { biography, skillDistributions, clans, attributes, skills, disciplines, vitals, powerStats, resonances } from "./data.js";

export default {
  data() {
    return {
      /**
       * load externals
       */
      biography: biography,
      skills: skills,
      skillDistributions: skillDistributions,
      attributes: attributes,
      clans: clans,
      disciplines: disciplines,
      vitals:vitals,
      /**
       * local states
       */
      mouseOverData: null,
    };
  },
  components: {
    "hover-window": HoverWindow,
    "skill-section": SkillSection,
    "discipline-section": DisciplineSection,
    "attribute-section": AttributeSection,
    "character-info": CharacterInfo,
    'vitals':VitalsSideBar
  },
  created(){
    vitals.forEach(element => {
      if (element.depends) this.refreshDependecies(element)
    });
  },
  computed:{
    flatStats(){
      let tmp = Array();
      this.appendNested(tmp,attributes);
      this.appendNested(tmp,skills);
      disciplines.data.forEach(element => {
        tmp.push(element)
      });
      tmp.push(biography.generation);
      return tmp;
    }
  },
  methods:{
    appendNested(targetArray, append){
      append.data.forEach(element => {
        element.list.forEach(item => {
          targetArray.push(item);
          
        });
      });
      return;
    },
    refreshDependecies(vitalStat){
      let tmp = Array();
      if (vitalStat.depends){
        vitalStat.depends.forEach(element => {
          if(element != "generation.bloodPotency"){
            tmp.push(this.flatStats.find(item => item.id == element));
          }
        });}
      vitalStat.value = vitalStat.defaultValue
      if (tmp[0] != undefined) {
        tmp.forEach(element => {
          vitalStat.value += element.value
        });
      }
    }
  },
};
</script>

<template>
  <vitals
    :vitals="vitals"
    :bio="biography"
    @hover="mouseOverData = $event">
  </vitals>
  <div class="sheet">
    <character-info :bio="biography" :clans="clans"> </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="$event[0].value = $event[1]"
      @stat-section-hover="mouseOverData = $event"
    >
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="$event[0].value = $event[1]"
      @stat-section-hover="mouseOverData = $event"
    >
    </skill-section>
    <discipline-section
      v-if="biography.clan"
      :stats="disciplines"
      :clan="biography.clan"
      @stat-section-change="$event[0].value = $event[1]"
      @stat-section-hover="mouseOverData = $event"
    >
    </discipline-section>
  </div>
  <hover-window :mouse-over-data="mouseOverData"> </hover-window>
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
  margin-left: 350px;
}
</style>
