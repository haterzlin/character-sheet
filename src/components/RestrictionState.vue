<script>
export default {
computed: {
    /**
     * @returns array of [statValue, quotient] for easy display
     */
    toShow() {
      var list = [];
      for (var statValue = 0; statValue < this.resourceRestrictions.length; statValue++) {
        var quotient =
          this.resourceRestrictions[statValue] - this.allocatedResources[statValue];
        if (quotient != 0) {
          list.push([statValue, quotient]);
        }
      }
      return list.reverse();
    },
  },
};
</script>

<script setup>
defineProps(["allocatedResources", "resourceRestrictions"]);
</script>

<template>
  <div class="resourceCount">
    <span> To pick: </span>
    <span v-for="(item, index) in toShow" :key="index">
      <span :class="{ red: item[1] < 0 }"> {{ item[1] }} x </span>
      <span v-if="item[0] == 0" class="point"> </span>
      <span v-for="number in item[0]" :key="number" class="point fill"> </span>
      <span v-show="index < toShow.length - 1">, </span>
    </span>
    <span v-show="toShow.length == 0"> All picked </span>
  </div>
</template>

<style scoped>
.red {
  color: red;
}

div.resourceCount > span > span.point:hover {
  cursor: default;
}
</style>
