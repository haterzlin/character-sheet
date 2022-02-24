<script setup>
import Dots from "./Dots.vue";
import VueTagsInput from '@sipec/vue3-tags-input';
</script>

<script>
/**
 * displays attribute or skill name and uses Dots.vue to display clickable dots enabling to change value
 * after change new value is emitted to parent component to decide if it is alright
 * also we emit statClick to send message to help which attribute was chosen
 */
export default {
  name: "stat",
  components: [Dots],
  props: ["stat", "scale"],
  emits: ["statChange", "statClick"],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null,
      tag: '',
      tags: [],
      specialtyHidden: true
    };
  },
  methods: {
    showOrHideSpecialties() {
      console.log('clicking')
      this.specialtyHidden ? this.specialtyHidden = false : this.specialtyHidden = true
    }
  }
};
</script>

<template>
  <div
    class="stat"
    @click="$emit('statClick', { stat: stat }); showOrHideSpecialties()"    
  >  
    <div class="statName">{{ stat.id }}</div>
  </div>

  <Dots
    :value="stat.value"
    :initialValue="initialValue"
    :scale="scale"
    @valueChange="$emit('statChange', [stat, $event, stat.value >= $event && $event > initialValue])"
  />

  <vue-tags-input
    v-model="tag"
    :tags="tags"
    @tags-changed="newTags => tags = newTags"
    :class="{
        hidden: specialtyHidden
      }"
  />

</template>

<style scoped>

.hidden { 
  display: none;
}

.statName {
  float: left;
  width: 140px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
}

.statName:after {
  content: " ________________";
}

.stat:hover > .statName {
  color:#cc0000
}
</style>
