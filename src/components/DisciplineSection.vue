<script setup>
/**
 * Displays entire section of disciplines
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
import { statSectionMixin } from "./mixins/statSectionMixin";
import Stat from "./Stat.vue";
import RestrictionState from "./RestrictionState.vue";
</script>

<script>
export default {
  mixins: [statSectionMixin],
  props: ["selectedClan"],
  emits: ["statSectionHover"],
  computed: {
    /**
     * @returns {Array} of numbers describing how many points are currently assigned
     * for example [0,9,0,0,0,0] means there are 9 attributes with value 1
     * while [0,1,4,3,1,0] means 1 attribute with value 1, 4 attributes with value 2,
     * 3 attributes with value 3, 1 attribute with value 4 and 0 attributes with value 5
     */
    allocatedResources() {
      let tmp = Array(this.stats.resource.length).fill(0);
      for (var i = 0; i < this.stats.data.length; i++) {
        tmp[this.stats.data[i].value]++;
      }
      return tmp;
    },
  }
};
</script>

<template>
  <div 
    class="statSection" 
    id="disciplines"
    @click="$emit('statHelp', { category: stats })">
    <h2>{{ stats.id }}</h2>
    <RestrictionState
      class="resourceCount"
      :allocatedResources="allocatedResources"
      :resourceRestrictions="stats.resource"
    >
    </RestrictionState>
    <div class="statList">
      <h2>Primary</h2>
      <ul class="ulStats">
        <li v-for="item in stats.data" :key="item.id">
          <Stat
            v-show="item.clans.includes(selectedClan)"
            :stat="item"
            :scale="stats.resource.length - 1"
            @stat-change="emitAllowedChange($event)"
            @stat-click="
              $emit('statHelp', {
                stat: $event.stat,
                resource: stats.resource,
              })
            "            
          >
          </Stat>
        </li>
      </ul>
    </div>
    <div class="statList">
      <h2>Secondary</h2>
      <ul class="ulStats">
        <li v-for="item in stats.data" :key="item.id">
          <stat
            v-show="! item.clans.includes(selectedClan)"
            :stat="item"
            :scale="stats.resource.length - 1"
            @stat-change="selectedClan == 'Caitiff' || $event[2] ? emitAllowedChange($event) : ''"
            @stat-click="
              $emit('statHelp', {
                stat: $event.stat,
                resource: stats.resource,
              })
            "
          >
          </stat>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
