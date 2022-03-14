<script setup>
import { statSectionMixin } from "./mixins/statSectionMixin";
import { attributesAndSkillsMixin } from "./mixins/attributesAndSkillsMixin";
import Stat from "./Stat.vue";
import RestrictionState from "./RestrictionState.vue";

</script>

<script>
/**
 * Displays entire section of attributes
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
export default {
  components: [Stat, RestrictionState],
  mixins: [statSectionMixin, attributesAndSkillsMixin],
};
</script>

<template>
  <div 
    class="statSection" 
    id="attributes"
    @click="$emit('statHelp', { category: stats })">
    <h2>{{ stats.id }}</h2>
    <RestrictionState
      class="resourceCount"
      :allocatedResources="allocatedResources"
      :resourceRestrictions="stats.resource"
    />
    <div class="threecolumns">
      <div
        v-for="category in stats.data"
        :key="category.id"
        class="statList"
        @click="$emit('statHelp', { category: category })"      
      >
        <h2>{{ category.id }}</h2>
        <ul class="ulStats">
          <li v-for="item in category.list" :key="item.id">
            <Stat
              :stat="item"
              :scale="stats.resource.length - 1"
              @stat-change="emitAllowedChange($event)"
              @stat-click="
                $emit('statHelp', {
                  stat: $event.stat,
                  resource: stats.resource,
                })
              "            
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="clearFloat"></div>
  </div>
</template>

<style scoped>
</style>
