<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HelpWindow from "./components/HelpWindow.vue";
import { biography, skillDistributions, clans, attributes, skills, disciplines } from "./data.js";

export default {
  data() {
    return {
      biography: biography,
      skills: skills,
      skillDistributions: skillDistributions,
      attributes: attributes,
      clans: clans,
      disciplines: disciplines,
      helpContent: {
        section: {
          id: "",
          description: ""
        },
        category: {
          id: "",
          description: ""
        },
        stat: {
          id: "",
          description: ""
        }
      }
    };
  },
  components: {
    "help-window": HelpWindow,
    "skill-section": SkillSection,
    "discipline-section": DisciplineSection,
    "attribute-section": AttributeSection,
    "character-info": CharacterInfo,
  },
  methods: {
    log(message) {
      console.log(message)
    }
  }
};
</script>

<template>
  <div class="sheet">
    <character-info :bio="biography" :clans="clans"> </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="$event[0].value = $event[1]"
      @change-help-content="
        log($event);
        helpContent.section.id = 'Attributes';
        helpContent.section.description = 'Attributes description';
        helpContent.category = $event['category'];
        helpContent.stat = $event['stat'];" 
    >
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="$event[0].value = $event[1]"
      @change-help-content="
        helpContent['section']['id'] = 'Skills';
        helpContent['section']['description'] = 'Skills description';
        helpContent['category'] = $event['category'];
        helpContent['stat'] = $event['stat'];"       
    >
    </skill-section>
    <discipline-section
      v-if="biography.clan"
      :stats="disciplines"
      :clan="biography.clan"
      @stat-section-change="$event[0].value = $event[1]"
      @change-help-content="
        helpContent['section']['id'] = 'Disciplines';
        helpContent['section']['description'] = 'Disciplines description';
        helpContent['category'] = $event['category'];
        helpContent['stat'] = $event['stat'];" 
    >
    </discipline-section>
  </div>
  <help-window :mouse-over-data="helpContent"> </help-window>
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

.init {
  background: radial-gradient(#ff6666, #660000);
}

.fill {
  background: radial-gradient(#ff6666, #cc0000);
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
}
.statSection {
  width: 800px;
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
}

.help {
  cursor: help;
}
</style>
