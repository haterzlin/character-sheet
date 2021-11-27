<script setup>
/**
 * Displays entire section of skills
 * displays select for distribution of skills
 * receives events from child component and check if change is possible in resources
 * if changes are possible, emit event to top component to make changes, otherwise don't
 */
import { statSectionMixin } from "./mixins/statSectionMixin";
import { attributesAndSkillsMixin } from "./mixins/attributesAndSkillsMixin";
import Stat from "./Stat.vue";
import RestrictionState from "./RestrictionState.vue";
</script>

<script>
export default {
  mixins: [statSectionMixin, attributesAndSkillsMixin],
  props: ["distributions"],
};
</script>

<template>
  <div 
    class="statSection" 
    id="skills"
    @click="$emit('statHelp', { category: stats })">
    <h2>{{ stats.id }}
      <select
        v-model="stats.resource"
      >
        <option disabled value="">Select a distribution</option>
        <option
          v-for="distrib in distributions"
          :key="distrib.id"
          :value="distrib.resource"
        >
        {{ distrib.id }}
        </option>
      </select>
    </h2>

    <RestrictionState
      class="resourceCount"
      :allocatedResources="allocatedResources"
      :resourceRestrictions="stats.resource"
    >
    </RestrictionState>
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
          >
          </Stat>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
select {width: 10em}
</style>
