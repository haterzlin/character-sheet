<script>
import CharacterInfo from "./components/CharacterInfo.vue";
import AttributeSection from "./components/AttributeSection.vue";
import SkillSection from "./components/SkillSection.vue";
import DisciplineSection from "./components/DisciplineSection.vue";
import HoverWindow from "./components/HoverWindow.vue";
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
      mouseOverData: null,
    };
  },
  components: {
    "hover-window": HoverWindow,
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
div.sheet {
  float: left;
}
</style>
