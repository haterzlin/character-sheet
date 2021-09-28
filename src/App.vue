<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HelpWindow from "./components/HelpWindow.vue";
import { biography, skillDistributions, clans, attributes, skills, disciplines, helpContent } from "./data.js";

export default {
  data() {
    return {
      biography: biography,
      skills: skills,
      skillDistributions: skillDistributions,
      attributes: attributes,
      clans: clans,
      disciplines: disciplines,
      helpContent: helpContent
    };
  },
  components: {
    "help-window": HelpWindow,
    "skill-section": SkillSection,
    "discipline-section": DisciplineSection,
    "attribute-section": AttributeSection,
    "character-info": CharacterInfo,
  },
};
</script>

<template>
  <div class="sheet">
    <character-info :bio="biography" :clans="clans"> </character-info>
    <attribute-section
      :stats="attributes"
      @stat-section-change="$event[0].value = $event[1]"
      @change-help-content="
        helpContent.section.id = attributes.id;
        helpContent.section.description = attributes.description;
        helpContent.category = $event['category'];
        helpContent.stat = $event['stat'];" 
    >
    </attribute-section>
    <skill-section
      :stats="skills"
      :distributions="skillDistributions"
      @stat-section-change="$event[0].value = $event[1]"
      @change-help-content="
        helpContent['section']['id'] = skills.id;
        helpContent['section']['description'] = skills.description;
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
        helpContent['section']['id'] = disciplines.id;
        helpContent['section']['description'] = disciplines.description;
        helpContent['category'] = $event['category'];
        helpContent['stat'] = $event['stat'];" 
    >
    </discipline-section>
  </div>
  <help-window :helpData="helpContent"> </help-window>
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
