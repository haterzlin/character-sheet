<script setup>
/**
 * Displays entire section of disciplines
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */

import Discipline from './Discipline.vue';
import RestrictionState from './RestrictionState.vue';
import { disciplinesDefinition } from '../data.js';
</script>

<script>
export default {
  props: ['disciplines', 'selectedClan'],
  emits: ['disciplinesChange', 'statHelp'],
  computed: {
    /**
     * @returns {Array} of numbers describing how many points are currently assigned
     * for example [0,9,0,0,0,0] means there are 9 attributes with value 1
     * while [0,1,4,3,1,0] means 1 attribute with value 1, 4 attributes with value 2,
     * 3 attributes with value 3, 1 attribute with value 4 and 0 attributes with value 5
     */
    allocatedResources() {
      let tmp = Array(this.disciplinesDefinition.resource.length).fill(0);
      for (var i = 0; i < this.disciplines.length; i++) {
        tmp[this.disciplines[i].value]++;
      }
      return tmp;
    },
  },
};
</script>

<template>
  <div class="statSection" id="disciplines">
    <h2 @click="$emit('statHelp', { category: disciplinesDefinition })">
      {{ disciplinesDefinition.id }}
    </h2>

    <RestrictionState
      class="resourceCount"
      :allocatedResources="allocatedResources"
      :resourceRestrictions="disciplinesDefinition.resource"
    >
    </RestrictionState>

    <Discipline
      v-for="discipline in disciplines"
      :key="discipline"
      :discipline="discipline"
      :disciplines="disciplines"
      :clan="selectedClan"
      :allocatedResources="allocatedResources"
      @disciplineChange="$emit('disciplinesChange', disciplines)"
    ></Discipline>
  </div>
</template>

<style scoped></style>
