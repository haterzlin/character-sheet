<!--
 Displays entire section of skills
 displays select for distribution of skills
 receives events from child component and check if change is possible in resources
 if changes are possible, emit event to top component to make changes, otherwise don't
 -->

<script>
import { statSectionMixin } from "./mixins/statSectionMixin";
import { attributesAndSkillsMixin } from "./mixins/attributesAndSkillsMixin";
import Stat from "./Stat.vue";
import RestrictionState from "./RestrictionState.vue";

export default {
  mixins: [statSectionMixin, attributesAndSkillsMixin],
  props: ["distributions"],
  components: { stat: Stat, restrictionState: RestrictionState },
};
</script>

<template>
  <div class="statSection">
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

    <restrictionState
      class="resourceCount"
      :allocatedResources="allocatedResources"
      :resourceRestrictions="stats.resource"
    >
    </restrictionState>
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
          <stat
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
          </stat>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
select {border: none}
</style>
