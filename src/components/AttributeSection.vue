<script setup>
/**
 * Displays entire section of attributes
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
  emits: ['stat']
};
</script>

<template>
  <div class="statSection" id="attributes">
    <h2>{{ stats.id }}</h2>
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
      @mouseenter="$emit('statSectionHover', { category: category })"
      @mouseleave="$emit('statSectionHover', null)"
    >
      <h2>{{ category.id }}</h2>
      <ul class="ulStats">
        <li v-for="item in category.list" :key="item.id">
          <Stat
            :stat="item"
            :scale="stats.resource.length - 1"
            @stat-change="emitAllowedChange($event)"
            @stat-hover-start="
              $emit('statSectionHover', {
                stat: $event.stat,
                hoverPointer: $event.hoverPointer,
                resource: stats.resource,
              })
            "
            @stat-hover-end="$emit('statSectionHover', { category: category })"
          >
          </Stat>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
